import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from './VideoThumbnail';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import moment from 'moment';

function VideoGroup3({ videos }) {
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
                        className='grid grid-cols-1 md:grid-cols-2 space-x-2 sm:space-x-4'
                        key={videoId}>
                        <VideoThumbnail
                            image={thumbnail?.url}
                            length={videoProperties?.duration}
                            videoUrl={videoProperties?.url}
                        />

                        <div className='space-y-2 lg:space-y-2 my-auto'>
                            <p className='text-gray-200 text-sm line-clamp-1'>{title}</p>
                            <div className='flex items-center gap-3'>
                                <img
                                    className='w-7 h-7 rounded-full'
                                    src={
                                        uploadedBy?.profilePicture?.url ||
                                        uploadedBy?.googleAccount?.picture ||
                                        uploadedBy?.facebookAccount?.picture ||
                                        AvatarThumbnail
                                    }
                                    alt='Rounded avatar'
                                />
                                <p className='text-sm text-gray-400'>{uploadedBy?.username}</p>
                            </div>
                            <p className='text-xs text-gray-400 sm:block hidden lg:hidden line-clamp-3'>
                                {description}
                            </p>
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

export default VideoGroup3;
