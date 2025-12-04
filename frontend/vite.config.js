import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  preview: {
    allowedHosts: [
      "localhost",
      ".aroundthelucasworld.chickenkiller.com",
      "api.aroundthelucasworld.chickenkiller.com",
    ],
  },
});
