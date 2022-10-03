import React from 'react';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
