import React from 'react';
import GenreTitle from './GenreTitle';
import VideoGroup from './VideoGroup-1';

const genres = [
    { id: '1', title: 'trending' },
    { id: '2', title: 'gaming' },
    { id: '3', title: 'entertainment' },
];

function Genres() {
    return (
        <div className='container mx-auto p-3'>
            <div className='space-y-5 overflow-hidden'>
                {genres.map((genre, index) => {
                    const { title } = genre;
                    return (
                        <>
                            <GenreTitle title={title} />
                            <div className='flex gap-3'>
                                <VideoGroup genre={title}/>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default Genres;
