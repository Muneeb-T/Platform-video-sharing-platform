import React, { useState } from 'react';
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
    const [active, setActive] = useState(1);
    let activeClass = 'bg-red-600';
    const { user } = useSelector((state) => state.auth);
    const { id: channelId } = useParams();
    const { channel } = useSelector((state) => state.channel);
    const baseNavigation = `/channel/${channelId}/creator-studio`;
    return (
        <>
            <div className='bg-gray-300 bg-opacity-5'>
                <div className='text-center px-2 py-5 lg:p-5 gap-2 border-b-2 border-opacity-10 border-gray-100'>
                    <img
                        className='h-14 w-14 lg:h-20 lg:w-20 mx-auto rounded-full shrink-0'
                        src={
                            channel?.owner?.profilePicture?.url ||
                            channel?.owner?.googleAccount?.picture ||
                            channel?.owner?.facebookAccount?.picture ||
                            AvatarThumbnail
                        }
                        referrerPolicy='no-referrer'
                        alt='channel logo'
                    />
                    <p className='text-xl font-bold text-gray-300 hidden lg:block'>
                        {channel?.owner?.username || user?.username}
                    </p>
                </div>
                <div>
                    <ul className='flex flex-col space-y-1 text-gray-300 font-bold'>
                        <li>
                            <Link
                                to={`${baseNavigation}`}
                                onClick={(e) => setActive(1)}
                                className={`${
                                    active === 1 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <DashboardIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate hidden lg:block'>
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/content`}
                                onClick={(e) => setActive(2)}
                                className={`${
                                    active === 2 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <ContentIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Content
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/analytics`}
                                onClick={(e) => setActive(3)}
                                className={`${
                                    active === 3 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <AnalyticsIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Analytics
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/playlist`}
                                onClick={(e) => setActive(4)}
                                className={`${
                                    active === 4 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                {' '}
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <PlaylistPlayIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Playlist
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/comments`}
                                onClick={(e) => setActive(5)}
                                className={`${
                                    active === 5 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <CommentIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Comments
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/monitization`}
                                onClick={(e) => setActive(6)}
                                className={`${
                                    active === 6 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                {' '}
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <MonetizationOnIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Monitization
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/customize-channel`}
                                onClick={(e) => setActive(7)}
                                className={`${
                                    active === 7 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                {' '}
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <CustomizationIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Customize channel
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${baseNavigation}/copyright`}
                                onClick={(e) => setActive(8)}
                                className={`${
                                    active === 8 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                {' '}
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <CopyrightIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Copyright
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`channel/${channelId}/settings`}
                                onClick={(e) => setActive(9)}
                                className={`${
                                    active === 9 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <SettingsIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Settings
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/channel/${channelId}/send-feedback`}
                                onClick={(e) => setActive(10)}
                                className={`${
                                    active === 10 && activeClass
                                } relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600`}>
                                <span className='inline-flex justify-center items-center mx-auto lg:mx-0 lg:ml-8'>
                                    <FeedbackIcon />
                                </span>
                                <span className='ml-2 tracking-wide truncate  hidden lg:block'>
                                    Send feedback
                                </span>
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
