import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
function ProgressBar({ videoUploadProgress }) {
    return (
        <>
            <p className='text-gray-300'>{videoUploadProgress}%</p>
            <div className='w-full bg-gray-200 rounded-sm h-2.5 dark:bg-gray-700'>
                <div
                    className='bg-blue-600 h-2.5 rounded-sm'
                    style={{
                        width: `${videoUploadProgress}%`,
                    }}></div>
            </div>
            <Link className='text-gray-300'>
                <CloseIcon sx={{ fontSize: 'medium' }} />
            </Link>
        </>
    );
}

export default ProgressBar;
