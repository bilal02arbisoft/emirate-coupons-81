import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add allowedHosts for Railway deployment
    allowedHosts: [
      "emirate-coupons-81-production-7dbb.up.railway.app",
      "discount-code.ae",
      "https://discount-code.netlify.app/",
      // You can also use a wildcard for all Railway hosts
      ".up.railway.app",
      // Allow localhost for development
      "localhost",
      "127.0.0.1"
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));