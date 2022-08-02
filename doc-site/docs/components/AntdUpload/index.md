---
  title: AntdUpload 上传
  order: 0
  nav:
     title: 组件
     path: /components/antd-upload
---

# AntdUpload 上传

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
import { ButtonUpload } from "@react-spy/antd";

export default () => {
  return (
    <ButtonUpload />
  );
};
```

### 更改按钮组件[Button]属性

```tsx
/**
 * title: 更改按钮组件属性
 * transform: true
 * desc: 可以使用Antd Button组件的所有属性。
 */
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonUpload } from "@react-spy/antd";

export default () => {
  return (
    <ButtonUpload
        antdButtonProps={{
          children: <span><UploadOutlined /> 上传附件</span>,
          type: "primary"
        }}
    />
  );
};
```

### 更改上传组件[Upload]属性

```tsx
/**
 * title: 更改上传属性
 * transform: true
 * desc: 可以使用Antd Upload组件的所有属性。
 */
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonUpload } from "@react-spy/antd";

export default () => {
  return (
    <ButtonUpload
        antdUploadProps={{
            listType: "text", 
            showUploadList: {
              showDownloadIcon: false,
              showRemoveIcon: false,
            },     
       }}
    />
  );
};
```

### 自定义上传按钮组件

```tsx
/**
 * title: 自定义上传按钮组件
 * transform: true
 * desc: 可以根据业务需要扩展组件。
 */
import React from 'react';
import { ButtonUpload } from "@react-spy/antd";
import "./index.md.less";

export default () => {
  return (
    <ButtonUpload
       uploadButtonRender={
          <div className='button'>
              <div className="button__content">Hover me and Click me</div>
          </div>
       }
    />
  );
};
```

## API

### ArrayCards

| 参数       | 说明           | 类型                         | 默认值 |
| ---------- | -------------- | ---------------------------- | ------ |
| url        | 跳转地址       | string                       |        |
| width      | 窗口宽度       | number                       |        |
| height     | 窗口高度       | number                       |        |
| target     | 打开窗口的方式 | _blank、_self、_parent、_top | _blank |
| name       | 窗口名称       | string                       |        |
| otherSpecs | 其他参数       | OtherSpecs                   |        |

### OtherSpecs

| 参数        | 说明                     | 类型                        | 默认值 |
| ----------- | ------------------------ | --------------------------- | ------ |
| channelmode | 设置与当前窗口的通道模式 | "0" 、 "1" 、 "yes" 、 "no" | "0"    |
| directories | 设置与当前窗口的目录     | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| fullscreen  | 设置与当前窗口的全屏模式 | "0" 、 "1" 、 "yes" 、 "no" | "0"    |
| width       | 设置与当前窗口的宽度     | string                      |        |
| height      | 设置与当前窗口的高度     | string                      |        |
| top         | 设置与当前窗口的顶部位置 | string                      |        |
| left        | 设置与当前窗口的左边位置 | string                      |        |
| location    | 设置与当前窗口的地址     | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| menubar     | 设置与当前窗口的菜单栏   | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| resizable   | 设置与当前窗口的大小     | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| scrollbars  | 设置与当前窗口的滚动条   | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| status      | 设置与当前窗口的状态栏   | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| titlebar    | 设置与当前窗口的标题栏   | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
| toolbar     | 设置与当前窗口的工具栏   | "0" 、 "1" 、 "yes" 、 "no" | "1"    |
