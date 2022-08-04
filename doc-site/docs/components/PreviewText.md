---
  title: PreviewText 表单阅读态
  order: 1
---

# PreviewText 表单阅读态

>PreviewText 表单阅读态，主要是实现Input、Select、Tree等组件表单态与其阅读态互相切换。

## 代码演示

### PreviewText.Input

```tsx
/**
 * title: PreviewText.Input
 * transform: true
 * desc: PreviewText.Input 和 [Antd Input](https://ant-design.antgroup.com/components/input-cn/)用法完全一致，可以使用Antd Input组件的所有API。
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Input } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    return (
        <Space direction="vertical" >
            <Input
                value="Hello World!"
                allowClear
                previewMode={isPreviewText ? "text" : "form"}
            />
            <Button onClick={() => setIsPreviewText(!isPreviewText)}>切换</Button>
        </Space>
    );
};
```

### PreviewText.Select

```tsx
/**
 * title: PreviewText.Select
 * transform: true
 * desc: PreviewText.Select 和 [Antd Select](https://ant-design.antgroup.com/components/select-cn/)用法完全一致，可以使用Antd Select组件的所有API。
 */
import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Select } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            sex: { label: "男", value: "male" },
            likes: [{ label: "看书", value: "0" }, { label: "跑步", value: "1" }],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="性别"
                    name="sex"
                >
                    <Select
                        allowClear
                        style={{ width: 300 }}
                        placeholder="请选择"
                        labelInValue
                    >
                        <Select.Option value="male">男</Select.Option>
                        <Select.Option value="female">女</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="个人喜好"
                    name="likes"
                >
                    <Select
                        allowClear
                        mode="multiple"
                        style={{ width: 300 }}
                        placeholder="请选择"
                        labelInValue
                    >
                        <Select.Option value="0">看书</Select.Option>
                        <Select.Option value="1">跑步</Select.Option>
                        <Select.Option value="2">打豆豆</Select.Option>
                    </Select>
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { sex, likes } = await form.validateFields();
                            if (sex && likes) {
                                message.success(`我性别 ${sex.label}，喜欢 ${likes.map((i: { label: string; }) => i.label).join("、")}`);
                            }
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};
```