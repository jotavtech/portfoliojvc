import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this is a frontend-only project, we don't need any API routes
  // We'll just serve the static files directly
  
  const httpServer = createServer(app);

  return httpServer;
}
