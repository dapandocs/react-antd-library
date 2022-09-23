import React from "react";
import { Table, Form } from "antd";
import type {
  TableColumnProps,
  TableProps,
  InputProps,
  SelectProps,
  InputNumberProps,
} from "antd";
import { PreviewText } from "../PreviewText";
import styles from "./EditableTable.less";

export interface EditableTableColumns<RecordType>
  extends TableColumnProps<RecordType> {
  valueType?: "input" | "select" | "inputNumber";
  antdComponentProps?: {
    input?: InputProps;
    select?: SelectProps;
    inputNumber?: InputNumberProps;
  };
}

export interface EditableTableProps extends TableProps<any> {
  columns?: EditableTableColumns<any>[];
}

const { Input, Select, InputNumber } = PreviewText;

const valueTypeMap: Record<string, any> = {
  input: Input,
  select: Select,
  inputNumber: InputNumber,
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
      const { valueType, antdComponentProps = {} } = item;
      const antdProps = antdComponentProps[valueType]
        ? antdComponentProps[valueType]
        : {};
      if (
        valueType &&
        typeof valueType === "string" &&
        valueType in valueTypeMap
      ) {
        AntdComponent = valueTypeMap[valueType];
      }
      if (
        !["inputNumber"].includes(valueType) &&
        !("allowClear" in antdProps)
      ) {
        Object.assign(antdProps, { allowClear: true });
      }
      columnsResult.push({
        ...item,
        render: (t: any, row: Record<string, any>, index: number) => {
          return (
            <Form.Item name={["list", index, item.dataIndex]} initialValue={t}>
              <AntdComponent
                placeholder="请输入"
                previewMode="form"
                style={{ width: "100%" }}
                {...antdProps}
              />
            </Form.Item>
          );
        },
      });
    });
    return columnsResult;
  }, [columns]);
  return (
    <Form>
      <PreviewText
        previewMode="text"
        previewPlaceholder="-"
        previewClassName={styles["antd-editable-text"]}
      >
        <Table
          {...restProps}
          className={styles["antd-editable-table"]}
          columns={getColumns}
        />
      </PreviewText>
    </Form>
  );
};
