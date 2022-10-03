import React, { useState } from "react";
import { Tree, Button } from "antd";
import { MenuTree } from "../../../../../src";

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
  const [selectKeys, setSelectKeys] = useState(["0-0-2-1"]);
  const [auto, setAuto] = useState(true);

  return (
    <>
      <MenuTree
        treeData={treeData}
        expandedKeys={keys}
        selectedKeys={selectKeys}
        // autoExpandParent={auto}
        onExpand={(k: any) => setKeys(k)}
        onSelect={(s: any) => setSelectKeys(s)}
        mode="directory"
        // onAutoExpandParent={(b) => setAuto(b)}
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
