import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
//video upload

import { useSelector, useDispatch } from 'react-redux';
import {
    reset,
    uploadVideo,
    setVideoUrl,
    setUploadingOnProcess,
    setShowVideoUploadModal,
} from '../../redux/features/video/videoSlice';
import { toast } from 'react-toastify';
import VideoDetailsForm from './VideoDetailsForm';
import ProgressBar from '../../components/creator-studio/ProgressBar';

function VideoUploadModal() {
    const dispatch = useDispatch();
    const {
        isVideoUploadLoading,
        isVideoUploadError,
        isVideoUploadSuccess,
        videoUploadMessage,
        videoUploadProgress,
        uploadingOnProcess,
    } = useSelector((state) => state.video);

    useEffect(() => {
        if (uploadingOnProcess) {
            dispatch(reset());
        }
        if (isVideoUploadError) {
            toast.error(videoUploadMessage);
            dispatch(setUploadingOnProcess(false));
            dispatch(reset());
        }
        return () => {
            dispatch(reset());
        };
    }, [uploadingOnProcess, isVideoUploadError]);

    const inputVideoOnDrop = (e) => {
        const allowedTypes = new Set([e.target.accept]);
        if (!allowedTypes.has(e.target.files[0].type)) {
            toast.error('File format not supported');
            e.preventDefault();
        }
    };

    const inputVideoOnChange = (e) => {
        let file = e.target.files[0];
        file = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'videos');
        formData.append('cloud_name', 'drjndmchy');
        dispatch(setVideoUrl(file));
        dispatch(uploadVideo(formData));
        dispatch(setUploadingOnProcess(true));
    };

    return (
        <>
            <div className='fixed inset-0 z-50 overflow-y-auto'>
                <div className='flex items-center min-h-screen px-4 py-8'>
                    <div className='relative w-full  p-10 max-w-5xl mx-auto bg-gray-900 bg-opacity-90 rounded-md shadow-lg space-y-5'>
                        <>
                            <div className='flex text-gray-300 justify-between'>
                                <p className='font-bold text-lg'>
                                    Upload video
                                </p>
                                <CloseIcon
                                    className='cursor-pointer'
                                    onClick={() =>
                                        dispatch(setShowVideoUploadModal(false))
                                    }
                                />
                            </div>
                            <hr className='opacity-20' />
                            {uploadingOnProcess ? (
                                <>
                                    <div className='space-y-5 relative'>
                                        <VideoDetailsForm />
                                        {isVideoUploadLoading ? (
                                            <>
                                                <div className='h-10 flex rounded-sm w-full absolute -bottom-10 right-0'>
                                                    <ProgressBar
                                                        videoUploadProgress={
                                                            videoUploadProgress
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : null}
                                        {isVideoUploadSuccess ? (
                                            <>
                                                <div className='h-10 flex gap-3 text-center items-center justify-center rounded-sm w-full absolute -bottom-10 right-0'>
                                                    <div className='text-green-400'>
                                                        <DoneIcon />
                                                    </div>
                                                    <p className='text-gray-300'>
                                                        Video uploaded
                                                        successfully
                                                    </p>
                                                </div>
                                            </>
                                        ) : null}
                                        {isVideoUploadError ? (
                                            <>
                                                <div className='h-10 flex gap-3 text-center items-center justify-center rounded-sm w-full absolute -bottom-10 right-0'>
                                                    <div className='text-red-400'>
                                                        <CloseIcon />
                                                    </div>
                                                    <p className='text-gray-300'>
                                                        {videoUploadMessage}
                                                    </p>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </>
                            ) : (
                                <div className='p-20 space-y-5 relative text-center'>
                                    <div className='flex items-center justify-center bg-grey-lighter'>
                                        <div className='flex justify-center items-center w-full'>
                                            <label
                                                htmlFor='dropzone-file'
                                                className='flex flex-col justify-center items-center px-10 h-40 bg-gray-50 rounded-sm border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                                <div className='flex flex-col justify-center items-center pt-5 pb-6'>
                                                    <svg
                                                        aria-hidden='true'
                                                        className='mb-3 w-10 h-10 text-gray-400'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        viewBox='0 0 24 24'
                                                        xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                            stroke-width='2'
                                                            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
                                                    </svg>
                                                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                                        <span className='font-semibold'>
                                                            Click to upload
                                                        </span>{' '}
                                                        or drag and drop your
                                                        video
                                                    </p>
                                                </div>
                                                <input
                                                    id='dropzone-file'
                                                    type='file'
                                                    className='hidden'
                                                    onDrop={inputVideoOnDrop}
                                                    onChange={
                                                        inputVideoOnChange
                                                    }
                                                    accept='video/*'
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoUploadModal;
