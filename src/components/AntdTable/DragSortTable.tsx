import React from "react";
import { Table } from "antd";
import type { TableProps, TableColumnProps } from "antd";
import { useSetState } from "ahooks";
// @ts-ignore
import ReactDragListView from "../DragListView";
import { arrayUtils } from "../../utils";
import "./DragSortTable.less";

export type DragSortTableProps<DateType> = TableProps<DateType> & {
  columns?: TableColumnProps<DateType>[];
  dataSource?: DateType[];
  dragProps?: {
    nodeSelector?: string;
    handleSelector?: string;
    ignoreSelector?: string;
    enableScroll?: boolean;
    scrollSpeed?: number;
    lineClassName?: string;
  };
  mode?: "row" | "column";
  onDragEnd?: (list: any[]) => void;
};

export function DragSortTable<DateType extends Record<string, any>>({
  columns = [],
  dataSource = [],
  dragProps = {},
  mode = "row",
  onDragEnd,
  ...restProps
}: DragSortTableProps<DateType>) {
  const [state, setState] = useSetState<{
    tableColumns: TableColumnProps<DateType>[];
    tableData: DateType[];
  }>({
    tableData: dataSource,
    tableColumns: columns,
  });
  const { tableColumns, tableData } = state;

  if (mode === "column") {
    return (
      <ReactDragListView.DragColumn
        nodeSelector="th"
        {...dragProps}
        onDragEnd={(oldIndex: number, newIndex: number) => {
          const list = arrayUtils.arrayMove(
            [...tableColumns],
            oldIndex,
            newIndex
          );
          if (typeof onDragEnd === "function") {
            onDragEnd(list);
          }
          setState({ tableColumns: list });
        }}
      >
        <Table
          {...restProps}
          className="drag-sort-table"
          columns={tableColumns}
          dataSource={tableData}
          rowKey={(r: any) => Math.random().toString(36).substring(2)}
          pagination={false}
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
        if (typeof onDragEnd === "function") {
          onDragEnd(data);
        }
        setState({ tableData: data });
      }}
    >
      <Table
        {...restProps}
        columns={columns}
        dataSource={tableData}
        rowKey={(r: any) => Math.random().toString(36).substring(2)}
        pagination={false}
      />
    </ReactDragListView>
  );
}
