import React from 'react';
import { Layout } from 'antd';
import Sidebar from './layout/Sidebar';
import MainScreen from './layout/MainScreen';
import './App.scss';

function App() {
  return (
    <Layout style={{}} className="App">
      <Sidebar />
      <MainScreen />
    </Layout>
  );
}

export default App;
