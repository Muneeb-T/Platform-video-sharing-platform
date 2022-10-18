import React from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
function Dashboard() {
    return (
        <>
            <div className='col-span-4 gap-2 overflow-y-scroll scrollbar-hide space-y-2'>
                <div className='bg-gray-300 bg-opacity-5 flex justify-between  items-center px-8 py-3'>
                    <p className='text-gray-300 font-bold text-xl'>Dashboard</p>
                    <div className='flex gap-3'>
                        <button
                            type='button'
                            className='p-1 shrink-0 rounded-full bg-gray-700  text-gray-300 hover:text-white'>
                            <span className='sr-only'>Upload video</span>
                            <UploadIcon aria-hidden='true' />
                        </button>
                        <button
                            type='button'
                            className='p-1 shrink-0 rounded-full bg-gray-700 text-gray-300 hover:text-white'>
                            <span className='sr-only'>Upload video</span>
                            <LiveStreamingIcon aria-hidden='true' />
                        </button>
                    </div>
                </div>
                <div className='bg-gray-300 bg-opacity-5 h-full'></div>
            </div>
        </>
    );
}

export default Dashboard;
