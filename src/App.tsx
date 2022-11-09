import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Router from "./routers/router";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Layout>
      <h1>App TS</h1>
      <Router />
    </Layout>
  );
}

export default App;
