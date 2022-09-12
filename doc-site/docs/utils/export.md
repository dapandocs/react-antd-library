---
  title: exportUtils 导出工具函数
  nav:
    title: 工具函数
    order: 0
---

# exportUtils 导出工具函数

> 上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

## 代码演示

### 按钮上传

```tsx
/**
 * title: 按钮上传
 * transform: true
 * desc: 经典款式，用户点击按钮弹出文件选择框。
 */
import React from 'react';
import { ButtonUpload } from "react-antd-library";

export default () => {
  return (
    <ButtonUpload />
  );
};
```

## API

### ButtonUpload

| 参数               | 说明                 | 类型                                                                     | 默认值 |
| ------------------ | -------------------- | ------------------------------------------------------------------------ | ------ |
| acceptUploadType   | 限制上传格式         | string[]                                                                 | [ ]    |
| value              | 附件列表             | Array<{}>                                                                | [ ]    |
| limitMaxCount      | 限制上传个数         | number                                                                   | 0      |
| limitMaxSize       | 限制上传单个文件大小 | number                                                                   | 0      |
| isShowUploadEntry  | 是否显示上传入口     | boolean                                                                  | true   |
| uploadButtonRender | 自定义上传按钮       | ReactNode                                                                |        |
| antdButtonProps    | antd Button属性      | [ButtonProps](https://ant-design.antgroup.com/components/button-cn/#API) |        |
| antdUploadProps    | antd Upload属性      | [UploadProps](https://ant-design.antgroup.com/components/upload-cn/#API) |        |
| onChange           | 附件发生改变后的回调 | (file: fileList) => void                                                 |        |
