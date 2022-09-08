import { defineConfig } from '@umijs/max';
export default defineConfig({
  npmClient: 'yarn',
  antd: {},
  devtool: "source-map",
  mfsu: false,
  proxy: {
    '/xg_api': {
      target: 'http://47.104.187.0/',
      changeOrigin: true,
      pathRewrite: {
        '^/xg_api': '/xg_api',
      },
    },
  },
});
