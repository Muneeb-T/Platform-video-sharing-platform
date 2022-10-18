import React from 'react';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
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
import { Link, Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';


function Sidebar() {
    return (
     
                    <Router>
                        <ul className='flex flex-col space-y-1 text-gray-300 font-bold'>
                            <li>
                                <Link
                                    to='/'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-gray-700 bg-opacity-50 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <DashboardIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/content'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <ContentIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Content
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/analytics'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <AnalyticsIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Analytics
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/playlist'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <PlaylistPlayIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Playlist
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/comments'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <CommentIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Comments
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/monitization'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <MonetizationOnIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Monitization
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/cutomize-channel'
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
                                    to='/copyright'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <CopyrightIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Copyright
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/settings'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <SettingsIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Settings
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/send-feedback'
                                    className='relative flex flex-row items-center h-11 focus:outline-none bg-opacity-50 bg-gray-700 hover:bg-gray-600 pr-6'>
                                    <span className='inline-flex justify-center items-center ml-8'>
                                        <FeedbackIcon />
                                    </span>
                                    <span className='ml-2 tracking-wide truncate'>
                                        Send feedback
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <Route
                            path='/channel/creator-studio'
                            element={<Dashboard />}
                        />
                        <Route path='/topics' element={<></>} />
                    </Router>

    );
}

export default Sidebar;
