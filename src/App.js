import React from 'react';
import './App.css';
import WarPlane from './art/warplane/WarPlane';
import Budapest from './art/budapest/Budapest';
import Qutub from './art/qutub/Qutub';

function App() {
  return (
    <div className="App">
      <WarPlane />
      <Budapest />
      <Qutub />
    </div>
  );
}

export default App;
