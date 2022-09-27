# EditableTable 可编辑表格

>可编辑表格和Table的用法基本相同，支持Input、Select、DatePicker、Checkbox、Radio等多种表单编辑。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 * desc: 最基本的用法，传入dataSource即可。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

const dataSource = [
  {
    key: "1",
    name: "zhangsan",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "lisi",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const columns: EditableTableColumns<any>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
          options: [
            {
              label: "张三",
              value: "zhangsan",
            },
            {
              label: "李四",
              value: "lisi",
            },
          ],
        },
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      valueType: "inputNumber",
    },
    {
      title: "住址",
      dataIndex: "address",
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={dataSource} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list);
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```

## API

### AntdTransfer

| 参数          | 说明                                                              | 类型                                                                         | 默认值 |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| idKey         | 穿梭框对应对应的key名称                                           | string                                                                       | key    |
| nameKey       | 穿梭框对应的title名称                                             | string                                                                       | title  |
| limitMaxCount | 限制上传个数                                                      | number                                                                       | 0      |
| dataSource    | 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 | Array<{}>                                                                    | [ ]    |
| value         | 穿梭框右侧的targetKeys                                            | string[]                                                                     | [ ]    |
| onChange      | 选项在两栏之间转移时的回调函数                                    | (targetKeys: string[], options: any[])=>void                                 |        |
| antdProps     | antd Transfer属性                                                 | [TransferProps](https://ant-design.antgroup.com/components/transfer-cn/#API) |        |