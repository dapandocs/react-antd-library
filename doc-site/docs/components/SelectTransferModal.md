# SelectTransferModal 弹框式选择器

>SelectTransferModal 弹框式选择器，主要实现在满足表单布局的同时，又可以兼顾展示可选项的更多信息。

## 代码演示

### 基本用法

```tsx
/**
 * title: 基本用法
 * transform: true
 */
import React from 'react';
import { Button, Space, Form, message } from 'antd';
import { SelectTransferModal } from '@react-spy/antd';

const list = [
    { key: '1', title: '张三' },
    { key: '2', title: '李四' },
    { key: '3', title: '小明' },
    { key: '4', title: '小红' },
    { key: '5', title: '小兰' },
];

export default () => {

    const [form] = Form.useForm();

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label="晋级名单"
                name="personList"
            >
                <SelectTransferModal dataSource={list} />
            </Form.Item>
            <Space>
                <Button onClick={() => form.resetFields()}>重置</Button>
                <Button
                    type="primary"
                    onClick={async () => {
                        const { personList } = await form.validateFields();
                        if (Array.isArray(personList)) {
                            const personNameList = list.filter(item => personList.includes(item.id))
                                .map(item => item.name)
                                .join('，');
                            message.success(`晋级名单：${personNameList}`);
                        }
                    }}
                >
                    查询
                </Button>
            </Space>
        </Form>
    );
};
```