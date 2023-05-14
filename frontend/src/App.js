import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main'
import LoginMain from './pages/LoginMain';

function App() {
  return (
    <BrowserRouter>
      <div name='app'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<LoginMain />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
