import Dashboard from '../pages/creator-studio/Dashboard';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import Content from '../pages/creator-studio/Content';
import Analytics from '../pages/creator-studio/Analytics';
import Playlist from '../pages/creator-studio/Playlist';
import Comments from '../pages/creator-studio/Comments';
import Monitization from '../pages/creator-studio/Monitization';
import CustomizeChannel from '../pages/creator-studio/CustomizeChannel';
import Copyright from '@mui/icons-material/Copyright';
function ChannelRoutes() {
    return (
        <Routes>
            <Route path='creator-studio'>
                <Route index element={<Dashboard />}/>
                <Route path='content' element={<Content />} />
                <Route path='analytics' element={<Analytics />} />
                <Route path='playlist' element={<Playlist />} />
                <Route path='comments' element={<Comments />} />
                <Route path='monitization' element={<Monitization />} />
                <Route
                    path='customize-channel'
                    element={<CustomizeChannel />}
                />
                <Route path='copyright' element={<Copyright />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

export default ChannelRoutes;
