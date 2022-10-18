import React from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LiveStreamingIcon from '@mui/icons-material/WifiTethering';
import Sidebar from '../../components/creator-studio/Sidebar';
const user = null;
function Dashboard() {
    return (
        <>
            <div className='container mx-auto bg-gray-900'>
                <div className='grid grid-cols-5 gap-2 h-screen pt-20'>
                    <div className='bg-gray-300 bg-opacity-5 overflow-y-scroll scrollbar-hide'>
                        <div className='flex items-center justify-center h-[20%] gap-2 border-b-2 border-opacity-10 border-gray-100'>
                            <img
                                className='h-20 w-20 rounded-full'
                                src={
                                    user
                                        ? user.profilePicture
                                            ? user.profilePicture.path
                                            : user.googleAccount
                                            ? user.googleAccount.picture
                                            : user.facebookAccount
                                            ? user.facebookAccount.picture
                                            : AvatarThumbnail
                                        : AvatarThumbnail
                                }
                                referrerPolicy='no-referrer'
                                alt=''
                            />
                            <p className='text-2xl font-bold text-gray-300'>
                                Muneeb T
                            </p>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </div>

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
