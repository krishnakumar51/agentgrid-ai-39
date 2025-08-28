import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Globe, 
  Video, 
  Search, 
  Filter,
  Download,
  Trash2,
  Calendar,
  Database,
  BarChart3,
  Upload
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DataSources = () => {
  const stats = [
    {
      title: "Total Data Sources",
      value: "24",
      change: "+3 this week",
      icon: Database,
      color: "text-primary"
    },
    {
      title: "Websites",
      value: "12",
      change: "50% of total",
      icon: Globe,
      color: "text-info"
    },
    {
      title: "Documents",
      value: "8",
      change: "33% of total",
      icon: FileText,
      color: "text-success"
    },
    {
      title: "Videos",
      value: "4",
      change: "17% of total",
      icon: Video,
      color: "text-warning"
    }
  ];

  const dataSources = [
    {
      id: "1",
      type: "Website",
      name: "TechCrunch AI News",
      url: "https://techcrunch.com/category/artificial-intelligence/",
      dateAdded: "2024-01-15",
      usedByAgents: ["Data Analyzer Pro", "Research Assistant"],
      status: "active",
      size: "2.4 MB"
    },
    {
      id: "2",
      type: "Document",
      name: "AI Research Paper.pdf",
      url: "research-paper.pdf",
      dateAdded: "2024-01-12",
      usedByAgents: ["Research Assistant"],
      status: "processed",
      size: "1.2 MB"
    },
    {
      id: "3",
      type: "Video",
      name: "AI Tutorial Series",
      url: "https://youtube.com/watch?v=example",
      dateAdded: "2024-01-10",
      usedByAgents: ["Content Generator"],
      status: "processing",
      size: "15.7 MB"
    },
    {
      id: "4",
      type: "Website",
      name: "OpenAI Documentation",
      url: "https://platform.openai.com/docs",
      dateAdded: "2024-01-08",
      usedByAgents: ["Data Analyzer Pro", "Content Generator"],
      status: "active",
      size: "5.1 MB"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Website': return <Globe className="h-4 w-4" />;
      case 'Document': return <FileText className="h-4 w-4" />;
      case 'Video': return <Video className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-success/20 text-success">Active</Badge>;
      case 'processed': return <Badge className="bg-info/20 text-info">Processed</Badge>;
      case 'processing': return <Badge className="bg-warning/20 text-warning">Processing</Badge>;
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
            <h1 className="text-3xl font-bold">Data Sources</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your data sources and their usage across agents
            </p>
          </div>
          <Button className="shadow-glow">
            <Upload className="h-4 w-4 mr-2" />
            Add Data Source
          </Button>
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

        {/* Data Sources Management */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Data Sources</CardTitle>
                <CardDescription>
                  Manage and organize your data sources
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search data sources..." 
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Used by Agents</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(source.type)}
                        <span>{source.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {source.url}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {source.usedByAgents.map((agent, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(source.dateAdded).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(source.status)}
                    </TableCell>
                    <TableCell>{source.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DataSources;