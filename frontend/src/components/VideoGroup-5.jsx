import React from 'react';
import { Link} from 'react-router-dom';
import VideoThumbnail from './VideoThumbnail';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import moment from 'moment';
function VideoGroup5({ videos }) {
    return (
        <div className='space-y-5 md:space-y-0'>
            {videos.map((video) => {
                const {
                    _id: videoId,
                    thumbnail,
                    title,
                    video: videoProperties,
                    views,
                    createdAt,
                    description,
                    likes,
                    dislikes,
                } = video;
                return (
                    <div key={videoId}>
                        <Link to={`/videos/${videoId}`}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mr-4'>
                                <VideoThumbnail
                                    image={thumbnail?.url}
                                    length={videoProperties?.duration}
                                    videoUrl={videoProperties?.url}
                                />

                                <div className='space-y-1  md:space-y-2 lg:col-span-3  my-auto'>
                                    <p className='text-gray-200 line-clamp-1 text-justify'>
                                        {title}
                                    </p>
                                    <p className='text-gray-400 text-justify line-clamp-2 text-xs hidden'>
                                        {description}
                                    </p>
                                    <div className='md:flex space-x-3 py-2 text-xs hidden'>
                                        <div className='flex space-x-2 text-gray-300 items-center'>
                                            <LikeIcon sx={{ fontSize: 'medium' }} />
                                            <p className='text-sm'>{likes}</p>
                                        </div>
                                        <div className='flex space-x-2 text-gray-300 items-center'>
                                            <DislikeIcon sx={{ fontSize: 'medium' }} />

                                            <p className='text-sm'>{dislikes}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 mt-1 items-center text-gray-400'>
                                        <div className='flex text-xs'>
                                            <p>{views} Views</p>
                                            <p className='mx-3 text-gray-600'>|</p>
                                            <p>{moment(createdAt).from(new Date())}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default VideoGroup5;
