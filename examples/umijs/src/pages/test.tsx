import React from 'react';
import { Tag, Space } from 'antd';
import { ButtonTransferModal } from '@react-spy/antd';

const list = [
    { key: '1', title: '张三' },
    { key: '2', title: '李四' },
    { key: '3', title: '小明' },
    { key: '4', title: '小红' },
    { key: '5', title: '小兰' },
];

export default () => {
    const [selectedList, setSelectedList] = React.useState<any>([]);

    return (
        <Space direction="vertical">
            <ButtonTransferModal
                dataSource={list}
                idKey="key"
                nameKey="title"
                antdButtonProps={{
                    type: 'primary',
                    children: '选择名单',
                }}
                onOk={(v: any[], l: any[]) => setSelectedList(l)}
            />
            <div>
                {
                    selectedList.map((item: any) => {
                        return <Tag key={item.key} color="#f50">{item.title}</Tag>;
                    })
                }
            </div>
        </Space>
    );
};