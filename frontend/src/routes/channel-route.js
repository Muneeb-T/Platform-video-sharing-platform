import { Dashboard } from '@mui/icons-material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
function ChannelRoutes() {
    return (
        <Routes>
            <Route path='creator-studio' element={<Dashboard />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

export default ChannelRoutes;
