import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import Spinner2 from '../../../components/Spinner2';
import GenreTitle from '../../../components/GenreTitle';
import VideoGroup from '../../../components/VideoGroup-1';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import { useDispatch, useSelector } from 'react-redux';
import ShareModal from '../../../components/ShareModal';
import { setShowShareModal } from '../../../redux/features/common/commonSlice';
import VideoThumbnail from '../../../components/VideoThumbnail';
import { Link } from 'react-router-dom';

function Home({ channel, isFollowChannelLoading, requestedVideos }) {
    if (!requestedVideos || !requestedVideos['uploads']?.length) {
        return (
            <>
                <div className='container p-5 mx-auto mt-6 flex items-center justify-center'>
                    <div className='text-center'>
                        <p className='text-gray-500 text-6xl sm:text-7xl font-bold'>!Oops</p>
                        <p className='text-3xl sm:text-5xl text-red-500 font-bold'>
                            No contents found
                        </p>
                        <p className='text-gray-500'>
                            Sorry.This channel doesn't have any content.
                        </p>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            {isFollowChannelLoading ? (
                <>
                    <Spinner2 />
                </>
            ) : (
                (channel?.featuredVideo || channel?.channelTrailer) && (
                    <>
                        {channel?.followed ? (
                            <FeaturedSection showVideo={channel?.featuredVideo} />
                        ) : (
                            <FeaturedSection showVideo={channel?.channelTrailer} />
                        )}
                    </>
                )
            )}
            <div className='container py-6'>
                <div className='space-y-5 '>
                    {requestedVideos && Object.keys(requestedVideos).length
                        ? Object.keys(requestedVideos).map((category) => {
                              if (requestedVideos[category].length) {
                                  return (
                                      <>
                                          <div>
                                              <GenreTitle title={category} />
                                          </div>
                                          <div className='flex gap-3 overflow-hidden overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pb-5'>
                                              {requestedVideos[category].map((video, index) => {
                                                  const {
                                                      _id: videoId,
                                                      thumbnail,
                                                      video: videoProperties,
                                                      title,
                                                  } = video;
                                                  return (
                                                      <>
                                                          <Link
                                                              to={`/videos/${videoId}`}
                                                              className='min-w-[25%] max-w-[25%]'>
                                                              <VideoThumbnail
                                                                  image={thumbnail?.url}
                                                                  length={videoProperties?.duration}
                                                                  videoUrl={videoProperties?.url}
                                                              />
                                                              <p className='text-gray-200 line-clamp-1'>
                                                                  {title}
                                                              </p>
                                                          </Link>
                                                      </>
                                                  );
                                              })}
                                          </div>
                                      </>
                                  );
                                  return null;
                              }
                          })
                        : null}
                </div>
            </div>
        </>
    );
}

function FeaturedSection({ showVideo }) {
    const { showShareModal } = useSelector((state) => state.common);
    const dispatch = useDispatch();
    return (
        <>
            {showShareModal && (
                <ShareModal
                    url={`${process.env.REACT_APP_ROOT_URL}/videos/${showVideo?._id}`}
                    title={`Platform - ${showVideo?.title}`}
                    subject={`Platform-${showVideo?.title}`}
                />
            )}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <video
                        controls
                        autoPlay={true}
                        poster={showVideo?.thumbnail?.url || ''}
                        className='w-full'>
                        <source
                            src={showVideo?.video?.url || ''}
                            type={`video/${showVideo?.video?.format}`}
                        />
                        Sorry, your browser doesn't support embedded videos, but don't worry, you
                        can
                    </video>
                </div>
                <div className='col space-y-5 my-auto'>
                    <p className='text-xl text-gray-300 line-clamp-1'>{showVideo?.title || ''}</p>
                    <p className='text-gray-500 text-sm line-clamp-4'>
                        {showVideo?.description || ''}
                    </p>

                    <div className='flex gap-5 text-sm text-gray-400'>
                        <div className='flex space-x-2 text-gray-300 items-center'>
                            <LikeIcon sx={{ fontSize: 'large' }} />
                            <p className='text-sm'>{showVideo?.likedBy?.length || 0}</p>
                        </div>
                        <div className='flex space-x-2 text-gray-300 items-center'>
                            <DislikeIcon sx={{ fontSize: 'large' }} />
                            <p className='text-sm'>{showVideo?.dislikedBy?.length}</p>
                        </div>
                        <button
                            className='flex items-center space-x-2'
                            onClick={() => {
                                dispatch(setShowShareModal(true));
                            }}>
                            <ShareIcon className='text-gray-300' />
                            <div className='hidden sm:block'>Share</div>
                        </button>
                    </div>
                    <div className='flex text-xs sm:text-sm text-gray-500'>
                        <p>{showVideo?.views?.length || 0} Views</p>
                        <p className='mx-3 text-gray-600'>|</p>
                        <p>{moment(showVideo?.createdAt).from(new Date())}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;
