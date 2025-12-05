import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Characters from "@/pages/characters";
import Npcs from "@/pages/npcs";
import Journal from "@/pages/journal";
import { CampaignProvider } from "./context/CampaignContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/characters" component={Characters} />
      <Route path="/npcs" component={Npcs} />
      <Route path="/journal" component={Journal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CampaignProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CampaignProvider>
    </QueryClientProvider>
  );
}

export default App;
