---
  title: exportUtils 导出相关
  nav:
    title: 工具函数
    order: 3
---

# exportUtils 导出相关

> exportUtils是将下载附件、前端导出Excel等功能集成的工具函数。

## 代码演示

### exportUtils.downloadFile

```tsx | pure
/**
 * title: 下载附件
 * transform: true
 * desc: 调用文件流接口，下载相应格式附件。
 */
import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const [downloading, setDownloading] = useState(false);
    const hanldeDownloadUser = () => {
        exportUtils.downloadFile({
            url: "/api/user/downloadUser",
            method: "post",
            data: {
                sex: 'male'
            },
            headers: {
                Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiYmIyYmMyNGIy"
            },
            callback: (loading) => {
                setDownloading(loading)
            },
            fileName: "用户列表.xlsx"
        });
    }
    return (
        <Spin spinning={downloading} tip="附件下载中...">
            <Button onClick={hanldeDownloadUser}>下载附件</Button>
        </Spin>
    );
};
export default exportUser;
```

## API

### downloadFile

| 参数               | 说明                 | 类型                                                                     | 默认值 |
| ------------------ | -------------------- | ------------------------------------------------------------------------ | ------ |
| url   |  接口url         | string[]                                                                 |     |
| method              |     请求方式         | `get` \| `post`                                                                | `get`    |
| data      | url 请求参数         | object                                                                   |      |
| headers       | 请求头 | object                                                                   | { }      |
| fileName  | 文件名称,包含文件后缀；如果后端返回头中content-disposition含有文件名，该字段可不传     | string                                                                  |   |
| callback           | 在附件下载前和下载完成后各调用一次 | ( downloading:boolean ) => void                                                 |        |
