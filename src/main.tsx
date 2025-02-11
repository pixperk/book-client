import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/userContext.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster/>
      </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  
  </StrictMode>
);
