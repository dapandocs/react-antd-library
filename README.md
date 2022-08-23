# react-antd-library

[![NPM version](https://img.shields.io/npm/v/react-antd-library.svg?style=flat)](https://npmjs.org/package/react-antd-library)
[![NPM downloads](http://img.shields.io/npm/dm/react-antd-library.svg?style=flat)](https://npmjs.org/package/react-antd-library)

## 📚 文档

- [文档地址](https://antd-react-spy.vercel.app/)

## ✨ 特性

- 基于 antd 封装，开箱即用
- 包含大量提炼业务组件
- 包含丰富的基础 demo 样式
- 使用 TypeScript 构建，提供完整的类型定义文件

## 📦 安装

```bash
$ npm install react-antd-library --save
```
或者
```bash
$ yarn add react-antd-library
```

## 🔨 简单使用

```tsx
/**
 * title: 伸缩侧边栏
 * transform: true
 */
import React from 'react';
import { SiderBar } from 'react-antd-library';

export default () => {
    const siderHtml = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                fontWeight: "bold",
                height: "100vh",
            }}>
            我是侧边栏，拖动中间线试试
        </div>
    );
    const contentHtml = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                fontWeight: "bold",
                height: "100vh",
            }}>
            我是内容栏
        </div>
    );
    return (
        <SiderBar
            isResizable
            siderRender={siderHtml}
            contentRender={contentHtml}
        />
    );
};
```