import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import rn from "vitest-react-native";

export default defineConfig({
  define: {
    ENV: JSON.stringify("development"),
  },
  plugins: [react(), rn()],
  build: {
    target: "esnext",
    minify: "esbuild",
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      formats: ["cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-native"],
    },
  },
  test: {
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
