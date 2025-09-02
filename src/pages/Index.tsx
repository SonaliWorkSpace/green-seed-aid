import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Cloud, BookOpen, Phone, Camera, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import WeatherWidget from '@/components/WeatherWidget';
import ImageUpload from '@/components/ImageUpload';
import farmerHero from '@/assets/farmer-hero.jpg';

const Index = () => {
  const quickFeatures = [
    {
      icon: Camera,
      title: 'Pest & Disease Detection',
      description: 'Upload crop photos for AI-powered pest identification',
      link: '#pest-detection',
      color: 'text-leaf-green'
    },
    {
      icon: Cloud,
      title: 'Weather Forecast',
      description: 'Get accurate weather updates for farming decisions',
      link: '#weather',
      color: 'text-sky-blue'
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Check latest crop prices and market trends',
      link: '/market',
      color: 'text-harvest-gold'
    },
    {
      icon: FileText,
      title: 'Soil Analysis',
      description: 'Upload soil reports for personalized recommendations',
      link: '#soil-analysis',
      color: 'text-accent'
    }
  ];

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                KrishiMitra
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-primary-foreground/90 mb-6">
                Your Smart Farming Companion
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-xl">
                Empowering farmers with AI-powered crop analysis, weather insights, and government scheme updates. 
                Transform your farming with modern technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="accent-button text-lg px-8 py-4">
                  <Leaf className="w-5 h-5" />
                  Start Farming Smart
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={farmerHero}
                alt="Farmers using modern technology in agricultural fields"
                className="rounded-2xl shadow-green w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 text-primary-foreground/20 text-6xl">🌾</div>
        <div className="absolute bottom-10 left-10 text-primary-foreground/20 text-4xl">🚜</div>
      </section>

      {/* Quick Features */}
      <section className="py-20 bg-subtle-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Essential Farming Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access powerful AI tools and real-time information to make informed farming decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="farmer-card group hover:scale-105"
                >
                  <div className={`${feature.color} mb-4`}>
                    <IconComponent className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:text-primary/80">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Sections */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Weather Widget */}
            <div id="weather">
              <WeatherWidget />
            </div>
            
            {/* Image Upload for Pest Detection */}
            <div id="pest-detection">
              <ImageUpload
                title="Pest & Disease Detection"
                description="Upload a photo of your crop to get instant AI-powered analysis and treatment recommendations"
                onUpload={handleImageUpload}
              />
            </div>
          </div>
          
          {/* Soil Analysis Upload */}
          <div className="mt-12" id="soil-analysis">
            <ImageUpload
              title="Soil Report Analysis"
              description="Upload your soil test report (PDF or image) to get personalized fertilizer and crop recommendations"
              acceptedTypes="image/*,.pdf"
              onUpload={handleImageUpload}
            />
          </div>
        </div>
      </section>

      {/* Navigation to Other Pages */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Explore More Features
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Discover government schemes, learn modern farming techniques, and connect with our support team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/news" className="bg-primary-foreground/10 rounded-xl p-8 text-center hover:bg-primary-foreground/20 transition-colors group">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">News & Schemes</h3>
              <p className="text-primary-foreground/80 mb-4">Stay updated with latest government schemes and agricultural news</p>
              <div className="flex items-center justify-center text-primary-foreground font-medium group-hover:text-primary-foreground/80">
                View Updates
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
            
            <Link to="/education" className="bg-primary-foreground/10 rounded-xl p-8 text-center hover:bg-primary-foreground/20 transition-colors group">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">Education & Awareness</h3>
              <p className="text-primary-foreground/80 mb-4">Learn modern farming techniques and sustainable practices</p>
              <div className="flex items-center justify-center text-primary-foreground font-medium group-hover:text-primary-foreground/80">
                Start Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
            
            <Link to="/contact" className="bg-primary-foreground/10 rounded-xl p-8 text-center hover:bg-primary-foreground/20 transition-colors group">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">Contact & Support</h3>
              <p className="text-primary-foreground/80 mb-4">Get help, share feedback, and connect with our experts</p>
              <div className="flex items-center justify-center text-primary-foreground font-medium group-hover:text-primary-foreground/80">
                Get Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-bold">KrishiMitra</span>
              </div>
              <p className="text-background/80">
                Empowering farmers with technology and knowledge for sustainable agriculture.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/" className="hover:text-background">Home</Link></li>
                <li><Link to="/news" className="hover:text-background">News & Schemes</Link></li>
                <li><Link to="/education" className="hover:text-background">Education</Link></li>
                <li><Link to="/contact" className="hover:text-background">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/80">
                <li>Helpline: 1800-180-1551</li>
                <li>Email: support@krishimitra.gov.in</li>
                <li>WhatsApp Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Languages</h4>
              <ul className="space-y-2 text-background/80">
                <li>English</li>
                <li>हिंदी (Hindi)</li>
                <li>ଓଡ଼ିଆ (Odia)</li>
                <li>বাংলা (Bengali)</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 KrishiMitra. Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
