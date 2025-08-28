import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Star, Filter } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = ['all', 'Analytics', 'Content', 'Research', 'Automation', 'Communication'];

  const popularAgents = [
    {
      id: 'data-analyzer',
      name: 'Data Analyzer Pro',
      description: 'Advanced data analysis and insights generation from multiple sources',
      category: 'Analytics',
      popularity: 95,
      users: 12547,
      trending: true,
      rating: 9.2,
      reviewCount: 2847,
      capabilities: [
        'Statistical analysis and modeling',
        'Data visualization and reporting',
        'Trend identification and forecasting',
        'Automated insights generation'
      ]
    },
    {
      id: 'content-generator',
      name: 'Content Generator',
      description: 'Create high-quality content from your data and research',
      category: 'Content',
      popularity: 88,
      users: 8934,
      trending: false,
      rating: 8.7,
      reviewCount: 1923,
      capabilities: [
        'Article and blog post generation',
        'Social media content creation',
        'Technical documentation',
        'Marketing copy optimization'
      ]
    },
    {
      id: 'research-assistant',
      name: 'Research Assistant',
      description: 'Comprehensive research and information gathering from web sources',
      category: 'Research',
      popularity: 92,
      users: 15642,
      trending: true,
      rating: 9.1,
      reviewCount: 3456,
      capabilities: [
        'Web scraping and data collection',
        'Academic research assistance',
        'Market research and analysis',
        'Fact-checking and verification'
      ]
    },
    {
      id: 'email-classifier',
      name: 'Email Classifier',
      description: 'Intelligent email categorization and priority management',
      category: 'Automation',
      popularity: 76,
      users: 5421,
      trending: false,
      rating: 8.3,
      reviewCount: 876,
      capabilities: [
        'Email sentiment analysis',
        'Automated categorization',
        'Priority scoring',
        'Spam detection and filtering'
      ]
    },
    {
      id: 'meeting-summarizer',
      name: 'Meeting Summarizer',
      description: 'Extract key insights and action items from meeting recordings',
      category: 'Communication',
      popularity: 83,
      users: 7239,
      trending: false,
      rating: 8.9,
      reviewCount: 1564,
      capabilities: [
        'Audio/video transcription',
        'Key points extraction',
        'Action item identification',
        'Meeting minutes generation'
      ]
    },
    {
      id: 'trend-analyzer',
      name: 'Trend Analyzer',
      description: 'Identify and analyze trends across social media and news',
      category: 'Analytics',
      popularity: 79,
      users: 6158,
      trending: true,
      rating: 8.5,
      reviewCount: 1234,
      capabilities: [
        'Social media monitoring',
        'News sentiment analysis',
        'Trend forecasting',
        'Competitive intelligence'
      ]
    }
  ];

  const newAgents = [
    {
      id: 'ai-recruiter',
      name: 'AI Recruiter',
      description: 'Streamline recruitment with intelligent candidate screening',
      category: 'Automation',
      popularity: 65,
      users: 2847,
      trending: false,
      rating: 7.8,
      reviewCount: 542,
      capabilities: [
        'Resume parsing and analysis',
        'Candidate ranking',
        'Interview scheduling',
        'Skills assessment'
      ]
    },
    {
      id: 'code-reviewer',
      name: 'Code Reviewer',
      description: 'Automated code review and quality assessment',
      category: 'Analytics',
      popularity: 71,
      users: 3924,
      trending: false,
      rating: 8.6,
      reviewCount: 789,
      capabilities: [
        'Code quality analysis',
        'Security vulnerability detection',
        'Performance optimization suggestions',
        'Documentation generation'
      ]
    }
  ];

  const filteredAgents = [...popularAgents, ...newAgents].filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectAgent = (agentId: string) => {
    navigate(`/interact?agent=${agentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-24 px-4 text-center bg-gradient-hero border-b border-border"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Discover Powerful AI Agents
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your data into insights with our collection of specialized AI agents. 
            From analysis to automation, find the perfect agent for your needs.
          </p>
          
          {/* Hero Search */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for AI agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card/80 backdrop-blur border-border"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-12 space-y-12">
        {/* Popular Agents */}
        <section className="animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Popular Agents</h2>
            <Badge variant="secondary" className="ml-2">
              Most Used
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents
              .filter(agent => popularAgents.some(p => p.id === agent.id))
              .slice(0, 6)
              .map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onSelect={handleSelectAgent}
                />
              ))
            }
          </div>
        </section>

        {/* Trending Agents */}
        <section className="animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-success" />
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Badge className="bg-success/20 text-success ml-2">
              Hot
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents
              .filter(agent => agent.trending)
              .map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onSelect={handleSelectAgent}
                />
              ))
            }
          </div>
        </section>

        {/* New Agents */}
        <section className="animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <Filter className="h-6 w-6 text-info" />
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Badge variant="outline" className="ml-2">
              Recently Added
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents
              .filter(agent => newAgents.some(n => n.id === agent.id))
              .map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onSelect={handleSelectAgent}
                />
              ))
            }
          </div>
        </section>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No agents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;