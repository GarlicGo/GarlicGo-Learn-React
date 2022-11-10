import { generate } from 'randomstring';

export const baseDataList = [
  'JavaScript',
  'TypeScript',
  'CSS',
  'Less',
  'Scss',
  'React',
  'Vue',
  'Node.js',
  'Koa',
  'Express',
];

interface ScrollDataItem {
  id: string;
  content: string;
}

const insert = (
  num = baseDataList.length,
  list: ScrollDataItem[] = [],
  contentList = baseDataList,
) => {
  for (let i = 0; i < num; i++) {
    list.push({
      id: generate(),
      content: contentList[Math.floor(Math.random() * contentList.length)],
    });
  }
  return list;
};

interface ScrollDataResponse {
  list: ScrollDataItem[];
  nextId: number;
}

export const getDataList = (nextId: number): Promise<ScrollDataResponse> => {
  const list = insert();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nextId ? nextId + 10 : 11,
      });
    }, 1000);
  });
};
