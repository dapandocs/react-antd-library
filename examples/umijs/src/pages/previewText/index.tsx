import React, { useEffect } from "react";
import {
    PreviewText
} from '../../../../../src';
import { Input, Form, Button } from 'antd';
import styles from './index.less';

const PreviewTextPage = (props: any) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            test: "1000"
        });
    }, []);

    return (
        <div style={{ padding: "5% 15%" }}>
            <PreviewText mode="text">
                <Form layout="horizontal" form={form}>
                    <Form.Item label="测试" name="test">
                        <PreviewText.Input
                            placeholder="请输入"
                            suffix="万元"
                            previewPlaceholder="预览"
                            // className={styles.font}
                            style={{ color: "red" }}
                        />
                    </Form.Item>
                    <Form.Item label="测试2" name="test2" labelCol={{ span: 24 }}>
                        <PreviewText.Input
                            placeholder="请输入"
                            suffix="万元"
                            previewPlaceholder="预览"
                            className={styles.font}
                            mode="form"
                        />
                    </Form.Item>
                </Form>
            </PreviewText>
            <Button
                onClick={async () => {
                    const values = await form.validateFields();
                    console.log("values", values);
                }}
            >
                提交
            </Button>
        </div>
    );
};
export default PreviewTextPage;