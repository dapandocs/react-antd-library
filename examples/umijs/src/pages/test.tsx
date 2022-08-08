// import React from 'react';
// import { Button, Space, Form, message } from 'antd';
// import { SelectTransferModal } from '@react-spy/antd';

// const list = [
//     { key: '1', title: '张三' },
//     { key: '2', title: '李四' },
//     { key: '3', title: '小明' },
//     { key: '4', title: '小红' },
//     { key: '5', title: '小兰' },
// ];

// export default () => {

//     const [form] = Form.useForm();

//     return (
//         <Form form={form} layout="vertical">
//             <Form.Item
//                 label="晋级名单"
//                 name="personList"
//             >
//                 <ButtonTransferModal
//                     dataSource={list}
//                     idKey="key"
//                     nameKey="title"
//                 />
//             </Form.Item>
//             <Space>
//                 <Button onClick={() => form.resetFields()}>重置</Button>
//                 <Button
//                     type="primary"
//                     onClick={async () => {
//                         const { personList } = await form.validateFields();
//                         if (Array.isArray(personList)) {
//                             const personNameList = list.filter(item => personList.includes(item.key))
//                                 .map(item => item.title)
//                                 .join('，');
//                             message.success(`晋级名单：${personNameList}`);
//                         }
//                     }}
//                 >
//                     查询
//                 </Button>
//             </Space>
//         </Form>
//     );
// };

import React, { useState } from 'react';
import { Button, Space, Form, Modal } from 'antd';
import { SelectTransferModal } from '@react-spy/antd';
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
        <Form form={form} layout="vertical">
            <Modal
                title="测试"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                333
            </Modal>
            <Button type="primary" onClick={()=>setVisible(true)}>测试</Button>
        </Form>
    );
};