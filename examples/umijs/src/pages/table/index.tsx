import React from "react";
import { EditableTable, EditableTableColumns } from "../../../../../src";
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns: EditableTableColumns<any>[] = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    valueType: "select",
    antdComponentProps: {
      select: {
        allowClear:false,
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
  },
];
const Editable = () => {
  return (
    <EditableTable rowKey="key" columns={columns} dataSource={dataSource} />
  );
};
export default Editable;
