import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return {
    plugins: [react()],
    esbuild: {
      loader: "tsx",
      include: /src\/.*\.tsx?$/,
      exclude: [],
    },
    logLevel: "info",
    build: {
      outDir: "build",
    },
    cacheDir: ".vite",
    define: {
      "process.env": process.env,
    },
  };
});
