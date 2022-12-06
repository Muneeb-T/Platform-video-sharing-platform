import React, { useEffect, useRef, useState } from 'react';
import channelBannerThumbnail from '../../assets/images/Transparent grid.png';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';
import DoneIcon from '@mui/icons-material/Done';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import FollowIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GenreTitle from '../../components/GenreTitle';
import VideoGroup from '../../components/VideoGroup-1';
import { toast } from 'react-toastify';
import {
    getChannel,
    setBanner,
    setChannelForm,
    setChannelLogo,
    reset,
    createChannel,
    followChannel,
    likeChannel,
    dislikeChannel,
} from '../../redux/features/channel/channelSlice';
import EditIcon from '@mui/icons-material/Edit';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import Spinner from '../../components/Spinner';
import ShareModal from '../../components/ShareModal';
import { setShowShareModal } from '../../redux/features/common/commonSlice';
import Home from './tab-contents/Home';
import Videos from './tab-contents/Videos';
import Community from './tab-contents/Community';
import About from './tab-contents/About';
const tabs = [
    { id: '1', name: 'Home' },
    { id: '2', name: 'Videos' },
    // { id: '3', name: 'Community' },
    { id: '3', name: 'About' },
];

const genres = [
    { id: '1', title: 'Popular videos' },
    { id: '2', title: 'Playlists' },
    { id: '3', title: 'Shorts' },
];

function ChannelHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tab, setTab] = useState('1');
    const [logo, setLogo] = useState('');
    const [bannerUrl, setChannelBanner] = useState('');
    const { showShareModal } = useSelector((state) => state.common);
    const { user, accessToken } = useSelector((state) => state.auth);
    const { _id: authenticatedUserId } = user || {};
    const {
        channel,
        isCreateChannelLoading,
        isGetChannelLoading,
        isFollowChannelLoading,
        isFollowChannelSuccess,
        isFollowChannelError,
        channelForm,
        channelLogoUrl,
        channelBannerUrl,
    } = useSelector((state) => state.channel);

    let channelLogo, channelBanner;
    if (channel) {
        channelLogo =
            channelLogoUrl ||
            channel?.owner?.profilePicture?.secure_url ||
            channel?.owner?.googleAccount?.picture ||
            channel?.owner?.facebookAccount?.picture;
        channelBanner = channelBannerUrl || channel?.banner?.url;
    }
    const { id: requestedUserId } = useParams();
    const { requestedVideos } = channel || {};
    useEffect(() => {
        dispatch(
            getChannel({
                userId: requestedUserId,
                params: {
                    videos: { categories: ['popular', 'uploads'] },
                    playlists: true,
                },
            })
        );
        return () => {
            dispatch(reset());
        };
    }, [requestedUserId]);

    useEffect(() => {
        if (!user || !accessToken) {
            toast.error('Please login to your account.');
            navigate('/login');
        }
    }, [user, accessToken]);

    const channelFormOnChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        dispatch(setChannelForm({ key, value }));
    };

    const followOnClick = () => {
        dispatch(followChannel({ user: user?._id, follow: channel?._id }));
    };

    const handleLikeChannel = () => {
        dispatch(likeChannel({ channelId: channel?._id, like: user?._id }));
    };

    const handleDislikeChannel = () => {
        dispatch(dislikeChannel({ channelId: channel?._id, dislike: user?._id }));
    };

    if (isGetChannelLoading || isCreateChannelLoading) {
        return <Spinner />;
    }

    if (requestedUserId === authenticatedUserId) {
        return (
            <>
                <Formik
                    initialValues={{
                        banner: channelBanner || channel?.banner || null,
                        channelLogo: channelLogo || channel?.channelLogo || null,
                        channelName:
                            channelForm?.channelName ||
                            channel?.owner?.username ||
                            user.username ||
                            '',
                        userId: authenticatedUserId,
                        description: '',
                    }}
                    validationSchema={''}
                    onSubmit={(values) => {
                        console.log(values);
                        dispatch(createChannel(values));
                    }}>
                    {(form) => (
                        <Form onChange={channelFormOnChange}>
                            <div className='container mx-auto min-h-screen'>
                                <div className='pt-20'>
                                    <div className='relative'>
                                        {channel && (
                                            <>
                                                <div className='absolute right-5 top-5 flex gap-3'>
                                                    <Link to={`creator-studio/customize-channel`}>
                                                        <button
                                                            type='button'
                                                            className='py-2 px-4 bg-gray-600 bg-opacity-30 font-extrabold text-gray-300 hover:bg-opacity-50'>
                                                            Customize channel
                                                        </button>
                                                    </Link>
                                                    <Link to={`creator-studio`}>
                                                        <button
                                                            type='button'
                                                            className='py-2 px-4 bg-gray-600 bg-opacity-30 font-extrabold text-gray-300 hover:bg-opacity-50'>
                                                            Creator studio
                                                        </button>
                                                    </Link>
                                                </div>
                                            </>
                                        )}

                                        <img
                                            src={
                                                bannerUrl || channelBanner || channelBannerThumbnail
                                            }
                                            className={`w-full ${
                                                !channel && 'hover:opacity-80'
                                            } h-40`}
                                            alt='channel banner'
                                        />
                                        {!channel && (
                                            <div className='absolute right-5 top-5'>
                                                <label className='relative cursor-pointer mt-6'>
                                                    <span className='relative bg-gray-500 text-gray-300 bg-gray-800 bg-opacity-70 p-3 shadow rounded-full'>
                                                        <EditIcon sx={{ fontSize: 'large' }} />
                                                    </span>
                                                    <input
                                                        type='file'
                                                        className='hidden'
                                                        name='banner'
                                                        onChange={(e) => {
                                                            let file = e.target.files[0];
                                                            form.setFieldValue('banner', file);
                                                            const fileUrl =
                                                                URL.createObjectURL(file);
                                                            setChannelBanner(fileUrl);
                                                            dispatch(setBanner(fileUrl));
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        )}

                                        <div className='flex justify-between bg-gray-800 bg-opacity-50 absolute w-full px-5 md:px-10 bottom-0 h-20 p-3'>
                                            <div className='flex gap-5 h-full'>
                                                <div>
                                                    <label className='relative cursor-pointer mt-6'>
                                                        <span className='relative bg-cover bg-gray-500'>
                                                            <img
                                                                className='rounded-full h-[60px] w-[60px] shadow-md hover:opacity-80'
                                                                src={
                                                                    logo ||
                                                                    channelLogo ||
                                                                    AvatarThumbnail
                                                                }
                                                                referrerPolicy='no-referrer'
                                                                alt=''
                                                            />
                                                        </span>
                                                        {!channel && (
                                                            <>
                                                                <input
                                                                    type='file'
                                                                    name='channelLogo'
                                                                    className='hidden'
                                                                    onChange={(e) => {
                                                                        let file =
                                                                            e.target.files[0];
                                                                        form.setFieldValue(
                                                                            'channelLogo',
                                                                            file
                                                                        );
                                                                        const fileUrl =
                                                                            URL.createObjectURL(
                                                                                file
                                                                            );
                                                                        setLogo(fileUrl);
                                                                        // dispatch(
                                                                        //     setChannelLogo(fileUrl)
                                                                        // );
                                                                    }}
                                                                />
                                                                <button
                                                                    type='button'
                                                                    className='text-gray-300 absolute -right-2 -bottom-1 bg-gray-600 bg-opacity-90 shadow rounded-full h-7 w-7'>
                                                                    <EditIcon
                                                                        sx={{
                                                                            fontSize: 'medium',
                                                                        }}
                                                                    />
                                                                </button>
                                                            </>
                                                        )}
                                                    </label>
                                                </div>

                                                <div className='text-gray-300 my-auto'>
                                                    <p className='text-xl md:text-2xl font-bold'>
                                                        {channelForm?.channelName ||
                                                            channel?.user?.username ||
                                                            user.username}
                                                    </p>
                                                    {channel && (
                                                        <p>{channel?.followers || 0} Followers</p>
                                                    )}
                                                </div>
                                            </div>
                                            {channel && (
                                                <>
                                                    <div className='flex items-center'>
                                                        <div className='flex items-center space-x-3 text-sm'>
                                                            <div className='flex space-x-2 text-gray-300 items-center'>
                                                                <LikeIcon
                                                                    className={`${
                                                                        channel?.liked &&
                                                                        'text-blue-700'
                                                                    } cursor-pointer`}
                                                                    onClick={handleLikeChannel}
                                                                    sx={{ fontSize: 'medium' }}
                                                                />
                                                                <p className='text-sm'>
                                                                    {channel?.likes || 0}
                                                                </p>
                                                            </div>
                                                            <div className='flex space-x-2 text-gray-300 items-center'>
                                                                <DislikeIcon
                                                                    className={`${
                                                                        channel?.disliked &&
                                                                        'text-red-600'
                                                                    } cursor-pointer`}
                                                                    onClick={handleDislikeChannel}
                                                                    sx={{ fontSize: 'medium' }}
                                                                />

                                                                <p className='text-sm'>
                                                                    {channel?.dislikes || 0}
                                                                </p>
                                                            </div>

                                                            <div className='flex gap-3 text-sm text-gray-400 justify-end pr-3'>
                                                                <button
                                                                    type='button'
                                                                    className='flex items-center space-x-2'
                                                                    onClick={(e) =>
                                                                        dispatch(
                                                                            setShowShareModal(true)
                                                                        )
                                                                    }>
                                                                    <ShareIcon className='text-gray-300' />
                                                                    <div className='hidden sm:block'>
                                                                        Share
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {channel ? (
                                        <>
                                            <div>
                                                <div className='flex m-2'>
                                                    {tabs.map((individualTab, index) => {
                                                        return (
                                                            <>
                                                                <Link
                                                                    key={individualTab.id}
                                                                    className='shrink-0'
                                                                    onClick={() =>
                                                                        setTab(individualTab.id)
                                                                    }>
                                                                    <p
                                                                        className={`text-gray-300 ${
                                                                            individualTab.id === tab
                                                                                ? 'text-red-500'
                                                                                : 'text-gray-300'
                                                                        }`}>
                                                                        {individualTab?.name}
                                                                    </p>
                                                                </Link>
                                                                <p className='mx-3 text-gray-500'>
                                                                    |
                                                                </p>
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <hr className='opacity-20 mb-2' />
                                            <div className='px-3 md:px-0 pb-10 h-[60vh] overflow-hidden overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-5'>
                                                {tab === '1' && (
                                                    <Home
                                                        isFollowChannelLoading={
                                                            isFollowChannelLoading
                                                        }
                                                        channel={channel}
                                                        requestedVideos={requestedVideos}
                                                    />
                                                )}
                                                {tab === '2' && (
                                                    <Videos owner={channel?.owner?._id} />
                                                )}
                                                {/* {tab === '3' && <Community />} */}
                                                {tab === '3' && (
                                                    <About
                                                        description={channel?.description}
                                                        contact={channel?.contact}
                                                        links={channel?.links}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='p-3 bg-gray-700 bg-opacity-20 h-[63vh] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-5'>
                                                <div className='pb-20 pt-10 items-center justify-center w-full rounded-md'>
                                                    <div className='text-center'>
                                                        <p className='text-gray-300'>
                                                            You don't have a channel yet ?
                                                        </p>
                                                        <p className='px-6 py-3 text-red-500 text-4xl font-bold'>
                                                            Create Channel
                                                        </p>
                                                    </div>
                                                    <div className='px-5 md:px-10 space-y-2'>
                                                        <div className='w-full mb-6 md:mb-0 rounded-sm'>
                                                            <label
                                                                className='block tracking-wide text-gray-300 font-bold mb-2'
                                                                htmlFor='grid-first-name'>
                                                                Channel name & description
                                                            </label>
                                                            <Field
                                                                className='appearance-none block  bg-transparent text-gray-300 border-b-[1px] pl-0 border-gray-500  py-3 px-4 mb-4 leading-tight focus:outline-none focus:border-red-500'
                                                                id='channel-name'
                                                                type='text'
                                                                name='channelName'
                                                                placeholder='Channel name'
                                                            />
                                                            <Field
                                                                as='textarea'
                                                                className='appearance-none block w-full bg-transparent text-gray-300 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-red-500'
                                                                id='channel-description'
                                                                name='description'
                                                                type='text'
                                                                rows='5'
                                                                placeholder='Description'
                                                            />
                                                        </div>
                                                        <div>
                                                            <button
                                                                disabled={isCreateChannelLoading}
                                                                type='submit'
                                                                className={`group relative flex w-full items-center justify-center rounded-sm border border-transparent ${
                                                                    isCreateChannelLoading
                                                                        ? `bg-red-800`
                                                                        : `bg-red-700`
                                                                } py-2 px-4 text-sm font-medium text-white ${
                                                                    `hover:bg-red-600` &&
                                                                    !isCreateChannelLoading
                                                                } focus:outline-none focus:ring-1 focus:ring-red-700 focus:ring-offset-1`}>
                                                                {isCreateChannelLoading && (
                                                                    <div
                                                                        className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full absolute left-10'
                                                                        role='status'></div>
                                                                )}
                                                                Save
                                                            </button>
                                                        </div>
                                                        {/* <div className='w-full mb-6 md:mb-0 bg-gray-500 p-10 rounded-sm bg-opacity-20'>
                                                <label
                                                    className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                                                    htmlFor='grid-first-name'>
                                                    Links
                                                </label>
                                                <input
                                                    className='appearance-none block bg-transparent text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none'
                                                    id='channel-description'
                                                    type='text'
                                                    placeholder='Channel name'
                                                />
                                                <textarea
                                                    className='appearance-none block w-full bg-transparent text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none'
                                                    id='channel-description'
                                                    type='text'
                                                    placeholder='Description'
                                                />
                                            </div>
                                            <div className='w-full mb-6 md:mb-0 bg-gray-500 p-10 rounded-sm bg-opacity-20'>
                                                <label
                                                    className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                                                    htmlFor='grid-first-name'>
                                                    Channel name & description
                                                </label>
                                                <input
                                                    className='appearance-none block bg-transparent text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none'
                                                    id='channel-description'
                                                    type='text'
                                                    placeholder='Channel name'
                                                />
                                                <textarea
                                                    className='appearance-none block w-full bg-transparent text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none'
                                                    id='channel-description'
                                                    type='text'
                                                    placeholder='Description'
                                                />
                                            </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <>
                    {showShareModal && (
                        <ShareModal
                            url={`${process.env.REACT_APP_ROOT_URI}/channel/${channel?._id}`}
                            title={`Platform - ${channel?.owner?.username}`}
                            subject={`Platform-${channel?.owner?.username}`}
                        />
                    )}
                </>
            </>
        );
    }

    return (
        <>
            <div className='container mx-auto min-h-screen'>
                <div className='pt-20'>
                    <div className='relative'>
                        <img
                            src={channelBanner || channelBannerThumbnail}
                            className='w-full h-40'
                            alt='channel banner'
                        />
                        <div className='flex justify-between bg-gray-800 bg-opacity-50 absolute w-full px-3 md:px-10 bottom-0 h-[50%] p-3'>
                            <div className='flex gap-5 h-full'>
                                <img
                                    className='rounded-full h-full shadow-md'
                                    src={channelLogo || AvatarThumbnail}
                                    referrerPolicy='no-referrer'
                                    alt=''
                                />
                                <div className='text-gray-300 my-auto'>
                                    <p className='text-xl md:text-2xl font-bold'>
                                        {channel?.owner?.username || ''}
                                    </p>
                                    <p className='text-sm'>{channel?.followers || 0} Followers</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='space-y-2'>
                                    <div className='flex items-center space-x-3'>
                                        <div className='flex space-x-2 text-gray-300 items-center'>
                                            <LikeIcon
                                                className={`${
                                                    channel?.liked && 'text-blue-700'
                                                } cursor-pointer`}
                                                onClick={handleLikeChannel}
                                                sx={{ fontSize: 'medium' }}
                                            />
                                            <p className='text-sm'>{channel?.likes}</p>
                                        </div>
                                        <div className='flex space-x-2 text-gray-300 items-center'>
                                            <DislikeIcon
                                                className={`${
                                                    channel?.disliked && 'text-red-600'
                                                } cursor-pointer`}
                                                onClick={handleDislikeChannel}
                                                sx={{ fontSize: 'medium' }}
                                            />
                                            <p className='text-sm'>{channel?.dislikes}</p>
                                        </div>
                                        <div className='flex gap-3 text-sm text-gray-400 justify-end'>
                                            <button
                                                className='flex items-center space-x-2'
                                                onClick={(e) => dispatch(setShowShareModal(true))}>
                                                <ShareIcon className='text-gray-300' />
                                                <div className='hidden sm:block'>Share</div>
                                            </button>
                                            {/* <button className='flex items-center space-x-2'>
                                                <ReportIcon className='text-gray-300' />
                                                <div className='hidden sm:block'>Report</div>
                                            </button> */}
                                        </div>
                                    </div>
                                    <button
                                        disabled={isFollowChannelLoading}
                                        className={`${
                                            channel?.followed ? 'bg-red-500' : 'bg-gray-300'
                                        }  h-[50%] rounded-sm py-1 gap-1 ${
                                            channel?.followed ? 'text-gray-300' : 'text-gray-700'
                                        } font-bold flex items-center justify-center text-sm w-28 hover:scale-95 mx-auto ${
                                            isFollowChannelLoading && 'bg-opacity-80'
                                        }`}
                                        onClick={followOnClick}>
                                        {isFollowChannelLoading && (
                                            <div
                                                className='spinner-border animate-spin inline-block w-3 h-3 border-2 rounded-full'
                                                role='status'></div>
                                        )}
                                        {channel?.followed ? (
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex m-2'>
                            {tabs.map((individualTab, index) => {
                                return (
                                    <>
                                        <Link
                                            className='shrink-0'
                                            onClick={() => setTab(individualTab.id)}
                                            key={individualTab.id}>
                                            <p
                                                className={`text-gray-300 ${
                                                    individualTab.id === tab
                                                        ? 'text-red-500'
                                                        : 'text-gray-300'
                                                }`}>
                                                {individualTab?.name}
                                            </p>
                                        </Link>
                                        <p className='mx-3 text-gray-500'>|</p>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <hr className='opacity-20 mb-2' />
                    <div className='px-3 md:px-0 pb-10 h-[60vh] overflow-hidden overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 pr-5'>
                        {tab === '1' && (
                            <Home
                                isFollowChannelLoading={isFollowChannelLoading}
                                channel={channel}
                                requestedVideos={requestedVideos}
                            />
                        )}
                        {tab === '2' && <Videos owner={channel?.owner?._id} />}
                        {/* {tab === '3' && <Community />} */}
                        {tab === '3' && (
                            <About
                                description={channel?.description}
                                contact={channel?.contact}
                                links={channel?.links}
                            />
                        )}
                    </div>
                </div>
            </div>
            <>
                {showShareModal && (
                    <ShareModal
                        url={`${process.env.REACT_APP_ROOT_URI}/channel/${channel?._id}`}
                        title={`Platform - ${channel?.owner?.username}`}
                        subject={`Platform-${channel?.owner?.username}`}
                    />
                )}
            </>
        </>
    );
}

export default ChannelHome;
