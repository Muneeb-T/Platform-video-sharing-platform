import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentIcon from '@mui/icons-material/VideoLibrary';
import AnalyticsIcon from '@mui/icons-material/Equalizer';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import CommentIcon from '@mui/icons-material/Comment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CustomizationIcon from '@mui/icons-material/PublishedWithChanges';
import CopyrightIcon from '@mui/icons-material/Copyright';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Dashboard from './Topbar';
import { useSelector } from 'react-redux';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';

function Sidebar() {
    const { user } = useSelector((state) => state.auth);
    const { id: channelId } = useParams();
    const { channel } = useSelector((state) => state.channel);
    const baseNavigation = `/channel/${channelId}/creator-studio`;
    return (
        <>
            <div className='bg-gray-300 bg-opacity-5'>
                <div className='text-center p-5 gap-2 border-b-2 border-opacity-10 border-gray-100'>
                    <img
                        className='h-20 w-20 mx-auto rounded-full'
                        src={
                            channel?.owner?.profilePicture?.url ||
                            channel?.owner?.googleAccount?.picture ||
                            channel?.owner?.facebookAccount?.picture ||
                            AvatarThumbnail
                        }
                        referrerPolicy='no-referrer'
                        alt=''
                    />
                    <p className='text-xl font-bold text-gray-300'>
                        {channel?.owner?.username || user?.username}
                    </p>
                </div>
                <div>
                    <ul className='flex flex-col space-y-1 text-gray-300 font-bold'>
                        <li>
                            <Link
                                to={`${baseNavigation}`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <DashboardIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/content`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <ContentIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Content</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/analytics`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <AnalyticsIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Analytics</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/playlist`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <PlaylistPlayIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Playlist</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/comments`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <CommentIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Comments</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/monitization`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <MonetizationOnIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Monitization</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/customize-channel`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <CustomizationIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>
                                    Customize channel
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/copyright`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <CopyrightIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Copyright</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`channel/${channelId}/settings`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <SettingsIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/channel/${channelId}/send-feedback`}
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                <span className='inline-flex justify-center items-center ml-8'>
                                    <FeedbackIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate'>Send feedback</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path='/channel/creator-studio' element={<Dashboard />} />
                <Route path='/topics' element={<></>} />
            </Routes>
        </>
    );
}

export default Sidebar;
