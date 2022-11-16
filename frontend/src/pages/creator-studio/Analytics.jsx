import React from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import Sidebar from '../../components/creator-studio/Sidebar';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';
import TopBar from '../../components/creator-studio/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { getChannel, channelAnalytics } from '../../redux/features/channel/channelSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function Analytics() {
    const { id: channelId } = useParams();
    const dispatch = useDispatch();
    const navigate = useDispatch();
    const { user, accessToken } = useSelector((state) => state.auth);
    const { channel, analytics } = useSelector((state) => state.channel);
    let { totalWatchTime } = analytics;
    if (totalWatchTime) {
        totalWatchTime = new Date(totalWatchTime).toISOString().slice(11, 19);
    }
    useEffect(() => {
        dispatch(getChannel(channelId));
        dispatch(
            channelAnalytics({
                channelId,
                totalViews: true,
                totalWatchTime: true,
            })
        );
    }, []);

    useEffect(() => {
        if (!user || !accessToken) {
            toast.error('Please login to your account.');
            navigate('/login');
        }
    }, [user, accessToken]);
    return (
        <>
            <div className='container mx-auto bg-gray-900'>
                <div className='grid grid-cols-5 gap-2 h-screen pt-20'>
                    <div className='bg-gray-300 bg-opacity-5 overflow-y-scroll scrollbar-hide'>
                        <Sidebar />
                    </div>
                    <div className='col-span-4 gap-2 overflow-y-scroll scrollbar-hide space-y-2'>
                        <TopBar title='Channel Analytics' />
                        <div className='bg-gray-300 bg-opacity-5 h-full p-5'>
                            <div className='grid grid-cols-3 gap-3'>
                                <div className='bg-gray-600 bg-opacity-30 p-4 '>
                                    <div className='bg-transparent border border-gray-400 text-center space-y-3 border-opacity-20 p-5'>
                                        <p className='text-gray-300'>Views</p>
                                        <p className='text-red-600 text-4xl'>
                                            {analytics?.totalViews || 0}
                                        </p>
                                    </div>
                                </div>
                                <div className='bg-gray-600 bg-opacity-30 p-4 '>
                                    <div className='bg-transparent border border-gray-400 text-center space-y-3 border-opacity-20 p-5'>
                                        <p className='text-gray-300'>Watch hours (hh:mm:ss)</p>
                                        <p className='text-red-600 text-4xl'>
                                            {totalWatchTime || '00:00:00'}
                                        </p>
                                    </div>
                                </div>
                                <div className='bg-gray-600 bg-opacity-30 p-4 '>
                                    <div className='bg-transparent border border-gray-400 text-center space-y-3 border-opacity-20 p-5'>
                                        <p className='text-gray-300'>Followers</p>
                                        <p className='text-red-600 text-4xl'>
                                            {channel?.followers || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Analytics;
