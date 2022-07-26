import React from 'react';
import {
    SelectTransferModal,
    ButtonUpload,
} from '../../../../../src';
// import { SelectTransferModal } from '@react-spy/antd';
import {
    Form,
    Input,
    Select,
    Button,
    Space,
} from 'antd';

const list = [
    { id: '1', name: '张三' },
    { id: '2', name: '李四' },
    { id: '3', name: '小明' },
    { id: '4', name: '小红' },
    { id: '5', name: '小兰' },
];

export default () => {

    const [form] = Form.useForm();

    return (
        <Form layout="vertical" form={form} style={{ padding: "5% 25%" }}>
            <Form.Item name="file" label="附件">
                <ButtonUpload
                    acceptUploadType={[]}
                    // isShowUploadEntry={false}
                    antdButtonProps={{
                        children: "上传附件按钮"
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        重置
                    </Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const values = await form.validateFields();
                            console.log(values);
                        }}
                    >
                        提交
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            form.setFieldsValue({
                                userName: "王强",
                                userSex: "male",
                                manageName: ["2", "3"]
                            });
                        }}
                    >
                        填充
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}