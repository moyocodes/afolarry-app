import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import VitePluginSitemap from "vite-plugin-sitemap";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === "build"
      ? [
          VitePluginSitemap({
            hostname: "https://afolaray.com",
            dynamicRoutes: [
              "/",
              "/cars",
              "/schedules",
              "/solutions",
              "/tracking",
              "/contact",
            ],
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));