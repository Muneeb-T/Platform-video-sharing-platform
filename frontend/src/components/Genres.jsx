import moment from 'moment';
import { Link } from 'react-router-dom';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import GenreTitle from './GenreTitle';
import VideoThumbnail from './VideoThumbnail';
function Genres({ videos, title }) {
    return (
        <div className='container mx-auto pt-0 p-2 space-y-2'>
            <GenreTitle title={title} />
            <div className='space-y-5 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 overflow-hidden pb-5'>
                <div className='flex gap-3'>
                    {videos.map((video, index) => {
                        const {
                            _id: videoId,
                            thumbnail,
                            title: videoTitle,
                            video: videoProperties,
                            uploadedBy,
                            views,
                            createdAt,
                        } = video;

                        return (
                            <Link
                                key={index}
                                to={`/videos/${videoId}`}
                                className='min-w-[100%] md:min-w-[25%] lg:min-w-[25%] max-w-[100%] md:max-w-[50%] lg:max-w-[25%]'>
                                <VideoThumbnail
                                    image={thumbnail?.url}
                                    videoUrl={videoProperties?.url}
                                    length={videoProperties?.duration}
                                />
                                <div className='my-auto'>
                                    <p className='text-gray-200 line-clamp-1'>{videoTitle}</p>
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
                                            <p>{views} Views</p>
                                            <p className='mx-3 text-gray-600'>|</p>
                                            <p>{moment(createdAt).from(new Date())}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Genres;
