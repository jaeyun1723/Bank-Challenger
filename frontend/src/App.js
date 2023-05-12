import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main'
import Login from './pages/Login';
import Callback from './pages/Callback';

function App() {
  return (
    <BrowserRouter>
      <div name='app'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/naver" element={<Callback />} />
          </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
