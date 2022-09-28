export const arrayUtils = {
  arrayMoveMutate: (array: string[], from: number, to: number) => {
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  },

  arrayMove: (array: any[], from: number, to: number) => {
    array = array.slice();
    arrayUtils.arrayMoveMutate(array, from, to);
    return array;
  },
};
