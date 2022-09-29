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

### 设置最小行数

```tsx
/**
 * title: 设置最小行数
 * transform: true
 * desc: 可通过设置minRowNumber，当行数小于等于最小行数，默认删除按钮将disable。
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
      align: "center",
    },
  ];
  return (
    <>
      <EditableTable
        form={form}
        columns={columns}
        dataSource={dataSource}
        minRowNumber={1}
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

### 与 FormItem 配合设置表单校验

```tsx
/**
 * title: 与 FormItem 配合设置表单校验
 * transform: true
 * desc: 可通过设置columns.formItemProps，设置列表单的FormItem参数。
 */
import React from "react";
import { Form, Button, Space } from "antd";
import { EditableTable, EditableTableColumns } from "react-antd-library";

const dataSource = [
  {
    key: "1",
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
          allowClear: true,
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
      formItemProps: (form, { rowIndex }) => {
        if (rowIndex === 0) {
          // 仅第一行做必填校验
          return {
            rules: [{ message: "请选择", required: true }],
          };
        }
        return {};
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      valueType: "inputNumber",
      formItemProps: {
        rules: [{ message: "请输入", required: true }],
      },
    },
    {
      title: "住址",
      dataIndex: "address",
    },
    {
      title: "操作",
      valueType: "option",
      align: "center",
    },
  ];
  const getColumns = React.useMemo(() => columns, []);
  return (
    <>
      <EditableTable
        form={form}
        columns={getColumns}
        dataSource={dataSource}
        showAddButton={false}
      />
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={async () => {
            const { list } = await form.validateFields();
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

### 自定义操作栏

```tsx
/**
 * title: 自定义操作栏
 * transform: true
 * desc: 可通过设置columns.render，可自定义操作栏。
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
  const [curList, setCurList] = React.useState([]);
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
      align: "center",
      render: (t, row, index, action) => {
        return (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                action.insert(index + 1, {});
              }}
            >
              下方插入一行
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                const { list } = form.getFieldsValue();
                const curRow = list[action.getKey(index)];
                action?.push(curRow);
              }}
            >
              复制此行到末尾
            </Button>
            <Button
              type="link"
              size="small"
              danger
              disabled={curList.length <= 1}
              onClick={() => {
                if (action?.remove) {
                  action.remove(index);
                }
              }}
            >
              删除当前行
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <EditableTable
        form={form}
        columns={columns}
        dataSource={dataSource}
        onRowChange={(t) => setCurList(t)}
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

### 自定义添加按钮及数据控制

```tsx
/**
 * title: 自定义添加按钮及数据控制
 * transform: true
 */
import React from "react";
import { Form, Button, Space } from "antd";
import {
  EditableTable,
  EditableTableColumns,
  onActionOptions,
} from "react-antd-library";

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
  const [action, setAction] = React.useState<onActionOptions>({});
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
      align: "center",
    },
  ];
  return (
    <>
      <Space>
        <Button type="primary" onClick={() => action.push({})}>
          新增一行
        </Button>
        <Button type="primary" danger onClick={() => action.resetList([])}>
          全部删除
        </Button>
      </Space>
      <EditableTable
        form={form}
        columns={columns}
        dataSource={dataSource}
        showAddButton={false}
        onAction={(at) => setAction(at)}
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

### 与Form表单配合使用

```tsx
/**
 * title: 与Form表单配合使用
 * transform: true
 */
import React from "react";
import { Form, Button, Space, Select } from "antd";
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
  const [userInfo, setUserInfo] = React.useState({});
  const columns: EditableTableColumns<RecordItem>[] = [
    {
      title: "姓名",
      dataIndex: "name",
      valueType: "select",
      antdComponentProps: {
        select: {
          allowClear: true,
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
      align: "center",
    },
  ];

  const getColumns = React.useMemo(() => columns, []);
  
  return (
    <>
      <Form form={form}>
        <Form.Item label="班级" name="className" initialValue="一年级">
          <Select placeholder="请选择">
            <Select.Option key="1" value="一年级">
              一年级
            </Select.Option>
            <Select.Option key="2" value="二年级">
              二年级
            </Select.Option>
            <Select.Option key="3" value="三年级">
              三年级
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <EditableTable
        form={form}
        columns={getColumns}
        dataSource={dataSource}
        listName="userList"
      />
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      <Space>
        <Button
          type="primary"
          onClick={async () => {
            const values = await form.validateFields();
            const { userList } = values;
            if (Array.isArray(userList)) {
              Object.assign(values, {
                userList: userList.filter((i: RecordItem) => !!i),
              });
            }
            setUserInfo(values);
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

### EditableTable

| 参数          | 说明                 | 类型                                                                                                                           | 默认值 |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| showAddButton | 是否显示添加一行按钮 | boolean                                                                                                                        | `true` |
| form          | `Form` 实例          | -                                                                                                                              | -      |
| minRowNumber  | 最小行数             | number                                                                                                                         | 0      |
| listName      | 表格数据对象名称     | string                                                                                                                         | `list` |
| onAction      | 自定义操作           | ( action: [onActionOptions](https://react-spy.gitee.io/react-antd-library/components/editable-table#onactionoptions) ) => void | -      |
| onRowChange   | 行数变化时的回调函数 | ( list: DateType[] ) => void                                                                                                   |        |

其它Table参数请参考：[Antd Table](https://ant-design.antgroup.com/components/table-cn/#API)

### Column

| 参数               | 说明             | 类型                                                                                                                                                      | 默认值  |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| isEditable         | 是否编辑         | boolean                                                                                                                                                   | `true`  |
| isHidden           | 是否隐藏         | boolean                                                                                                                                                   | `false` |
| valueType          | 值类型           | `input` \| `select`  \| `inputNumber`  \| `datePicker`  \| `timePicker`  \| `checkboxGroup`  \| `radioGroup`  \| `cascader`  \| `treeSelect`  \| `option` | `input` |
| antdComponentProps | 组件参数         | [AntdComponentProps](https://react-spy.gitee.io/react-antd-library/components/editable-table#antdcomponentprops)                                          | 0       |
| formItemProps      | FormItem参数     | ( form, config )=>  FormItemProps \| FormItemProps                                                                                                        | { }     |
| render             | 自定义渲染操作栏 | ( text, row, index, action) =>React.ReactNode                                                                                                             | -       |

其它Column参数请参考：[Antd Table Column](https://ant-design.antgroup.com/components/table-cn/#Column)

### AntdComponentProps
```
{
    input?: InputProps;
    select?: SelectProps;
    inputNumber?: InputNumberProps;
    datePicker?: DatePickerProps;
    timePicker?: TimePickerProps;
    checkboxGroup?: CheckboxGroupProps;
    radioGroup?: RadioGroupProps;
    cascader?: CascaderProps<T>;
    treeSelect?: TreeSelectProps;
}
```

### onActionOptions
```
{
  insert?: (index: number, item: any[]) => void;
  replace?: (index: number, item: any[]) => void;
  remove?: (index: number) => void;
  getKey?: (index: number) => number;
  push?: (item: any) => void;
  sortList?: (result: any[]) => any[];
  resetList?: (newList: any[]) => void;
}
```