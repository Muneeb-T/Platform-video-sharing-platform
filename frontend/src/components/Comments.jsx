import React, { useEffect, useState } from 'react';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import DislikeIcon from '@mui/icons-material/ThumbDownAlt';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { likeOrDislikeComment, saveComment } from '../redux/features/video/videoSlice';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Field, Form, Formik } from 'formik';
import { Menu } from '@headlessui/react';
import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Comments({ comments, videoId, user, channelOwnerId }) {
    const [showReplyInput, setShowReplyInput] = useState(null);
    const [showReplies, setShowReplies] = useState({ show: false, id: null });
    const dispatch = useDispatch();
    return (
        <>
            <div className='mb-10'>
                {comments &&
                    comments?.map((singleComment) => {
                        const {
                            userId: commentedUser,
                            text,
                            likes,
                            dislikes,
                            createdAt,
                            replies,
                            liked,
                            disliked,
                            id: commentId,
                        } = singleComment;
                        return (
                            <div className='flex py-2' key={commentId}>
                                <img
                                    className='h-8 w-8 rounded-full mr-2'
                                    src={
                                        commentedUser?.profilePicture?.url ||
                                        commentedUser?.googleAccount?.picture ||
                                        commentedUser?.facebookAccount?.picture ||
                                        AvatarThumbnail
                                    }
                                    referrerPolicy='no-referrer'
                                    alt='commentor profile'
                                />
                                <div className='text-sm space-y-2'>
                                    <div>
                                        <p
                                            className={`text-gray-300 ${
                                                (commentedUser?._id === user?._id ||
                                                    commentedUser?._id === channelOwnerId) &&
                                                'bg-gray-600 w-max rounded-full px-3'
                                            }`}>
                                            {commentedUser?._id === user?._id
                                                ? 'You'
                                                : commentedUser?.username}
                                        </p>
                                        <p className='text-gray-400'>{text}</p>
                                    </div>
                                    <div className='flex gap-5 items-center text-sm'>
                                        <div
                                            className={`flex gap-2 text-xs ${
                                                !user ? 'text-gray-500' : 'text-gray-300'
                                            } items-center`}>
                                            <button
                                                onClick={() => {
                                                    dispatch(
                                                        likeOrDislikeComment({
                                                            videoId,
                                                            commentId,
                                                            like: user?._id,
                                                        })
                                                    );
                                                }}
                                                className={`${liked && 'text-blue-600'}`}>
                                                <LikeIcon
                                                    sx={{ fontSize: 'medium' }}
                                                    className='cursor-pointer'
                                                />
                                            </button>

                                            <p>{likes || 0}</p>
                                        </div>
                                        <div
                                            className={`flex gap-2 text-xs ${
                                                !user ? 'text-gray-500' : 'text-gray-300'
                                            } items-center`}>
                                            <button
                                                className={`${disliked && 'text-red-600'}`}
                                                onClick={() => {
                                                    dispatch(
                                                        likeOrDislikeComment({
                                                            videoId,
                                                            commentId,
                                                            dislike: user?._id,
                                                        })
                                                    );
                                                }}>
                                                <DislikeIcon
                                                    sx={{ fontSize: 'medium' }}
                                                    className='cursor-pointer'
                                                />
                                            </button>

                                            <p>{dislikes || 0}</p>
                                        </div>

                                        <button
                                            className='text-red-600 font-bold text-xs'
                                            onClick={() =>
                                                setShowReplyInput(
                                                    showReplyInput
                                                        ? showReplyInput === commentId
                                                            ? null
                                                            : commentId
                                                        : commentId
                                                )
                                            }>
                                            Reply{' '}
                                            <span className='text-gray-300'>{` (${replies.length})`}</span>
                                        </button>
                                        <p className='text-xs text-gray-500'>
                                            {moment(createdAt).from(new Date())}
                                        </p>
                                    </div>
                                    {showReplyInput === commentId && user && (
                                        <div className='gap-3'>
                                            <Formik
                                                initialValues={{
                                                    videoId,
                                                    reply: { commentId },
                                                    text: '',
                                                }}
                                                onSubmit={(values, { resetForm }) => {
                                                    dispatch(
                                                        saveComment({
                                                            userId: user?._id,
                                                            ...values,
                                                        })
                                                    );
                                                    resetForm({});
                                                }}>
                                                {({ values }) => (
                                                    <Form>
                                                        <div className='flex space-x-3 pt-1 w-full'>
                                                            <div className='flex items-center flex-1'>
                                                                <img
                                                                    className='h-8 w-8 rounded-full mr-2'
                                                                    src={
                                                                        user?.profilePicture?.url ||
                                                                        user?.googleAccount
                                                                            ?.picture ||
                                                                        user?.facebookAccount
                                                                            ?.pictrue ||
                                                                        AvatarThumbnail
                                                                    }
                                                                    referrerPolicy='no-referrer'
                                                                    alt='User profile'
                                                                />

                                                                <Field
                                                                    type='text'
                                                                    name='text'
                                                                    // disabled={commentSaveLoading}
                                                                    value={values.text}
                                                                    autoComplete='off'
                                                                    className='shadow-none text-gray-300 p-2 bg-transparent border-0 border-b w-full border-gray-700 text-sm appearance-none  focus:outline-none focus:shadow-outline'
                                                                    placeholder='Add your reply...'
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
                                                                            onEmojiClick={(
                                                                                emoji
                                                                            ) => {
                                                                                const {
                                                                                    emoji: emojiPicture,
                                                                                } = emoji;
                                                                                console.log(
                                                                                    emojiPicture
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Menu.Items>
                                                                </Menu> */}
                                                                <button
                                                                    type='submit'
                                                                    disabled={
                                                                        values.text?.length === 0
                                                                    }
                                                                    className={`h-10 w-10 shrink-0 rounded-full bg-gray-700 ${
                                                                        values.text.length !== 0
                                                                            ? 'text-white'
                                                                            : 'text-gray-400'
                                                                    }`}>
                                                                    <span className='sr-only'>
                                                                        Send message
                                                                    </span>

                                                                    {
                                                                        // commentSaveLoading ? (
                                                                        //     <div
                                                                        //         className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full'
                                                                        //         role='status'></div>
                                                                        // ) : (
                                                                        <SendIcon aria-hidden='true' />
                                                                        // )
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    )}
                                    {replies.length > 3 && showReplyInput === commentId && (
                                        <button
                                            onClick={() =>
                                                setShowReplies({
                                                    show: !showReplies.show,
                                                    id: showReplies?.show ? null : commentId,
                                                })
                                            }
                                            type='button'
                                            className='shrink-0 py-1 px-5 text-gray-300 rounded-full bg-gray-700'>
                                            <span className='sr-only'>Show replies</span>
                                            {showReplies.show
                                                ? `Hide replies`
                                                : `Show all ${replies.length} replies`}
                                            {showReplies.show ? (
                                                <ArrowRightIcon area-hidden='true' />
                                            ) : (
                                                <ArrowDropDownIcon aria-hidden='true' />
                                            )}
                                        </button>
                                    )}
                                    <div>
                                        {replies &&
                                            replies?.map((reply, replyIndex) => {
                                                const {
                                                    userId: repliedUser,
                                                    text: replyText,
                                                    likes: replyLikes,
                                                    dislikes: replyDislikes,
                                                    createdAt: replyCreatedAt,
                                                    liked: replyLiked,
                                                    disliked: replyDisliked,
                                                    id: replyId,
                                                } = reply;
                                                return (
                                                    <div key={replyId}>
                                                        {showReplyInput === commentId &&
                                                            ((showReplies.show &&
                                                                showReplies.id === commentId) ||
                                                                replyIndex < 3) && (
                                                                <>
                                                                    <div className='flex py-2'>
                                                                        <img
                                                                            className='h-8 w-8 rounded-full mr-2'
                                                                            src={
                                                                                repliedUser
                                                                                    ?.profilePicture
                                                                                    ?.url ||
                                                                                repliedUser
                                                                                    ?.googleAccount
                                                                                    ?.picture ||
                                                                                repliedUser
                                                                                    ?.facebookAccount
                                                                                    ?.picture ||
                                                                                AvatarThumbnail
                                                                            }
                                                                            referrerPolicy='no-referrer'
                                                                            alt='commentor profile pic'
                                                                        />
                                                                        <div className='text-sm space-y-2'>
                                                                            <div>
                                                                                <p
                                                                                    className={`text-gray-300 ${
                                                                                        (repliedUser?._id ===
                                                                                            user?._id ||
                                                                                            repliedUser?._id ===
                                                                                                channelOwnerId) &&
                                                                                        'bg-gray-600 w-max rounded-full px-3'
                                                                                    }`}>
                                                                                    {repliedUser?._id ===
                                                                                    user?._id
                                                                                        ? 'You'
                                                                                        : repliedUser?.username}
                                                                                </p>
                                                                                <p className='text-gray-400'>
                                                                                    {replyText}
                                                                                </p>
                                                                            </div>
                                                                            <div className='flex gap-5 items-center text-sm'>
                                                                                <div
                                                                                    className={`flex gap-2 text-xs ${
                                                                                        !user
                                                                                            ? 'text-gray-500'
                                                                                            : 'text-gray-300'
                                                                                    } items-center`}>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            dispatch(
                                                                                                likeOrDislikeComment(
                                                                                                    {
                                                                                                        videoId,
                                                                                                        commentId,
                                                                                                        like: user?._id,
                                                                                                        reply: {
                                                                                                            replyId,
                                                                                                        },
                                                                                                    }
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                        className={`${
                                                                                            replyLiked &&
                                                                                            'text-blue-600'
                                                                                        }`}>
                                                                                        <LikeIcon
                                                                                            sx={{
                                                                                                fontSize:
                                                                                                    'medium',
                                                                                            }}
                                                                                            className='cursor-pointer'
                                                                                        />
                                                                                    </button>

                                                                                    <p>
                                                                                        {replyLikes ||
                                                                                            0}
                                                                                    </p>
                                                                                </div>
                                                                                <div
                                                                                    className={`flex gap-2 text-xs ${
                                                                                        !user
                                                                                            ? 'text-gray-500'
                                                                                            : 'text-gray-300'
                                                                                    } items-center`}>
                                                                                    <button
                                                                                        className={`${
                                                                                            replyDisliked &&
                                                                                            'text-red-600'
                                                                                        }`}
                                                                                        onClick={() => {
                                                                                            dispatch(
                                                                                                likeOrDislikeComment(
                                                                                                    {
                                                                                                        videoId,
                                                                                                        commentId,
                                                                                                        dislike:
                                                                                                            user?._id,
                                                                                                        reply: {
                                                                                                            replyId,
                                                                                                        },
                                                                                                    }
                                                                                                )
                                                                                            );
                                                                                        }}>
                                                                                        <DislikeIcon
                                                                                            sx={{
                                                                                                fontSize:
                                                                                                    'medium',
                                                                                            }}
                                                                                            className='cursor-pointer'
                                                                                        />
                                                                                    </button>

                                                                                    <p>
                                                                                        {replyDislikes ||
                                                                                            0}
                                                                                    </p>
                                                                                </div>
                                                                                <p className='text-xs text-gray-500'>
                                                                                    {moment(
                                                                                        replyCreatedAt
                                                                                    ).from(
                                                                                        new Date()
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Comments;
