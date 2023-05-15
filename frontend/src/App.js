import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Hello from './pages/Hello';
import Survey from './pages/Survey';
import Main from './pages/Main';
import User from './pages/User';

function App() {
    return (
        <BrowserRouter>
            <div name='app'>
                <Routes>
                    <Route path="/" element={<Hello />} />
                    <Route path="/survey" element={<Survey />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
