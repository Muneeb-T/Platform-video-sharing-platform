import React, { useEffect } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import Sidebar from '../../components/creator-studio/Sidebar';
import FilterListIcon from '@mui/icons-material/FilterList';
import VideoContent from '../../components/creator-studio/Content';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos, setShowVideoUploadModal } from '../../redux/features/video/videoSlice';
import Spinner from '../../components/Spinner';
import TopBar from '../../components/creator-studio/Topbar';
import { toast } from 'react-toastify';
function Content() {
    const { user, accessToken } = useSelector((state) => state.auth);
    const { getVideosLoading, getVideosError, getVideosSuccess, getVideosMessage, videos } =
        useSelector((state) => state.video);
    const { _id: userId } = user;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideos({ owner: userId }));
    }, []);

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
    }, [user, accessToken]);

    if (getVideosLoading) {
        return <Spinner />;
    }
    return (
        <>
            <div className='container mx-auto bg-gray-900'>
                <div className='grid grid-cols-5 gap-2 pt-20'>
                    <Sidebar />
                    <div className='col-span-4 gap-2 space-y-2'>
                        <TopBar title='Channel Content' />
                        <div className='bg-gray-300 bg-opacity-5  p-5'>
                            <div className='flex text-gray-300 gap-2'>
                                <p>Filters</p>
                                <FilterListIcon />
                            </div>
                            <hr className='opacity-20 mt-2' />
                            {videos.length ? (
                                <div className='space-y-3 mt-3 '>
                                    <VideoContent videos={videos} />
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
                                            onClick={() => dispatch(setShowVideoUploadModal(true))}>
                                            Upload your first video
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Content;
