import React from "react";
import { Form, Button, Table } from "antd";
import { useUpdate, useSetState } from "ahooks";
import { EditableTable, EditableTableColumns } from "../../../../../src";
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

const Editable = () => {
  const [form] = Form.useForm();
  const update = useUpdate();
  const [state, setState] = useSetState<any>({
    isedit: false,
    data: dataSource,
  });
  const { isedit, data } = state;
  const columns: EditableTableColumns<any>[] = [
    {
      title: "ID",
      dataIndex: "key",
      isHidden: true,
      key: "key",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      valueType: "select",
      formItemProps: {
        rules: [{ message: "请输入", required: true }],
      },
      antdComponentProps: {
        select: {
          // allowClear: false,
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
      key: "age",
      valueType: "inputNumber",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      isEditable: isedit,
      // isHidden: true,
    },
    {
      title: "时间",
      dataIndex: "time",
      valueType: "datePicker",
      isEditable: isedit,
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={data} />
      <Button
        type="primary"
        onClick={() => {
          const values = form.getFieldsValue();
          console.log(values);
        }}
      >
        打印
      </Button>
      <Button
        type="primary"
        onClick={() => {
          update();
        }}
      >
        强制更新
      </Button>
      <Button
        onClick={() => {
          setState({ isedit: !isedit });
        }}
      >
        切换
      </Button>
      <Button
        onClick={() => {
          setState({
            data: [
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
              {
                key: "3",
                name: "lisi",
                age: 22,
                address: "西湖区湖底公园1号",
              },
            ],
          });
        }}
      >
        重置
      </Button>
    </>
  );
};
export default Editable;
