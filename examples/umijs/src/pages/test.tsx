import React from "react";
import { Form, Button, Space, Select } from "antd";
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
  const [userInfo, setUserInfo] = React.useState({});
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
          allowClear: true,
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
      align: "center",
    },
  ];

  const getColumns = React.useMemo(() => columns, []);
  
  return (
    <>
      <Form form={form}>
        <Form.Item label="班级" name="className" initialValue="一年级">
          <Select placeholder="请选择">
            <Select.Option key="1" value="一年级">
              一年级
            </Select.Option>
            <Select.Option key="2" value="二年级">
              二年级
            </Select.Option>
            <Select.Option key="3" value="三年级">
              三年级
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <EditableTable
        form={form}
        columns={getColumns}
        dataSource={dataSource}
        listName="userList"
      />
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={async () => {
            const values = await form.validateFields();
            const { userList } = values;
            if (Array.isArray(userList)) {
              Object.assign(values, {
                userList: userList.filter((i: RecordItem) => !!i),
              });
            }
            setUserInfo(values);
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
