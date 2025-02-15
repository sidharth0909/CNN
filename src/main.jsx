import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Import React Query
import App from "./App.jsx";
import "./index.css";

// ✅ Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>  {/* ✅ Wrap App with QueryClientProvider */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
