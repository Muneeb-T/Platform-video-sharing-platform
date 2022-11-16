import React, { useEffect, useRef } from 'react';
import channelBannerThumbnail from '../../assets/images/Transparent grid.png';
import AvatarThumbnail from '../../assets/images/avatar-thumbnail.png';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import FollowIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Report';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VideoJS from '../../components/VideoPlayer';
import moment from 'moment';
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
} from '../../redux/features/channel/channelSlice';
import EditIcon from '@mui/icons-material/Edit';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import Spinner from '../../components/Spinner';
let videos = null;

const categories = [
    { id: '1', name: 'Home' },
    { id: '2', name: 'Videos' },
    { id: '3', name: 'Community' },
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
    const { user, accessToken } = useSelector((state) => state.auth);
    const { _id: authenticatedUserId } = user || {};
    const {
        channel,
        isCreateChannelLoading,
        isGetChannelLoading,
        channelForm,
        channelLogoUrl,
        channelBannerUrl,
    } = useSelector((state) => state.channel);

    const { id: requestedUserId } = useParams();

    useEffect(() => {
        dispatch(getChannel(requestedUserId));
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

    const playerRef = useRef(null);
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: '',
                type: 'video/mp4',
            },
        ],
    };

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

    if (isGetChannelLoading || isCreateChannelLoading) {
        return <Spinner />;
    }

    if (requestedUserId === authenticatedUserId) {
        return (
            <>
                <Formik
                    initialValues={{
                        banner: channelBannerUrl || channel?.banner || null,
                        channelLogo: channelLogoUrl || channel?.channelLogo || null,
                        channelName:
                            channelForm?.channelName ||
                            channel?.user?.username ||
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
                            {/* <div className='relative'>
                                <Field />
                                <div className='text-red-500 absolute text-[13px]'>
                                    <ErrorMessage />
                                </div>
                            </div>
                            <div className='relative'>
                                <Field />
                                <div className='text-red-500 absolute text-[13px] drop-shadow-md'>
                                    <ErrorMessage />
                                </div>
                            </div> */}

                            <div className='container mx-auto min-h-screen'>
                                <div className='pt-20  h-42'>
                                    <div className='relative'>
                                        <img
                                            src={
                                                channelBannerUrl ||
                                                channel?.banner?.url ||
                                                channelBannerThumbnail
                                            }
                                            className='w-full hover:opacity-80 h-full'
                                            alt='channel banner'
                                        />
                                        {!channel && (
                                            <div className='absolute right-5 top-5'>
                                                <label className='relative cursor-pointer mt-6'>
                                                    <span className='relative bg-cover bg-gray-500 text-gray-300 bg-gray-800 bg-opacity-70 shadow p-4 rounded-full'>
                                                        <EditIcon />
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
                                                            dispatch(setBanner(fileUrl));
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        )}

                                        <div className='flex justify-between bg-gray-800 bg-opacity-50 absolute w-full px-10 bottom-0 h-20 p-3'>
                                            <div className='flex gap-5 h-full'>
                                                <div>
                                                    <label className='relative cursor-pointer mt-6'>
                                                        <span className='relative bg-cover bg-gray-500'>
                                                            <img
                                                                className='rounded-full h-full shadow-md hover:opacity-80'
                                                                src={
                                                                    channelLogoUrl ||
                                                                    user?.profilePicture
                                                                        ?.secure_url ||
                                                                    user?.googleAccount?.picture ||
                                                                    user?.facebookAccount
                                                                        ?.picture ||
                                                                    AvatarThumbnail
                                                                }
                                                                referrerPolicy='no-referrer'
                                                                alt=''
                                                            />
                                                        </span>
                                                        {!channel && (
                                                            <>
                                                                {' '}
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

                                                                        dispatch(
                                                                            setChannelLogo(fileUrl)
                                                                        );
                                                                    }}
                                                                />
                                                                <button className='text-gray-300 absolute -right-2 -bottom-2 bg-gray-600 bg-opacity-90 shadow rounded-full h-8 w-8'>
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
                                                    <p className='text-2xl font-bold'>
                                                        {channelForm?.channelName ||
                                                            channel?.user?.username ||
                                                            user.username}
                                                    </p>
                                                    {channel && <p>342K Followers</p>}
                                                </div>
                                            </div>
                                            {channel && (
                                                <>
                                                    <div className='flex items-center'>
                                                        <div className='flex items-center space-x-3'>
                                                            <div className='flex space-x-2 text-gray-300'>
                                                                <LikeIcon />
                                                                <p className='text-sm'>234k</p>
                                                            </div>
                                                            <div className='flex space-x-2 text-gray-300'>
                                                                <DislikeIcon />

                                                                <p className='text-sm'>13k</p>
                                                            </div>
                                                            <div className='flex gap-3 text-sm text-gray-400 justify-end pr-3'>
                                                                <button className='flex items-center space-x-2'>
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
                                            <div className='flex my-2'>
                                                {categories.map((category, index) => {
                                                    return (
                                                        <>
                                                            <Link className='shrink-0'>
                                                                <p className='text-gray-300'>
                                                                    {category.name}
                                                                </p>
                                                            </Link>
                                                            <p className='mx-3 text-gray-500'>|</p>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                            <div className='grid grid-cols-3 gap-3'>
                                                <div>
                                                    <VideoJS
                                                        options={videoJsOptions}
                                                        onReady={handlePlayerReady}
                                                    />
                                                </div>
                                                <div className='col-span-2 space-y-5 my-auto'>
                                                    <p className='text-xl text-gray-300 line-clamp-1'>
                                                        Travel around the world of the
                                                        andfkdfjkdsljf d
                                                    </p>
                                                    <p className='text-gray-500 text-sm line-clamp-4'>
                                                        dfkjdsfk fddkf dkj fdjk fdk kjafd;lk fjdlkfj
                                                        dl kfjdlk fj df jdkfldjfkljd lfkjd lkfdjl
                                                        fjdlkfj dlkfj dlkfjd lfkjdlfk jdkfldjfkljd d
                                                        fdjfkd jfkld jfdf d dfdsfds fdf jdslkf jdfj
                                                        dkfj dklfj dlkjf dkljf dsklfj
                                                        dslkfjdslkjfdskljf dslkjfdsklf dkjf
                                                        kdjflkjdslkfjdslfjdsdasf dsf ds fd fdsf df
                                                        dfdj kfkjd fjdkf djfldksjf lajf;dsjfl;dskjf
                                                        ldsjfdslfj dslkfj dslkfj dslkfjds lfjdslf
                                                        jdsklf jdsk fjdslk fjdsl df jkdfk dsf jdlkfj
                                                        dslfj dlsjfl dskjf ldskj fldjsflds
                                                    </p>

                                                    <div className='flex gap-5 text-sm text-gray-400'>
                                                        <div className='flex space-x-2 text-gray-300'>
                                                            <LikeIcon />
                                                            <p className='text-sm'>234k</p>
                                                        </div>
                                                        <div className='flex space-x-2 text-gray-300'>
                                                            <DislikeIcon />

                                                            <p className='text-sm'>13k</p>
                                                        </div>
                                                        <button className='flex items-center space-x-2'>
                                                            <ShareIcon className='text-gray-300' />
                                                            <div className='hidden sm:block'>
                                                                Share
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className='flex text-xs sm:text-sm text-gray-500'>
                                                        <p>225k Views</p>
                                                        <p className='mx-3 text-gray-600'>|</p>
                                                        <p>
                                                            {moment('02-02-2001').from(new Date())}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='container mx-auto p-3'>
                                                <div className='space-y-5 overflow-hidden'>
                                                    {genres.map((genre, index) => {
                                                        const { title } = genre;
                                                        return (
                                                            <>
                                                                <GenreTitle title={title} />
                                                                <div className='flex gap-3'>
                                                                    <VideoGroup genre={title} />
                                                                </div>
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='p-3 bg-gray-700 bg-opacity-20'>
                                                <div className='p-10 py-20 items-center justify-center w-full rounded-md'>
                                                    <div className='text-center'>
                                                        <p className='text-gray-300'>
                                                            You don't have a channel yet ?
                                                        </p>
                                                        <p className='px-8 py-3 text-red-500 text-4xl font-bold'>
                                                            Create Channel
                                                        </p>
                                                    </div>
                                                    <div className='px-28 space-y-2'>
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
            </>
        );
    }

    return (
        <>
            <div className='container mx-auto min-h-screen'>
                <div className='pt-20'>
                    <div className='relative'>
                        <img src={channelBannerUrl} className='w-full' alt='channel banner' />
                        <div className='flex justify-between bg-gray-800 bg-opacity-50 absolute w-full px-10 bottom-0 h-[50%] p-3'>
                            <div className='flex gap-5 h-full'>
                                <img
                                    className='rounded-full h-full shadow-md'
                                    src={
                                        user
                                            ? user.profilePicture
                                                ? user.profilePicture.secure_url
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
                                <div className='text-gray-300 my-auto'>
                                    <p className='text-2xl font-bold'>ChannelName</p>
                                    <p>342K Followers</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='flex items-center space-x-3'>
                                    <div className='flex space-x-2 text-gray-300'>
                                        <LikeIcon />
                                        <p className='text-sm'>234k</p>
                                    </div>
                                    <div className='flex space-x-2 text-gray-300'>
                                        <DislikeIcon />

                                        <p className='text-sm'>13k</p>
                                    </div>
                                    <div className='flex gap-3 text-sm text-gray-400 justify-end pr-3'>
                                        <button className='flex items-center space-x-2'>
                                            <ShareIcon className='text-gray-300' />
                                            <div className='hidden sm:block'>Share</div>
                                        </button>
                                        <button className='flex items-center space-x-2'>
                                            <ReportIcon className='text-gray-300' />
                                            <div className='hidden sm:block'>Report</div>
                                        </button>
                                    </div>
                                    <button className='bg-gray-300 rounded-sm px-5 py-1 gap-2 flex items-center text-sm'>
                                        <FollowIcon />
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex my-2'>
                        {categories.map((category, index) => {
                            return (
                                <>
                                    <Link className='shrink-0'>
                                        <p className='text-gray-300'>{category.name}</p>
                                    </Link>
                                    <p className='mx-3 text-gray-500'>|</p>
                                </>
                            );
                        })}
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        <div>
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                        </div>
                        <div className='col-span-2 space-y-5 my-auto'>
                            <p className='text-xl text-gray-300 line-clamp-1'>
                                Travel around the world of the andfkdfjkdsljf d
                            </p>
                            <p className='text-gray-500 text-sm line-clamp-4'>
                                dfkjdsfk fddkf dkj fdjk fdk kjafd;lk fjdlkfj dl kfjdlk fj df
                                jdkfldjfkljd lfkjd lkfdjl fjdlkfj dlkfj dlkfjd lfkjdlfk jdkfldjfkljd
                                d fdjfkd jfkld jfdf d dfdsfds fdf jdslkf jdfj dkfj dklfj dlkjf dkljf
                                dsklfj dslkfjdslkjfdskljf dslkjfdsklf dkjf kdjflkjdslkfjdslfjdsdasf
                                dsf ds fd fdsf df dfdj kfkjd fjdkf djfldksjf lajf;dsjfl;dskjf
                                ldsjfdslfj dslkfj dslkfj dslkfjds lfjdslf jdsklf jdsk fjdslk fjdsl
                                df jkdfk dsf jdlkfj dslfj dlsjfl dskjf ldskj fldjsflds
                            </p>

                            <div className='flex gap-5 text-sm text-gray-400'>
                                <div className='flex space-x-2 text-gray-300'>
                                    <LikeIcon />
                                    <p className='text-sm'>234k</p>
                                </div>
                                <div className='flex space-x-2 text-gray-300'>
                                    <DislikeIcon />

                                    <p className='text-sm'>13k</p>
                                </div>
                                <button className='flex items-center space-x-2'>
                                    <ShareIcon className='text-gray-300' />
                                    <div className='hidden sm:block'>Share</div>
                                </button>
                            </div>
                            <div className='flex text-xs sm:text-sm text-gray-500'>
                                <p>225k Views</p>
                                <p className='mx-3 text-gray-600'>|</p>
                                <p>{moment('02-02-2001').from(new Date())}</p>
                            </div>
                        </div>
                    </div>
                    <div className='container mx-auto p-3'>
                        <div className='space-y-5 overflow-hidden'>
                            {genres.map((genre, index) => {
                                const { title } = genre;
                                return (
                                    <>
                                        <GenreTitle title={title} />
                                        <div className='flex gap-3'>
                                            <VideoGroup genre={title} />
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChannelHome;
