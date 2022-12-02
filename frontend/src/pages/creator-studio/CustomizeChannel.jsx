import React, { useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import Sidebar from '../../components/creator-studio/Sidebar';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';
import TopBar from '../../components/creator-studio/Topbar';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../../components/creator-studio/customize-channel /Layout';
import BasicInfo from '../../components/creator-studio/customize-channel /BasicInfo';
import Branding from '../../components/creator-studio/customize-channel /Branding';

function CustomizeChannel() {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('layout');
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
                        <TopBar title='Customize channel' />
                        <div className='bg-gray-300 bg-opacity-5 p-5'>
                            <nav>
                                <ul className='flex text-gray-300 divide-x divide-gray-600'>
                                    <li
                                        className={`pr-3 cursor-pointer ${
                                            activeNav === 'layout' && 'text-red-500'
                                        }`}
                                        onClick={() => setActiveNav('layout')}>
                                        Layout
                                    </li>
                                    <li
                                        className={`px-3 cursor-pointer ${
                                            activeNav === 'basic-info' && 'text-red-500'
                                        }`}
                                        onClick={() => setActiveNav('basic-info')}>
                                        Basic info
                                    </li>
                                    <li
                                        className={`pl-3 cursor-pointer ${
                                            activeNav === 'branding' && 'text-red-500'
                                        }`}
                                        onClick={() => setActiveNav('branding')}>
                                        Branding
                                    </li>
                                </ul>
                            </nav>
                            <div className='my-3'>
                                {activeNav === 'layout' && <Layout />}
                                {activeNav === 'basic-info' && <BasicInfo />}
                                {activeNav === 'branding' && <Branding />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomizeChannel;
