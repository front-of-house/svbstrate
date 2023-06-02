const path = require("path");

const options = {
  entryPoints: ["lib/index.ts", "lib/presets.ts", "lib/utils.ts"],
  sourcemap: true,
  logLevel: "info",
  bundle: true,
  minify: true,
  outdir: path.join(__dirname, "../dist"),
};

require("esbuild").buildSync({
  format: "cjs",
  entryNames: "[dir]/[name].cjs",
  ...options,
});

require("esbuild").buildSync({
  format: "esm",
  entryNames: "[dir]/[name].esm",
  ...options,
});
