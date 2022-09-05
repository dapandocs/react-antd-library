import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Ant Design Library',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    // 配置按需 antd
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  dynamicImport: {},
  publicPath: process.env.NODE_ENV === 'production' ? '/react-antd-library/' : '/',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/react-spy/antd',
    },
  ],
  menus: {
    "/components": [
      {
        title: "基础组件",
        children: [
          {
            title: "AntdUpload 上传",
            path: "/components/antd-upload",
          },
          {
            title: "AntdTransfer 穿梭框",
            path: "/components/antd-transfer",
          },
          {
            title: "AntdModal 对话框",
            path: "/components/antd-modal",
          },
        ]
      },
      {
        title: "扩展组件",
        children: [
          {
            title: "PreviewText 表单阅读态",
            path: "/components/preview-text",
          },
          {
            title: "EllipsisText 文本省略",
            path: "/components/ellipsis-text",
          },
          {
            title: "SiderBar 伸缩侧边栏",
            path: "/components/sider-bar",
          },
        ]
      },
      {
        title: "组合组件",
        children: [
          {
            title: "SelectTransferModal 弹框式选择器",
            path: "/components/select-transfer-modal",
          },
          {
            title: "ButtonTransferModal 弹框式选择器",
            path: "/components/button-transfer-modal",
          },
        ]
      },
    ]
  }
});
