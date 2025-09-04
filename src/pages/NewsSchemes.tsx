import React, { useEffect, useState } from 'react';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  url: string;
  isNew: boolean;
}

const NewsSchemes = () => {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isDescriptionLong = (description: string) => {
    return description.split(' ').length > 30;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        console.log('API Key:', apiKey); // This will help us verify if the key is being read
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&q=agriculture%20farming&country=in&language=en`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch news');
        }

        const data = await response.json();
        
        if (!data.results) {
          throw new Error('No news data available');
        }

        const formattedNews: NewsArticle[] = data.results.map((article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          description: article.description || 'No description available',
          publishedAt: article.pubDate,
          category: determineCategory(article.title),
          url: article.link,
          isNew: new Date(article.pubDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }));

        setNewsItems(formattedNews);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const determineCategory = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('scheme') || titleLower.includes('policy') || titleLower.includes('subsidy')) {
      return 'Scheme';
    } else if (titleLower.includes('technology') || titleLower.includes('digital')) {
      return 'Technology';
    } else if (titleLower.includes('finance') || titleLower.includes('loan') || titleLower.includes('credit')) {
      return 'Finance';
    } else if (titleLower.includes('warning') || titleLower.includes('alert') || titleLower.includes('weather')) {
      return 'Alert';
    } else {
      return 'Agriculture';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-subtle-gradient flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-subtle-gradient flex items-center justify-center">
        <div className="text-xl text-destructive">{error}</div>
      </div>
    );
  }

  const defaultNewsItems: NewsArticle[] = [];

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
            <div key={item.id} className="farmer-card relative flex flex-col min-h-[320px]">
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
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className={`text-muted-foreground text-sm leading-relaxed mb-4 ${!expandedItems.has(item.id) && isDescriptionLong(item.description) ? 'line-clamp-3' : ''}`}>
                  {item.description}
                </div>
                {isDescriptionLong(item.description) && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    className="mb-4 p-0 h-auto font-semibold"
                  >
                    {expandedItems.has(item.id) ? 'Show Less' : 'Read More'}
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  View Full Article
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open(item.url, '_blank')}
                >
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