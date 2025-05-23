import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

// Site totalmente estático - removidas referências a QueryClient

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <Toaster />
    <App />
  </TooltipProvider>
);
