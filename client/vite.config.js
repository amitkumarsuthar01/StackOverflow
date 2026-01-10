import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
  server: {
    open: true,
    host: true,
    proxy: {
      "/api": {
        // target: "http://localhost:3000",
        target: "https://stackoverflow-production-d987.up.railway.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

