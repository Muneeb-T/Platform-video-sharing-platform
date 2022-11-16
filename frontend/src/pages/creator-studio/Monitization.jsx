import React, { useEffect } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import Sidebar from '../../components/creator-studio/Sidebar';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';
import TopBar from '../../components/creator-studio/Topbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function Monitization() {
    const navigate = useNavigate();
    const { user, accessToken } = useSelector((state) => state.auth);
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
                        <TopBar title='Channel Monitization' />
                        <div className='bg-gray-300 bg-opacity-5 h-full'></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Monitization;
