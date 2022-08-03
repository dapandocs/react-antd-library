import React from 'react';
import { AntdTransfer } from '@react-spy/antd';

const data = Array.from({ length: 20 }).map((_, index) => ({
    key: `${index}`,
    title: `张三${index + 1}`,
    description: `description of content${index + 1}`,
}));

export default () => {

    const style = { color: "red", fontSize: 17 };
    
    return (
        <AntdTransfer
            antdProps={{
                showSearch: false,
                titles: [
                    <span style={style}>待选区</span>,
                    <span style={style}>已选区</span>,
                ]
            }}
            dataSource={data}
        />
    );
};