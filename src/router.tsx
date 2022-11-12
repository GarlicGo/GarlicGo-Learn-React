import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const NoticeScroll = lazy(() => import('./pages/ScrollList'));
const ScrollList = lazy(() => import('./pages/ScrollList'));
const ThreeJS = lazy(() => import('./pages/ThreeJS'));

interface RouterItem {
  description: string;
  path: string;
  pathName: string;
  element: React.ReactNode;
}

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
  {
    path: 'NoticeScroll',
    element: <NoticeScroll />,
  },
  {
    description: '无限滚动加载列表（非虚拟列表）',
    path: 'ScrollList',
    element: <ScrollList />,
  },
];

export const routers: RouterItem[] = routerConfig.map((router) => ({
  ...router,
  pathName: router?.pathName || router.path?.split('/').pop() || 'No path name',
  description: router?.description || router.path?.split('/').pop() || 'No description',
}));

const Router = () => {
  return (
    <Suspense fallback={<div>Lazy Loading</div>}>
      <Routes>
        {
          routers.map(router => (
            <Route path={router.path} element={router.element} key={router.path} />
          ))
        }
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>

  );
};

export default Router;
