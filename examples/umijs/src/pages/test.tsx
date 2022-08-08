import React from 'react';
import { Button, Space, Form, message } from 'antd';
// import { SelectTransferModal } from '@react-spy/antd';
import { SelectTransferModal } from '../../../../src';

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
                <SelectTransferModal
                    dataSource={list}
                    idKey="key"
                    nameKey="title"
                />
            </Form.Item>
            <Space>
                <Button onClick={() => form.resetFields()}>重置</Button>
                <Button
                    type="primary"
                    onClick={async () => {
                        const { personList } = await form.validateFields();
                        if (Array.isArray(personList)) {
                            const personNameList = list.filter(item => personList.includes(item.key))
                                .map(item => item.title)
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