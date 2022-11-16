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

                        <div className='space-y-2 lg:space-y-2 my-auto'>
                            <p className='text-gray-200 line-clamp-1'>
                                {title}
                            </p>

                            <p className='text-xs text-gray-400 sm:block hidden lg:hidden line-clamp-3'>
                                {description}
                            </p>
                            <div className='space-x-3 py-2 text-xs flex'>
                                <div className='flex space-x-2 text-gray-300 items-center'>
                                    <LikeIcon sx={{ fontSize: 'medium' }} />
                                    <p className='text-sm'>{likes || 0}</p>
                                </div>
                                <div className='flex space-x-2 text-gray-300 items-center'>
                                    <DislikeIcon sx={{ fontSize: 'medium' }} />
                                    <p className='text-sm'>{dislikes || 0}</p>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center text-gray-400'>
                                <div className='flex text-xs'>
                                    <p>{views || 0} Views</p>
                                    <p className='mx-2 text-gray-600'>|</p>
                                    <p>{moment(createdAt).from(new Date())}</p>
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
