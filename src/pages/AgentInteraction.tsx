import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { 
  Send, 
  Paperclip, 
  Globe, 
  Video, 
  FileText, 
  Bot,
  User,
  Loader2,
  Star,
  MessageSquare
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface Message {
  id: string;
  role: 'user' | 'ai_agent';
  type: 'text' | 'multiple_choice';
  content: string | Array<{name: string; context: string}>;
  timestamp: Date;
}

const AgentInteraction = () => {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get('agent') || 'data-analyzer';
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agentInfo = {
    'data-analyzer': {
      name: 'Data Analyzer Pro',
      description: 'Advanced data analysis and insights generation',
      category: 'Analytics'
    },
    'content-generator': {
      name: 'Content Generator',
      description: 'Create high-quality content from your data',
      category: 'Content'
    },
    'research-assistant': {
      name: 'Research Assistant',
      description: 'Comprehensive research and information gathering',
      category: 'Research'
    }
  };

  const currentAgent = agentInfo[agentId as keyof typeof agentInfo] || agentInfo['data-analyzer'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response with MCQ
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai_agent',
        type: 'multiple_choice',
        content: [
          {
            name: 'Analyze trends and patterns',
            context: 'I can identify key trends, patterns, and correlations in your data to provide actionable insights.'
          },
          {
            name: 'Generate detailed report',
            context: 'I can create a comprehensive report with visualizations and recommendations based on your data.'
          },
          {
            name: 'Export processed data',
            context: 'I can clean, process, and export your data in various formats for further use.'
          }
        ],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleChoiceSelect = (choice: {name: string; context: string}) => {
    const userChoice: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: `Selected: ${choice.name}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userChoice]);
    
    // Simulate follow-up response
    setIsLoading(true);
    setTimeout(() => {
      const followUp: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai_agent',
        type: 'text',
        content: `Great choice! I'll ${choice.name.toLowerCase()}. ${choice.context} Please provide any specific requirements or preferences you have.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, followUp]);
      setIsLoading(false);
    }, 1500);
  };

  const handleAddWebsite = () => {
    if (websiteUrl.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        role: 'user',
        type: 'text',
        content: `Added website: ${websiteUrl}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setWebsiteUrl('');
    }
  };

  const handleAddVideo = () => {
    if (videoUrl.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        role: 'user',
        type: 'text',
        content: `Added video: ${videoUrl}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setVideoUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Agent Header */}
        <Card className="mb-6 bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bot className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-xl">{currentAgent.name}</CardTitle>
                <p className="text-muted-foreground">{currentAgent.description}</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {currentAgent.category}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Agent Interaction */}
          <div className="lg:col-span-3">
            <Card className="h-[800px] flex flex-col bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Agent Interaction</CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation with {currentAgent.name}</p>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'ai_agent' && (
                      <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'text' ? (
                        <p>{message.content as string}</p>
                      ) : (
                        <div className="space-y-2">
                          <p className="font-medium mb-3">Choose an option:</p>
                          {(message.content as Array<{name: string; context: string}>).map((choice, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start text-left h-auto p-3"
                              onClick={() => handleChoiceSelect(choice)}
                            >
                              <div>
                                <div className="font-medium">{choice.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {choice.context}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <User className="h-8 w-8 text-muted-foreground flex-shrink-0 mt-1" />
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>
              
              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message or instructions..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[40px] max-h-[120px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="self-end"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Data Sources Input */}
            <Card className="bg-gradient-card border-border flex-1">
              <CardHeader>
                <CardTitle className="text-lg">Add Data Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Website Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                    <Button onClick={handleAddWebsite} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Video Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    <Button onClick={handleAddVideo} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Files
                  </label>
                  <Button variant="outline" className="w-full">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
                
                {/* Submit Button */}
                <Button className="w-full mt-4">
                  Process Data Sources
                </Button>
              </CardContent>
            </Card>

            {/* Agent Rating Card */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Rate This Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="font-medium mb-2">{currentAgent.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    How would you rate your experience with this agent?
                  </p>
                  
                  {/* Star Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button key={rating} className="group">
                        <Star className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                  
                  <Textarea 
                    placeholder="Share your feedback about this agent..."
                    className="min-h-[80px] mb-4"
                  />
                  
                  <Button className="w-full">
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInteraction;