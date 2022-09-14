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
            minColWidth: 40,
            isHasExcelTitle: true,
            renderExcelTitleStyle: (v: string) => {
                // 设置标题样式
                return {
                    v,
                    s: {
                        alignment: { horizontal: "center" },
                        font: {
                            bold: true, // 加粗
                            sz: 12, // 字号14
                            color: {
                                rgb: 'f81d22' // 字体颜色
                            }
                        },
                        fill: {
                            fgColor: {
                                rgb: 'e2e2e2'
                            },
                        }
                    },
                }
            },
            renderColumnTitleStyle: (v: string) => {
                // 设置表头样式
                return {
                    v,
                    s: {
                        alignment: { horizontal: "center" },
                        font: {
                            bold: true, // 加粗
                            sz: 12, // 字号14
                            color: {
                                rgb: 'ad2102' // 字体颜色
                            }
                        },
                        fill: {
                            fgColor: {
                                rgb: 'ffffb8'
                            },
                            underline: true,
                        },
                        border: {
                            top: { style: 'dashDotDot', color: { rgb: '4b0082' } },
                            right: { style: 'thick', color: { rgb: '4b0082' } },
                            bottom: { style: 'thick', color: { rgb: '4b0082' } },
                            left: { style: 'thick', color: { rgb: '4b0082' } }
                        }
                    },
                }
            },
            renderCellStyle: (v: string, rowIndex: number, colIndex: number) => {
                // 设置数据单元格样式
                return {
                    v,
                    s: {
                        alignment: { horizontal: colIndex % 2 === 0 ? "left" : "right" },
                        font: {
                            color: {
                                rgb: '000000' // 字体颜色
                            }
                        },
                        fill: {
                            fgColor: {
                                rgb: colIndex % 2 === 0 ? "69c0ff" : "8c8c8c"
                            },
                        },
                        border: {
                            top: { style: 'thin', color: { rgb: '1890ff' } },
                            right: { style: 'thin', color: { rgb: '1890ff' } },
                            bottom: { style: 'thin', color: { rgb: '1890ff' } },
                            left: { style: 'thin', color: { rgb: '1890ff' } }
                        }
                    },
                }
            },
        });
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={downloadExcel}
            >
                导出Excel(设置样式)
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={false} />
        </div>
    );
};
export default exportUser;