import React from "react";
import { Form, Button, Table } from "antd";
import { useUpdate, useSetState } from "ahooks";
import {
  EditableTable,
  EditableTableColumns,
  onActionOptions,
} from "../../../../../src";
const dataSource = [
  {
    key: "1",
    name: "zhangsan",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "lisi",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const Editable = () => {
  const [form] = Form.useForm();
  const update = useUpdate();
  const [state, setState] = useSetState<{
    action: onActionOptions;
    isedit: boolean;
    data: any[];
  }>({
    isedit: false,
    data: dataSource,
    action: {},
  });
  const { isedit, data, action } = state;
  const columns: EditableTableColumns<any>[] = [
    {
      title: "ID",
      dataIndex: "key",
      isHidden: true,
      key: "key",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      valueType: "radioGroup",
      formItemProps: {
        rules: [{ message: "请输入", required: true }],
      },
      antdComponentProps: {
        radioGroup: {
          // allowClear: false,
          options: [
            {
              label: "张三",
              value: "zhangsan",
            },
            {
              label: "李四",
              value: "lisi",
            },
          ],
        },
      },
      isEditable: isedit,
    },
    {
      title: "喜欢的水果",
      dataIndex: "likes",
      key: "likes",
      valueType: "treeSelect",
      formItemProps: {
        rules: [{ message: "请输入", required: true }],
      },
      antdComponentProps: {
        treeSelect: {
          // allowClear: false,
          multiple: true,
          labelInValue: true,
          treeData: [
            {
              title: "水果",
              value: "水果",
              children: [
                {
                  title: "苹果",
                  value: "苹果",
                },
                {
                  title: "西瓜",
                  value: "西瓜",
                },
              ],
            },
          ],
        },
      },
      isEditable: isedit,
    },
    {
      title: "地区",
      dataIndex: "address2",
      key: "address2",
      valueType: "cascader",
      formItemProps: {
        rules: [{ message: "请输入", required: true }],
      },
      antdComponentProps: {
        cascader: {
          // allowClear: false,
          options: [
            {
              value: "zhejiang",
              label: "浙江",
              children: [
                {
                  value: "hangzhou",
                  label: "杭州",
                },
              ],
            },
            {
              value: "jiangsu",
              label: "江苏",
              children: [
                {
                  value: "nanjing",
                  label: "南京",
                },
              ],
            },
          ],
        },
      },
      isEditable: isedit,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      valueType: "inputNumber",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      isEditable: isedit,
      // isHidden: true,
    },
    {
      title: "时间",
      dataIndex: "time",
      valueType: "timePicker",
      isEditable: isedit,
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable
        form={form}
        columns={columns}
        dataSource={data}
        onAction={(action) => setState({ action })}
      />
      <Button
        type="primary"
        onClick={() => {
          const values = form.getFieldsValue();
          console.log(values);
        }}
      >
        打印
      </Button>
      <Button
        type="primary"
        onClick={() => {
          update();
        }}
      >
        强制更新
      </Button>
      <Button
        onClick={() => {
          setState({ isedit: !isedit });
        }}
      >
        切换
      </Button>
      <Button
        onClick={() => {
          if (action?.resetList) {
            action?.resetList([]);
          }
        }}
      >
        全部置空
      </Button>
      <Button
        onClick={() => {
          setState({
            data: [
              {
                key: "1",
                name: "zhangsan",
                age: 32,
                address: "西湖区湖底公园1号",
              },
              {
                key: "2",
                name: "lisi",
                age: 42,
                address: "西湖区湖底公园1号",
              },
              {
                key: "3",
                name: "lisi",
                age: 22,
                address: "西湖区湖底公园1号",
              },
            ],
          });
        }}
      >
        重置
      </Button>
    </>
  );
};
export default Editable;
