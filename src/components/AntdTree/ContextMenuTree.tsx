import React from "react";
import { Tree, Input, Menu } from "antd";
import type { TreeProps, TreeDataNode } from "antd";
import type { SearchProps } from "antd/lib/input/Search";
import { useSetState, useDebounceFn, useControllableValue } from "ahooks";
import { forEachTree } from "../../utils/treeUtils";
import "./MenuTree.less";

const { Search } = Input;

export type ContextMenuTreeProps = TreeProps & {
  fieldNames?: {
    title?: "title";
    key?: "key";
    children?: "children";
    isLeaf?: "isLeaf";
  };
  mode?: "primary" | "directory";
  showSearch?: boolean;
  searchParams?: SearchProps;
  contextMenuItems: {
    key: string;
    label: string;
  }[];
  onClickContextMenu?: (
    contextKey: string,
    node: { key: string; title: string }
  ) => void;
  onAutoExpandParent?: (autoExpandParent: boolean) => void;
};

export const ContextMenuTree: React.FC<ContextMenuTreeProps> = (props) => {
  const {
    contextMenuItems = [],
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
    onClickContextMenu,
    ...restProps
  } = props;
  const dropdownElement: React.RefObject<HTMLDivElement> = React.useRef(null);

  const [state, setState] = useSetState<any>({
    pageX: 0,
    pageY: 0,
    showContextMenu: false,
    currentTreeNode: {},
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

  const { pageX, pageY, showContextMenu, searchValue, currentTreeNode } = state;

  React.useEffect(() => {
    if (dropdownElement.current) {
      dropdownElement.current?.focus();
    }
  }, [showContextMenu]);

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
          data: {
            key: item[fieldNames.key],
            title: item[fieldNames.title],
          },
          key: item[fieldNames.key],
          isLeaf: item[fieldNames.isLeaf],
          children: renderTreeNodes(item[fieldNames.children]),
        };
      }
      return {
        title,
        data: {
          key: item[fieldNames.key],
          title: item[fieldNames.title],
        },
        key: item[fieldNames.key],
        isLeaf: item[fieldNames.isLeaf],
      };
    });

  const renderContextMenu = () => {
    if (
      pageX &&
      pageY &&
      Array.isArray(contextMenuItems) &&
      contextMenuItems.length
    ) {
      return (
        <div
          tabIndex={-1}
          style={{
            display: showContextMenu ? "inherit" : "none",
            position: "fixed",
            left: pageX - 16,
            top: pageY + 8,
            zIndex: 100,
            boxShadow:
              "0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d",
          }}
          ref={dropdownElement}
          onBlur={(e) => {
            e.stopPropagation();
            setTimeout(() => {
              setState({ showContextMenu: false });
            }, 300);
          }}
        >
          <Menu
            // @ts-ignore
            items={contextMenuItems}
            selectedKeys={[]}
            onSelect={({ key }) => {
              if (typeof onClickContextMenu === "function") {
                onClickContextMenu(key, currentTreeNode.data);
              }
            }}
          />
        </div>
      );
    }
    return null;
  };

  const handleRightClick = ({ event, node }: any) => {
    event.stopPropagation();
    setState({
      pageX: event.pageX,
      pageY: event.pageY,
      showContextMenu: true,
      currentTreeNode: node,
    });
  };

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
        autoExpandParent={autoExpandParent}
        onRightClick={handleRightClick}
        treeData={renderTreeNodes(treeData)}
      />
      {renderContextMenu()}
    </div>
  );
};
