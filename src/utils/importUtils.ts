import { message } from 'antd';

type jsonToExcelOptions = {
    file: File; // 附件
    fieldNames?: {
        title: string;
        dataIndex: string;
    };
    onLoadEnd?: (jsonData: any[]) => void;
    columns: Array<{
        title: string;
        dataIndex: string;
        [k: string]: any;
    }>;
};

export const importUtils = {
    excelToJson: (XLSX: any, options: jsonToExcelOptions) => {
        const {
            file,
            columns,
            fieldNames = {
                title: "title",
                dataIndex: "dataIndex",
            },
            onLoadEnd,
        } = options;
        if (!XLSX || !XLSX.utils) {
            message.info("缺少XLSX参数");
            return;
        }
        if (!file) {
            message.info("缺少excel文件");
            return;
        }
        if (!columns) {
            message.info("缺少columns参数");
            return;
        }
        const reader = new FileReader();
        // 文件加载完成后调用
        reader.onload = function (e: any) {
            const data = e.target.result;

            const workbook = XLSX.read(data, {     //手动转化
                type: 'binary'
            });
            //获取json格式的Excel数据
            const result = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                defval: 'null'  // 单元格为空时的默认值
            });
            if (Array.isArray(result) && result.length) {
                result.forEach((item: any) => {
                    columns.forEach((c: any) => {
                        item[c[fieldNames.dataIndex]] = item[c[fieldNames.title]];
                        delete item[c[fieldNames.title]];
                    });
                });
            }
            if (typeof onLoadEnd === "function") {
                onLoadEnd(result);
            }
        };
        //加载文件
        reader.readAsArrayBuffer(file);
    }
};