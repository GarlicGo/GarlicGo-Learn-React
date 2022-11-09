import React, { Suspense, lazy } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

function Router() {
  return (
    <div>
      <div>
        <Link to="/home">Home</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Router;
