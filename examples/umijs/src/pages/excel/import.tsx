/**
 * 导入Excel
 */
import { useSetState } from 'ahooks';
import { Table, Button } from 'antd';
import { ButtonUpload } from 'react-antd-library';
import XLSX from 'xlsx-js-style';
import { importUtils } from '../../../../../src'


const ExcelPage = () => {

    const [state, setState] = useSetState<any>({
        list: [],
    });
    const { list } = state;

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


    return (
        <div>
            <ButtonUpload
                onChange={(files: any[]) => {
                    importUtils.excelToJson(XLSX, {
                        columns,
                        file: files[0],
                        onLoadEnd: (jsonData) => {
                            console.log("jsondata", jsonData);
                            setState({ list: jsonData });
                        }
                    });
                }}
            />
            <Table dataSource={list} columns={columns} rowKey="__rowNum__" pagination={false} />
        </div>
    );
};
export default ExcelPage;