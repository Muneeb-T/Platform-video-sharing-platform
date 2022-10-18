import React, { useRef } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import Sidebar from '../../components/creator-studio/Sidebar';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';
import VideoJS from '../../components/VideoPlayer';
import video from '../../assets/videos/video.mp4';
import ViewsIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AverageDurationIcon from '@mui/icons-material/AvTimer';
import Comments from '../../components/Comments';
import VideoGroup2 from '../../components/VideoGroup-3';
const user = null;
function Dashboard() {
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: video,
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
    return (
        <>
            <div className='mx-auto bg-gray-900'>
                <div className='grid grid-cols-5 gap-2 pt-20 container mx-auto'>
                    <div className='bg-gray-300 bg-opacity-5 h-screen'>
                        <div className='flex items-center justify-center p-5 gap-2 border-b-2 border-opacity-10 border-gray-100 scrollbar-hide overflow-y-scroll'>
                            <img
                                className='h-20 w-20 rounded-full'
                                src={
                                    user
                                        ? user.profilePicture
                                            ? user.profilePicture.path
                                            : user.googleAccount
                                            ? user.googleAccount.picture
                                            : user.facebookAccount
                                            ? user.facebookAccount.picture
                                            : AvatarThumbnail
                                        : AvatarThumbnail
                                }
                                referrerPolicy='no-referrer'
                                alt=''
                            />
                            <p className='text-2xl font-bold text-gray-300'>
                                Muneeb T
                            </p>
                        </div>
                        <Sidebar />
                    </div>
                    <div className='col-span-4 gap-2 space-y-2'>
                        <div className='bg-gray-300 bg-opacity-5 flex justify-between items-center px-8 py-3'>
                            <p className='text-gray-300 font-bold text-xl'>
                                Channel dashboard
                            </p>
                            <div className='flex gap-3'>
                                <button
                                    type='button'
                                    className='p-1 shrink-0 rounded-full bg-gray-700  text-gray-300 hover:text-white'>
                                    <span className='sr-only'>
                                        Upload video
                                    </span>
                                    <UploadIcon aria-hidden='true' />
                                </button>
                                <button
                                    type='button'
                                    className='p-1 shrink-0 rounded-full bg-gray-700 text-gray-300 hover:text-white'>
                                    <span className='sr-only'>
                                        Upload video
                                    </span>
                                    <LiveStreamingIcon aria-hidden='true' />
                                </button>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 h-screen'>
                            <div className='grid-cols-1 bg-gray-300 bg-opacity-5 p-5 space-y-3 scrollbar-hide overflow-y-scroll'>
                                <VideoJS
                                    options={videoJsOptions}
                                    onReady={handlePlayerReady}
                                />
                                <p className='text-gray-300 text-md'>
                                    Latest video perfomance
                                </p>
                                <div className='space-y-2'>
                                    <div className='flex gap-2 items-center text-sm text-gray-300'>
                                        <ViewsIcon sx={{ fontSize: 'large' }} />
                                        <div className='flex w-full justify-between'>
                                            <p>Views</p>
                                            <p>3M</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center text-sm text-gray-300'>
                                        <ThumbUpIcon
                                            sx={{ fontSize: 'large' }}
                                        />
                                        <div className='flex w-full justify-between'>
                                            <p>Likes</p>
                                            <p>3M</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center text-sm text-gray-300'>
                                        <ThumbDownIcon
                                            sx={{ fontSize: 'large' }}
                                        />
                                        <div className='flex w-full justify-between'>
                                            <p>Dislikes</p>
                                            <p>3M</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center text-sm text-gray-300'>
                                        <AverageDurationIcon
                                            sx={{ fontSize: 'large' }}
                                        />
                                        <div className='flex w-full justify-between'>
                                            <p>Average view duration</p>
                                            <p>3M</p>
                                        </div>
                                    </div>
                                    <hr className='opacity-20' />
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-300'>
                                            Top comments
                                        </p>
                                        <button className='text-red-600 text-sm font-bold'>
                                            View all (230)
                                        </button>
                                    </div>
                                    <Comments />
                                </div>
                            </div>
                            <div className='grid-cols-1 bg-gray-300 bg-opacity-5 p-8 scrollbar-hide overflow-y-scroll'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-2xl text-gray-300 font-bold'>
                                        Channel analytics
                                    </p>
                                    <button className='text-red-600 font-bold'>
                                        Explore
                                    </button>
                                </div>
                                <hr className='opacity-20 mt-2' />
                                <p className='text-4xl font-bold text-red-500 mt-6'>
                                    5845483{' '}
                                    <span className='text-gray-300 text-xl'>
                                        Subscribers
                                    </span>
                                </p>
                                <div className='text-gray-400 mt-3 space-y-2'>
                                    <p>Total views - 2343233343 (2.3 M)</p>
                                    <p>
                                        Watch time(hours) - 3433423343 (34.3 M)
                                    </p>
                                </div>
                                <div className='mt-5'>
                                    <p className='font-bold text-gray-300'>
                                        Top videos
                                    </p>
                                    <VideoGroup2 />
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
