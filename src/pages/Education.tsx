import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Video, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Education = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'soil-management': true
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const educationModules = [
    {
      id: 'soil-management',
      title: 'Soil Management & Health',
      icon: '🌱',
      description: 'Learn about soil types, testing, and health improvement techniques',
      lessons: [
        { title: 'Understanding Soil Types', type: 'video', duration: '15 min' },
        { title: 'Soil Testing Methods', type: 'article', duration: '10 min' },
        { title: 'Organic Matter & Composting', type: 'video', duration: '20 min' },
        { title: 'pH Management', type: 'quiz', duration: '5 min' }
      ]
    },
    {
      id: 'fertilizer-usage',
      title: 'Fertilizer Usage & Nutrition',
      icon: '🧪',
      description: 'Proper fertilizer application and crop nutrition management',
      lessons: [
        { title: 'NPK Basics for Farmers', type: 'video', duration: '18 min' },
        { title: 'Organic vs Chemical Fertilizers', type: 'article', duration: '12 min' },
        { title: 'Application Timing & Methods', type: 'video', duration: '25 min' },
        { title: 'Nutrient Deficiency Signs', type: 'infographic', duration: '8 min' }
      ]
    },
    {
      id: 'organic-farming',
      title: 'Organic Farming Practices',
      icon: '🍃',
      description: 'Sustainable and chemical-free farming techniques',
      lessons: [
        { title: 'Introduction to Organic Farming', type: 'video', duration: '22 min' },
        { title: 'Natural Pest Control Methods', type: 'article', duration: '15 min' },
        { title: 'Crop Rotation Benefits', type: 'video', duration: '20 min' },
        { title: 'Certification Process', type: 'document', duration: '10 min' }
      ]
    },
    {
      id: 'water-management',
      title: 'Water Management & Irrigation',
      icon: '💧',
      description: 'Efficient water usage and irrigation techniques',
      lessons: [
        { title: 'Drip Irrigation Systems', type: 'video', duration: '30 min' },
        { title: 'Rainwater Harvesting', type: 'article', duration: '12 min' },
        { title: 'Water Conservation Techniques', type: 'video', duration: '18 min' },
        { title: 'Irrigation Scheduling', type: 'calculator', duration: '5 min' }
      ]
    },
    {
      id: 'pest-disease',
      title: 'Pest & Disease Management',
      icon: '🐛',
      description: 'Identify and manage crop pests and diseases effectively',
      lessons: [
        { title: 'Common Crop Pests Identification', type: 'infographic', duration: '15 min' },
        { title: 'Integrated Pest Management', type: 'video', duration: '25 min' },
        { title: 'Natural Pesticide Preparation', type: 'video', duration: '20 min' },
        { title: 'Disease Prevention Strategies', type: 'article', duration: '10 min' }
      ]
    },
    {
      id: 'sustainable-practices',
      title: 'Sustainable Farming Practices',
      icon: '♻️',
      description: 'Environmental conservation and sustainable agriculture',
      lessons: [
        { title: 'Climate-Smart Agriculture', type: 'video', duration: '28 min' },
        { title: 'Biodiversity Conservation', type: 'article', duration: '15 min' },
        { title: 'Carbon Sequestration in Soil', type: 'video', duration: '22 min' },
        { title: 'Sustainable Certification', type: 'quiz', duration: '8 min' }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Award className="w-4 h-4" />;
      case 'infographic': return <BookOpen className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'calculator': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-sky-blue';
      case 'article': return 'text-leaf-green';
      case 'quiz': return 'text-harvest-gold';
      case 'infographic': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Agricultural Education & Awareness
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn modern farming techniques, sustainable practices, and improve your agricultural knowledge
          </p>
        </div>

        {/* Learning Progress */}
        <div className="farmer-card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Learning Progress</h2>
            <span className="text-sm text-muted-foreground">3 of 6 modules completed</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{ width: '50%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>50% Complete</span>
            <span>12 hours learning time</span>
          </div>
        </div>

        {/* Education Modules */}
        <div className="space-y-6">
          {educationModules.map(module => (
            <div key={module.id} className="farmer-card">
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => toggleSection(module.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{module.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{module.title}</h3>
                    <p className="text-muted-foreground mt-1">{module.description}</p>
                  </div>
                </div>
                {openSections[module.id] ? (
                  <ChevronUp className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                )}
              </button>

              {openSections[module.id] && (
                <div className="mt-6 pl-16 space-y-3">
                  {module.lessons.map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={getTypeColor(lesson.type)}>
                          {getTypeIcon(lesson.type)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">{lesson.type} • {lesson.duration}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Access Tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Quick Learning Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="farmer-card text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">Mobile Learning</h3>
              <p className="text-sm text-muted-foreground mb-4">Access courses offline on your mobile</p>
              <Button variant="outline" size="sm">Download App</Button>
            </div>
            
            <div className="farmer-card text-center">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-semibold mb-2">Certificates</h3>
              <p className="text-sm text-muted-foreground mb-4">Earn certificates for completed courses</p>
              <Button variant="outline" size="sm">View Certificates</Button>
            </div>
            
            <div className="farmer-card text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground mb-4">Connect with other farmers</p>
              <Button variant="outline" size="sm">Join Community</Button>
            </div>
            
            <div className="farmer-card text-center">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold mb-2">Resource Library</h3>
              <p className="text-sm text-muted-foreground mb-4">Download farming guides and PDFs</p>
              <Button variant="outline" size="sm">Browse Library</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;