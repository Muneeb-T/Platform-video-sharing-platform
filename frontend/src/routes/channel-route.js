import Dashboard from '../pages/creator-studio/Dashboard';
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import Content from '../pages/creator-studio/Content';
import Analytics from '../pages/creator-studio/Analytics';
import Playlist from '../pages/creator-studio/Playlist';
import Comments from '../pages/creator-studio/Comments';
import Monitization from '../pages/creator-studio/Monitization';
import CustomizeChannel from '../pages/creator-studio/CustomizeChannel';
import Copyright from '@mui/icons-material/Copyright';
import UploadToast from '../components/creator-studio/UploadToast';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Channel from '../pages/channel/Channel';
import VideoDetails from '../pages/creator-studio/VideoDetails';
function ChannelRoutes() {
    const { uploadingOnProcess, showVideoUploadModal } = useSelector((state) => state.video);
    return (
        <>
            <Routes>
                <Route path='/:id'>
                    <Route index element={<Channel />} />
                    <Route path='creator-studio'>
                        <Route index element={<Dashboard />} />
                        <Route path='content'>
                            <Route index element={<Content />} />
                            <Route path=':content' element={<VideoDetails />} />
                        </Route>

                        <Route path='analytics' element={<Analytics />} />
                        <Route path='playlist' element={<Playlist />} />
                        <Route path='comments' element={<Comments />} />
                        <Route path='monitization' element={<Monitization />} />
                        <Route path='customize-channel' element={<CustomizeChannel />} />
                        <Route path='copyright' element={<Copyright />} />
                    </Route>
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
            {uploadingOnProcess && !showVideoUploadModal && (
                <div className='absolute bottom-20 fixed right-10 w-[30%] z-[50]'>
                    <UploadToast />
                </div>
            )}
        </>
    );
}

export default ChannelRoutes;
