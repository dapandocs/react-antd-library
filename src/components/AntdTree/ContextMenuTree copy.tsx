import React, { useState, useRef, useEffect } from "react";
import { Tree, Input, Dropdown, Menu } from "antd";
import type { TreeProps, TreeDataNode } from "antd";
import type { SearchProps } from "antd/lib/input/Search";
import { useSetState, useDebounceFn, useControllableValue } from "ahooks";
import { forEachTree } from "../../utils/treeUtils";
import "./MenuTree.less";

const { Search } = Input;

type ContextMenuTreeProps = TreeProps & {
  fieldNames?: {
    title?: "title";
    key?: "key";
    children?: "children";
    isLeaf?: "isLeaf";
  };
  showSearch?: boolean;
  searchParams?: SearchProps;
  contextMenuItems: React.ReactElement;
  onAutoExpandParent?: (autoExpandParent: boolean) => void;
};

export const ContextMenuTree: React.FC<ContextMenuTreeProps> = ({
  treeData = [],
}) => {
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownElement: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    focusDropdown();
  }, [showMenu]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const focusDropdown = () => {
    if (dropdownElement.current) {
      dropdownElement.current?.focus();
    }
  };

  const menu = (
    <Menu
      items={[
        {
          key: "add",
          label: <span>新增</span>,
        },
        {
          key: "delete",
          label: <span>删除</span>,
        },
        {
          key: "update",
          label: <span>编辑</span>,
        },
      ]}
    />
  );

  const renderMenu = () => {
    if (pageX && pageY) {
      return (
        <div
          tabIndex={-1}
          style={{
            display: showMenu ? "inherit" : "none",
            position: "fixed",
            left: pageX - 16,
            top: pageY + 8,
          }}
          ref={dropdownElement}
          onBlur={(e) => {
            e.stopPropagation();
            setShowMenu(false);
          }}
        >
          {menu}
        </div>
      );
    }
    return null;
  };

  const handleRightClick = ({ event, node }: any) => {
    event.stopPropagation();
    setPageX(event.pageX);
    setPageY(event.pageY);
    setShowMenu(true);
  };

  return (
    <div>
      <Tree.DirectoryTree
        onRightClick={handleRightClick}
        defaultExpandedKeys={["0-0", "0-1"]}
        onSelect={onSelect}
        treeData={treeData}
      />
      {renderMenu()}
    </div>
  );
};
