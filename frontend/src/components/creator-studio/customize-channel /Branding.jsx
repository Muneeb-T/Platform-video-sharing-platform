import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getChannel,
    reset,
    updateChannel,
} from '../../../redux/features/channel/channelSlice';
import channelBannerThumbnail from '../../../assets/images/Transparent grid.png';
import Spinner2 from '../../Spinner2';
import AvatarThumbnail from '../../../assets/images/avatar-thumbnail.png';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function Branding() {
    const dispatch = useDispatch();

    const channelLogoInput = useRef(null);
    const channelBannerInput = useRef(null);
    const channelWatermarkInput = useRef(null);
    const handleChannelLogoUpdate = (event) => {
        channelLogoInput?.current?.click();
    };
    const channelLogoOnChange = (event) => {
        const file = event.target.files[0];
        dispatch(updateChannel({ channelId: channel?._id, channelLogo: file }));
    };

    const handleChannelBannerUpdate = () => {
        channelBannerInput?.current?.click();
    };
    const channelBannerOnChange = (event) => {
        const file = event.target.files[0];
        dispatch(updateChannel({ channelId: channel?._id, banner: file }));
    };

    const handleChannelWatermarkUpdate = () => {
        channelWatermarkInput?.current?.click();
    };
    const channelWatermarkOnChange = (event) => {
        const file = event.target.files[0];
        dispatch(updateChannel({ channelId: channel?._id, watermark: file }));
    };
    const { id: requestedUserId } = useParams();
    const {
        channel,
        isGetChannelLoading,
        updateChannelLoading,
        updateChannelSuccess,
        updateChannelError,
    } = useSelector((state) => state.channel);
    const profilePicture =
        channel?.owner?.profilePicture?.url ||
        channel?.owner?.googleAccount?.picture ||
        channel?.owner?.facebookAccount?.picture;
    useEffect(() => {
        dispatch(getChannel({ userId: requestedUserId }));
        return () => {
            dispatch(reset());
        };
    }, [requestedUserId, updateChannelSuccess, updateChannelError]);

    const handleRemoveChannelLogo = () => {
        dispatch(
            updateChannel({
                channelId: channel?._id,
                remove: { channelLogo: true },
            })
        );
    };
    const handleRemoveBanner = () => {
        dispatch(
            updateChannel({ channelId: channel?._id, remove: { banner: true } })
        );
    };

    const handleRemoveWatermark = () => {
        dispatch(
            updateChannel({
                channelId: channel?._id,
                remove: { watermark: true },
            })
        );
    };

    if (isGetChannelLoading || updateChannelLoading) {
        return <Spinner2 />;
    }
    return (
        <div>
            <ul className='space-y-4'>
                <li className='space-y-2'>
                    <p className='text-gray-400 text-sm'>Logo</p>
                    <div className='md:grid md:grid-cols-3 '>
                        <div className='bg-gray-600 bg-opacity-40 h-36 flex items-center justify-center'>
                            <img
                                className='h-20 w-20 rounded-full'
                                src={profilePicture || AvatarThumbnail}
                                referrerPolicy='no-referrer'
                                alt='channel logo'
                            />
                        </div>
                        <div className='col-span-2 bg-gray-700 bg-opacity-20 flex items-center p-6'>
                            <div className='text-sm space-y-3'>
                                <p className='text-gray-500'>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since
                                </p>
                                <div className='flex space-x-3'>
                                    <button
                                        className='text-gray-300 mr-3 flex items-center gap-2'
                                        onClick={handleChannelLogoUpdate}>
                                        {profilePicture ? (
                                            <>
                                                <RotateRightIcon />{' '}
                                                <p>Change</p>
                                            </>
                                        ) : (
                                            <>
                                                <AddPhotoAlternateIcon />{' '}
                                                <p>Add</p>
                                            </>
                                        )}
                                    </button>
                                    <input
                                        type='file'
                                        name='channel-logo'
                                        onChange={channelLogoOnChange}
                                        id='channel-logo'
                                        accept='image/*'
                                        ref={channelLogoInput}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        className='text-gray-300'
                                        onClick={handleRemoveChannelLogo}>
                                        <RemoveCircleOutlineIcon className='mr-1' />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className='space-y-2'>
                    <p className='text-gray-400 text-sm'>Banner</p>
                    <div className='md:grid md:grid-cols-3'>
                        <div className='bg-gray-600 bg-opacity-40 h-36 flex items-center justify-center'>
                            <img
                                className='w-full h-full'
                                src={
                                    channel?.banner?.url ||
                                    channelBannerThumbnail
                                }
                                referrerPolicy='no-referrer'
                                alt=''
                            />
                        </div>
                        <div className='col-span-2 bg-gray-700 bg-opacity-20 flex items-center p-6'>
                            <div className='text-sm space-y-3'>
                                <p className='text-gray-500'>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since
                                </p>
                                <div className='flex space-x-3'>
                                    <button
                                        className='text-gray-300 mr-3 flex items-center gap-2'
                                        onClick={handleChannelBannerUpdate}>
                                        {channel?.banner?.url ? (
                                            <>
                                                <RotateRightIcon />{' '}
                                                <p>Change</p>
                                            </>
                                        ) : (
                                            <>
                                                <AddPhotoAlternateIcon />{' '}
                                                <p>Add</p>
                                            </>
                                        )}
                                    </button>
                                    <input
                                        type='file'
                                        name='channel-banner'
                                        onChange={channelBannerOnChange}
                                        id='channel-banner'
                                        accept='image/*'
                                        ref={channelBannerInput}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        className='text-gray-300'
                                        onClick={handleRemoveBanner}>
                                        <RemoveCircleOutlineIcon className='mr-1' />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className='space-y-2'>
                    <p className='text-gray-400 text-sm'>Watermark</p>
                    <div className='md:grid md:grid-cols-3'>
                        <div className='col bg-gray-600 bg-opacity-40 h-36 flex items-start justify-end p-3'>
                            <img
                                className='w-12 h-12'
                                src={
                                    channel?.watermark?.url ||
                                    channelBannerThumbnail
                                }
                                referrerPolicy='no-referrer'
                                alt='watermark'
                            />
                        </div>
                        <div className='col-span-2 bg-gray-700 bg-opacity-20 flex items-center p-6'>
                            <div className='text-sm space-y-3'>
                                <p className='text-gray-500'>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since
                                </p>
                                <div className='flex space-x-3'>
                                    <button
                                        className='text-gray-300 mr-3 flex items-center gap-2'
                                        onClick={handleChannelWatermarkUpdate}>
                                        {channel?.watermark?.url ? (
                                            <>
                                                <RotateRightIcon />{' '}
                                                <p>Change</p>
                                            </>
                                        ) : (
                                            <>
                                                <AddPhotoAlternateIcon />{' '}
                                                <p>Add</p>
                                            </>
                                        )}
                                    </button>
                                    <input
                                        type='file'
                                        name='channel-watermark'
                                        onChange={channelWatermarkOnChange}
                                        id='channel-watermark'
                                        accept='image/*'
                                        ref={channelWatermarkInput}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        className='text-gray-300'
                                        onClick={handleRemoveWatermark}>
                                        <RemoveCircleOutlineIcon className='mr-1' />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Branding;
