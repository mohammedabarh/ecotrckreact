import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // This line is crucial for handling base paths correctly
  // For local development (mode === 'development'), the base is '/'
  // For production build (mode === 'production'), the base is '/ecotrckreact/'
  base: mode === 'production' ? '/ecotrckreact/' : '/',

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add this build configuration to change the output directory
  build: {
    outDir: 'build', // <--- This line changes the output directory from 'dist' to 'build'
  },
}));