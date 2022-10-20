import React from 'react';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
function UploadToast() {
    const { videoUploadProgress, uploadingOnProcess, video } = useSelector(
        (state) => state.video
    );
    const videoTitle = video?.details?.title;
    return (
        <>
            <div className='bg-gray-900  bg-opacity-80 absolute p-3 w-full text-sm'>
                <p className='text-gray-400'>{videoTitle}</p>
                <div className='flex items-center gap-3 w-full'>
                    <ProgressBar videoUploadProgress={videoUploadProgress} />
                </div>
            </div>
        </>
    );
}

export default UploadToast;
