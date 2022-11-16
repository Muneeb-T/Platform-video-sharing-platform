import React, { useEffect, useState } from 'react';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import DislikeIcon from '@mui/icons-material/ThumbDownAlt';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { likeOrDislikeComment, saveComment } from '../redux/features/video/videoSlice';
import { Field, Form, Formik } from 'formik';
import { Menu } from '@headlessui/react';
import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
function Comments({ comments, videoId }) {
    const [showReplyInput, setShowReplyInput] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const likeComment = (commentId, replyId) => {
        const like = {
            videoId,
            likedBy: user?._id,
            commentId,
            reply: replyId,
        };
        dispatch(likeOrDislikeComment(like));
    };

    const dislikeComment = (commentId, replyId) => {
        const dislike = {
            videoId,
            dislikedBy: user?._id,
            commentId,
            reply: replyId || null,
        };
        dispatch(likeOrDislikeComment(dislike));
    };

    return (
        <>
            <div>
                {comments &&
                    comments?.map((singleComment) => {
                        const {
                            userId: commentedUser,
                            comment,
                            likes,
                            dislikes,
                            createdAt,
                            replies,
                            liked,
                            disliked,
                            _id: commentId,
                        } = singleComment;
                        return (
                            <>
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
                                        alt='commentor profile picture'
                                    />
                                    <div className='text-sm space-y-2'>
                                        <div>
                                            <p className='text-gray-300'>
                                                {commentedUser?.username}
                                            </p>
                                            <p className='text-gray-400'>{comment}</p>
                                        </div>
                                        <div className='flex gap-5 items-center text-sm'>
                                            <div className='flex gap-2 text-xs text-gray-300 items-center'>
                                                <button
                                                    onClick={() => likeComment(commentId)}
                                                    className={`${liked && 'text-blue-600'}`}>
                                                    <LikeIcon
                                                        sx={{ fontSize: 'medium' }}
                                                        className='cursor-pointer'
                                                    />
                                                </button>

                                                <p>{likes || 0}</p>
                                            </div>
                                            <div className='flex gap-2 text-gray-300 text-xs items-center'>
                                                <button
                                                    className={`${disliked && 'text-red-600'}`}
                                                    onClick={() => dislikeComment(commentId)}>
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
                                                Reply
                                            </button>
                                            <p className='text-xs text-gray-500'>
                                                {moment(createdAt).from(new Date())}
                                            </p>
                                        </div>
                                        {showReplyInput === commentId && (
                                            <div>
                                                <Formik
                                                    initialValues={{
                                                        comment: '',
                                                        userId: user?._id || null,
                                                        commentId,
                                                        reply: commentId,
                                                    }}
                                                    onSubmit={(values, { resetForm }) => {
                                                        dispatch(
                                                            saveComment({
                                                                videoId,
                                                                comment: values,
                                                                userData: user,
                                                            })
                                                        );
                                                        resetForm({ comment: '' });
                                                    }}>
                                                    {({ values }) => (
                                                        <Form>
                                                            <div className='flex space-x-3 pt-1 w-full'>
                                                                <div className='flex items-center flex-1'>
                                                                    <img
                                                                        className='h-8 w-8 rounded-full mr-2'
                                                                        src={
                                                                            user?.profilePicture
                                                                                ?.url ||
                                                                            user?.googleAccount
                                                                                ?.picture ||
                                                                            user?.facebookAccount
                                                                                ?.pictrue ||
                                                                            AvatarThumbnail
                                                                        }
                                                                        referrerPolicy='no-referrer'
                                                                        alt='User profile picture'
                                                                    />

                                                                    <Field
                                                                        type='text'
                                                                        name='comment'
                                                                        // disabled={commentSaveLoading}
                                                                        value={values.comment}
                                                                        autoComplete='off'
                                                                        className='shadow-none text-gray-300 p-2 bg-transparent border-0 border-b w-full border-gray-700 text-sm appearance-none  focus:outline-none focus:shadow-outline'
                                                                        placeholder='Add your comment...'
                                                                    />
                                                                </div>

                                                                <div className='flex relative gap-1 mb-3 flex-none'>
                                                                    <Menu
                                                                        as='div'
                                                                        className='relative'>
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
                                                                    </Menu>
                                                                    <button
                                                                        type='submit'
                                                                        disabled={
                                                                            values.comment
                                                                                ?.length === 0
                                                                        }
                                                                        className={`h-10 w-10 shrink-0 rounded-full bg-gray-700 ${
                                                                            values.comment
                                                                                .length !== 0
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
                                        <div>
                                            {replies &&
                                                replies?.map((reply) => {
                                                    const {
                                                        userId: repliedUser,
                                                        comment: replyComment,
                                                        likes: replyLikes,
                                                        dislikes: replyDislikes,
                                                        createdAt: replyCreatedAt,
                                                        liked: replyLiked,
                                                        disliked: replyDisliked,
                                                        _id: replyId,
                                                    } = reply;
                               
                                                    return (
                                                        <>
                                                            <div
                                                                className='flex py-2'
                                                                key={replyId}>
                                                                <img
                                                                    className='h-8 w-8 rounded-full mr-2'
                                                                    src={
                                                                        repliedUser?.profilePicture
                                                                            ?.url ||
                                                                        repliedUser?.googleAccount
                                                                            ?.picture ||
                                                                        repliedUser?.facebookAccount
                                                                            ?.picture ||
                                                                        AvatarThumbnail
                                                                    }
                                                                    referrerPolicy='no-referrer'
                                                                    alt='commentor profile picture'
                                                                />
                                                                <div className='text-sm space-y-2'>
                                                                    <div>
                                                                        <p className='text-gray-300'>
                                                                            {repliedUser?.username}
                                                                        </p>
                                                                        <p className='text-gray-400'>
                                                                            {replyComment}
                                                                        </p>
                                                                    </div>
                                                                    <div className='flex gap-5 items-center text-sm'>
                                                                        <div className='flex gap-2 text-xs text-gray-300 items-center'>
                                                                            <button
                                                                                onClick={() =>
                                                                                    likeComment(
                                                                                        commentId,
                                                                                        replyId
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

                                                                            <p>{replyLikes || 0}</p>
                                                                        </div>
                                                                        <div className='flex gap-2 text-gray-300 text-xs items-center'>
                                                                            <button
                                                                                className={`${
                                                                                    replyDisliked &&
                                                                                    'text-red-600'
                                                                                }`}
                                                                                onClick={() =>
                                                                                    dislikeComment(
                                                                                        commentId,
                                                                                        replyId
                                                                                    )
                                                                                }>
                                                                                <DislikeIcon
                                                                                    sx={{
                                                                                        fontSize:
                                                                                            'medium',
                                                                                    }}
                                                                                    className='cursor-pointer'
                                                                                />
                                                                            </button>

                                                                            <p>
                                                                                {replyDislikes || 0}
                                                                            </p>
                                                                        </div>
                                                                        <p className='text-xs text-gray-500'>
                                                                            {moment(
                                                                                replyCreatedAt
                                                                            ).from(new Date())}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
            </div>
        </>
    );
}

export default Comments;
