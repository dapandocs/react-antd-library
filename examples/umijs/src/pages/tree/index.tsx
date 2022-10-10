import React, { useState } from "react";
import { Tree, Button, Menu } from "antd";
import { MenuTree, ContextMenuTree } from "../../../../../src";

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

const menu = (
  <Menu
    items={[
      {
        label: "1st menu item",
        key: "1",
      },
      {
        label: "2nd menu item",
        key: "2",
      },
      {
        label: "3rd menu item",
        key: "3",
      },
    ]}
  />
);

const MenuTreePage = () => {
  const [keys, setKeys] = useState(["0-0-2-1"]);
  const [selectKeys, setSelectKeys] = useState([]);
  const [auto, setAuto] = useState(true);

  return (
    <>
      <ContextMenuTree
        treeData={treeData}
        expandedKeys={keys}
        selectedKeys={selectKeys}
        // autoExpandParent={auto}
        onExpand={(k: any) => {
          console.log("k", k);
          setKeys(k);
        }}
        onSelect={(s: any) => {
          console.log("s", s);
          setSelectKeys(s);
        }}
        // mode="directory"
        // onAutoExpandParent={(b) => setAuto(b)}
        contextMenuItems={menu}
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
