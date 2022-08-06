import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import { PreviewText } from '@react-spy/antd';

const { Radio, RadioGroup } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            skills: ["0", "1"],
            likes: ["0"],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="技能"
                    name="skills"
                >
                    <RadioGroup>
                        <Radio value="0">会做饭</Radio>
                        <Radio value="1">会开车</Radio>
                        <Radio value="2">会打篮球</Radio>
                    </RadioGroup>
                </Form.Item>
                <Form.Item
                    label="个人喜好"
                    name="likes"
                >
                    <RadioGroup
                        options={[
                            {
                                label: "看书",
                                value: "0",
                            },
                            {
                                label: "跑步",
                                value: "1",
                            },
                            {
                                label: "打豆豆",
                                value: "2",
                            }
                        ]}
                    />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { skills, likes } = await form.validateFields();
                            message.success(`技能：${skills.join(",")} --------- 喜好：${likes.join(",")}`);
                        }}
                    >
                        查询
                    </Button>
                </Space>
            </Form>
        </PreviewText>
    );
};