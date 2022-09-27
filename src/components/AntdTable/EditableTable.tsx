import React from "react";
import { Table, Form, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type {
  TableColumnProps,
  TableProps,
  InputProps,
  SelectProps,
  InputNumberProps,
  FormInstance,
  FormItemProps,
  DatePickerProps,
  RadioGroupProps,
  CascaderProps,
  TimePickerProps,
  TreeSelectProps,
} from "antd";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { useDynamicList, useDeepCompareEffect, useMount } from "ahooks";
import { PreviewText } from "../PreviewText";
import "./EditableTable.less";

export interface EditableTableColumns<RecordType>
  extends TableColumnProps<RecordType> {
  valueType?:
    | "input"
    | "select"
    | "inputNumber"
    | "datePicker"
    | "timePicker"
    | "checkboxGroup"
    | "radioGroup"
    | "cascader"
    | "treeSelect"
    | "option";
  antdComponentProps?: {
    input?: InputProps;
    select?: SelectProps;
    inputNumber?: InputNumberProps;
    datePicker?: DatePickerProps;
    timePicker?: TimePickerProps;
    checkboxGroup?: CheckboxGroupProps;
    radioGroup?: RadioGroupProps;
    cascader?: CascaderProps<any>;
    treeSelect?: TreeSelectProps;
  };
  formItemProps?:
    | ((
        form?: FormInstance,
        config?: {
          rowIndex?: number;
          colIndex?: number;
          name?: string[];
          dataIndex?: string;
          listName?: string;
        }
      ) => FormItemProps)
    | FormItemProps;
  isEditable?: boolean;
  isHidden?: boolean;
  render?: (
    text?: string,
    row?: any,
    index?: any,
    action?: {
      remove?: (index: number) => void;
      insert?: (index: number, item: any) => void;
      replace?: (index: number, item: any) => void;
    }
  ) => React.ReactNode | null;
}

export type onActionOptions = {
  insert?: (index: number, item: any) => void;
  replace?: (index: number, item: any) => void;
  remove?: (index: number) => void;
  getKey?: (index: number) => number;
  push?: (item: any) => void;
  sortList?: (result: any[]) => any[];
  resetList?: (newList: any[]) => void;
};

export interface EditableTableProps extends TableProps<any> {
  columns?: EditableTableColumns<any>[];
  dataSource?: Record<string, any>[];
  showAddButton?: boolean;
  form?: FormInstance;
  listName?: string;
  onAction?: (action: onActionOptions) => void;
}

const {
  Input,
  Select,
  InputNumber,
  DatePicker,
  TimePicker,
  CheckboxGroup,
  RadioGroup,
  Cascader,
  TreeSelect,
} = PreviewText;

const valueTypeMap: Record<string, any> = {
  input: Input,
  select: Select,
  inputNumber: InputNumber,
  datePicker: DatePicker,
  timePicker: TimePicker,
  checkboxGroup: CheckboxGroup,
  radioGroup: RadioGroup,
  cascader: Cascader,
  treeSelect: TreeSelect,
};
export const EditableTable: React.FC<EditableTableProps> = ({
  columns,
  form,
  listName = "list",
  dataSource = [],
  showAddButton = true,
  onAction,
  ...restProps
}) => {
  const { list, remove, push, resetList, insert, replace, getKey, sortList } =
    useDynamicList<any>([]);

  useDeepCompareEffect(() => {
    resetList(dataSource);
  }, [dataSource]);

  useMount(() => {
    if (typeof onAction === "function") {
      onAction({
        push,
        remove,
        insert,
        replace,
        sortList,
        getKey,
        resetList,
      });
    }
  });

  const getColumns = React.useMemo(() => {
    if (!Array.isArray(columns) || columns.length === 0) {
      return [];
    }
    const columnsResult: EditableTableColumns<any>[] = [];
    columns.forEach((item: Record<string, any>, colIndex: number) => {
      let AntdComponent = Input;
      const {
        valueType,
        antdComponentProps = {},
        formItemProps,
        isEditable = true,
        isHidden = false,
      } = item;
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
        !["inputNumber", "checkboxGroup", "radioGroup"].includes(valueType) &&
        !("allowClear" in antdProps)
      ) {
        Object.assign(antdProps, { allowClear: true });
      }
      if (isHidden) {
        Object.assign(item, { className: "antd-editable-hidden" });
      }

      if (valueType === "option") {
        columnsResult.push({
          ...item,
          render: (t: any, row: Record<string, any>, rowIndex: number) =>
            typeof item?.render === "function" ? (
              item.render(t, row, getKey(rowIndex), {
                insert,
                remove,
                replace,
              })
            ) : (
              <Tooltip title="删除此行">
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => remove(rowIndex)}
                />
              </Tooltip>
            ),
        });
      } else {
        columnsResult.push({
          ...item,
          render: (t: any, row: Record<string, any>, rowIndex: number) => {
            let formItemPropsResult = {};
            if (typeof formItemProps === "function") {
              formItemPropsResult = formItemProps(form, {
                rowIndex,
                colIndex,
                name: [listName, getKey(rowIndex), item.dataIndex],
                dataIndex: item.dataIndex,
                listName,
              });
            } else if (typeof formItemProps === "object") {
              formItemPropsResult = formItemProps;
            }
            return (
              <Form.Item
                initialValue={t}
                {...formItemPropsResult}
                name={[listName, getKey(rowIndex), item.dataIndex]}
              >
                <AntdComponent
                  placeholder="请填选"
                  previewMode={isEditable ? "form" : "text"}
                  style={{ width: "100%" }}
                  {...antdProps}
                />
              </Form.Item>
            );
          },
        });
      }
    });
    return columnsResult;
  }, [columns]);

  return (
    <Form form={form}>
      <PreviewText
        previewMode="text"
        previewPlaceholder="-"
        previewClassName="antd-editable-text"
      >
        <Table
          className="antd-editable-table"
          pagination={false}
          {...restProps}
          rowKey={(r: any) => Math.random().toString(36).substring(2)}
          dataSource={list}
          columns={getColumns}
        />
        {showAddButton && (
          <Button
            style={{ marginTop: 8 }}
            block
            type="dashed"
            onClick={() => push({})}
          >
            + 添加一行数据
          </Button>
        )}
      </PreviewText>
    </Form>
  );
};
