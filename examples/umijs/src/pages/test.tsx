import React, { useState, useEffect } from 'react';
import { Button, Space, Form, message } from 'antd';
import moment from 'moment';
import { PreviewText } from '@react-spy/antd';

const { TimePicker, TimeRangePicker } = PreviewText;

export default () => {

    const [isPreviewText, setIsPreviewText] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            time: moment('12:00:00', 'HH:mm:ss'),
            ranageTime: [moment('12:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
        });
    }, []);

    return (
        <PreviewText previewMode={isPreviewText ? "text" : "form"}>
            <Form form={form}>
                <Form.Item
                    label="时间"
                    name="time"
                >
                    <TimePicker placeholder='请选择' />
                </Form.Item>
                <Form.Item
                    label="时间周期"
                    name="ranageTime"
                >
                    <TimeRangePicker placeholder={["请选择开始时间", "请选择结束时间"]} />
                </Form.Item>
                <Space>
                    <Button onClick={() => setIsPreviewText(!isPreviewText)} type="dashed">切换</Button>
                    <Button onClick={() => form.resetFields()}>重置</Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            const { time, ranageTime } = await form.validateFields();
                            if (time && ranageTime) {
                                const format = "HH:mm:ss";
                                message.success(`时间: ${moment(time).format(format)} 时间周期: ${moment(ranageTime[0]).format(format)} ~ ${moment(ranageTime[1]).format(format)}`);
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