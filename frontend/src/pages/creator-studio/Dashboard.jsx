import React, { useRef, useEffect } from 'react';
import Sidebar from '../../components/creator-studio/Sidebar';
import VideoJS from '../../components/VideoPlayer';
import ViewsIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AverageDurationIcon from '@mui/icons-material/AvTimer';
import Comments from '../../components/Comments';
import VideoGroup3 from '../../components/VideoGroup-4';

import {
    getLatestVideo,
    getTopVideos,
    setShowVideoUploadModal,
} from '../../redux/features/video/videoSlice';

import { useSelector, useDispatch } from 'react-redux';
//video upload

import { toast } from 'react-toastify';
import TopBar from '../../components/creator-studio/Topbar';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { getChannel, channelAnalytics } from '../../redux/features/channel/channelSlice';
//

function Dashboard() {
    const { id: channelId } = useParams();
    const {
        isGetLatestVideoLoading,
        getLatestVideoMessage,
        latestVideo,
        isGetLatestVideoSuccess,
        isGetLatestVideoError,
        isVideoUploadError,
        isVideoUploadSuccess,
        videoUploadMessage,
        isVideoDetailsSaveSuccess,
        uploadingOnProcess,
        getTopVideosSuccess,
        getTopVideosLoading,
        getTopVideosMessage,
        getTopVideosError,
        topVideos,
    } = useSelector((state) => state.video);

    let {
        title,
        views,
        likes,
        dislikes,
        averageViewDuration,
        comments,
        _id: latestVideoId,
    } = latestVideo;

    if (averageViewDuration) {
        averageViewDuration = new Date(averageViewDuration).toISOString().slice(11, 19);
    }
    const {
        isGetChannelSuccess,
        channel,
        message,
        isGetChannelLoading,
        isGetChannelError,
        isChannelAnalyticsError,
        isChannelAnalyticsSuccess,
        isChannelAnalyticsMessage,
        isChannelAnalyticsLoading,
        analytics,
    } = useSelector((state) => state.channel);

    let { totalViews, totalWatchTime } = analytics || {};
    if (totalWatchTime) {
        console.log(totalWatchTime);
        totalWatchTime = new Date(totalWatchTime).toISOString().slice(11, 19);
    }

    const dispatch = useDispatch();
    const playerRef = useRef(null);

    useEffect(() => {
        dispatch(getChannel({ userId: channelId }));
        dispatch(getLatestVideo({ channelId, latest: true }));
        dispatch(getTopVideos({ channelId, top: 5 }));
        dispatch(
            channelAnalytics({
                channelId,
                totalViews: true,
                totalWatchTime: true,
            })
        );
    }, [isVideoDetailsSaveSuccess]);

    const navigate = useNavigate();
    const { user, accessToken } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user || !accessToken) {
            toast.error('Please login to your account.');
            navigate('/login');
        }
    }, [user, accessToken]);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: latestVideo?.video?.url,
                type: 'video/mp4',
            },
        ],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // // You can handle player events here, for example:
        // player.on('waiting', () => {
        //     videojs.log('player is waiting');
        // });

        // player.on('dispose', () => {
        //     videojs.log('player will dispose');
        // });
    };

    if (
        isGetLatestVideoLoading ||
        isGetChannelLoading ||
        getTopVideosLoading ||
        isChannelAnalyticsLoading
    ) {
        return <Spinner />;
    }

    if (isGetChannelError && !channel) {
        toast.error('You have no channel.Create a channel and explore Platform.');
        navigate(`/channel/${user._id}`);
    }

    return (
        <>
            <div className='mx-auto bg-gray-900 pt-20'>
                <div className='grid grid-cols-5 gap-2 container mx-auto'>
                    <Sidebar />
                    <div className='col-span-4 gap-2 space-y-2'>
                        <TopBar title='Channel Dashboard' />
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='grid-cols-1 bg-gray-300 bg-opacity-5 p-5 space-y-3 h-screen'>
                                {Object.keys(latestVideo)?.length ? (
                                    <>
                                        <VideoJS
                                            options={videoJsOptions}
                                            onReady={handlePlayerReady}
                                        />
                                        <p className='text-gray-300 line-clamp-1'>{title}</p>
                                        <p className='text-gray-400 text-sm'>
                                            Latest video perfomance
                                        </p>
                                        <div className='space-y-2'>
                                            <div className='flex gap-2 items-center text-sm text-gray-300'>
                                                <ViewsIcon sx={{ fontSize: 'large' }} />
                                                <div className='flex w-full justify-between'>
                                                    <p>Views</p>
                                                    <p>{views || 0}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 items-center text-sm text-gray-300'>
                                                <ThumbUpIcon sx={{ fontSize: 'large' }} />
                                                <div className='flex w-full justify-between'>
                                                    <p>Likes</p>
                                                    <p>{likes || 0}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 items-center text-sm text-gray-300'>
                                                <ThumbDownIcon sx={{ fontSize: 'large' }} />
                                                <div className='flex w-full justify-between'>
                                                    <p>Dislikes</p>
                                                    <p>{dislikes || 0}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 items-center text-sm text-gray-300'>
                                                <AverageDurationIcon sx={{ fontSize: 'large' }} />
                                                <div className='flex w-full justify-between'>
                                                    <p>Average view duration</p>
                                                    <p>{averageViewDuration || '00:00:00'}</p>
                                                </div>
                                            </div>
                                            <hr className='opacity-20' />
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-300'>Top comments</p>
                                                <button className='text-red-600 text-sm font-bold'>
                                                    View all ({comments?.length})
                                                </button>
                                            </div>
                                            <Comments comments={comments} videoId={latestVideoId} />
                                        </div>
                                    </>
                                ) : (
                                    <div className='container p-20 flex items-center justify-center'>
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
                            </div>

                            <div className='grid-cols-1 bg-gray-300 bg-opacity-5 p-8'>
                                <div className='flex items-center justify-between '>
                                    <p className='text-2xl text-gray-300 font-bold'>
                                        Channel analytics
                                    </p>
                                    <button className='text-red-600 font-bold'>Explore</button>
                                </div>
                                <hr className='opacity-20 mt-2' />
                                <p className='text-3xl font-bold text-red-500 mt-3'>
                                    {channel?.followers || 0}{' '}
                                    <span className='text-gray-300 text-xl'>Followers</span>
                                </p>
                                <div className='text-gray-400 mt-3'>
                                    <p>Total views - {analytics?.totalViews || 0}</p>
                                    <p>
                                        Total Watch time (hh:mm:ss) - {totalWatchTime || '00:00:00'}
                                    </p>
                                </div>
                                <div className='mt-5 mb-20'>
                                    <p className='font-bold text-gray-300'>Top videos</p>
                                    {topVideos.length ? (
                                        <div>
                                            <VideoGroup3 videos={topVideos} />
                                        </div>
                                    ) : (
                                        <div className='container p-10 mx-auto flex items-center justify-center bg-gray-600 bg-opacity-20'>
                                            <div className='text-center'>
                                                <p className='text-3xl text-red-500 font-bold'>
                                                    Oops!
                                                </p>
                                                <p className='text-gray-500'>
                                                    We couldn't find anything in your channel.
                                                    Please upload your content.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
