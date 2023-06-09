const path = require("path");

const options = {
  entryPoints: ["lib/index.tsx"],
  sourcemap: true,
  logLevel: "info",
  bundle: true,
  external: ["react", "react-native"],
};

require("esbuild").buildSync({
  format: "cjs",
  outfile: path.join(__dirname, "../dist/index.cjs.js"),
  ...options,
});

require("esbuild").buildSync({
  format: "esm",
  outfile: path.join(__dirname, "../dist/index.esm.js"),
  ...options,
});
