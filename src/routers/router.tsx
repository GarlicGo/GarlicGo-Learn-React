import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "antd";
import Layout from "../components/Layout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));

function App() {
  return (
    <Layout>
      <h1>App</h1>
      <Button type="primary">按钮</Button>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
