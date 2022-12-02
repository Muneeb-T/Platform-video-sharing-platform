import React, { useEffect, Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import FilterListIcon from '@mui/icons-material/FilterList';
import VideoGroup from '../../../components/VideoGroup-5';
import { useSelector, useDispatch } from 'react-redux';
import { getVideos, resetVideos } from '../../../redux/features/video/videoSlice';
import Spinner2 from '../../../components/Spinner2';

function Videos({ owner }) {
    const dispatch = useDispatch();
    const { videos, getVideosLoading } = useSelector((state) => state.video);
    useEffect(() => {
        dispatch(getVideos({ owner }));
        return () => {
            dispatch(resetVideos());
        };
    }, []);

    if (getVideosLoading) {
        return <Spinner2 />;
    }

    return (
        <div className='container min-h-screen mx-auto h-max bg-gray-900'>
            <div className='mt-4'>
                {getVideosLoading && (
                    <div className='flex items-center justify-center h-screen text-gray-300'>
                        <div
                            className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full'
                            role='status'></div>
                    </div>
                )}
                {videos?.length > 0 ? (
                    <VideoGroup videos={videos} />
                ) : (
                    <>
                        <div className='container p-5 mx-auto mt-6 flex items-center justify-center'>
                            <div className='text-center'>
                                <p className='text-gray-500 text-6xl sm:text-7xl font-bold'>
                                    !Oops
                                </p>
                                <p className='text-3xl sm:text-5xl text-red-500 font-bold'>
                                    No videos found
                                </p>
                                <p className='text-gray-500'>
                                    Sorry.There are no videos in this channel.
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Videos;
