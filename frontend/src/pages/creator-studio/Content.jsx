import React, { useEffect, useState, Fragment } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import { Menu, Transition } from '@headlessui/react';
import SortIcon from '@mui/icons-material/Sort';
import Sidebar from '../../components/creator-studio/Sidebar';
import FilterListIcon from '@mui/icons-material/FilterList';
import VideoContent from '../../components/creator-studio/Content';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getVideos,
    setShowVideoUploadModal,
    setSelectedVideos,
    resetSelectedVideos,
    deleteVideos,
} from '../../redux/features/video/videoSlice';
import Spinner from '../../components/Spinner';
import TopBar from '../../components/creator-studio/Topbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Content() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    const [sortVideos, setSortVideos] = useState({ order: 'desc', credential: 'createdAt' });
    const { user, accessToken } = useSelector((state) => state.auth);
    const {
        getVideosLoading,
        getVideosError,
        getVideosSuccess,
        getVideosMessage,
        videos,
        selectedVideos,
        deleteVideosLoading,
        deleteVideosError,
        deleteVideosSuccess,
        isVideoDetailsSaveSuccess,
    } = useSelector((state) => state.video);
    const { _id: userId } = user || {};
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideos({ owner: userId }));
    }, [isVideoDetailsSaveSuccess]);

    useEffect(() => {
        if (getVideosSuccess) console.log(videos);
        if (getVideosError) console.log(getVideosMessage);
    }, [getVideosSuccess, getVideosMessage]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !accessToken) {
            toast.error('Please login to your account.');
            navigate('/login');
        }
    }, []);

    return (
        <>
            <div className='container mx-auto bg-gray-900'>
                <div className='grid grid-cols-5 gap-2 pt-20'>
                    <Sidebar />
                    <div className='col-span-4 gap-2 space-y-2'>
                        <TopBar title='Channel Content' />
                        <div className='bg-gray-300 bg-opacity-5  p-5'>
                            <div className='flex text-gray-300  text-sm gap-3'>
                                <Menu
                                    as='div'
                                    className='relative flex-none inline-block text-left'>
                                    <div>
                                        <Menu.Button className='flex items-center w-full justify-center text-gray-300  text-sm text-md font-bold'>
                                            <FilterListIcon />
                                            Filter
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'>
                                        <Menu.Items className='absolute right-0 z-50 mt-2 w-max origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <div className='py-1'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Release date
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Video quality (HD)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Popular
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <form>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                type='submit'
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                    'block w-full px-4 py-2 text-left text-sm'
                                                                )}>
                                                                HD only
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </form>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <Menu
                                    as='div'
                                    className='relative flex-none inline-block text-left'>
                                    <div>
                                        <Menu.Button className='flex items-center w-full justify-center text-gray-300 text-sm text-md font-bold'>
                                            <SortIcon />
                                            Sort
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'>
                                        <Menu.Items className='absolute right-0 z-50 mt-2 w-max origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <div className='py-1'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'desc',
                                                                    credential: 'createdAt',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Uploaded date (latest)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'asc',
                                                                    credential: 'createdAt',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Uploaded date (oldest)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'asc',
                                                                    credential: 'views',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Views (asc)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'desc',
                                                                    credential: 'views',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Views (desc)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'asc',
                                                                    credential: 'likes',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Likes (asc)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'desc',
                                                                    credential: 'likes',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Likes (desc)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'asc',
                                                                    credential: 'dislikes',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Dislikes (asc)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() =>
                                                                setSortVideos({
                                                                    order: 'desc',
                                                                    credential: 'dislikes',
                                                                })
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}>
                                                            Dislikes (desc)
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {selectedVideos.length > 0 && (
                                    <div className='ml-auto'>
                                        <button
                                            disabled={deleteVideosLoading}
                                            onClick={() => dispatch(deleteVideos(selectedVideos))}
                                            className='flex space-x-5 text-red-500 items-center w-full justify-center text-sm text-md font-bold'>
                                            <DeleteIcon />
                                            Delete ({selectedVideos.length})
                                            {deleteVideosLoading && (
                                                <div
                                                    className='spinner-border text-gray-300 animate-spin w-5 h-5 border-2 rounded-full'
                                                    role='status'></div>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <hr className='opacity-20 mt-2' />
                            {getVideosLoading ? (
                                <Spinner />
                            ) : (
                                <>
                                    {videos?.length ? (
                                        <div className='space-y-3 mt-3'>
                                            <VideoContent videos={videos} sort={sortVideos} />
                                        </div>
                                    ) : (
                                        <div className='container flex pt-20 justify-center h-screen'>
                                            <div className='text-center'>
                                                <p className='text-3xl text-red-500 font-bold'>
                                                    You have no uploads
                                                </p>
                                                <p className='text-gray-500'>
                                                    There are no contents in your channel.
                                                </p>
                                                <button
                                                    className='rounded-md text-gray-300 border border-red-500 px-3 py-2 font-bold mt-3'
                                                    onClick={() =>
                                                        dispatch(setShowVideoUploadModal(true))
                                                    }>
                                                    Upload your first video
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Content;
