import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";

export default {
  input: "index.js",
  output: {
    file: "./dist/main.js",
    format: "cjs",
  },

  plugins: [
    del({
      targets: "dist/*",
    }),
    nodeResolve(),
    commonjs(),
    json(),
    terser(),
    copy({
      targets: [
        {
          src: "client/build/**/*",
          dest: "dist/public",
        },
      ],
    }),
  ],
};
