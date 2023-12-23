const babel = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const replace = require("@rollup/plugin-replace");
const css = require("rollup-plugin-import-css");
const json = require("@rollup/plugin-json");

module.exports = {
  input: "./src/Modals/index.js",
  output: {
    dir: "build",
    format: "iife",
    globals: {
      react: "React",
    }
  },
  external: ["react", "react-dom"],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    babel({
      exclude: 'node_modules',
      presets: ["@babel/preset-react", {}]
    }),
    commonjs(),
      json(),
    css(),
  ]
};
