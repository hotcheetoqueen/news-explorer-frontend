import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Main}>
      </Route>
    </div>
  );
}

export default App;
