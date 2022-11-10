import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NoticeScroll from './pages/NoticeScroll';

interface RouterConfigItem {
  description?: string;
  path: string;
  pathName?: string;
  element: React.ReactNode;
}

const routerConfig: RouterConfigItem[] = [
  {
    description: 'About',
    path: 'About',
    element: <About />,
  },
  {
    path: 'NoticeScroll',
    element: <NoticeScroll />,
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
