const path = require("path");

require("esbuild").buildSync({
  entryPoints: ["lib/index.tsx"],
  outdir: path.join(__dirname, "../dist"),
  bundle: true,
  platform: "node",
  target: "es2015",
  minify: true,
  sourcemap: true,
  logLevel: "info",
  external: ["react", "react-native"],
});
