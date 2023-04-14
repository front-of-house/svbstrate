import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  define: {
    ENV: JSON.stringify("development"),
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    lib: {
      entry: [
        resolve(__dirname, "lib/index.ts"),
        resolve(__dirname, "lib/presets.ts"),
        resolve(__dirname, "lib/utils.ts"),
      ],
      formats: ["cjs"],
    },
  },
  test: {
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
