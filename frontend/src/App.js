import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import UserRoute from './routes/user-route';
import ChannelRoute from './routes/channel-route';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PageNotFound from './pages/PageNotFound';

function App() {
    return (
        <div className='bg-gray-900'>
            <ToastContainer />
            <Router>
                <Header />
                <Routes>
                    <Route path='/*' element={<UserRoute />} />
                    <Route path='/channel/*' element={<ChannelRoute />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
