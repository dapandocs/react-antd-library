import React from 'react';
import { Button, Table } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from 'react-antd-library';

const exportUser = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            exportRender: (record: any) => {
                return `我的年龄是：${record.age}`
            },
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const downloadExcel = () => {
        exportUtils.jsonToExcel(XLSX, {
            columns,
            data: dataSource,
            fileName: "用户列表",
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel(数据处理)
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;