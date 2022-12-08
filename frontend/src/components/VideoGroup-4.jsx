import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from './VideoThumbnail';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import moment from 'moment';

function VideoGroup4({ videos }) {
    return (
        <div className='space-y-4 sm:space-y-0'>
            {videos?.map((video) => {
                const {
                    _id: videoId,
                    thumbnail,
                    title,
                    video: videoProperties,
                    uploadedBy,
                    views,
                    createdAt,
                    description,
                    likes,
                    dislikes,
                } = video;

                return (
                    <Link
                        to={`/videos/${videoId}`}
                        className='grid grid-cols-1 md:grid-cols-2 space-x-2 sm:space-x-4'>
                        <VideoThumbnail
                            image={thumbnail?.url}
                            length={videoProperties?.duration}
                            videoUrl={videoProperties?.url}
                        />

                        <div className='lg:space-y-1 my-auto'>
                            <p className='text-gray-200 text-sm line-clamp-1'>{title}</p>

                            <p className='text-xs text-gray-400 line-clamp-2'>{description}</p>
                            <div className='md:block flex gap-3 items-center'>
                                <div className='space-x-3 text-xs flex items-center'>
                                    <div className='flex space-x-2 text-gray-300 items-center'>
                                        <LikeIcon sx={{ fontSize: 'small' }} />
                                        <p className='text-sm'>{likes || 0}</p>
                                    </div>
                                    <div className='flex space-x-2 text-gray-300 items-center'>
                                        <DislikeIcon sx={{ fontSize: 'small' }} />
                                        <p className='text-sm'>{dislikes || 0}</p>
                                    </div>
                                </div>
                                <div className='flex gap-2 text-gray-400'>
                                    <div className='flex text-xs'>
                                        <p>{views || 0} Views</p>
                                        <p className='mx-2 text-gray-600'>|</p>
                                        <p>{moment(createdAt).from(new Date())}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default VideoGroup4;
