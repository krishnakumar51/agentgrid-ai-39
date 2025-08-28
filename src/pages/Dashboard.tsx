import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Activity, 
  Users, 
  TrendingUp, 
  Clock, 
  Play, 
  Pause, 
  Trash2,
  MessageSquare,
  BarChart3 
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Agents",
      value: "12",
      change: "+3 from last week",
      icon: Bot,
      color: "text-primary"
    },
    {
      title: "Total Interactions",
      value: "2,847",
      change: "+15% from last month",
      icon: MessageSquare,
      color: "text-success"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1% improvement",
      icon: TrendingUp,
      color: "text-info"
    },
    {
      title: "Avg Response Time",
      value: "1.3s",
      change: "-0.2s faster",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const recentAgents = [
    {
      id: "1",
      name: "Data Analyzer Pro",
      status: "running",
      lastActivity: "2 minutes ago",
      interactions: 45,
      successRate: 96
    },
    {
      id: "2", 
      name: "Content Generator",
      status: "idle",
      lastActivity: "1 hour ago",
      interactions: 23,
      successRate: 92
    },
    {
      id: "3",
      name: "Research Assistant",
      status: "running",
      lastActivity: "5 minutes ago", 
      interactions: 78,
      successRate: 89
    },
    {
      id: "4",
      name: "Email Classifier",
      status: "error",
      lastActivity: "30 minutes ago",
      interactions: 12,
      successRate: 85
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-success';
      case 'idle': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return <Badge className="bg-success/20 text-success">Running</Badge>;
      case 'idle': return <Badge variant="secondary">Idle</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage your AI agents
            </p>
          </div>
          <Link to="/agents/new">
            <Button className="shadow-glow">
              <Bot className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Agents */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Agents</CardTitle>
                <CardDescription>
                  Your most recently active AI agents
                </CardDescription>
              </div>
              <Link to="/agents">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAgents.map((agent) => (
              <div 
                key={agent.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Bot className={`h-8 w-8 ${getStatusColor(agent.status)}`} />
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last active {agent.lastActivity}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {agent.interactions} interactions
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {agent.successRate}% success rate
                    </div>
                  </div>
                  
                  {getStatusBadge(agent.status)}
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {agent.status === 'running' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;