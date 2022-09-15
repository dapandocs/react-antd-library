# importUtils 导入相关

> importUtils目前提供解析Excel文件数据的功能。

## 代码演示

### importUtils.excelToJson

```tsx | pure

注:使用jsonToExcel前,请先安装 xlsx-js-style

yarn add xlsx-js-style
或
npm install xlsx-js-style --save

```

```tsx
/**
 * title: 解析Excel文件数据
 * transform: true
 * desc: 前端解析Excel文件数据。
 */
import React, { useState } from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils, importUtils, ButtonUpload } from 'react-antd-library';

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

const exportUser = () => {

    const [jsonData, setJsonData] = useState<any>([]);

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
                导出Excel模板
            </Button>
            <ButtonUpload
                antdUploadProps={{
                    maxCount: 1
                }}
                antdButtonProps={{
                    children: "导入Excel模板",
                }}
                onChange={(files: any[]) => {
                    importUtils.excelToJson(XLSX, {
                        columns,
                        file: files[0],
                        onLoadEnd: (jData) => {
                            setJsonData(jData);
                        }
                    });
                }}
            />
            {
                Array.isArray(jsonData) && jsonData.length ?
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre> : null
            }
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;
```

## API

### excelToJson

| 参数       | 说明                                      | 类型                                                     | 默认值                                 |
| ---------- | ----------------------------------------- | -------------------------------------------------------- | -------------------------------------- |
| file       | 文件                                      | File                                                     |                                        |
| columns    | 表格表头，可将antd table的columns传入即可 | Array<{title: string;dataIndex: string;[k:string]: any;> |                                        |
| fieldNames | 自定义节点 title、dataIndex 的字段        | object                                                   | { title: title, dataIndex: dataIndex } |
| onLoadEnd  | 文件加载完成时的回调函数                  | (jsonData: any[]) => void                                |                                        |

