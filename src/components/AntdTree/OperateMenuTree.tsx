import React from "react";
import { Tree, Input } from "antd";
import type { TreeProps, TreeDataNode } from "antd";
import type { SearchProps } from "antd/lib/input/Search";
import { useSetState, useDebounceFn, useControllableValue } from "ahooks";
import { forEachTree } from "../../utils/treeUtils";
import "./OperateMenuTree.less";

const { Search } = Input;

export type OperateMenuTreeProps = TreeProps & {
  fieldNames?: {
    title?: "title";
    key?: "key";
    children?: "children";
    isLeaf?: "isLeaf";
  };
  mode?: "primary" | "directory";
  renderOperationMenuItems: (node: Record<string, any>) => React.ReactNode;
  showSearch?: boolean;
  searchParams?: SearchProps;
  onAutoExpandParent?: (autoExpandParent: boolean) => void;
};

export const OperateMenuTree: React.FC<OperateMenuTreeProps> = (props) => {
  const {
    fieldNames = {
      title: "title",
      key: "key",
      children: "children",
      isLeaf: "isLeaf",
    },
    treeData = [],
    mode = "primary",
    showSearch = true,
    searchParams = {},
    renderOperationMenuItems,
    ...restProps
  } = props;

  const [state, setState] = useSetState<any>({
    searchValue: "",
    isEnterOperate: false,
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

  const { searchValue, isEnterOperate } = state;

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

  const renderOperation = (node: Record<string, any>) => {
    if (!state[node[fieldNames.key]]) {
      return null;
    }
    return (
      <div
        style={{
          float: "right",
          paddingRight: 6,
        }}
        onMouseEnter={() => setState({ isEnterOperate: true })}
        onMouseLeave={() => setState({ isEnterOperate: false })}
      >
        {typeof renderOperationMenuItems === "function"
          ? renderOperationMenuItems(node)
          : null}
      </div>
    );
  };

  const renderTreeNodes = (data: TreeDataNode[]): any =>
    data.map((item: Record<string, any>) => {
      const index = item[fieldNames.title].indexOf(searchValue);
      const beforeStr = item[fieldNames.title].substr(0, index);
      const afterStr = item[fieldNames.title].substr(
        index + searchValue.length
      );
      const title =
        index > -1 ? (
          <span
            style={{ width: "100%", display: "inline-block" }}
            onMouseEnter={() => setState({ [item[fieldNames.key]]: true })}
            onMouseLeave={() => setState({ [item[fieldNames.key]]: false })}
          >
            {beforeStr}
            <span style={{ color: "red" }}>{searchValue}</span>
            {afterStr}
            {renderOperation(item)}
          </span>
        ) : (
          <span
            style={{ width: "100%", display: "inline-block" }}
            onMouseEnter={() => setState({ [item[fieldNames.key]]: true })}
            onMouseLeave={() => setState({ [item[fieldNames.key]]: false })}
          >
            {item[fieldNames.title]}
            {renderOperation(item)}
          </span>
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

  const expandSelectParams = !isEnterOperate
    ? { onExpand: setExpandedKeys, onSelect: setSelectedKeys }
    : {};

  return (
    <div className={mode === "primary" ? "antd-menu-tree" : ""}>
      {showSearch && (
        <Search
          style={{ marginBottom: 8 }}
          placeholder="请输入关键字"
          allowClear
          {...searchParams}
          onChange={(e) => run(e.target.value)}
        />
      )}
      <Tree.DirectoryTree
        showIcon={false}
        defaultExpandParent={false}
        {...restProps}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        {...expandSelectParams}
        autoExpandParent={autoExpandParent}
        treeData={renderTreeNodes(treeData)}
      />
    </div>
  );
};
