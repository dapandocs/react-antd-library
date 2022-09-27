# EditableTable 可编辑表格

>可编辑表格和Table的用法基本相同，支持Input、Select、DatePicker、Checkbox、Radio等多种表单编辑。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 * desc: Input、InputNumber、Select组件的使用。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

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

interface RecordItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
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
    },
    {
      title: "年龄",
      dataIndex: "age",
      valueType: "inputNumber",
    },
    {
      title: "住址",
      dataIndex: "address",
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={dataSource} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```

```tsx
/**
 * title: 基本用法
 * transform: true
 * desc: Radio、Checkbox、Cascader组件的使用。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

const dataSource = [
  {
    key: "1",
    name: "zhangsan",
    likes: ["0"],
    address: ["zhejiang", "hangzhou"],
  },
  {
    key: "2",
    name: "lisi",
    likes: ["0", "1"],
    address: ["jiangsu", "nanjing"],
  },
];

interface RecordItem {
  key: string;
  name: string;
  likes: string[];
  address: string[];
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "radioGroup",
      antdComponentProps: {
        radioGroup: {
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
    },
    {
      title: "爱好",
      dataIndex: "likes",
      valueType: "checkboxGroup",
      antdComponentProps: {
        checkboxGroup: {
          options: [
            { label: "看书", value: "0" },
            { label: "跑步", value: "1" },
          ],
        },
      },
    },
    {
      title: "住址",
      dataIndex: "address",
      valueType: "cascader",
      antdComponentProps: {
        cascader: {
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
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={dataSource} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```

```tsx
/**
 * title: 基本用法
 * transform: true
 * desc: Radio、Checkbox、Cascader组件的使用。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import moment from "moment";
import { EditableTable, EditableTableColumns } from "react-antd-library";

const dataSource = [
  {
    key: "1",
    fruit: "苹果",
    date: moment(),
  },
  {
    key: "2",
    fruit: "西瓜",
    date: moment("2022-10-01"),
  },
];

interface RecordItem {
  key: string;
  fruit: string;
  date: any;
  time: any;
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "产品",
      dataIndex: "fruit",
      valueType: "treeSelect",
      antdComponentProps: {
        treeSelect: {
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
    },
    {
      title: "日期",
      dataIndex: "date",
      valueType: "datePicker",
    },
    {
      title: "时间",
      dataIndex: "time",
      valueType: "timePicker",
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={dataSource} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```
### 是否可编辑

```tsx
/**
 * title: 是否可编辑
 * transform: true
 * desc: 可通过设置columns.isEditable，控制该列是否可编辑。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

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

interface RecordItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(true);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
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
      isEditable: isEdit,
    },
    {
      title: "年龄",
      dataIndex: "age",
      valueType: "inputNumber",
      isEditable: isEdit,
    },
    {
      title: "住址",
      dataIndex: "address",
      isEditable: false,
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={dataSource} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="dashed" onClick={() => setIsEdit(!isEdit)}>编辑状态切换</Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```

### 是否隐藏列

```tsx
/**
 * title: 是否隐藏列
 * transform: true
 * desc: 可通过设置columns.isHidden，控制该列是否可显示；通常用在编辑或者携带其他额外字段。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

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

interface RecordItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const [isHidden, setIsHidden] = React.useState(false);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "ID",
      dataIndex: "key",
      width: 200,
      isHidden,
    },
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
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
    },
    {
      title: "年龄",
      dataIndex: "age",
      valueType: "inputNumber",
    },
    {
      title: "住址",
      dataIndex: "address",
    },
    {
      title: "操作",
      valueType: "option",
    },
  ];
  return (
    <>
      <EditableTable form={form} columns={columns} dataSource={dataSource} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="dashed" onClick={() => setIsHidden(!isHidden)}>
          列隐藏切换
        </Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```

### 是否显示添加行按钮

```tsx
/**
 * title: 是否显示添加行按钮
 * transform: true
 * desc: 可通过设置showAddButton，控制其是否显示。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

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

interface RecordItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const AntdEditableTable = () => {
  const [form] = Form.useForm();
  const [list, setList] = React.useState([]);
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
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
    },
    {
      title: "年龄",
      dataIndex: "age",
      valueType: "inputNumber",
    },
    {
      title: "住址",
      dataIndex: "address",
    },
  ];
  return (
    <>
      <EditableTable
        form={form}
        columns={columns}
        dataSource={dataSource}
        showAddButton={false}
      />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const { list } = form.getFieldsValue();
            setList(list.filter((i: Record<string, any>) => !!i));
          }}
        >
          提交
        </Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </>
  );
};
export default AntdEditableTable;
```

## API

### AntdTransfer

| 参数          | 说明                                                              | 类型                                                                         | 默认值 |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| idKey         | 穿梭框对应对应的key名称                                           | string                                                                       | key    |
| nameKey       | 穿梭框对应的title名称                                             | string                                                                       | title  |
| limitMaxCount | 限制上传个数                                                      | number                                                                       | 0      |
| dataSource    | 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 | Array<{}>                                                                    | [ ]    |
| value         | 穿梭框右侧的targetKeys                                            | string[]                                                                     | [ ]    |
| onChange      | 选项在两栏之间转移时的回调函数                                    | (targetKeys: string[], options: any[])=>void                                 |        |
| antdProps     | antd Transfer属性                                                 | [TransferProps](https://ant-design.antgroup.com/components/transfer-cn/#API) |        |