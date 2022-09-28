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
          record?: Record<string, any>;
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
      getKey?: (index: number) => number;
      push?: (item: any) => void;
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

export type EditableTableProps<DateType> = TableProps<DateType> & {
  columns?: EditableTableColumns<DateType>[];
  dataSource?: DateType[];
  showAddButton?: boolean;
  form?: FormInstance;
  listName?: string;
  minRowNumber?: number;
  onAction?: (action: onActionOptions) => void;
  onRowChange?: (list: DateType[]) => void;
};

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
const EditableTableMemo = <DateType extends Record<string, any>>({
  columns,
  form,
  listName = "list",
  dataSource = [],
  showAddButton = true,
  minRowNumber = 0,
  onAction,
  onRowChange,
  ...restProps
}: EditableTableProps<DateType>) => {
  const [listLength, setListLength] = React.useState(0);

  const { list, remove, push, resetList, insert, replace, getKey, sortList } =
    useDynamicList<any>([]);

  useDeepCompareEffect(() => {
    resetList(dataSource);
  }, [dataSource]);

  useDeepCompareEffect(() => {
    if (form) {
      const { [listName]: editableList } = form.getFieldsValue();
      if (Array.isArray(editableList)) {
        const tableList = editableList.filter((i: DateType) => !!i);
        if (typeof onRowChange === "function") {
          onRowChange(tableList);
        }
        setListLength(tableList.length);
      }
    }
  }, [list]);

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

  const getDelectButtonDisable = () => {
    if (minRowNumber === 0) {
      return false;
    }
    if (listLength > minRowNumber) {
      return false;
    }
    return true;
  };

  const getColumns = React.useMemo(() => {
    if (!Array.isArray(columns) || columns.length === 0) {
      return [];
    }
    const columnsResult: EditableTableColumns<DateType>[] = [];
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
        ![
          "inputNumber",
          "checkboxGroup",
          "radioGroup",
          "select",
          "cascader",
          "treeSelect",
        ].includes(valueType) &&
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
          render: (t: any, row: DateType, rowIndex: number) =>
            typeof item?.render === "function" ? (
              item.render(t, row, rowIndex, {
                insert,
                remove,
                replace,
                getKey,
                push,
              })
            ) : (
              <Tooltip title="删除此行">
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => remove(rowIndex)}
                  disabled={getDelectButtonDisable()}
                />
              </Tooltip>
            ),
        });
      } else {
        columnsResult.push({
          ...item,
          render: (t: any, row: DateType, rowIndex: number) => {
            let formItemPropsResult = {};
            if (typeof formItemProps === "function") {
              formItemPropsResult = formItemProps(form, {
                rowIndex,
                colIndex,
                name: [listName, getKey(rowIndex), item.dataIndex],
                dataIndex: item.dataIndex,
                listName,
                record: row,
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
  }, [columns, listLength]);

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
          rowKey={(r: DateType) => Math.random().toString(36).substring(2)}
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
export const EditableTable = React.memo(EditableTableMemo);
