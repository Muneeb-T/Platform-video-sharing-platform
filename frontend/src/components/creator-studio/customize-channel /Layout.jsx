import React, { useEffect, useState } from 'react';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import {
    getChannel,
    reset,
    updateChannel,
} from '../../../redux/features/channel/channelSlice';
import { Link, useParams } from 'react-router-dom';
import Spinner2 from '../../Spinner2';
import ContentModal from './ContentModal';
import VideoThumbnail from '../../VideoThumbnail';
function Layout() {
    const dispatch = useDispatch();
    const { id: requestedUserId } = useParams();
    const [openVideoModal, setOpenVideoModal] = useState({
        open: false,
        purpose: null,
    });
    const {
        channel,
        isGetChannelLoading,
        updateChannelLoading,
        updateChannelSuccess,
        updateChannelError,
    } = useSelector((state) => state.channel);
    console.log(channel?.featuredVideo);
    console.log(channel?.channelTrailer);
    const handleRemoveChannelTrailer = () => {
        dispatch(
            updateChannel({
                channelId: channel?._id,
                remove: { channelTrailer: true },
            })
        );
    };

    const handleRemoveFeaturedVideo = () => {
        dispatch(
            updateChannel({
                channelId: channel?._id,
                remove: { featuredVideo: true },
            })
        );
    };
    useEffect(() => {
        dispatch(getChannel({ userId: requestedUserId }));
        return () => {
            dispatch(reset());
        };
    }, [requestedUserId, updateChannelSuccess, updateChannelError]);

    if (isGetChannelLoading || updateChannelLoading) {
        return <Spinner2 />;
    }
    return (
        <>
            <div className=''>
                <ul className='space-y-4 block'>
                    <li className='space-y-2'>
                        <p className='text-gray-400 text-sm'>
                            Channel trailer (For people those who are not
                            followed)
                        </p>
                        <div className={`md:grid md:grid-cols-3`}>
                            {channel?.channelTrailer ? (
                                <div className='bg-gray-600 bg-opacity-40 flex items-center justify-center'>
                                    <Link
                                        to={`/videos/${channel?.channelTrailer?._id}`}
                                        className='w-full'>
                                        <VideoThumbnail
                                            image={
                                                channel?.channelTrailer
                                                    ?.thumbnail?.url
                                            }
                                            length={
                                                channel?.channelTrailer?.video
                                                    ?.duration
                                            }
                                            videoUrl={
                                                channel?.channelTrailer?.video
                                                    ?.url
                                            }
                                        />
                                    </Link>
                                </div>
                            ) : (
                                <div className='bg-gray-600 bg-opacity-40 p-14 flex items-center justify-center'>
                                    <button
                                        className='border border-red-500 rounded text-gray-300 p-2 text-xs'
                                        onClick={() =>
                                            setOpenVideoModal({
                                                open: true,
                                                purpose: 'trailer',
                                            })
                                        }>
                                        Choose video
                                    </button>
                                </div>
                            )}

                            <div className='col-span-2 bg-gray-700 bg-opacity-20 flex items-center p-6'>
                                <div className='text-sm space-y-3'>
                                    {channel?.channelTrailer ? (
                                        <div className='space-y-2'>
                                            <div className='space-y-1 my-auto'>
                                                <p className='text-gray-200 line-clamp-2 text-justify'>
                                                    {
                                                        channel?.channelTrailer
                                                            ?.title
                                                    }
                                                </p>
                                                <p className='text-gray-400 text-justify line-clamp-2 text-xs hidden'>
                                                    {
                                                        channel?.channelTrailer
                                                            ?.description
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex gap-3'>
                                                <button
                                                    className='text-gray-300'
                                                    onClick={() =>
                                                        setOpenVideoModal({
                                                            open: true,
                                                            purpose: 'trailer',
                                                        })
                                                    }>
                                                    <RotateRightIcon className='mr-1' />{' '}
                                                    Change
                                                </button>
                                                <button
                                                    className='text-gray-300'
                                                    onClick={
                                                        handleRemoveChannelTrailer
                                                    }>
                                                    <RemoveCircleOutlineIcon className='mr-1' />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className='text-gray-500 text-xs'>
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever
                                            since
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='space-y-2'>
                        <p className='text-gray-400  text-sm'>
                            Featured video (For the followers)
                        </p>
                        <div className={`md:grid md:grid-cols-3`}>
                            {channel?.featuredVideo ? (
                                <div className='bg-gray-600 bg-opacity-40 flex items-center justify-center'>
                                    <Link
                                        to={`/videos/${channel?.featuredVideo?._id}`}
                                        className='w-full'>
                                        <VideoThumbnail
                                            image={
                                                channel?.featuredVideo
                                                    ?.thumbnail?.url
                                            }
                                            length={
                                                channel?.featuredVideo?.video
                                                    ?.duration
                                            }
                                            videoUrl={
                                                channel?.featuredVideo?.video
                                                    ?.url
                                            }
                                        />
                                    </Link>
                                </div>
                            ) : (
                                <div className='bg-gray-600 bg-opacity-40 p-14 flex items-center justify-center'>
                                    <button
                                        className='border border-red-500 rounded text-gray-300 p-2 text-xs'
                                        onClick={() =>
                                            setOpenVideoModal({
                                                open: true,
                                                purpose: 'featured',
                                            })
                                        }>
                                        Choose video
                                    </button>
                                </div>
                            )}

                            <div className='col-span-2 bg-gray-700 bg-opacity-20 flex items-center p-6'>
                                <div className='text-sm space-y-3'>
                                    {channel?.featuredVideo ? (
                                        <div className='space-y-2'>
                                            <div className='space-y-1 my-auto'>
                                                <p className='text-gray-200 line-clamp-2 text-justify'>
                                                    {
                                                        channel?.featuredVideo
                                                            ?.title
                                                    }
                                                </p>
                                                <p className='text-gray-400 text-justify line-clamp-2 text-xs hidden'>
                                                    {
                                                        channel?.featuredVideo
                                                            ?.description
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex gap-3'>
                                                <button
                                                    className='text-gray-300'
                                                    onClick={() =>
                                                        setOpenVideoModal({
                                                            open: true,
                                                            purpose: 'featured',
                                                        })
                                                    }>
                                                    <RotateRightIcon className='mr-1' />{' '}
                                                    Change
                                                </button>
                                                <button
                                                    className='text-gray-300'
                                                    onClick={
                                                        handleRemoveFeaturedVideo
                                                    }>
                                                    <RemoveCircleOutlineIcon className='mr-1' />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className='text-gray-500 text-xs'>
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever
                                            since
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <>
                {openVideoModal.open && (
                    <ContentModal
                        purpose={openVideoModal.purpose}
                        handleClose={setOpenVideoModal}
                    />
                )}
            </>
        </>
    );
}

export default Layout;
