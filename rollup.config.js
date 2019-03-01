/**
 * Created by yee.wang on 2019-03-01
 **/
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";

export default {
  input: "./index.ts",
  external: ["axios", "@vmojs/*"],
  output: {
    file: "bundle/index.js",
    format: "cjs"
  },
  plugins: [typescript(), babel()]
};
