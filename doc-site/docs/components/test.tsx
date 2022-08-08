import React, { useState } from 'react';
import { Button, Space, Form, Modal } from 'antd';
// import { SelectTransferModal } from '@react-spy/antd';
// import { SelectTransferModal,ButtonTransferModal } from '../../../../src';

const list = [
    { key: '1', title: '张三' },
    { key: '2', title: '李四' },
    { key: '3', title: '小明' },
    { key: '4', title: '小红' },
    { key: '5', title: '小兰' },
];

export default () => {
    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    return (
        <div>
            <Modal
                title="测试"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                333
            </Modal>
            <Button type="primary" onClick={() => setVisible(true)}>测试</Button>
        </div>
    );
};