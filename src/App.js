import React from 'react';

import './assets/css/App.css';
import './assets/lib/font-awesome/css/font-awesome.css';
import './assets/lib/Ionicons/css/ionicons.css';
import './assets/lib/perfect-scrollbar/css/perfect-scrollbar.css';
import './assets/lib/jquery-toggles/toggles-full.css';
import './assets/lib/rickshaw/rickshaw.min.css';
import './assets/css/amanda.css';
import './assets/css/index.css';

import Router from './routes/Router';

function App() {

  return (
    <div className="App">
      <Router></Router> 
    </div>
  );
}

export default App;
