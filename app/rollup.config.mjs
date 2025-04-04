import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
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
    commonjs(),
    json(),
    terser(),
    copy({
      targets: [
        {
          src: "public",
          dest: "dist/",
        },
      ],
    }),
  ],
};
