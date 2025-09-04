import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const location = useLocation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'or', label: 'ଓଡ଼ିଆ' },
    { code: 'bn', label: 'বাংলা' }
  ];
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News & Schemes' },
    { path: '/education', label: 'Education' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-primary shadow-green sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-foreground rounded-lg p-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🌱</span>
              </div>
            </div>
            <span className="text-primary-foreground font-bold text-xl">KrishiMitra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-primary-foreground hover:text-secondary transition-colors duration-200 font-medium ${
                  isActive(link.path) ? 'border-b-2 border-primary-foreground' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 flex items-center gap-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Globe className="w-4 h-4" />
                {languages.find(lang => lang.code === i18n.language)?.label || 'English'}
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-soft border border-border z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-primary-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-md font-medium ${
                    isActive(link.path) ? 'bg-primary-foreground/20' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="px-3 py-2">
                <div className="text-primary-foreground text-sm mb-2">Language:</div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`block w-full text-left px-2 py-1 text-primary-foreground/80 hover:text-primary-foreground ${
                      i18n.language === lang.code ? 'font-semibold' : ''
                    }`}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;