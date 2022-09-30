export const arrayMoveMutate = <DataType extends Record<string, any>>(
  array: DataType[],
  from: number,
  to: number
) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

/**
 * 数组交换位置
 * @param array 数组
 * @param from 开始位置
 * @param to 结束位置
 * @returns
 */
export const arrayMove = <DataType extends Record<string, any>>(
  array: DataType[],
  from: number,
  to: number
) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};
