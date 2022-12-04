import React, { useState, useEffect } from 'react';
import VideoGroup3 from '../components/VideoGroup-3';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import DislikeIcon from '@mui/icons-material/ThumbDownAlt';
import ViewIcon from '@mui/icons-material/Visibility';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import FollowIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import { useSelector, useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import { Menu } from '@headlessui/react';
import { Link, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import DoneIcon from '@mui/icons-material/Done';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import mongoose from 'mongoose';
import {
    reset as videoReset,
    getVideo,
    likeOrDislikeVideo,
    setChannelFollowed,
    setViews,
    saveComment,
    saveViewData,
    resetPlaybackVideo,
} from '../redux/features/video/videoSlice';
import { followChannel, reset as channelReset } from '../redux/features/channel/channelSlice';
import moment from 'moment';
import Spinner from '../components/Spinner';
import ShareModal from '../components/ShareModal';
import { setShowShareModal } from '../redux/features/common/commonSlice';
import { toast } from 'react-toastify';
import { Field, Form, Formik } from 'formik';
let watchTime = 0;
let timer = null;
let unauthenticatedViewId = null;
let authenticatedViewId = null;
function VideoPlayback() {
    const rootUrl = process.env.REACT_APP_ROOT_URI;
    const [descriptionReadMore, setDescriptionReadMore] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch();
    const { id: videoId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const {
        playbackVideo,
        getVideoLoading,
        likeOrDislikeLoading,
        likeOrDislikeError,
        commentSaveLoading,
        commentSaveSuccess,
        commentSaveError,
    } = useSelector((state) => state.video);

    const { isFollowChannelSuccess, isFollowChannelError, isFollowChannelLoading } = useSelector(
        (state) => state.channel
    );

    const { showShareModal } = useSelector((state) => state.common);

    const {
        title,
        description,
        uploadedBy,
        video,
        createdAt,
        likes,
        dislikes,
        views,
        liked,
        channel,
        disliked,
        viewed,
        thumbnail,
        comments,
        relatedVideos,
    } = playbackVideo || {};

    authenticatedViewId = playbackVideo?.authenticatedViewId;
    unauthenticatedViewId = playbackVideo?.unauthenticatedViewId;

    const { url: playbackVideoUrl } = video || {};
    const {
        username: channelName,
        profilePicture,
        googleAccount,
        facebookAccount,
    } = uploadedBy || {};
    const channelLogoUrl =
        profilePicture?.url ||
        googleAccount?.picture ||
        facebookAccount?.picture ||
        AvatarThumbnail;

    const { _id: channelId, followed } = channel || {};

    useEffect(() => {
        if (isFollowChannelSuccess) {
            dispatch(setChannelFollowed());
            dispatch(channelReset());
        }
        if (isFollowChannelError) {
            toast.error('Something went wrong');
            dispatch(videoReset());
        }
        if (likeOrDislikeError) {
            toast.error('Something went wrong');
            dispatch(videoReset());
        }
    }, [isFollowChannelSuccess, isFollowChannelError, likeOrDislikeError]);

    useEffect(() => {
        dispatch(getVideo({ video: videoId, user: user?._id || null, related: true }));
        return () => {
            clearInterval(timer);
            timer = null;

            let view = {
                video: videoId,
                viewData: {
                    authenticatedView: user ? true : false,
                    viewId: user ? authenticatedViewId : unauthenticatedViewId,
                    duration: watchTime,
                },
            };
            dispatch(saveViewData(view));
            watchTime = 0;
            unauthenticatedViewId = null;
            authenticatedViewId = null;
            dispatch(resetPlaybackVideo());
        };
    }, [videoId]);

    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const onPlayVideo = function () {
        if (!viewed) {
            let viewData = {
                userId: user?._id || null,
                authenticatedView: user ? true : false,
            };
            dispatch(setViews({ videoId, view: viewData }));
        }
        timer = setInterval(function () {
            watchTime += 500;
        }, 500);
    };

    const onPauseVideo = function () {
        clearInterval(timer);
        timer = null;
    };

    const followOnClick = () => {
        dispatch(followChannel({ user: user?._id, follow: channelId }));
    };

    if (getVideoLoading) {
        return <Spinner />;
    }

    return (
        <div className='container mx-auto'>
            <div className='block lg:flex pt-20 space-x-0 lg:space-x-2 lg:max-h-screen'>
                <div className='w-[100%] lg:w-[65%] space-y-1 overflow-y-scroll scrollbar-hide'>
                    <div className='relative'>
                        <video
                            className='w-full bg-cover'
                            controls
                            autoPlay={true}
                            onPlay={onPlayVideo}
                            onPause={onPauseVideo}
                            poster={thumbnail?.url}>
                            <source src={playbackVideoUrl || ''} type={`video/${video?.format}`} />
                            Sorry, your browser doesn't support embedded videos, but don't worry,
                            you can
                        </video>
                        {channel?.watermark && (
                            <img
                                src={channel?.watermark?.url}
                                className='h-10 w-10 absolute right-5 top-5 opacity-60'
                            />
                        )}
                    </div>
                    <div className='py-1 flex px-2'>
                        <div className='w-[70%]'>
                            <h1 className='text-lg text-gray-300 line-clamp-1'>{title}</h1>
                        </div>
                        <div className='w-[30%] flex gap-3 text-sm text-gray-400 justify-end pr-3'>
                            {showShareModal && (
                                <ShareModal
                                    url={`${rootUrl}/videos/${videoId}`}
                                    title={`Platform - ${title}`}
                                    subject={`Platform-${title}`}
                                />
                            )}
                            <button
                                className='flex items-center space-x-2'
                                onClick={(e) => dispatch(setShowShareModal(true))}>
                                <ShareIcon className='text-gray-300' />
                                <div className='hidden sm:block'>Share</div>
                            </button>
                            <button className='flex items-center space-x-2'>
                                <ReportIcon className='text-gray-300' />
                                <div className='hidden sm:block'>Report</div>
                            </button>
                        </div>
                    </div>
                    <div className='px-2 flex gap-4 text-gray-300 text-sm items-center'>
                        <div className='flex space-x-2 items-center'>
                            <button
                                disabled={!user}
                                className={`${
                                    liked ? 'bg-blue-500' : 'bg-gray-500'
                                } rounded-full p-1 h-8 w-8 bg-opacity-80 hover:scale-90 ${!user && 'text-gray-500 bg-opacity-40'}`}
                                onClick={(e) =>
                                    dispatch(
                                        likeOrDislikeVideo({
                                            videoId,
                                            like: user._id,
                                        })
                                    )
                                }>
                                {likeOrDislikeLoading ? (
                                    <div
                                        className='spinner-border animate-spin inline-block w-4 h-4  border-2 rounded-full'
                                        role='status'></div>
                                ) : (
                                    <LikeIcon />
                                )}
                            </button>

                            <p className='text-gray-400'>{likes || 0}</p>
                        </div>

                        <div className='flex space-x-2 items-center'>
                            <button
                                className={`${!user && 'text-gray-500 bg-opacity-40'} rounded-full p-1 h-8 w-8  bg-opacity-80 hover:scale-90 ${
                                    disliked ? 'bg-red-500' : 'bg-gray-500'
                                }`}
                                onClick={(e) =>
                                    dispatch(
                                        likeOrDislikeVideo({
                                            videoId,
                                            dislike: user._id,
                                        })
                                    )
                                }>
                                {likeOrDislikeLoading ? (
                                    <div
                                        className='spinner-border animate-spin inline-block w-4 h-4  border-2 rounded-full'
                                        role='status'></div>
                                ) : (
                                    <DislikeIcon />
                                )}
                            </button>

                            <p className='text-gray-400'>{dislikes || 0}</p>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <ViewIcon />
                            <p className='text-gray-400'>{views || 0}</p>
                        </div>
                        <div>
                            <p>{moment(createdAt).format('MMMM Do YYYY')}</p>
                        </div>
                    </div>
                    <div className='px-2'>
                        <div className='flex justify-between items-center pl-0 p-2'>
                            <Link to={`/channel/${channel?.owner}`}>
                                <div className='flex space-x-3 items-center'>
                                    <img
                                        className='h-10 w-10 rounded-full shadow-md'
                                        src={channelLogoUrl}
                                        referrerPolicy='no-referrer'
                                        alt={AvatarThumbnail}
                                    />
                                    <div>
                                        <h2 className='text-gray-300 font-bold text-lg'>
                                            {channelName}
                                        </h2>
                                        <p className='text-gray-500 text-sm'>
                                            {channel?.followers || 0} Followers
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            {user && (
                                <button
                                    disabled={isFollowChannelLoading}
                                    className={`${
                                        followed ? 'bg-red-500' : 'bg-gray-300'
                                    }  h-[50%] rounded-sm py-1 gap-1 ${
                                        followed ? 'text-gray-300' : 'text-gray-700'
                                    } font-bold flex items-center justify-center text-sm w-28 hover:scale-95 ${
                                        isFollowChannelLoading && 'bg-opacity-80'
                                    }`}
                                    onClick={followOnClick}>
                                    {isFollowChannelLoading && (
                                        <div
                                            className='spinner-border animate-spin inline-block w-3 h-3 border-2 rounded-full'
                                            role='status'></div>
                                    )}
                                    {followed ? (
                                        <>
                                            {!isFollowChannelLoading && (
                                                <DoneIcon
                                                    sx={{
                                                        fontSize: 'medium',
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            )}
                                            Followed
                                        </>
                                    ) : (
                                        <>
                                            {!isFollowChannelLoading && (
                                                <FollowIcon
                                                    sx={{
                                                        fontSize: 'medium',
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            )}
                                            Follow
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        <hr className='opacity-30' />
                        <div className='py-2 px-2'>
                            <p
                                className={`text-sm text-gray-300 ${
                                    descriptionReadMore && 'line-clamp-3'
                                }`}>
                                {description}
                            </p>
                            <button
                                className='text-sm text-red-600 font-bold'
                                onClick={() => setDescriptionReadMore(!descriptionReadMore)}>
                                {descriptionReadMore ? 'Read more' : 'Show less'}
                            </button>
                        </div>
                        <hr className='opacity-30' />

                        <>
                            <div
                                className='bg-gray-300 bg-opacity-20 p-2 px-5 my-2 flex items-center justify-between rounded-full cursor-pointer'
                                onClick={(e) => setShowComments(!showComments)}>
                                <p className='font-bold text-gray-300'>
                                    Comments ({comments?.length || 0})
                                </p>
                                <button
                                    className={`rounded-full bg-gray-300 text-red-500 p-1 h-8 w-8  bg-opacity-80 hover:scale-90`}>
                                    {showComments ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                </button>
                            </div>
                            {user && (
                                <>
                                    <Formik
                                        initialValues={{
                                            videoId,
                                            userId: user?._id,
                                            text: '',
                                        }}
                                        onSubmit={(values, { resetForm }) => {
                                            dispatch(saveComment(values));
                                            resetForm({});
                                        }}>
                                        {({ values }) => (
                                            <Form>
                                                <div className='flex space-x-3 pt-1'>
                                                    <div className='flex items-center flex-1'>
                                                        <img
                                                            className='h-9 w-9 rounded-full mr-2'
                                                            src={
                                                                user?.profilePicture?.url ||
                                                                user?.googleAccount?.picture ||
                                                                user?.facebookAccount?.picture ||
                                                                AvatarThumbnail
                                                            }
                                                            referrerPolicy='no-referrer'
                                                            alt='User profile'
                                                        />

                                                        <Field
                                                            type='text'
                                                            name='text'
                                                            disabled={commentSaveLoading}
                                                            value={values.text}
                                                            autoComplete='off'
                                                            className='shadow-none text-gray-300 p-2 bg-transparent border-0 border-b w-full border-gray-700 text-sm appearance-none  focus:outline-none focus:shadow-outline'
                                                            placeholder='Add your comment...'
                                                        />
                                                    </div>

                                                    <div className='flex relative gap-1 mb-3 flex-none'>
                                                        {/* <Menu as='div' className='relative'>
                                                            <Menu.Button
                                                                type='button'
                                                                className='h-10 w-10 shrink-0 rounded-full bg-gray-700 text-yellow-500 hover:text-white '
                                                                id='menu-button'
                                                                aria-expanded='true'
                                                                aria-haspopup='true'>
                                                                <span className='sr-only'>
                                                                    Emoji
                                                                </span>
                                                                <EmojiIcon aria-hidden='true' />
                                                            </Menu.Button>
                                                            <Menu.Items className='absolute right-0 z-10'>
                                                                <EmojiPicker
                                                                    onEmojiClick={(emoji) => {
                                                                        const {
                                                                            emoji: emojiPicture,
                                                                        } = emoji;
                                                                        console.log(emojiPicture);
                                                                    }}
                                                                />
                                                            </Menu.Items>
                                                        </Menu> */}
                                                        <button
                                                            type='submit'
                                                            disabled={values.text?.length === 0}
                                                            className={`h-10 w-10 shrink-0 rounded-full bg-gray-700 ${
                                                                values.text.length !== 0
                                                                    ? 'text-white'
                                                                    : 'text-gray-400'
                                                            }`}>
                                                            <span className='sr-only'>
                                                                Send message
                                                            </span>

                                                            {commentSaveLoading ? (
                                                                <div
                                                                    className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full'
                                                                    role='status'></div>
                                                            ) : (
                                                                <SendIcon aria-hidden='true' />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </>
                            )}
                            <div className='mb-10'>
                                {showComments && (
                                    <>
                                        {comments?.length ? (
                                            <div className='pt-2 pb-5'>
                                                <Comments
                                                    comments={comments}
                                                    videoId={videoId}
                                                    user={user}
                                                    channelOwnerId={uploadedBy._id}
                                                />
                                            </div>
                                        ) : (
                                            <p className='text-red-600 py-6 text-sm font-bold'>
                                                No comments yet. Add your comment
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    </div>
                </div>

                {(!showComments || windowSize?.innerWidth >= 1024) && (
                    <div className='w-[100%] lg:w-[35%] overflow-y-scroll scrollbar-hide'>
                        <VideoGroup3 videos={relatedVideos} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoPlayback;
