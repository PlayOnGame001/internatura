import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
      exclude: "**/*.svg",
    }),
   
  ],
});
