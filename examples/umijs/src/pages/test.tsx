import React from "react";
import { Table, Tree, TreeDataNode } from "antd";
import { treeUtils } from "../../../../src";

const { mapTree, filterTree } = treeUtils;
const MergeTableRows = () => {
  const treeData: TreeDataNode[] = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true,
            },
            {
              title: "leaf",
              key: "0-0-0-1",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: <span style={{ color: "#1890ff" }}>sss</span>,
              key: "0-0-1-0",
            },
          ],
        },
      ],
    },
    {
      title: "parent 2",
      key: "2-2",
    },
  ];

  const tree = filterTree(treeData, (node: any, level: number) => {
    if (node.title === "parent 1") {
      return true;
    }
    return false;
  });
  console.log("tree", tree);

  return (
    <Tree
      checkable
      defaultExpandedKeys={["0-0-0", "0-0-1"]}
      defaultSelectedKeys={["0-0-0", "0-0-1"]}
      defaultCheckedKeys={["0-0-0", "0-0-1"]}
      treeData={treeData}
    />
  );
};
export default MergeTableRows;
