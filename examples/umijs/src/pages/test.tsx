import React from "react";
import { Card, message } from "antd";
import { ContextMenuTree } from "react-antd-library";

const treeData = [
  {
    key: "0-0",
    title: "集团总部",
    value: "0-0",
    children: [
      {
        key: "0-0-1",
        title: "杭州分公司",
        value: "0-0-1",
      },
      {
        key: "0-0-2",
        title: "上海分公司",
        value: "0-0-2",
        children: [
          {
            key: "0-0-1-1",
            title: "研发部",
            value: "0-0-1-1",
          },
          {
            key: "0-0-2-1",
            title: "市场部",
            value: "0-0-2-1",
          },
        ],
      },
    ],
  },
  {
    key: "0-1",
    title: "济南分公司",
    value: "0-1",
  },
];

const ContextMenuTreePage = () => {
  return (
    <Card title="组织架构" size="small" style={{ width: 400 }}>
      <ContextMenuTree
        treeData={treeData}
        contextMenuItems={[
          {
            label: "新增",
            key: "新增",
          },
          {
            label: "重命名",
            key: "重命名",
          },
          {
            label: "删除",
            key: "删除",
          },
        ]}
        onClickContextMenu={(key, node) => {
          message.success(`您点击了 ${node.title} 的 ${key} 操作！`);
        }}
      />
    </Card>
  );
};
export default ContextMenuTreePage;
