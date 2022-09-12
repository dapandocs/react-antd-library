import qs from 'querystring';
import { message } from 'antd';

type downloadFileOptions = {
    url: string,
    method?: "get" | "post",
    data?: {
        [k: string]: any,
    },
    headers?: {
        Authorization?: string;
        [k: string]: any;
    },
    fileName?: string; // eg:xxxyyy.xlsx
    callback?: (downloading: boolean) => void;
};

type jsonToExcelOptions = {
    fileName: string;
    isHasExcelTitle?: boolean;
    isHasColumnTitle?: boolean;
    minColWidth?: number;
    data: any[];
    columns: Array<{
        title: string;
        dataIndex: string;
        [k: string]: any;
    }>;
    fieldNames?: {
        title: string;
        dataIndex: string;
    };
    renderExcelTitleStyle?: (cellValue: string) => string | { [k: string]: any },
    renderColumnTitleStyle?: (cellValue: string, colIndex: number) => string | { [k: string]: any },
    renderCellStyle?: (cellValue: string, rowIndex: number, colIndex: number) => string | { [k: string]: any },
};

export const exportUtils = {
    // response.setContentType("application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"); //设置文件类型，这里以.xlsx为例
    //设置文件的原文件名，若文件名中含有中文则需要解码，否则会出现乱码
    // response.setHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(fileName, "utf-8"));
    // 这步很关键，需要在给前端返回的请求头中添加Content-Disposition字段
    // response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    downloadFile: async ({
        url,
        method = "get",
        data = {},
        headers = {},
        fileName,
        callback,
    }: downloadFileOptions) => {
        const params = method === "post" ? { body: JSON.stringify(data) } : {};
        const queryUrl = method === "get" ? `${url}?${qs.stringify(data)}` : url;
        if (typeof callback === "function") {
            callback(true);
        }
        const response: any = await fetch(queryUrl, {
            method,
            ...params,
            // @ts-ignore
            headers: {
                ...headers,
                "Content-Type": 'application/json',
            }
        });
        if (response.status === 200) {
            let newFileName;
            if (fileName && fileName.indexOf(".") > 0) {
                newFileName = fileName;
            } else {
                try {
                    if (response.headers.get("content-disposition")) {
                        newFileName = response.headers.get("content-disposition").split(";")[1].split("filename=")[1];
                    }
                } catch (error) {
                    console.log("exportUtils Error:", error);
                }
            }
            if (!newFileName) {
                if (typeof callback === "function") callback(false);
                message.info("文件名称为空");
                return;
            }
            const fileBlob = await response.blob();
            if (fileBlob.size === 0) {
                if (typeof callback === "function") callback(false);
                message.info("文件下载失败");
                return;
            }
            if (typeof callback === "function") callback(false);
            const blob = new Blob([fileBlob], { type: "application/octet-stream" });
            const objectURL = URL.createObjectURL(blob);
            let btn: any = document.createElement('a');
            btn.download = decodeURI(newFileName);
            btn.href = objectURL;
            btn.click();
            URL.revokeObjectURL(objectURL);
            btn = null;
        }
    },
    jsonToExcel: (XLSX: any, options: jsonToExcelOptions) => {
        const {
            fileName = "附件",
            isHasExcelTitle = false,
            isHasColumnTitle = true,
            minColWidth = 4,
            columns,
            data,
            fieldNames = {
                title: "title",
                dataIndex: "dataIndex",
            },
            renderExcelTitleStyle,
            renderColumnTitleStyle,
            renderCellStyle,
        } = options;
        if (!XLSX || !XLSX.utils) {
            message.info("缺少XLSX参数");
            return;
        }
        if (!columns) {
            message.info("缺少columns参数");
            return;
        }
        if (!data) {
            message.info("缺少data参数");
            return;
        }

        // 筛选columns
        const newColumns = columns.filter((cs: any) => cs.hiddenInExcel !== true);

        // 表格数据
        const rows = [];
        if (isHasExcelTitle) {
            const firstRow = [];
            if (typeof renderExcelTitleStyle === "function") {
                const renderStyleObj = renderExcelTitleStyle(fileName);
                firstRow.push(renderStyleObj || fileName);
            } else {
                firstRow.push({
                    v: fileName,
                    s: {
                        alignment: { horizontal: "center" },
                        font: {
                            bold: true, // 加粗
                            sz: 14, // 字号14
                        }
                    },
                });
            }
            firstRow.push(...Array.from({ length: newColumns.length - 1 }).fill(null));
            rows.push(firstRow);
        }

        // 表头
        if (isHasColumnTitle) {
            const columnsTitle = newColumns.map((column: any, index: number) => {
                if (typeof renderColumnTitleStyle === "function") {
                    const renderStyleObj = renderColumnTitleStyle(column[fieldNames.title], index);
                    return renderStyleObj || column[fieldNames.title];
                }
                return {
                    v: column[fieldNames.title],
                    s: {
                        alignment: { horizontal: "center" },
                        font: {
                            bold: true, // 加粗
                            sz: 12, // 字号14
                        }
                    }
                };
            });
            rows.push(columnsTitle);
        }

        // 列宽
        const colsWidth: any = [];
        data.forEach((item: any, rowIndex: number) => {
            const row = newColumns.map((column, index: number) => {
                // 设置单元格自动宽度
                let value: string;
                if (typeof column.exportRender === "function") {
                    value = column.exportRender(item)?.toString();
                } else {
                    value = item[column[fieldNames.dataIndex]]?.toString();
                }
                if (value) {
                    let curColWidth = minColWidth;
                    if (value.charCodeAt(0) > 255) {
                        // 中文,(value.length * 2 + 1)留出一个汉字的宽度
                        curColWidth = Math.max((value.length * 2 + 2), colsWidth[index]?.wch ? colsWidth[index].wch : minColWidth);
                    } else {
                        // 英文和数字，留出一个汉字的宽度
                        curColWidth = Math.max(value.length + 2, colsWidth[index]?.wch ? colsWidth[index].wch : minColWidth);
                    }
                    if (!colsWidth[index]?.wch) {
                        colsWidth.push({
                            wch: curColWidth,
                        });
                    } else {
                        colsWidth[index].wch = curColWidth;
                    }
                }
                if (typeof renderCellStyle === "function") {
                    return renderCellStyle(value, rowIndex, index);
                }
                return {
                    v: value,
                    s: {
                        alignment: { horizontal: "center" },
                    },
                };
            });
            rows.push(row);
        });

        // 创建worksheet
        const ws: any = XLSX.utils.aoa_to_sheet(rows);

        if (isHasExcelTitle) {
            // 合并单元格
            ws["!merges"] = [
                // 设置单元格合并
                {
                    // 开始
                    s: {
                        r: 0, // 开始row
                        c: 0 // 开始cOl
                    },
                    // 结束
                    e: {
                        r: 0,
                        c: newColumns.length - 1
                    }
                }
            ]
        }
        // 设置列宽
        ws['!cols'] = colsWidth;
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, fileName);

        // 生成xlsx文件
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
};