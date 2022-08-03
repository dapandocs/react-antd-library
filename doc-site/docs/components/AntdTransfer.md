---
  title: AntdTransfer 穿梭框
  order: 1
---

# AntdTransfer 穿梭框

> 双栏穿梭选择框，比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 * desc: 最基本的用法，传入dataSource即可。
 */
import React from 'react';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    key: `${index}`,
    title: `张三${index + 1}`,
    description: `description of content${index + 1}`,
}));

export default () => {
    return (
        <AntdTransfer dataSource={data} />
    );
};
```

### 自定义数据源主键[key]和标题[title]

```tsx
/**
 * title: 自定义数据源主键[key]和标题[title]
 * transform: true
 * desc:  通过idKey、nameKey属性来更改默认数据源的key、title的名称。
 */
import React from 'react';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    id: `${index}`,
    name: `张三${index + 1}`,
    description: `description of content${index + 1}`,
}));

export default () => {
    return (
        <AntdTransfer
            idKey='id'
            nameKey='name'
            dataSource={data}
        />
    );
};
```

### 限制可选项数量

```tsx
/**
 * title: 限制可选项数量
 * transform: true
 * desc: 通过limitMaxCount属性来限制可选择的数量。
 */
import React from 'react';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    key: `${index}`,
    title: `张三${index + 1}--仅能选择2个`,
    description: `description of content${index + 1}`,
}));

export default () => {
    return (
        <AntdTransfer
            limitMaxCount={2}
            dataSource={data}
        />
    );
};
```

### 自动移入选择项

```tsx
/**
 * title: 自动移入选择项
 * transform: true
 * desc: 通过属性type='auto'，选择后自动移入右侧框。
 */
import React from 'react';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    key: `${index}`,
    title: `张三${index + 1}`,
    description: `description of content${index + 1}`,
}));

export default () => {
    return (
        <AntdTransfer
            type='auto'
            dataSource={data}
        />
    );
};
```

### 更改组件[Transfer]属性

```tsx
/**
 * title: 更改组件[Transfer]属性
 * transform: true
 * desc: 可以使用Antd Transfer组件的属性。。
 */
import React from 'react';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    key: `${index}`,
    title: `张三${index + 1}`,
    description: `description of content${index + 1}`,
}));

export default () => {

    const style = { color: "red", fontSize: 17 };
    
    return (
        <AntdTransfer
            antdProps={{
                showSearch: false,
                titles: [
                    <span style={style}>待选区</span>,
                    <span style={style}>已选区</span>,
                ]
            }}
            dataSource={data}
        />
    );
};
```

### 配合Form表单使用

```tsx
/**
 * title: 配合Form表单使用
 * transform: true
 * desc: 配合Form组件，轻松收集、修改附件数据，可同Input、Select组件一样将其看成表单。
 */
import React, { useEffect } from 'react';
import { Form, Space, Button, message } from 'antd';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    key: `${index}`,
    title: `张三${index + 1}`,
    description: `description of content${index + 1}`,
}));

export default () => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            waitingList: ['1', '2', '3'],
        });
    }, []);

    return (
        <Form layout="vertical" form={form}>
            <Form.Item label="待选名单" name="waitingList">
                <AntdTransfer
                    type="auto"
                    dataSource={data}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { waitingList } = await form.validateFields();
                            if (Array.isArray(waitingList) && waitingList.length) {
                                message.success(`您选择的名单是：${waitingList.map(i => `张三${Number(i) + 1}`).join('、')}`);
                                return;
                            }
                            message.success("您没有选择任何名单");
                        }}
                    >
                        提交
                    </Button>
                    <Button htmlType="reset">重置</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
```

## API

### AntdTransfer

| 参数          | 说明                                                              | 类型                                                                         | 默认值 |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| idKey         | 穿梭框对应对应的key名称                                           | string                                                                       | key    |
| nameKey       | 穿梭框对应的title名称                                             | string                                                                       | title  |
| limitMaxCount | 限制上传个数                                                      | number                                                                       | 0      |
| dataSource    | 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 | number                                                                       | [ ]    |
| value         | 穿梭框右侧的targetKeys                                            | string[]                                                                     | [ ]    |
| onChange      | 选项在两栏之间转移时的回调函数                                    | (targetKeys: string[], options: any[])=>void                                 |        |
| antdProps     | antd Transfer属性                                                 | [TransferProps](https://ant-design.antgroup.com/components/transfer-cn/#API) |        |