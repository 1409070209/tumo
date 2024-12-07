import React from 'react';
import './App.css';
import {PushScore, ScoreList} from './components';

function App() {
  return <div style={{width: 1200, margin: '0 auto'}}>
    <p style={{textAlign: 'center', marginBottom: 30}}>基于redis实现排名列表， 每秒提交300个分数请求并显示</p>
    <PushScore/>
    <ScoreList/>
  </div>;
}

export default App;
