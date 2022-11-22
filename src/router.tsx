import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const NoticeScroll = lazy(() => import('./pages/NoticeScroll'));
const ScrollList = lazy(() => import('./pages/ScrollList'));
const ThreeJS = lazy(() => import('./pages/ThreeJS'));
const ReactSpring = lazy(() => import('./pages/ReactSpring'));
const Watermark = lazy(() => import('./pages/Watermark'));
const ClientStorage = lazy(() => import('./pages/ClientStorage'));
const FileSaver = lazy(() => import('./pages/FileSaver'));
const JZJAnimation = lazy(() => import('./pages/JZJAnimation'));

/**
 * TODO:
 * 1. 电梯
 * 2. 无人物遮挡图层（弹幕等）
*/

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
    description: 'Animation',
    path: 'Animation',
    element: <JZJAnimation />,
  },
  {
    description: '前端明水印',
    path: 'Watermark',
    element: <Watermark />,
  },
  {
    description: '[ Web 2D/3D 系列 ] React Spring',
    path: 'ReactSpring',
    element: <ReactSpring />,
  },
  {
    description: '[ Web 2D/3D 系列 ] ThreeJS 探索',
    path: 'ThreeJS',
    element: <ThreeJS />,
  },
  {
    description: '文件下载',
    path: 'FileSaver',
    element: <FileSaver />,
  },
  {
    description: '客户端存储',
    path: 'ClientStorage',
    element: <ClientStorage />,
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
