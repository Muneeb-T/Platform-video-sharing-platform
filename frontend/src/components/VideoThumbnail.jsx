import React from 'react';


function VideoThumbnail(props) {
    const { image, length } = props;
    return (
        <div className='relative hover:scale-95 duration-75'>
            <img className='h-full w-full relative' src={image}/>
            <p className='text-gray-200 text-sm opacity-80 drop-shadow-md absolute bottom-1 right-2'>
                {length}
            </p>
        </div>
    );
}

export default VideoThumbnail;
