import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    feedback: ''
  });
  const [openFAQ, setOpenFAQ] = useState<{[key: string]: boolean}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your feedback! We will get back to you soon.');
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 'weather-alerts',
      question: 'How do the weather alerts help protect my crops?',
      answer: 'Our weather alerts monitor multiple conditions including extreme temperatures, high winds, heavy rainfall, and drought. You\'ll receive specific warnings and farming tips to protect your crops, such as when to provide shade, strengthen crop support, or improve drainage.'
    },
    {
      id: 'crop-advisory',
      question: 'What kind of farming advice do you provide?',
      answer: 'We offer season-specific crop recommendations, best practices for cultivation, pest management strategies, and optimal irrigation schedules. Our advice is customized based on your location, current weather conditions, and crop type.'
    },
    {
      id: 'schemes-benefits',
      question: 'What government benefits and subsidies can I access?',
      answer: 'We provide information about various schemes including PM-KISAN, crop insurance, subsidies for equipment and seeds, and minimum support prices. Our platform helps you understand eligibility criteria and guides you through the application process.'
    },
    {
      id: 'market-prices',
      question: 'How can I get the best prices for my produce?',
      answer: 'We provide daily updates on market prices across different mandis, direct connection to buyers, and information about government procurement programs. You can also access transportation services and storage facilities through our network.'
    },
    {
      id: 'organic-farming',
      question: 'How can I transition to organic farming?',
      answer: 'We offer step-by-step guidance for organic transition, including natural pest control methods, organic fertilizer preparation, soil health management, and certification process guidance. We also connect you with successful organic farmers in your region.'
    },
    {
      id: 'loan-assistance',
      question: 'How can I get financial assistance for farming?',
      answer: 'We provide information about Kisan Credit Cards, agricultural loans from banks, microfinance options, and government subsidies. Our platform helps you understand interest rates, repayment terms, and required documentation.'
    },
   
  ];

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us for support, feedback, or any questions about farming and agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="farmer-card">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us your feedback</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-foreground">
                    Location (Village/District) *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Enter your location"
                  />
                </div>

                <div>
                  <Label htmlFor="feedback" className="text-sm font-medium text-foreground">
                    Your Message/Feedback *
                  </Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    required
                    className="mt-2 min-h-[120px]"
                    placeholder="Share your feedback, questions, or concerns..."
                  />
                </div>

                <Button type="submit" className="feature-button w-full">
                  <Send className="w-5 h-5" />
                  Send Feedback
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Contact Options */}
            <div className="farmer-card">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Contact</h2>
              
              <div className="space-y-4">
                <a
                  href="tel:1800-180-1551"
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Farmer Helpline</p>
                    <p className="text-muted-foreground">1800-180-1551 (Toll Free)</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="bg-leaf-green text-white p-3 rounded-full">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp Support</p>
                    <p className="text-muted-foreground">Chat with our experts</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email Support</p>
                    <p className="text-muted-foreground">support@krishimitra.gov.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-sky-blue text-white p-3 rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Office Address</p>
                    <p className="text-muted-foreground">Ministry of Agriculture, New Delhi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            {/* <div className="farmer-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Emergency Support</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Crop Insurance Claims</span>
                  <Button variant="outline" size="sm">Call Now</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Weather Alerts</span>
                  <Button variant="outline" size="sm">Subscribe</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Pest Outbreak Reporting</span>
                  <Button variant="outline" size="sm">Report</Button>
                </div>
              </div> 
            </div> */}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map(faq => (
              <div key={faq.id} className="farmer-card">
                <button
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  </div>
                  {openFAQ[faq.id] ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                {openFAQ[faq.id] && (
                  <div className="mt-4 pl-8">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;