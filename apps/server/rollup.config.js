import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    json(),
    typescript({ tsconfig: "./tsconfig.json" }), // Must be included
  ],
};
