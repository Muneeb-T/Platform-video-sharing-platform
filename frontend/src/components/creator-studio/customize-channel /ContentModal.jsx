import React, { useState } from 'react';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../../../redux/features/video/videoSlice';
import { updateChannel } from '../../../redux/features/channel/channelSlice';
import VideoThumbnail from '../../VideoThumbnail';
import { Link } from 'react-router-dom';
import Spinner2 from '../../Spinner2';
function ContentModal({ purpose, handleClose }) {
    const { user } = useSelector((state) => state.auth);
    const { videos, getVideosLoading } = useSelector((state) => state.video);
    const { channel, updateChannelLoading, updateChannelSuccess } = useSelector(
        (state) => state.channel
    );
    const { _id: userId } = user || {};
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        dispatch(getVideos({ owner: userId }));
        if (updateChannelSuccess) {
            handleClose({ open: false, purpose: null });
        }
    }, []);
    const dispatch = useDispatch();
    const handleSave = (e) => {
        if (purpose === 'featured') {
            dispatch(
                updateChannel({
                    channelId: channel?._id,
                    featuredVideo: selectedVideo,
                })
            );
        }
        if (purpose === 'trailer') {
            dispatch(
                updateChannel({
                    channelId: channel?._id,
                    channelTrailer: selectedVideo,
                })
            );
        }
    };

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-70'>
                <div className='flex items-center min-h-screen px-4 py-8 relative'>
                    <div className='relative w-full p-10 max-w-6xl mx-auto bg-gray-900 rounded-md shadow-lg space-y-5'>
                        <div className='bg-gray-900'>
                            <div className='flex justify-between items-center'>
                                <p className='text-gray-200 font-bold text-lg'>
                                    Select a video
                                </p>
                                <div className='flex gap-3'>
                                    <button
                                        onClick={handleSave}
                                        type='button'
                                        disabled={!selectedVideo}
                                        className={`px-10 group relative flex items-center justify-center rounded-sm border border-transparent ${
                                            !selectedVideo
                                                ? `bg-red-800`
                                                : `bg-red-700`
                                        } py-1 text-sm font-medium text-white ${
                                            `hover:bg-red-600` && ''
                                        } focus:outline-none`}>
                                        {updateChannelLoading && (
                                            <div
                                                className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full absolute left-3'
                                                role='status'></div>
                                        )}
                                        Save
                                    </button>
                                    <div className='cursor-pointer text-gray-300'>
                                        <CloseIcon
                                            onClick={() =>
                                                handleClose({
                                                    open: false,
                                                    purpose: null,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className='opacity-20 mb-3 mt-1' />
                            <div className='h-[60vh] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-5'>
                                {getVideosLoading ? (
                                    <Spinner2 />
                                ) : (
                                    <>
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                                            {videos?.map((video) => {
                                                const {
                                                    _id: videoId,
                                                    thumbnail,
                                                    title,
                                                    video: videoProperties,
                                                } = video;
                                                return (
                                                    <div
                                                        key={videoId}
                                                        className={`p-1 ${
                                                            videoId ===
                                                                selectedVideo &&
                                                            'border border-red-500 rounded'
                                                        }`}>
                                                        <button
                                                            className='relative w-full text-left'
                                                            onClick={() =>
                                                                setSelectedVideo(
                                                                    videoId
                                                                )
                                                            }>
                                                            <VideoThumbnail
                                                                image={
                                                                    thumbnail?.url
                                                                }
                                                                length={
                                                                    videoProperties?.duration
                                                                }
                                                                videoUrl={
                                                                    videoProperties?.url
                                                                }
                                                            />

                                                            <p className='text-gray-200 line-clamp-1'>
                                                                {title}
                                                            </p>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentModal;
