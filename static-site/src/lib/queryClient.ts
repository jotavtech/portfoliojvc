import { QueryClient } from "@tanstack/react-query";

// Simplified query client for static site
// No API requests, fetch operations or backend communication needed
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
  },
});
