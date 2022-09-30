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

// export const renderTableField = (row: any, dataIndex: any) => ({
//   children: row[dataIndex],
//   props: { rowSpan: row[`${dataIndex}RowSpan`] },
// });

/**
 * data追加 `${dataIndex}RowSpan`
 * @param data 表格数据
 * @param dataIndexList 合并字段集合
 * @returns
 */
export const mergeTableRows = <DataType extends Record<string, any>>(
  data: DataType[],
  dataIndexList: string[]
) =>
  dataIndexList.reduce(
    (pre: any[], dataIndex: string) => mergeRows(pre, dataIndex),
    data
  );

/**
 * columns.onCell 配合mergeTableRows使用
 * @param row 当前行数据对象
 * @param dataIndex 字段名称
 * @returns
 */
export const onCellTableField = <DataType extends Record<string, any>>(
  row: DataType,
  dataIndex: string[]
) => ({
  rowSpan: row[`${dataIndex}RowSpan`],
});
