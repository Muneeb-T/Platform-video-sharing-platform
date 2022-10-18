/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-nocheck
import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import ChannelIcon from '@mui/icons-material/AccountBox';
import CreatorStudioIcon from '@mui/icons-material/BorderColor';
import SettingsIcon from '@mui/icons-material/Settings';
import AppearanceIcon from '@mui/icons-material/Brightness4';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoIcon from '../assets/images/Logo.png';
import { logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';
import { Link, useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

const speechlyAppId = process.env.REACT_APP_SPEECHLY_APP_ID;
const SpeechlySpeechRecognition =
    createSpeechlySpeechRecognition(speechlyAppId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [displayVerifyNotification, setDisplayVerifyNotification] =
        useState(true);


    const { user } = useSelector((state) => state.auth);

    const onClickLogout = () => {
        dispatch(logout());
        toast.error('Logged out successfully');
        navigate('/');
    };

    const { transcript, listening, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    const startListening = () => SpeechRecognition.startListening();
    if (!browserSupportsSpeechRecognition) {
        toast.error('Your browser does not support speech recognition');
    }

    return (
        <div className='relative'>
            <Disclosure
                as='nav'
                className='bg-gray-900 opacity-90 fixed w-full z-10'>
                {({ open }) => (
                    <>
                        <div className='mx-auto max-w-7xl px-6 sm:px-6 lg:px-8'>
                            <div className='relative flex h-16 items-center justify-between'>

                                    <Link
                                        to='/'
                                        className='flex flex-0 sm:flex-1 items-center'>
                                        <div>
                                            <img
                                                className='mx-auto h-8 sm:h-10 mr-2 w-auto'
                                                src={LogoIcon}
                                                alt='Platform logo'
                                            />
                                        </div>
                                        <h2 className='text-white hidden sm:block font-medium text-2xl sm:text-3xl'>
                                            Platform
                                        </h2>
                                    </Link>
                            

                                <div className='flex flex-1'>
                                    <div className='input-group w-full mr-2 text-gray-300 flex items-center'>
                                        <input
                                            className='shadow-none bg-transparent border-0 border-b w-full border-gray-400 text-sm appearance-none  py-1  focus:outline-none focus:shadow-outline'
                                            type='text'
                                            value={transcript}
                                            placeholder='Search Videos, Channels, Movies ...'
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        />
                                        <button>
                                            <SearchIcon
                                                className='h-4 w-4 ml-3'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-2 inset-y-0 right-0 justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>

                                   
                                            <button
                                                type='button'
                                                className='p-1 shrink-0 relative rounded-full bg-gray-700 sm:mr-6 mr-2 text-gray-300 hover:text-white flex items-center justify-center'
                                                onTouchStart={startListening}
                                                onMouseDown={startListening}
                                                onTouchEnd={
                                                    SpeechRecognition.stopListening
                                                }
                                                onMouseUp={
                                                    SpeechRecognition.stopListening
                                                }>
                                                <span className='sr-only'>
                                                    Voice typing
                                                </span>
                                                <MicIcon aria-hidden='true' />
                                                {listening && (
                                                    <span class='animate-ping absolute   inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                                                )}
                                            </button>

                                            <button
                                                type='button'
                                                className='p-1 shrink-0 rounded-full bg-gray-700 sm:mr-6 text-gray-300 hover:text-white'>
                                                <span className='sr-only'>
                                                    View notifications
                                                </span>
                                                <NotificationsIcon aria-hidden='true' />
                                            </button>
                             
                                    <Menu
                                        as='div'
                                        className='relative shrink-0'>
                                        <div>
                                            <Menu.Button className='flex rounded-full ml-2 sm:ml-0 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                <span className='sr-only'>
                                                    Open user menu
                                                </span>
                                                <img
                                                    className='h-7 w-7 rounded-full'
                                                    src={
                                                        user
                                                            ? user.profilePicture
                                                                ? user
                                                                      .profilePicture
                                                                      .path
                                                                : user.googleAccount
                                                                ? user
                                                                      .googleAccount
                                                                      .picture
                                                                : user.facebookAccount
                                                                ? user
                                                                      .facebookAccount
                                                                      .picture
                                                                : AvatarThumbnail
                                                            : AvatarThumbnail
                                                    }
                                                    referrerPolicy='no-referrer'
                                                    alt=''
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'>
                                            <Menu.Items className='absolute right-0 z-[100] mt-2 w-max origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                {user ? (
                                                    <>
                                                        <Menu.Item className='px-6 py-2 flex items-center'>
                                                            <div className='flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                                <img
                                                                    className='h-10 w-10 rounded-full mr-2'
                                                                    src={
                                                                        user.profilePicture
                                                                            ? user
                                                                                  .profilePicture
                                                                                  .path
                                                                            : user.googleAccount
                                                                            ? user
                                                                                  .googleAccount
                                                                                  .picture
                                                                            : user.facebookAccount
                                                                            ? user
                                                                                  .facebookAccount
                                                                                  .picture
                                                                            : AvatarThumbnail
                                                                    }
                                                                    referrerPolicy='no-referrer'
                                                                    alt=''
                                                                />

                                                                <div>
                                                                    <p className='text-white text-sm'>
                                                                        {`Hello ${user.username}`}
                                                                    </p>
                                                                    <Link
                                                                        to={`/profile`}
                                                                        className='text-gray-300 text-sm'>
                                                                        View
                                                                        profile
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </Menu.Item>
                                                        <hr />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Menu.Item className='px-6 py-2 flex items-center'>
                                                            <div className='flex items-center'>
                                                                <Link
                                                                    to='/login'
                                                                    className='text-gray-300 text-sm mr-3'>
                                                                    <button
                                                                        className='flex w-full rounded-md border border-gray-400
                                                                            py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-700 focus:ring-offset-1'>
                                                                        Login
                                                                    </button>
                                                                </Link>

                                                                <Link
                                                                    to='/register'
                                                                    className='text-gray-300 text-sm'>
                                                                    <button
                                                                        className='flex w-full rounded-md border border-transparent 
                                                                            bg-red-700 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-700 focus:ring-offset-1'>
                                                                        Sign Up
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </Menu.Item>
                                                        <hr />
                                                    </>
                                                )}

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-600'
                                                                        : '',
                                                                    'block px-6 py-2 text-sm flex items-center text-white'
                                                                )}>
                                                                <ChannelIcon className='mr-3 text-white' />
                                                                Your channel
                                                            </p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link to='/channel/creator-studio'>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-600'
                                                                        : '',
                                                                    'block px-6 py-2 text-sm flex items-center text-white'
                                                                )}>
                                                                <CreatorStudioIcon className='mr-3 text-white' />
                                                                Creator studio
                                                            </p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-600'
                                                                        : '',
                                                                    'block px-6 py-2 text-sm flex items-center text-white'
                                                                )}>
                                                                <SettingsIcon className='mr-3 text-white' />
                                                                Settings
                                                            </p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-600'
                                                                        : '',
                                                                    'block px-6 py-2 text-sm flex items-center text-white'
                                                                )}>
                                                                <AppearanceIcon className='mr-3 text-white' />
                                                                Appearance
                                                            </p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-600'
                                                                        : '',
                                                                    'block px-6 py-2 text-sm flex items-center text-white'
                                                                )}>
                                                                <KeyboardIcon className='mr-3 text-white' />
                                                                Keyboard
                                                                shortcuts
                                                            </p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                {user && (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                onClick={
                                                                    onClickLogout
                                                                }>
                                                                <p
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-600'
                                                                            : '',
                                                                        'block px-6 py-2 text-sm flex items-center text-white'
                                                                    )}>
                                                                    <LogoutIcon className='mr-3 text-white' />
                                                                    Logout
                                                                </p>
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                )}

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link>
                                                            <p
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-600'
                                                                        : '',
                                                                    'block px-6 py-2 text-sm flex items-center text-white'
                                                                )}>
                                                                <FeedbackIcon className='mr-3 text-white' />
                                                                Send feedback
                                                            </p>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        {user &&
                            user.email &&
                            !user.email.verified &&
                            displayVerifyNotification && (
                                <>
                                    <div className='bg-gray-300 py-1 px-3 drop-shadow-sm'>
                                        <div className='flex gap-2 items-center text-red-500'>
                                            <ErrorIcon />
                                            <p className='text-sm flex-1 text-gray-600 font-bold'>
                                                Please click on the link that
                                                has been sent to your email
                                                account to verify your email
                                                address.Once you have done, it
                                                will unlock some features of
                                                platform.
                                            </p>

                                            <button
                                                onClick={() =>
                                                    setDisplayVerifyNotification(
                                                        false
                                                    )
                                                }
                                                className='shrink-0 flex-0 h-6 w-6 bg-opacity-30 bg-gray-600 drop-shadow-md rounded-full'>
                                                <CloseIcon
                                                    sx={{ fontSize: 'small' }}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                    </>
                )}
            </Disclosure>
        </div>
    );
}
