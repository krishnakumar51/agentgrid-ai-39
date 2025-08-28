import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Discovery from "./pages/Discovery";
import Dashboard from "./pages/Dashboard";
import MyAgents from "./pages/MyAgents";
import DataSources from "./pages/DataSources";
import AgentDetails from "./pages/AgentDetails";
import AgentInteraction from "./pages/AgentInteraction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Discovery />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agents" element={<MyAgents />} />
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/agent-details/:agentId" element={<AgentDetails />} />
            <Route path="/interact" element={<AgentInteraction />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;