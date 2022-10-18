import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from './VideoThumbnail';

const videos = [
    {
        id: '1',
        genre: 'trending',
        thumbnail: 'https://i3.ytimg.com/vi/Qmi-Xwq-MEc/maxresdefault.jpg',
        title: 'Travel throught the most happiest dfas fdsf d fasd fafsadfasfd fd fdfadsf dsafd fdfd fdf dsf',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://static.toiimg.com/thumb/resizemode-4,msid-76729536,width-1200,height-900/76729536.jpg',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '2',
        genre: 'gaming',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '3',
        genre: 'entertainment',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '4',
        genre: 'trending',
        thumbnail: 'https://i3.ytimg.com/vi/Qmi-Xwq-MEc/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '5',
        genre: 'gaming',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '6',
        genre: 'entertainment',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        genre: 'trending',
        thumbnail: 'https://i3.ytimg.com/vi/Qmi-Xwq-MEc/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '7',
        genre: 'gaming',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '8',
        genre: 'entertainment',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel throught the most happiest',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '9',
        genre: 'trending',
        thumbnail: 'https://i3.ytimg.com/vi/Qmi-Xwq-MEc/maxresdefault.jpg',
        title: 'Travel',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '10',
        genre: 'gaming',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '11',
        genre: 'entertainment',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '12',
        genre: 'trending',
        thumbnail: 'https://i3.ytimg.com/vi/Qmi-Xwq-MEc/maxresdefault.jpg',
        title: 'Travel',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '13',
        genre: 'gaming',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
    {
        id: '14',
        genre: 'entertainment',
        thumbnail: 'https://i3.ytimg.com/vi/lepdqiCF-W8/maxresdefault.jpg',
        title: 'Travel',
        length: '02:33',
        channelName: 'Traversy media',
        channelLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E2LECvKl3nh9b3o7kXTd5qVd7fV626Pu4shbFtxJfZAUW7dnCPRJjZ71yOVvfo_LjlA&usqp=CAU',
        views: '2M',
        uploaded: '3 days ago',
    },
];

function VideoGroup(props) {
    const { genre: requestedGenre } = props;
    return (
        <div className='grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 sm:grid-rows-2 grid-cols-1 gap-3 w-full'>
            {videos.map((video) => {
                const {
                    id,
                    thumbnail,
                    genre,
                    title,
                    length,
                    channelName,
                    channelLogo,
                    views,
                    uploaded,
                } = video;
                if (requestedGenre === genre)
                    return (
                        <Link to={`/videos/video/${id}`} className='shrink-0 space-y-2'>
                            <VideoThumbnail image={thumbnail} length={length} />
                            <div>
                                <p className='text-gray-200 line-clamp-1'>
                                    {title}
                                </p>
                                <div className='flex gap-2 mt-1 items-center text-gray-400'>
                                    <img
                                        className='w-8 h-8 rounded-full'
                                        src={channelLogo}
                                        alt='Rounded avatar'
                                    />
                                    <div className='flex text-xs sm:text-sm'>
                                        <p>
                                            {channelName}
                                        </p>
                                        <p className='mx-3 text-gray-600'>|</p>
                                        <p>{views}</p>
                                        <p className='mx-3 text-gray-600'>|</p>
                                        <p>{uploaded}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                return null;
            })}
        </div>
    );
}

export default VideoGroup;
