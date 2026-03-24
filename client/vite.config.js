import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: "https://react-auth-kohl.vercel.app",
    proxy: {
      "/api": {
        target: "https://react-node-auth-backend-17y6.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
