import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: "es"
  },
  cjs: {
    output: "lib"
  },
  extraBabelPlugins: [
    [
      "import",
      { "libraryName": "antd", "libraryDirectory": "es", "style": true },
      // @ts-ignore
      "antd"
    ],
  ]
});
