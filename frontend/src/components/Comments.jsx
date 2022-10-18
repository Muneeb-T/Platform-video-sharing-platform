import React from 'react';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import DislikeIcon from '@mui/icons-material/ThumbDownAlt';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
const comments = [
    {
        user: {
            picture: null,
            username: 'Ranveer sigh',
        },
        commentText: 'Nice video...Amazing',
    },
    {
        user: {
            picture: null,
            username: 'John doe',
        },
        commentText: 'Great perfomance sir...congratulations.Keep it up',
    },
];
function Comments() {
    return (
        <>
            <div>
                {comments.map((comment) => {
                    const { commentText, user: commentedUser } = comment;
                    const { picture, username } = commentedUser;
                    return (
                        <>
                            <div className='flex py-2'>
                                <img
                                    className='h-10 w-10 rounded-full mr-2'
                                    src={picture || AvatarThumbnail}
                                    referrerPolicy='no-referrer'
                                    alt=''
                                />
                                <div className='text-sm'>
                                    <div>
                                        <p className='text-gray-300'>
                                            {username}
                                        </p>
                                        <p className='text-gray-400'>
                                            {commentText}
                                        </p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <div className='flex gap-2 text-gray-300 items-center'>
                                            <LikeIcon />
                                            <p>43k</p>
                                        </div>
                                        <div className='flex gap-2 text-gray-300 items-center'>
                                            <DislikeIcon />
                                            <p>23k</p>
                                        </div>
                                        <p className='text-red-600 font-bold'>
                                            Reply
                                        </p>
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
