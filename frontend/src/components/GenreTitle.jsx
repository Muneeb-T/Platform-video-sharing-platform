import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React from 'react';

function GenreTitle(props) {
    const { title } = props;
    return (
        <div className='flex gap-4 text-gray-200 font-bold text-3xl items-center'>
            <h1 className='capitalize'>{title}</h1>
            <PlayArrowIcon />
        </div>
    );
}

export default GenreTitle;
