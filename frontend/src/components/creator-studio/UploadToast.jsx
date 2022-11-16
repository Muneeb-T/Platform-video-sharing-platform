import React from 'react';
import ProgressBar from './ProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { setShowVideoUploadModal } from '../../redux/features/video/videoSlice';
function UploadToast() {
    const dispatch = useDispatch();
    const {
        videoUploadProgress,
        isVideoUploadLoading,
        isVideoUploadSuccess,
        videoUploadForm,
        video,
    } = useSelector((state) => state.video);
    const videoTitle = video?.details?.title || videoUploadForm?.title;
    return (
        <>
            <div className='bg-gray-700 flex bg-opacity-90 justify-between px-5 py-2  items-center'>
                <p className='text-gray-300'>
                    {isVideoUploadSuccess
                        ? 'Uploaded finished'
                        : 'Uploading...'}
                </p>
            </div>
            <div className='bg-gray-900 absolute p-3 w-full text-sm'>
                <div className='flex gap-3 items-center'>
                    <p className='text-gray-400 line-clamp-1'>{videoTitle}</p>
                    {isVideoUploadLoading && (
                        <>
                            <div
                                className='spinner-border text-gray-300 animate-spin inline-block w-4 h-4 border-2 rounded-full'
                                role='status'></div>
                        </>
                    )}
                    <div
                        className='text-gray-400 cursor-pointer'
                        onClick={() => dispatch(setShowVideoUploadModal(true))}>
                        <EditIcon sx={{ fontSize: 'large' }} />
                    </div>
                    {isVideoUploadSuccess && (
                        <>
                            <div className='text-green-400'>
                                <DoneIcon />
                            </div>
                        </>
                    )}
                </div>
                <div className='flex items-center gap-3 w-full'>
                    <ProgressBar videoUploadProgress={videoUploadProgress} />
                </div>
            </div>
        </>
    );
}

export default UploadToast;
