---
title: 快速上手
order: 0
nav:
  title: 文档
  order: 0
---

# @react-spy/antd

[![NPM version](https://img.shields.io/npm/v/@react-spy/antd.svg?style=flat)](https://npmjs.org/package/@react-spy/antd)
[![NPM downloads](http://img.shields.io/npm/dm/@react-spy/antd.svg?style=flat)](https://npmjs.org/package/@react-spy/antd)

## 📚 文档

- [文档地址](https://antd-react-spy.vercel.app/)

## ✨ 特性

- 基于 antd 封装，开箱即用
- 包含大量提炼业务组件
- 包含丰富的基础 demo 样式
- 使用 TypeScript 构建，提供完整的类型定义文件

## 📦 安装

```bash
$ npm install @react-spy/antd --save
```
或者
```bash
$ yarn add @react-spy/antd
```

## 🔨 简单使用

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
