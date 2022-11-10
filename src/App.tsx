import React from 'react';
import Layout from './components/Layout';
import Router from './routers/router';

const App = () => {
  return (
    <Layout>
      <h1>App Nav</h1>
      <Router />
    </Layout>
  );
};

export default App;
