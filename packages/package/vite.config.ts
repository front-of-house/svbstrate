import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  define: {
    ENV: JSON.stringify("development"),
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["cjs"],
    },
  },
  test: {
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
