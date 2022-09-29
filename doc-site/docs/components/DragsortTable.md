# DragSortTable 拖动排序表格

>排序表格和Table的用法基本相同，支持行排序、列排序功能。

## 代码演示

### 行排序

```tsx
/**
 * title: 行排序
 * transform: true
 */
import React from "react";
import { DragOutlined } from "@ant-design/icons";
import { DragSortTable } from "react-antd-library";
const dataSource = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "西湖区湖底公园2号",
  },
  {
    key: "3",
    name: "王五",
    age: 22,
    address: "西湖区湖底公园3号",
  },
];

const columns = [
  {
    title: "排序",
    dataIndex: "sort",
    width: 80,
    render: () => <DragOutlined style={{ cursor: "move" }} />,
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
const SortTable = () => {
  return <DragSortTable dataSource={dataSource} columns={columns} />;
};
export default SortTable;
```

```tsx
/**
 * title: 行排序
 * transform: true
 */
import React from "react";
import { Button } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { DragSortTable } from "react-antd-library";

const dataSource = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "西湖区湖底公园2号",
  },
  {
    key: "3",
    name: "王五",
    age: 22,
    address: "西湖区湖底公园3号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "操作",
    width: 80,
    render: () => <Button icon={<DragOutlined style={{ cursor: "move" }} />} />,
  },
];
const SortTable = () => {
  return <DragSortTable dataSource={dataSource} columns={columns} />;
};
export default SortTable;
```

### 列排序

```tsx
/**
 * title: 列排序
 * transform: true
 */
import React from "react";
import { DragSortTable } from "react-antd-library";

const dataSource = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "西湖区湖底公园2号",
  },
  {
    key: "3",
    name: "王五",
    age: 22,
    address: "西湖区湖底公园3号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
const SortTable = () => {
  return (
    <DragSortTable dataSource={dataSource} columns={columns} mode="column" />
  );
};
export default SortTable;
```

## API

### DragSortTable

| 参数      | 说明                 | 类型                                                                                           | 默认值 |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| mode      | 行排序、列排序       | `row` \| `column`                                                                              | `row`  |
| dragProps | 排序参数             | [DragProps](https://react-spy.gitee.io/react-antd-library/components/dragsort-table#dragprops) | title  |
| onDragEnd | 拖动结束后的回调函数 | ( list: any[] ) => void                                                                          | -      |

其它参数请参考：[Antd Table](https://ant-design.antgroup.com/components/table-cn/#API)

### DragProps
```
{
    nodeSelector?: string;
    handleSelector?: string;
    ignoreSelector?: string;
    enableScroll?: boolean;
    scrollSpeed?: number;
    lineClassName?: string;
}
```