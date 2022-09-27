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

interface RecordItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const [isHidden, setIsHidden] = React.useState(false);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "ID",
      dataIndex: "key",
      width: 200,
      isHidden,
    },
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
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="dashed" onClick={() => setIsHidden(!isHidden)}>
          列隐藏切换
        </Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;