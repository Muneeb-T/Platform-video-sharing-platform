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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
                                className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600'>
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
            </Routes>
        </>
    );
}

export default Sidebar;
