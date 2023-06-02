const path = require("path");

const options = {
  sourcemap: true,
  logLevel: "info",
  bundle: true,
};

require("esbuild").buildSync({
  entryPoints: ["lib/index.ts"],
  format: "cjs",
  outfile: path.join(__dirname, "../dist/index.cjs.js"),
  ...options,
});

require("esbuild").buildSync({
  entryPoints: ["lib/index.ts"],
  format: "esm",
  outfile: path.join(__dirname, "../dist/index.esm.js"),
  ...options,
});
