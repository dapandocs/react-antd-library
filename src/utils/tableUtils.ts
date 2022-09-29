const mergeRows = (data: any[], dataIndex: string) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  return data
    .reduce((pre: any[], cur: any) => {
      if (!pre.includes(cur[dataIndex])) {
        pre.push(cur[dataIndex]);
      }
      return pre;
    }, [])
    .reduce((pre: string[] | number[], cur: string | number) => {
      const children = data.filter((item) => item[dataIndex] === cur);
      const newChildren = children.map((item: any, index: number) => ({
        ...item,
        [`${dataIndex}RowSpan`]: index === 0 ? children.length : 0,
      }));
      return [...pre, ...newChildren];
    }, []);
};

export const tableUtils = {
  mergeTableRows: (data: any[], dataIndexList: string[]) =>
    dataIndexList.reduce(
      (pre: any[], dataIndex: string) => mergeRows(pre, dataIndex),
      data
    ),
  // renderTableField: (row: any, dataIndex: any) => ({
  //   children: row[dataIndex],
  //   props: { rowSpan: row[`${dataIndex}RowSpan`] },
  // }),
  onCellTableField: (row: any, dataIndex: any) => ({
    rowSpan: row[`${dataIndex}RowSpan`],
  }),
};
