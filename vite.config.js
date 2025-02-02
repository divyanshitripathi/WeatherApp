import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/WeatherApp/",
  server: {
    cors: true,
    host: true, // Allows external access
    strictPort: true,
    allowedHosts: [".csb.app", "5vnqst-5173.csb.app"], // Allow CodeSandbox hosts
  },
});
