/**
 * 树形数据forEach遍历
 * @param data
 * @param childrenName
 * @param callback
 * @param level
 */
export const forEachTree = <TreeDataType extends Record<string, any>>(
  data: TreeDataType[],
  callback: (node: TreeDataType, level: number) => void,
  childrenName: string = "children",
  level: number = 1
) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  for (let i = 0; i < data.length; i++) {
    callback(data[i], level);
    if (data[i][childrenName] && data[i][childrenName].length > 0) {
      forEachTree(data[i][childrenName], callback, childrenName, level + 1);
    }
  }
};

/**
 * 树形数据map遍历
 * @param data
 * @param callback (node: any) => ({ id: node.key, name: node.title })
 * @param childrenFieldNames
 * @param level
 * @returns
 */
export const mapTree = <TreeDataType extends Record<string, any>>(
  data: TreeDataType[],
  callback: (node: TreeDataType, level: number) => TreeDataType,
  childrenFieldNames: { from: string; to: string } = {
    from: "children",
    to: "children",
  },
  level: number = 1
): TreeDataType[] => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  const resultTree: TreeDataType[] = [];
  const mapTreeResult = (
    node: TreeDataType,
    callback: (node: TreeDataType, level: number) => TreeDataType,
    childrenFieldNames: { from: string; to: string } = {
      from: "children",
      to: "children",
    },
    level: number = 1
  ) => {
    const mappedNode = callback(node, level);
    if (
      node[childrenFieldNames.from] &&
      node[childrenFieldNames.from].length > 0
    ) {
      const children = node[childrenFieldNames.from].map(
        (child: TreeDataType) =>
          mapTreeResult(child, callback, childrenFieldNames, level + 1)
      );
      return { ...mappedNode, [childrenFieldNames.to]: children };
    }
    return { ...mappedNode };
  };
  for (let i = 0; i < data.length; i++) {
    const result: any = mapTreeResult(
      data[i],
      callback,
      childrenFieldNames,
      level
    );
    resultTree.push(result);
  }
  return resultTree;
};

/**
 * 树形数据filter遍历
 * @param data
 * @param callback
 * @param childrenName
 * @param level
 * @returns
 */
export const filterTree = <TreeDataType extends Record<string, any>>(
  data: TreeDataType[],
  callback: (node: TreeDataType, level: number) => boolean,
  childrenName: string = "children",
  level: number = 1
) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  const resultTree = [];
  for (let i = 0; i < data.length; i++) {
    if (callback(data[i], level)) {
      resultTree.push({ ...data[i] });
      if (data[i][childrenName] && data[i][childrenName].length > 0) {
        filterTree(data[i][childrenName], callback, childrenName, level + 1);
      }
    }
  }
  return resultTree;
};
