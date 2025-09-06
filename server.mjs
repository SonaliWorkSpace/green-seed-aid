import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs";
import OpenAI from "openai";
dotenv.config();

// import express from "express";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Root
app.get("/", (req, res) => {
  res.send("✅ Green Seed Aid - Backend running");
});

//Weather route (uses OpenWeather)
app.get("/api/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "WEATHER_API_KEY missing" });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Weather API Error:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

// Mandi prices route (data.gov.in) - resource id fixed
const MANDI_RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
app.get("/api/mandi-prices", async (req, res) => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "DATA_GOV_API_KEY missing" });

    const { commodity, state, district, market, date, limit = "50", offset = "0" } = req.query;
    const params = new URLSearchParams();
    params.set("api-key", apiKey);
    params.set("format", "json");
    params.set("limit", String(limit));
    params.set("offset", String(offset));
    if (commodity) params.set("filters[commodity]", commodity);
    if (state) params.set("filters[state]", state);
    if (district) params.set("filters[district]", district);
    if (market) params.set("filters[market]", market);
    if (date) {
      // convert YYYY-MM-DD -> DD/MM/YYYY
      const [y, m, d] = date.split("-");
      params.set("filters[arrival_date]", `${d}/${m}/${y}`);
    }

    const url = `https://api.data.gov.in/resource/${MANDI_RESOURCE_ID}?${params.toString()}`;
    console.log("Fetching mandi:", url);
    const { data } = await axios.get(url, { timeout: 15000 });
    const records = (data.records || []).map(r => ({
      state: r.state,
      district: r.district,
      market: r.market,
      commodity: r.commodity,
      variety: r.variety,
      arrival_date: r.arrival_date,
      min_price: r.min_price,
      max_price: r.max_price,
      modal_price: r.modal_price,
    }));
    res.json({ count: records.length, records });
  } catch (err) {
    console.error("Mandi API Error:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: "Mandi fetch failed" });
  }
});

// Soil mock route
app.get("/api/soil", (req, res) => {
  const { state, district } = req.query;
  if (!state || !district) return res.status(400).json({ error: "Please provide state and district" });

  const mock = {
    state,
    district,
    ph: 6.8,
    nitrogen: "280 kg/ha",
    phosphorus: "25 kg/ha",
    potassium: "210 kg/ha",
    organicCarbon: "0.75%",
    recommendation: "Add 40kg Urea, 25kg DAP, 15kg MOP per acre for this crop."
  };
  res.json(mock);
});
// Soil upload test route (for browser GET check)
app.get("/api/soil/upload-image", (req, res) => {
  res.send("✅ Soil upload endpoint live hai. Use POST method in Thunder Client/Postman to upload file.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
//soil report analysis route(ocr using tesseract.js)


// Multer setup (uploads/ folder me file save karega)
const upload = multer({ dest: "uploads/" });

// OCR Route
app.post("/api/soil/upload-image", upload.single("report"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "❌ No file uploaded" });
    }

    // OCR processing
    const result = await Tesseract.recognize(req.file.path, "eng");
    const text = result.data.text;

    // Cleanup (delete uploaded file)
    fs.unlinkSync(req.file.path);

    res.json({
      rawText: text,
      message: "✅ Soil report text extracted successfully"
    });
  } catch (err) {
    console.error("OCR Error:", err.message);
    res.status(500).json({ error: "❌ OCR failed" });
  }
});
// AI Crop Recommendation route (using OpenAi)


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Crop Recommendation API
app.post("/api/recommend-crop", async (req, res) => {
  try {
    const { ph, nitrogen, phosphorus, potassium, city } = req.body;

    if (!ph || !nitrogen || !phosphorus || !potassium || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Weather data fetch
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.VITE_OPENWEATHER_API_KEY}&units=metric`
    );

    const weather = weatherResponse.data;

    // Send to AI model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an agriculture expert. Based on soil nutrients and weather, recommend best crops.",
        },
        {
          role: "user",
          content: `Soil data: pH=${ph}, N=${nitrogen}, P=${phosphorus}, K=${potassium}. Weather: ${weather.weather[0].description}, Temp=${weather.main.temp}°C, Humidity=${weather.main.humidity}%. Recommend 3 best crops with short reasons.`,
        },
      ],
    });

    const aiReply = completion.choices[0].message.content;

    res.json({ recommendation: aiReply });
  } catch (err) {
    console.error("Crop AI Error:", err.message);
    res.status(500).json({ error: "Crop recommendation failed" });
  }
});
