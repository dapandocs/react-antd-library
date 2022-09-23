import React from "react";
import { Table, Form } from "antd";
import type { TableColumnProps, TableProps } from "antd";
import { PreviewText } from "../PreviewText";
import "./EditableTable.less";

export interface EditableTableColumns<RecordType>
  extends TableColumnProps<RecordType> {
  valueType?: string;
}

export interface EditableTableProps extends TableProps<any> {
  columns?: EditableTableColumns<any>[];
}

const { Input } = PreviewText;

const valueTypeMap: Record<string, any> = {
  input: Input,
};
export const EditableTable: React.FC<EditableTableProps> = ({
  columns,
  ...restProps
}) => {
  const getColumns = React.useMemo(() => {
    if (!Array.isArray(columns) || columns.length === 0) {
      return [];
    }
    const columnsResult: EditableTableColumns<any>[] = [];
    columns.forEach((item: Record<string, any>) => {
      let AntdComponent = Input;
      if (
        item.valueType &&
        typeof item.valueType === "string" &&
        item.valueType in valueTypeMap
      ) {
        AntdComponent = valueTypeMap[item.valueType];
      }
      columnsResult.push({
        ...item,
        render: (t: any, row: Record<string, any>, index: number) => {
          return (
            <Form.Item name={["list", index, item.dataIndex]} initialValue={t}>
              <AntdComponent placeholder="请输入" allowClear />
            </Form.Item>
          );
        },
      });
    });
    return columnsResult;
  }, [columns]);
  return (
    <Form>
      <PreviewText previewMode="form" previewPlaceholder="-">
        <Table
          {...restProps}
          className="antd-editable-table"
          columns={getColumns}
        />
      </PreviewText>
    </Form>
  );
};
