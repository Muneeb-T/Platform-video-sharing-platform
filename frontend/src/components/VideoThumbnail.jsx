import React from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
function VideoThumbnail(props) {
    let { image, length, videoUrl } = props;
    if (length) length = new Date(length * 1000).toISOString().slice(11, 19);
    return (
        <div className='relative hover:scale-95 duration-75'>
            <HoverVideoPlayer
                videoSrc={videoUrl}
                pausedOverlay={
                    <img
                        className='relative'
                        style={{ width: '100%', height: '100%', backgroundColor:'black', objectFit: 'contain' }}
                        src={image}
                        alt='video'
                    />
                }
                loadingOverlay={
                    <div className='flex items-center w-full h-full justify-center'>
                        <div
                            className='spinner-border animate-spin text-gray-300 inline-block w-10 h-10 border-2 rounded-full'
                            role='status'></div>
                    </div>
                }
                className='m-0 p-0 video-container'
                videoClassName='video'
            />

            <p className='text-gray-200 opacity-80 drop-shadow-md absolute bottom-3 text-sm right-2 bg-gray-700 px-3 bg-opacity-50 z-30'>
                {length || '00:00:00'}
            </p>
        </div>
    );
}

export default VideoThumbnail;
