import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from './VideoThumbnail';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';

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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur ',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
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
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia consequatur quibusdam recusandae hic consectetur delectus blanditiis, tempore vel fugiat dolorem quam velit voluptates voluptate esse debitis laborum atque inventore distinctio.',
    },
];

function VideoGroup2() {
    return (
        <div className='space-y-2'>
            {videos.map((video) => {
                const {
                    id,
                    thumbnail,
                    title,
                    length,
                    channelName,
                    channelLogo,
                    views,
                    uploaded,
                    description,
                } = video;

                return (
                    <Link
                        to={`/videos/video/${id}`}
                        className='grid grid-cols-1 md:grid-cols-2 space-x-2 sm:space-x-4'>
                        <VideoThumbnail image={thumbnail} length={length}/>

                        <div className='space-y-2 lg:space-y-2'>
                            <p className='text-gray-200 line-clamp-1'>
                                {title}
                            </p>
                            <div className='flex items-center gap-3'>
                                <img
                                    className='w-7 h-7 rounded-full'
                                    src={channelLogo}
                                    alt='Rounded avatar'
                                />
                                <p className='text-sm text-gray-400'>
                                    {channelName}
                                </p>
                               
                            </div>
                            <p className='text-xs text-gray-400 sm:block hidden lg:hidden line-clamp-3'>
                                    {description}
                            </p>
                            <div className='flex gap-2 items-center text-gray-400'>
                                <div className='flex text-xs'>
                                    <p>{views} Views</p>
                                    <p className='mx-2 text-gray-600'>|</p>
                                    <p>{uploaded}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default VideoGroup2;
