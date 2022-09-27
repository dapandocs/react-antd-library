import React from "react";
import { Table } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { DragSortTable } from "react-antd-library";
// import { DragSortTable } from "../../../../../src";
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
  {
    key: "3",
    name: "胡彦祖2",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "排序",
    dataIndex: "sort",
    render: () => <DragOutlined />,
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
  return (
    <div style={{ margin: 20 }}>
      <DragSortTable dataSource={dataSource} columns={columns} mode="column" />
    </div>
  );
};
export default SortTable;
