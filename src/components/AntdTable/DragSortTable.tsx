import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useSetState } from "ahooks";
// @ts-ignore
import ReactDragListView from "../DragListView";
import { arrayUtils } from "../../utils";
import "./DragSortTable.less";

export interface DragSortTableProps extends TableProps<any> {
  dragProps?: {
    nodeSelector?: string;
    handleSelector?: string;
    ignoreSelector?: string;
    enableScroll?: boolean;
    scrollSpeed?: number;
    lineClassName?: string;
  };
  mode?: "row" | "column";
}

export const DragSortTable: React.FC<DragSortTableProps> = ({
  columns = [],
  dataSource = [],
  dragProps = {},
  mode = "row",
}) => {
  const [state, setState] = useSetState<any>({
    tableData: dataSource,
    tableColumns: columns,
  });
  const { tableColumns, tableData } = state;

  if (mode === "column") {
    return (
      <ReactDragListView.DragColumn
        nodeSelector="th"
        handleSelector=".ant-table-cell"
        {...dragProps}
        onDragEnd={(oldIndex: number, newIndex: number) => {
          const list = arrayUtils.arrayMove(
            [...tableColumns],
            oldIndex,
            newIndex
          );
          setState({ tableColumns: list });
        }}
      >
        <Table
          className="drag-sort-table"
          columns={tableColumns}
          dataSource={tableData}
          rowKey={(r: any) => Math.random().toString(36).substring(2)}
          pagination={false}
          bordered
        />
      </ReactDragListView.DragColumn>
    );
  }

  return (
    <ReactDragListView
      handleSelector={'span[aria-label="drag"]'}
      {...dragProps}
      onDragEnd={(oldIndex: number, newIndex: number) => {
        const data = arrayUtils.arrayMove([...tableData], oldIndex, newIndex);
        setState({ tableData: data });
      }}
    >
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={(r: any) => Math.random().toString(36).substring(2)}
        pagination={false}
      />
    </ReactDragListView>
  );
};
