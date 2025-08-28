import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Users, TrendingUp, Zap, Star } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    category: string;
    popularity: number;
    users: number;
    trending?: boolean;
    rating?: number;
    reviewCount?: number;
    capabilities: string[];
  };
  onSelect: (agentId: string) => void;
}

const AgentCard = ({ agent, onSelect }: AgentCardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border-border bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              {agent.trending && (
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <CardDescription className="text-muted-foreground">
              {agent.description}
            </CardDescription>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-60 hover:opacity-100"
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <div className="space-y-2">
                  <p className="font-medium">Capabilities:</p>
                  <ul className="text-sm space-y-1">
                    {agent.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-primary" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{agent.users.toLocaleString()} users</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {agent.category}
          </Badge>
        </div>
        
        {/* Rating */}
        {agent.rating && agent.reviewCount && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{agent.rating}/10</span>
            </div>
            <span className="text-muted-foreground">
              ({agent.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onSelect(agent.id)}
          className="w-full group-hover:shadow-glow transition-all duration-300"
        >
          Select Agent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;