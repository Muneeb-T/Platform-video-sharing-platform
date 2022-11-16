import React, { useEffect } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import {
    setShowVideoUploadModal,
    reset,
} from '../../redux/features/video/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import VideoUploadModal from '../../pages/creator-studio/VideoUploadModal';
import { toast } from 'react-toastify';
function TopBar({ title }) {
    const {
        isVideoDetailsSaveSuccess,
        uploadingOnProcess,
        isVideoUploadError,
    } = useSelector((state) => state.video);
    useEffect(() => {
        if (!uploadingOnProcess) {
            if (isVideoDetailsSaveSuccess) {
                toast.success('Video uploaded successfully');
            }
            if (isVideoUploadError) {
                toast.error('Video upload error');
            }
            dispatch(reset());
        }
    }, [isVideoUploadError, uploadingOnProcess]);
    const dispatch = useDispatch();
    const { showVideoUploadModal } = useSelector((state) => state.video);
    return (
        <>
            <div className='bg-gray-300 bg-opacity-5 flex justify-between items-center px-8 py-3'>
                <p className='text-gray-300 font-bold text-xl'>{title}</p>
                <div className='flex gap-3'>
                    <button
                        onClick={() => dispatch(setShowVideoUploadModal(true))}
                        type='button'
                        className='p-1 shrink-0 rounded-full bg-gray-700  text-gray-300 hover:text-white'>
                        <span className='sr-only'>Upload video</span>
                        <UploadIcon aria-hidden='true' />
                    </button>
                    <button
                        type='button'
                        className='p-1 shrink-0 rounded-full bg-gray-700 text-gray-300 hover:text-white'>
                        <span className='sr-only'>Live stream</span>
                        <LiveStreamingIcon aria-hidden='true' />
                    </button>
                </div>
            </div>
            {showVideoUploadModal ? <VideoUploadModal /> : null}
        </>
    );
}

export default TopBar;
