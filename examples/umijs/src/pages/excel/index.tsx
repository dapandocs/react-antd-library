/**
 * 导入导出表格
 */
import { Table, Button } from 'antd';
import XLSX from 'xlsx-js-style';
import { exportUtils } from '../../../../../src'


const ExcelPage = () => {

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
            hiddenInExcel: true,
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            exportRender: (item: any) => item.age
        },
    ];


    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    exportUtils.exportExcel(XLSX, {
                        columns,
                        dataSource,
                        fileName: "测试22222",
                        isHasTitle: true,
                        renderTitleStyle: (fn: string) => {
                            return {
                                v: fn,
                                s: {
                                    alignment: { horizontal: "center" },
                                    font: {
                                        bold: true, // 加粗
                                        sz: 14, // 字号14
                                        // color: {
                                        //     rgb: 'f81d22'
                                        // }
                                    },
                                    fill: {
                                        fgColor: {
                                            rgb: 'f81d22'
                                        },
                                    }
                                },
                            }
                        },
                        // renderCellStyle: (fn: string) => {
                        //     return {
                        //         v: fn,
                        //         s: {
                        //             alignment: { horizontal: "center" },
                        //             font: {
                        //                 bold: true, // 加粗
                        //                 color: {
                        //                     rgb: 'f81d22'
                        //                 }
                        //             },
                        //         },
                        //     }
                        // },
                    });
                }}
            >
                导出
            </Button>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};
export default ExcelPage;