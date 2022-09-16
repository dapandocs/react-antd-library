const mergeRows = (data: any[], dataIndex: string) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }
    return data.reduce((pre: any[], cur: any) => {
        if (!pre.includes(cur[dataIndex])) {
            pre.push(cur[dataIndex]);
        }
        return pre;
    }, []).reduce((pre: string[] | number[], cur: string | number) => {
        const children = data.filter(item => item[dataIndex] === cur);
        const newChildren = children.map((item: any, index: number) => ({
            ...item,
            [`${dataIndex}RowSpan`]: index === 0 ? children.length : 0,
        }));
        return [...pre, ...newChildren];
    }, []);
}

export const tableUtils = {
    // eg: 在clumns.render返回 { children: t, props: { rowSpan: row.nameRowSpan }}
    mergeTableRows: (data: any[], dataIndexList: string[]) => (data: any[], dataIndexList: string[]) => dataIndexList.reduce((pre: any[], dataIndex: string) => mergeRows(pre, dataIndex), data),
};