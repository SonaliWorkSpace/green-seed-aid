import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Cloud, Camera, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import WeatherWidget from '@/components/WeatherWidget';
import ImageUpload from '@/components/ImageUpload';
import farmerHero from '@/assets/farmer-hero.jpg';
import { useTranslation } from "react-i18next";
import "../i18n";

const Index = () => {
  const { t } = useTranslation();

  const quickFeatures = [
    {
      icon: Camera,
      title: t('features.pestDetection.title'),
      description: t('features.pestDetection.description'),
      link: '#pest-detection',
      color: 'text-leaf-green'
    },
    {
      icon: Cloud,
      title: t('features.weather.title'),
      description: t('features.weather.description'),
      link: '#weather',
      color: 'text-sky-blue'
    },
    {
      icon: TrendingUp,
      title: t('features.market.title'),
      description: t('features.market.description'),
      link: '/market',
      color: 'text-harvest-gold'
    },
    {
      icon: FileText,
      title: t('features.soil.title'),
      description: t('features.soil.description'),
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
                {t('hero.title')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-primary-foreground/90 mb-6">
                {t('hero.subtitle')}
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-xl">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="accent-button text-lg px-8 py-4">
                  <Leaf className="w-5 h-5" />
                  {t('hero.startButton')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="text-primary border-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4">
                  {t('hero.demoButton')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={farmerHero}
                alt={t('hero.imageAlt')}
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
                title={t('features.pestDetection.title')}
                description={t('features.pestDetection.uploadDescription')}
                onUpload={handleImageUpload}
              />
            </div>
          </div>
          
          {/* Soil Analysis Upload */}
          <div className="mt-12" id="soil-analysis">
            <ImageUpload
              title={t('features.soil.title')}
              description={t('features.soil.uploadDescription')}
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
              {t('explore.title')}
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              {t('explore.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
             <Link to="/news" className="bg-primary-foreground/10 rounded-xl p-8 text-center hover:bg-primary-foreground/20 transition-colors group">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">{t('explore.news.title')}</h3>
              <p className="text-primary-foreground/80 mb-4">{t('explore.news.description')}</p>
              <div className="flex items-center justify-center text-primary-foreground font-medium group-hover:text-primary-foreground/80">
                {t('explore.news.button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
            
            <Link to="/education" className="bg-primary-foreground/10 rounded-xl p-8 text-center hover:bg-primary-foreground/20 transition-colors group">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">{t('explore.education.title')}</h3>
              <p className="text-primary-foreground/80 mb-4">{t('explore.education.description')}</p>
              <div className="flex items-center justify-center text-primary-foreground font-medium group-hover:text-primary-foreground/80">
                {t('explore.education.button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
            
            <Link to="/contact" className="bg-primary-foreground/10 rounded-xl p-8 text-center hover:bg-primary-foreground/20 transition-colors group">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-3">{t('explore.contact.title')}</h3>
              <p className="text-primary-foreground/80 mb-4">{t('explore.contact.description')}</p>
              <div className="flex items-center justify-center text-primary-foreground font-medium group-hover:text-primary-foreground/80">
                {t('explore.contact.button')}
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
                <span className="text-xl font-bold">{t('footer.title')}</span>
              </div>
              <p className="text-background/80">
                {t('footer.description')}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.quickLinks.title')}</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/" className="hover:text-background">{t('footer.quickLinks.home')}</Link></li>
                <li><Link to="/news" className="hover:text-background">{t('footer.quickLinks.news')}</Link></li>
                <li><Link to="/education" className="hover:text-background">{t('footer.quickLinks.education')}</Link></li>
                <li><Link to="/contact" className="hover:text-background">{t('footer.quickLinks.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support.title')}</h4>
              <ul className="space-y-2 text-background/80">
                <li>{t('footer.support.helpline')}</li>
                <li>{t('footer.support.email')}</li>
                <li>{t('footer.support.whatsapp')}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.languages.title')}</h4>
              <ul className="space-y-2 text-background/80">
                <li>{t('footer.languages.english')}</li>
                <li>{t('footer.languages.hindi')}</li>
                <li>{t('footer.languages.odia')}</li>
                <li>{t('footer.languages.bengali')}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
