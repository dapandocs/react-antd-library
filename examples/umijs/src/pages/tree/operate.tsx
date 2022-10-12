import React, { useState } from "react";
import { Tree, Button, Menu, Dropdown, Space } from "antd";
import {
  PlusSquareOutlined,
  EllipsisOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { MenuTree, OperateMenuTree } from "react-antd-library";
// import { MenuTree, OperateMenuTree } from "../../../../../src";

const treeData = [
  {
    key: "0-0",
    title: "Node1",
    value: "0-0",
    children: [
      {
        key: "0-0-1",
        title: "Child Node1",
        value: "0-0-1",
      },
      {
        key: "0-0-2",
        title: "Child Node2",
        value: "0-0-2",
        children: [
          {
            key: "0-0-1-1",
            title: "Child Node1",
            value: "0-0-1-1",
          },
          {
            key: "0-0-2-1",
            title: "Child Node2",
            value: "0-0-2-1",
          },
        ],
      },
    ],
  },
  {
    key: "0-1",
    title: "Node2",
    value: "0-1",
  },
];

const MenuTreePage = () => {
  const [keys, setKeys] = useState(["0-0-2-1"]);
  const [selectKeys, setSelectKeys] = useState([]);
  const [auto, setAuto] = useState(true);

  // 操作菜单
  const menu = (node) => (
    <Menu
      onClick={(e) => {
        console.log(e.key, node);
      }}
    >
      <Menu.Item key="add" icon={<PlusSquareOutlined size={30} />}>
        添加下级节点
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="edit" icon={<FormOutlined size={30} />}>
        编 辑
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="del" icon={<DeleteOutlined size={30} />}>
        删 除
      </Menu.Item>
    </Menu>
  );

  // 渲染树的操作按钮
  const renderOperation = (node) => {
    return (
      <Dropdown overlay={() => menu(node)}>
        <EllipsisOutlined />
      </Dropdown>
    );
  };

  const renderOperation2 = (node) => {
    return (
      <Space>
        <a type="link" style={{ color: "inherit" }}>
          新建
        </a>
        <a type="link" style={{ color: "inherit" }}>
          重命名
        </a>
        <a type="link" style={{ color: "inherit" }}>
          删除
        </a>
      </Space>
    );
  };
  return (
    <>
      <OperateMenuTree
        treeData={treeData}
        // expandedKeys={keys}
        // selectedKeys={selectKeys}
        // autoExpandParent={auto}
        // mode="directory"
        // onAutoExpandParent={(b) => setAuto(b)}
        renderOperationMenuItems={renderOperation2}
        searchParams={{
          placeholder: "测试",
        }}
      />
      <Button onClick={() => setKeys(["0-0-2-1"])}>测试</Button>
      <Button
        onClick={() => {
          setKeys(["0-0-2-1"]);
          setAuto(true);
        }}
      >
        自动
      </Button>
    </>
  );
};
export default MenuTreePage;
