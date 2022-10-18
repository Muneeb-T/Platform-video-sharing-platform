import React, { useRef, useState } from 'react';
import VideoGroup3 from '../components/VideoGroup-3';
import VideoJS from '../components/VideoPlayer';
import video from '../assets/videos/video.mp4';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import DislikeIcon from '@mui/icons-material/ThumbDownAlt';
import ViewIcon from '@mui/icons-material/Visibility';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import FollowIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
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

function VideoPlayback() {
    const [descriptionReadMore, setDescriptionReadMore] = useState(false);
    const [comment, setComment] = useState('');

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: video,
                type: 'video/mp4',
            },
        ],
    };

    const { user } = useSelector((state) => state.auth);

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // // You can handle player events here, for example:
        // player.on('waiting', () => {
        //     videojs.log('player is waiting');
        // });

        // player.on('dispose', () => {
        //     videojs.log('player will dispose');
        // });
    };

    const typeEmoji = (emoji) => {
        setComment(comment + emoji.emoji);
    };
    return (
        <div className='container mx-auto'>
            <div className='block lg:flex pt-20 pb-2 px-2 space-x-0 lg:space-x-2 lg:max-h-screen'>
                <div className='w-[100%] lg:w-[65%] space-y-1 overflow-y-scroll scrollbar-hide'>
                    <div>
                        <VideoJS
                            options={videoJsOptions}
                            onReady={handlePlayerReady}
                        />
                    </div>
                    <div className='py-1 flex'>
                        <div className='w-[70%]'>
                            <h1 className='text-lg text-gray-300 line-clamp-1'>
                                Black pather | Trailer | HD | Lorem ipsum travel
                                around the world of beautiful places
                            </h1>
                        </div>
                        <div className='w-[30%] flex gap-3 text-sm text-gray-400 justify-end pr-3'>
                            <button className='flex items-center space-x-2'>
                                <ShareIcon className='text-gray-300' />
                                <div className='hidden sm:block'>Share</div>
                            </button>
                            <button className='flex items-center space-x-2'>
                                <ReportIcon className='text-gray-300' />
                                <div className='hidden sm:block'>Report</div>
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-4 text-gray-300 text-sm items-center'>
                        <div className='flex space-x-2 items-center'>
                            <LikeIcon />
                            <p className='text-gray-400'>2.7M</p>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <DislikeIcon />
                            <p className='text-gray-400'>514k</p>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <ViewIcon />
                            <p className='text-gray-400'>2.1k</p>
                        </div>
                        <div>
                            <p>June 5, 2019</p>
                        </div>
                    </div>
                    <div className='flex justify-between pl-0 p-2'>
                        <Link to={`/channel/123`}>
                            <div className='flex space-x-3 items-center'>
                                <img
                                    className='h-8 w-auto rounded-full shadow-md'
                                    src={AvatarThumbnail}
                                    referrerPolicy='no-referrer'
                                    alt=''
                                />
                                <h2 className='text-gray-300 text-md'>
                                    Fox studio V8
                                </h2>
                            </div>
                        </Link>
                        <button className='bg-gray-300 rounded-sm px-5 py-1 gap-2 flex items-center text-sm'>
                            <FollowIcon />
                            Follow
                        </button>
                    </div>
                    <hr className='opacity-30' />
                    <div className='py-2'>
                        <p
                            className={`text-sm text-gray-300 ${
                                descriptionReadMore && 'line-clamp-3'
                            }`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Fugit sint aliquid fugiat dolorem nulla, saepe
                            dicta tenetur. Neque molestias, dolore quasi in
                            reiciendis nam deleniti, alias ipsum impedit, at
                            ullam. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Praesentium minus soluta, cumque
                            aspernatur placeat nihil! Quod eum a aliquam sequi,
                            omnis debitis sint voluptatum recusandae cumque qui
                            ut ipsam necessitatibus! Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Fugit sint aliquid
                            fugiat dolorem nulla, saepe dicta tenetur. Neque
                            molestias, dolore quasi in reiciendis nam deleniti,
                            alias ipsum impedit, at ullam.Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Praesentium minus
                            soluta, cumque aspernatur placeat nihil! Quod eum a
                            aliquam sequi, omnis debitis sint voluptatum
                            recusandae cumque qui ut ipsam necessitatibus!
                        </p>
                        <button
                            className='text-sm text-red-600 font-bold'
                            onClick={() =>
                                setDescriptionReadMore(!descriptionReadMore)
                            }>
                            {descriptionReadMore ? 'Read more' : 'Show less'}
                        </button>
                    </div>
                    <hr className='opacity-30' />
                    <div className='flex space-x-3 pt-1'>
                        <div className='flex items-center flex-1'>
                            <img
                                className='h-10 w-10 rounded-full mr-2'
                                src={
                                    user
                                        ? user.profilePicture
                                            ? user.profilePicture.path
                                            : user.googleAccount
                                            ? user.googleAccount.picture
                                            : user.facebookAccount
                                            ? user.facebookAccount.picture
                                            : AvatarThumbnail
                                        : AvatarThumbnail
                                }
                                referrerPolicy='no-referrer'
                                alt=''
                            />
                            <input
                                className='shadow-none text-gray-300 p-2 bg-transparent border-0 border-b w-full border-gray-700 text-sm appearance-none  focus:outline-none focus:shadow-outline'
                                type='text'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Add your comment...'
                            />
                        </div>

                        <div className='flex relative gap-1 mb-3 flex-none'>
                            <Menu as='div' className='relative'>
                                <Menu.Button
                                    type='button'
                                    className='p-2 shrink-0 rounded-full bg-gray-700 h-auto text-yellow-500 hover:text-white '
                                    id='menu-button'
                                    aria-expanded='true'
                                    aria-haspopup='true'>
                                    <span className='sr-only'>Emoji</span>
                                    <EmojiIcon aria-hidden='true' />
                                </Menu.Button>
                                <Menu.Items className='absolute right-0 z-10'>
                                    <EmojiPicker onEmojiClick={typeEmoji} />
                                </Menu.Items>
                            </Menu>
                            <button
                                type='button'
                                disabled={comment.length === 0}
                                className={`p-2 shrink-0 rounded-full bg-gray-700 h-auto ${
                                    comment.length !== 0
                                        ? 'text-white'
                                        : 'text-gray-400'
                                }`}>
                                <span className='sr-only'>Send message</span>
                                <SendIcon aria-hidden='true' />
                            </button>
                        </div>
                    </div>
                    <div>
                        {comments.map((comment) => {
                            const { commentText, user: commentedUser } =
                                comment;
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
                </div>
                <div className='w-[100%] lg:w-[35%] overflow-y-scroll scrollbar-hide'>
                    <VideoGroup3 />
                </div>
            </div>
        </div>
    );
}

export default VideoPlayback;
