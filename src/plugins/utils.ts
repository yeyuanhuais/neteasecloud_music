export function useNumberFormat(number: number): string | number {
  if (number > 100000000) {
    return Number((number / 100000000).toFixed(1)) + " 亿";
  }
  if (number > 10000000) {
    return Number((number / 10000000).toFixed(1)) + " 千万";
  }
  if (number > 10000) {
    return Number((number / 10000).toFixed(1)) + " 万";
  }
  return number;
}

export function useFormatDuring(during: number) {
  const s = Math.floor(during) % 60;
  during = Math.floor(during / 60);
  const i = during % 60;
  const ii = i < 10 ? `0${i}` : i;
  const ss = s < 10 ? `0${s}` : s;
  return ii + ":" + ss;
}
/* ======== 数组转树形 ======== */
export function listToTree(list: any[], key: string | number, parentKey: string | number, oneParent: any = 0) {
  const tree = list.filter(parent => {
    const branchArr = list.filter(child => parent[key] === child[parentKey]);
    parent.children = [];
    if (branchArr.length > 0) {
      parent.children = branchArr;
    }
    return parent[parentKey] == oneParent;
  });
  return tree;
}
/* ======== 树形转数组 ======== */
export function treeTransList(tree: any[] = [], childName = "children") {
  // 设置临时数组，用来存放队列
  let queen: any[] = [];
  // 设置输出数组，用来存放要输出的一维数组
  const result = [];
  queen = queen.concat(tree);
  // 对树对象进行广度优先的遍历
  while (queen.length) {
    const first = queen.shift();
    if (first[childName]) {
      queen = queen.concat(first[childName]);
      delete first[childName];
    }
    result.push(first);
  }
  return result;
}
