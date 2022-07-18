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
    [
      "import",
      { "libraryName": "ahooks", "libraryDirectory": "es", "style": true },
      // @ts-ignore
      "ahooks"
    ],
    [
      "import",
      { "libraryName": "lodash", "libraryDirectory": "fp", "style": true },
      // @ts-ignore
      "lodash"
    ]
  ]
});
