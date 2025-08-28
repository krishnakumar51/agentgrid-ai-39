import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Activity, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Download,
  Settings,
  Database,
  AlertCircle,
  CheckCircle,
  Play,
  Pause
} from "lucide-react";

const AgentDetails = () => {
  const { agentId } = useParams();
  
  // Mock data - in real app this would be fetched based on agentId
  const agent = {
    id: agentId,
    name: "Data Analyzer Pro",
    type: "Analytics",
    description: "Advanced data analysis and insights generation with machine learning capabilities",
    status: "active",
    uptime: "99.2%",
    lastActivity: "2 minutes ago",
    createdDate: "2024-01-10",
    totalChats: 145,
    successRate: 96.3,
    avgResponseTime: "1.2s",
    dataProcessed: "2.4 GB"
  };

  const metrics = [
    {
      title: "Total Conversations",
      value: "145",
      change: "+12 this week",
      icon: MessageSquare,
      color: "text-primary"
    },
    {
      title: "Success Rate",
      value: "96.3%",
      change: "+2.1% this month",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s improvement",
      icon: Clock,
      color: "text-info"
    },
    {
      title: "Data Processed",
      value: "2.4 GB",
      change: "+400MB this week",
      icon: Database,
      color: "text-warning"
    }
  ];

  const chatHistory = [
    {
      id: "1",
      timestamp: "2024-01-15 14:30",
      duration: "5min 32s",
      messages: 8,
      status: "completed",
      topic: "Sales data analysis"
    },
    {
      id: "2",
      timestamp: "2024-01-15 10:15",
      duration: "3min 45s",
      messages: 6,
      status: "completed",
      topic: "Market trends review"
    },
    {
      id: "3",
      timestamp: "2024-01-14 16:20",
      duration: "8min 12s",
      messages: 12,
      status: "completed",
      topic: "Customer behavior insights"
    }
  ];

  const dataSources = [
    {
      id: "1",
      name: "Sales Database",
      type: "Database",
      status: "active",
      lastSync: "1 hour ago"
    },
    {
      id: "2",
      name: "Market Research Reports",
      type: "Documents",
      status: "active",
      lastSync: "3 hours ago"
    },
    {
      id: "3",
      name: "Customer Feedback CSV",
      type: "File",
      status: "active",
      lastSync: "1 day ago"
    }
  ];

  const logs = [
    {
      timestamp: "2024-01-15 14:32:15",
      level: "info",
      message: "Successfully processed user query about sales trends"
    },
    {
      timestamp: "2024-01-15 14:30:12",
      level: "info",
      message: "New chat session initiated"
    },
    {
      timestamp: "2024-01-15 10:18:45",
      level: "warning",
      message: "Data source sync took longer than expected (3.2s)"
    },
    {
      timestamp: "2024-01-15 10:15:23",
      level: "info",
      message: "Chat session completed successfully"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-success/20 text-success">Active</Badge>;
      case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info': return <CheckCircle className="h-4 w-4 text-info" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Bot className={`h-12 w-12 ${getStatusColor(agent.status)}`} />
            <div>
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              <p className="text-muted-foreground mt-1">{agent.description}</p>
              <div className="flex items-center gap-4 mt-3">
                {getStatusBadge(agent.status)}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  Last active {agent.lastActivity}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  {agent.uptime} uptime
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button className="shadow-glow">
              {agent.status === 'active' ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Agent
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Agent
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">Chat History</TabsTrigger>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Chat History</CardTitle>
                    <CardDescription>
                      Complete conversation history with this agent
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatHistory.map((chat) => (
                    <div key={chat.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50">
                      <div className="flex items-center gap-4">
                        <MessageSquare className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">{chat.topic}</h3>
                          <p className="text-sm text-muted-foreground">
                            {chat.messages} messages • {chat.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{chat.timestamp}</div>
                          <Badge className="bg-success/20 text-success">Completed</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Connected Data Sources</CardTitle>
                <CardDescription>
                  Data sources this agent has access to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50">
                      <div className="flex items-center gap-4">
                        <Database className="h-8 w-8 text-info" />
                        <div>
                          <h3 className="font-medium">{source.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {source.type} • Last sync {source.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success/20 text-success">Active</Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Detailed performance analytics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>Performance charts will be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>
                      Agent activity and system logs
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg bg-card/30">
                      {getLogIcon(log.level)}
                      <div className="flex-1">
                        <div className="text-sm">{log.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDetails;