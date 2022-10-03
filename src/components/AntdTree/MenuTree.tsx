import React from "react";
import { Tree, Input } from "antd";
import type { TreeProps, TreeDataNode } from "antd";
import { useSetState, useDebounceFn, useControllableValue } from "ahooks";
import { forEachTree } from "../../utils/treeUtils";

const { Search } = Input;
const { DirectoryTree } = Tree;

type MenuTreeProps = TreeProps & {
  fieldNames?: {
    title?: "title";
    key?: "key";
    children?: "children";
    isLeaf?: "isLeaf";
  };
  mode?: "primary" | "directory";
  onAutoExpandParent?: (autoExpandParent: boolean) => void;
};

export const MenuTree: React.FC<MenuTreeProps> = (props) => {
  const {
    fieldNames = {
      title: "title",
      key: "key",
      children: "children",
      isLeaf: "isLeaf",
    },
    treeData = [],
    mode = "directory",
    ...restProps
  } = props;
  const [state, setState] = useSetState({
    searchValue: "",
  });

  const [expandedKeys = [], setExpandedKeys] = useControllableValue(props, {
    valuePropName: "expandedKeys",
    trigger: "onExpand",
  });
  const [selectedKeys = [], setSelectedKeys] = useControllableValue(props, {
    valuePropName: "selectedKeys",
    trigger: "onSelect",
  });
  const [autoExpandParent = false, setAutoExpandParent] = useControllableValue(
    props,
    {
      valuePropName: "autoExpandParent",
      trigger: "onAutoExpandParent",
    }
  );
  const { searchValue } = state;

  const onChange = (value: string) => {
    const expandedKeys = [];
    forEachTree(treeData, (node: Record<string, any>) => {
      if (value && node[fieldNames.title].indexOf(value) >= 0) {
        expandedKeys.push(node[fieldNames.key]);
      }
    });
    setState({
      searchValue: value,
    });
    setAutoExpandParent(true);
    setExpandedKeys(expandedKeys);
  };
  const { run } = useDebounceFn(onChange, { wait: 300 });
  const onExpand = (expandedKeys: string[], { node }: Record<string, any>) => {
    const expandedKey = node.key;
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeys);
    setSelectedKeys([expandedKey]);
  };

  const onSelect = (
    selectedKeys: string[],
    { selected, node }: Record<string, any>
  ) => {
    const selectedKey = node.key;
    if (selected) {
      // 未选中
      if (expandedKeys.includes(selectedKey)) {
        setSelectedKeys(selectedKeys);
      } else {
        setAutoExpandParent(false);
        setSelectedKeys(selectedKeys);
        setExpandedKeys([...selectedKeys, ...expandedKeys]);
      }
    }
  };

  const renderTreeNodes = (data: TreeDataNode[]): any =>
    data.map((item: any) => {
      const index = item[fieldNames.title].indexOf(searchValue);
      const beforeStr = item[fieldNames.title].substr(0, index);
      const afterStr = item[fieldNames.title].substr(
        index + searchValue.length
      );
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: "red" }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item[fieldNames.title]}</span>
        );
      if (item[fieldNames.children]) {
        return {
          title,
          key: item[fieldNames.key],
          isLeaf: item[fieldNames.isLeaf],
          children: renderTreeNodes(item[fieldNames.children]),
        };
      }
      return {
        title,
        key: item[fieldNames.key],
        isLeaf: item[fieldNames.isLeaf],
      };
    });
  const TreeComponet = mode === "directory" ? DirectoryTree : Tree;
  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="请输入关键字"
        onChange={(e) => run(e.target.value)}
      />
      <TreeComponet
        showIcon={false}
        defaultExpandParent={false}
        {...restProps}
        onExpand={onExpand}
        onSelect={onSelect}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        autoExpandParent={autoExpandParent}
        treeData={renderTreeNodes(treeData)}
      />
    </div>
  );
};
