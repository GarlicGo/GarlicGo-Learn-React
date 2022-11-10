import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import NoticeScroll from './pages/NoticeScroll';
import ScrollList from './pages/ScrollList';
import ThreeJS from './pages/ThreeJS';

interface RouterConfigItem {
  description?: string;
  path: string;
  pathName?: string;
  element: React.ReactNode;
}

const routerConfig: RouterConfigItem[] = [
  {
    description: '[ Web 2D/3D 系列 ] ThreeJS 探索',
    path: 'ThreeJS',
    element: <ThreeJS />,
  },
  // {
  //   path: 'NoticeScroll',
  //   element: <NoticeScroll />,
  // },
  {
    description: '无限滚动加载列表（非虚拟列表）',
    path: 'ScrollList',
    element: <ScrollList />,
  },
];

interface RouterItem extends RouterConfigItem {
  pathName: string;
  description: string;
}

export const routers: RouterItem[] = routerConfig.map((router) => ({
  ...router,
  pathName: router?.pathName || router.path.split('/').pop() || 'No path name',
  description: router?.description || router.path.split('/').pop() || 'No description',
}));

const Router = () => {
  return (
    <Routes>
      {
        routers.map(router => (
          <Route path={router.path} element={router.element} key={router.path} />
        ))
      }
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
