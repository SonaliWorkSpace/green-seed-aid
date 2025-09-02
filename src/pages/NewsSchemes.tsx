import React from 'react';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsSchemes = () => {
  const newsItems = [
    {
      id: 1,
      title: 'PM-KISAN Scheme: Direct Benefit Transfer for Farmers',
      description: 'Financial support of ₹6,000 per year to eligible farmer families under the PM-KISAN scheme. Check your eligibility and application status.',
      date: '2024-01-15',
      category: 'Scheme',
      link: '#',
      isNew: true
    },
    {
      id: 2,
      title: 'Soil Health Card Distribution Drive',
      description: 'Free soil testing and health cards distribution for all registered farmers. Get recommendations for crop-specific fertilizer usage.',
      date: '2024-01-12',
      category: 'Agriculture',
      link: '#',
      isNew: true
    },
    {
      id: 3,
      title: 'Kisan Credit Card - Enhanced Limit Announcement',
      description: 'Credit limit increased for existing KCC holders. New simplified application process for first-time applicants.',
      date: '2024-01-10',
      category: 'Finance',
      link: '#',
      isNew: false
    },
    {
      id: 4,
      title: 'Organic Farming Certification Subsidies',
      description: 'Government announces 50% subsidy on organic certification costs. Promoting chemical-free farming practices across states.',
      date: '2024-01-08',
      category: 'Scheme',
      link: '#',
      isNew: false
    },
    {
      id: 5,
      title: 'Weather Alert: Heavy Rainfall Expected',
      description: 'IMD forecasts heavy rainfall in northern states. Farmers advised to take precautionary measures for crop protection.',
      date: '2024-01-05',
      category: 'Alert',
      link: '#',
      isNew: false
    },
    {
      id: 6,
      title: 'Digital Agriculture Mission 2024',
      description: 'New digital initiatives to provide farmers with AI-powered crop monitoring and precision farming techniques.',
      date: '2024-01-03',
      category: 'Technology',
      link: '#',
      isNew: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Scheme': return 'bg-primary text-primary-foreground';
      case 'Agriculture': return 'bg-leaf-green text-white';
      case 'Finance': return 'bg-accent text-accent-foreground';
      case 'Alert': return 'bg-destructive text-destructive-foreground';
      case 'Technology': return 'bg-sky-blue text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Latest News & Government Schemes
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest agricultural news, government schemes, and important announcements for farmers
          </p>
        </div>

        {/* Filter/Category Tags */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['All', 'Scheme', 'Agriculture', 'Finance', 'Alert', 'Technology'].map(category => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map(item => (
            <div key={item.id} className="farmer-card relative">
              {item.isNew && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-semibold">
                  NEW
                </div>
              )}
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="feature-button">
            Load More News
          </Button>
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="farmer-card text-center">
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="font-semibold mb-2">Government Portal</h3>
            <p className="text-sm text-muted-foreground mb-4">Access official government schemes</p>
            <Button variant="outline" size="sm">Visit Portal</Button>
          </div>
          
          <div className="farmer-card text-center">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold mb-2">Subsidy Calculator</h3>
            <p className="text-sm text-muted-foreground mb-4">Calculate eligible subsidies</p>
            <Button variant="outline" size="sm">Calculate</Button>
          </div>
          
          <div className="farmer-card text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold mb-2">Application Status</h3>
            <p className="text-sm text-muted-foreground mb-4">Track your applications</p>
            <Button variant="outline" size="sm">Check Status</Button>
          </div>
          
          <div className="farmer-card text-center">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-semibold mb-2">Helpline</h3>
            <p className="text-sm text-muted-foreground mb-4">Get instant support</p>
            <Button variant="outline" size="sm">Call Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSchemes;