import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
