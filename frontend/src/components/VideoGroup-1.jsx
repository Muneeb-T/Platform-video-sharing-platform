import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from './VideoThumbnail';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import moment from 'moment';
function VideoGroup(props) {
    const { videos } = props;
    return (
        <div className='flex gap-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-700 overflow-y-hidden pb-5'>
            {videos?.map((video) => {
                const {
                    _id: videoId,
                    thumbnail,
                    title,
                    video: videoProperties,
                    uploadedBy,
                    views,
                    createdAt,
                } = video;

                return (
                    <Link
                        to={`/videos/video/${videoId}`}
                        className='min-w-[100%] md:min-w-[50%] lg:min-w-[25%]'>
                        <VideoThumbnail image={thumbnail} length={videoProperties?.length} />
                        <div className='my-auto'>
                            <p className='text-gray-200 line-clamp-1'>{title}</p>
                            <div className='flex gap-2 mt-1 items-center text-gray-400'>
                                <img
                                    className='w-8 h-8 rounded-full'
                                    src={
                                        uploadedBy?.profilePicture?.url ||
                                        uploadedBy?.googleAccount?.picture ||
                                        uploadedBy?.facebookAccount?.picture ||
                                        AvatarThumbnail
                                    }
                                    alt='Rounded avatar'
                                />
                                <div className='flex text-xs sm:text-sm'>
                                    <p>{uploadedBy.username}</p>
                                    <p className='mx-3 text-gray-600'>|</p>
                                    <p>{views}</p>
                                    <p className='mx-3 text-gray-600'>|</p>
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

export default VideoGroup;
