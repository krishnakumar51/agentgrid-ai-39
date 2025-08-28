import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, TrendingUp, Calendar, Play } from "lucide-react";
import { Link } from "react-router-dom";

const MyAgents = () => {
  // Mock data - in real app this would come from user's selected agents
  const userAgents = [
    {
      id: "1",
      name: "Data Analyzer Pro",
      type: "Analytics",
      status: "active",
      lastUsed: "2 hours ago",
      totalChats: 45,
      successRate: 96,
      description: "Advanced data analysis and insights generation"
    },
    {
      id: "2", 
      name: "Content Generator",
      type: "Creative",
      status: "inactive",
      lastUsed: "2 days ago",
      totalChats: 23,
      successRate: 92,
      description: "AI-powered content creation and writing assistance"
    },
    {
      id: "3",
      name: "Research Assistant",
      type: "Research",
      status: "active",
      lastUsed: "1 hour ago",
      totalChats: 78,
      successRate: 89,
      description: "Comprehensive research and information gathering"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-success/20 text-success">Active</Badge>;
      case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (userAgents.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Agents</h1>
              <p className="text-muted-foreground mt-1">
                Manage your selected AI agents
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <Bot className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No agents selected yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't selected any agents yet. Discover and choose agents that fit your needs.
            </p>
            <Link to="/">
              <Button className="shadow-glow">
                <Bot className="h-4 w-4 mr-2" />
                Discover Agents
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Agents</h1>
            <p className="text-muted-foreground mt-1">
              Manage your selected AI agents
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <Bot className="h-4 w-4 mr-2" />
              Discover More
            </Button>
          </Link>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAgents.map((agent) => (
            <Card key={agent.id} className="bg-gradient-card border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Bot className={`h-8 w-8 ${getStatusColor(agent.status)}`} />
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription>{agent.type}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.totalChats} chats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.successRate}% success</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last used {agent.lastUsed}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link to="/interact" className="flex-1">
                    <Button className="w-full shadow-glow">
                      <Play className="h-4 w-4 mr-2" />
                      Chat Now
                    </Button>
                  </Link>
                  <Link to={`/agent-details/${agent.id}`}>
                    <Button variant="outline" size="icon">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAgents;