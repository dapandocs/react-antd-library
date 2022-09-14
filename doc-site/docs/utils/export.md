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

### exportUtils.jsonToExcel

```tsx | pure

注:使用jsonToExcel前,请先安装 xlsx-js-style

yarn add xlsx-js-style
或
npm install xlsx-js-style --save

```

#### 基本用法

```tsx
/**
 * title: 导出Excel
 * transform: true
 * desc: 前端生成Excel表格。
 */
import React from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const downloadExcel = () => {
        exportUtils.jsonToExcel(XLSX, {
            columns,
            data: dataSource,
            fileName: "用户列表",
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;
```

#### 含有文件名称

```tsx
/**
 * title: 导出Excel
 * transform: true
 * desc: 生成Excel表格，含有文件名称。
 */
import React from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const downloadExcel = () => {
        exportUtils.jsonToExcel(XLSX, {
            columns,
            data: dataSource,
            fileName: "用户列表",
            isHasExcelTitle: true,
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel（含文件名称）
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;
```

#### 隐藏表头

```tsx
/**
 * title: 导出Excel
 * transform: true
 * desc: 生成的Excel表格，隐藏表头。
 */
import React from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const downloadExcel = () => {
        exportUtils.jsonToExcel(XLSX, {
            columns,
            data: dataSource,
            fileName: "用户列表",
            isHasColumnTitle: false,
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel(只要数据，隐藏表头)
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;
```

#### 最小列宽

```tsx
/**
 * title: 导出Excel
 * transform: true
 * desc: 可通过minColWidth设置最小列宽，默认自动计算列宽。
 */
import React from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const downloadExcel = () => {
        exportUtils.jsonToExcel(XLSX, {
            columns,
            data: dataSource,
            fileName: "用户列表",
            minColWidth: 40,
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel(设置最小列宽)
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;
```

#### 设置样式

```tsx
/**
 * title: 导出Excel
 * transform: true
 * desc: 根据业务需要，可设置表格样式。
 */
import React from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const downloadExcel = () => {
        exportUtils.jsonToExcel(XLSX, {
            columns,
            data: dataSource,
            fileName: "用户列表",
            minColWidth: 40,
            isHasExcelTitle: true,
            renderExcelTitleStyle: (v: string) => {
                // 设置标题样式
                return {
                    v,
                    s: {
                        alignment: { horizontal: "center" },
                        font: {
                            bold: true, // 加粗
                            sz: 12, // 字号14
                            color: {
                                rgb: 'f81d22' // 字体颜色
                            }
                        },
                        fill: {
                            fgColor: {
                                rgb: 'e2e2e2'
                            },
                        }
                    },
                }
            },
            renderColumnTitleStyle: (v: string) => {
                // 设置表头样式
                return {
                    v,
                    s: {
                        alignment: { horizontal: "center" },
                        font: {
                            bold: true, // 加粗
                            sz: 12, // 字号14
                            color: {
                                rgb: 'ad2102' // 字体颜色
                            }
                        },
                        fill: {
                            fgColor: {
                                rgb: 'ffffb8'
                            },
                            underline: true,
                        },
                        border: {
                            top: { style: 'dashDotDot', color: { rgb: '4b0082' } },
                            right: { style: 'thick', color: { rgb: '4b0082' } },
                            bottom: { style: 'thick', color: { rgb: '4b0082' } },
                            left: { style: 'thick', color: { rgb: '4b0082' } }
                        }
                    },
                }
            },
            renderCellStyle: (v: string, rowIndex: number, colIndex: number) => {
                // 设置数据单元格样式
                return {
                    v,
                    s: {
                        alignment: { horizontal: colIndex % 2 === 0 ? "left" : "right" },
                        font: {
                            color: {
                                rgb: '000000' // 字体颜色
                            }
                        },
                        fill: {
                            fgColor: {
                                rgb: colIndex % 2 === 0 ? "69c0ff" : "8c8c8c"
                            },
                        },
                        border: {
                            top: { style: 'thin', color: { rgb: '1890ff' } },
                            right: { style: 'thin', color: { rgb: '1890ff' } },
                            bottom: { style: 'thin', color: { rgb: '1890ff' } },
                            left: { style: 'thin', color: { rgb: '1890ff' } }
                        }
                    },
                }
            },
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel(设置样式)
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;
```

## API

### downloadFile

| 参数     | 说明                                                                               | 类型                            | 默认值 |
| -------- | ---------------------------------------------------------------------------------- | ------------------------------- | ------ |
| url      | 接口url                                                                            | string                          |        |
| method   | 请求方式                                                                           | `get` \| `post`                 | `get`  |
| data     | url 请求参数                                                                       | object                          |        |
| headers  | 请求头                                                                             | object                          | { }    |
| fileName | 文件名称,包含文件后缀；如果后端返回头中content-disposition含有文件名，该字段可不传 | string                          |        |
| callback | 在附件下载前和下载完成后各调用一次                                                 | ( downloading:boolean ) => void |        |

### jsonToExcel

| 参数                   | 说明                                      | 类型                                                                                           | 默认值                                 |
| ---------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| fileName               | 文件名称                                  | string                                                                                         |                                        |
| columns                | 表格表头，可将antd table的columns传入即可 | Array<{title: string;dataIndex: string;[k:string]: any;>                                       |                                        |
| data                   | 表格数据                                  | object[]                                                                                       |                                        |
| minColWidth            | 最小列宽,默认两个汉字宽度                 | number                                                                                         | 4                                      |
| isHasExcelTitle        | 表格是否含有标题                          | boolean                                                                                        | false                                  |
| isHasColumnTitle       | 表格是否含有表头                          | boolean                                                                                        | true                                   |
| fieldNames             | 自定义节点 title、dataIndex 的字段        | object                                                                                         | { title: title, dataIndex: dataIndex } |
| renderExcelTitleStyle  | 自定义表格标题内容样式                    | (cellValue: string) => string \| { [k: string]: any }                                          |                                        |
| renderColumnTitleStyle | 自定义表格表头内容样式                    | (cellValue: string, colIndex: number) => string \| { [k: string]: any }                        |                                        |
| renderCellStyle        | 自定义表格数据单元格内容样式              | (cellValue: string, rowIndex: number, colIndex: number) => string      \| { [k: string]: any } |                                        |
