import React from 'react';
import logo from './logo.svg';
import './App.css';
import Records from './pages/Records.page';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { RecordState } from './state/records.atom';
import { AppState } from './state/app.atom';
import RecordSingle from './pages/RecordSingle.page';

const Switch = ()=>{

  const {page} = useRecoilValue(AppState);

  switch (page) {
    case 'record':
      return <RecordSingle/>
  
    default:
      return <Records/>
  }
}

function App() {
  return (
    <RecoilRoot>
      <div className="Pt(10rem)">
        <Switch/>
      </div>
    </RecoilRoot>
  );
}

export default App;
