---
title: 快速上手
order: 0
nav:
  title: 文档
  order: 0
---

# 快速开始

## 安装依赖

### 安装Antd

第一步：如果您还没安装antd，请先安装antd。如果您已经安装了antd，可以跳过这一步。


```bash
$ npm install antd --save
```
或者
```bash
$ yarn add antd
```

### 安装 @react-spy/antd

第二部：安装@react-spy/antd


```bash
$ npm install @react-spy/antd --save
```
或者
```bash
$ yarn add @react-spy/antd
```

## 体验组件

### 自定义上传按钮组件

```tsx
/**
 * title: 自定义上传按钮组件
 * transform: true
 * desc: 可以根据业务需要扩展组件。
 * defaultShowCode: true
 */
import React from 'react';
import { ButtonUpload } from "@react-spy/antd";
import "../components/AntdUpload.md.less";

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
