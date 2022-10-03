/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-nocheck
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {} from '@heroicons/react/24/outline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import ChannelIcon from '@mui/icons-material/AccountBox';
import CreatorStudioIcon from '@mui/icons-material/BorderColor';
import SettingsIcon from '@mui/icons-material/Settings';
import AppearanceIcon from '@mui/icons-material/Brightness4';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoIcon from '../images/Logo.png';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const menuItems = [
    {
        Icon: ChannelIcon,
        linkText: 'Your channel',
    },
    {
        Icon: CreatorStudioIcon,
        linkText: 'CreatorStudio',
    },
    {
        Icon: SettingsIcon,
        linkText: 'Settings',
    },
    {
        Icon: AppearanceIcon,
        linkText: 'Appearance',
    },
    {
        Icon: KeyboardIcon,
        linkText: 'Keyboard shortcuts',
    },
    {
        Icon: LogoutIcon,
        linkText: 'Logout',
    },
    {
        Icon: FeedbackIcon,
        linkText: 'Send feedback',
    },
];

export default function Header() {
    return (
        <div className='relative'>
            <Disclosure
                as='nav'
                className='bg-gray-900 opacity-80 fixed w-full'>
                {({ open }) => (
                    <>
                        <div className='mx-auto max-w-7xl px-6 sm:px-6 lg:px-8'>
                            <div className='relative flex h-16 items-center justify-between'>
                                <div className='flex flex-0 sm:flex-1 items-center'>
                                    <div>
                                        <img
                                            className='mx-auto h-10 mr-2 w-auto'
                                            src={LogoIcon}
                                            alt='Platform logo'
                                        />
                                    </div>
                                    <h2 className='text-white font-medium text-3xl'>
                                        Platform
                                    </h2>
                                </div>
                                <div className='flex flex-1 hidden sm:block'>
                                    <div className='input-group w-full text-gray-300 flex items-center'>
                                        <input
                                            className='shadow-none bg-transparent border-0 border-b w-full border-gray-400 text-sm appearance-none  py-1  leading-tight focus:outline-none focus:shadow-outline'
                                            id='username'
                                            type='text'
                                            placeholder='Search Videos, Channels, Movies ...'
                                        />
                                        <button>
                                            <SearchIcon
                                                className='h-4 w-4 ml-3'
                                                aria-hidden='true'
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-2  inset-y-0 right-0 flex justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                    <button
                                        type='button'
                                        className='p-1 sm:pr-6 pr-2 text-gray-300 hover:text-white'>
                                        <span className='sr-only'>
                                            View notifications
                                        </span>
                                        <MicIcon
                                            className='h-4 w-4'
                                            aria-hidden='true'
                                        />
                                    </button>
                                    <button
                                        type='button'
                                        className='p-1 sm:pr-6 text-gray-300 hover:text-white'>
                                        <span className='sr-only'>
                                            View notifications
                                        </span>
                                        <NotificationsIcon
                                            className='h-4 w-4'
                                            aria-hidden='true'
                                        />
                                    </button>

                                    <button className='block sm:hidden'>
                                        <SearchIcon
                                            className='h-4 w-4 ml-2 text-gray-300'
                                            aria-hidden='true'
                                        />
                                    </button>

                                    <Menu as='div' className='relative ml-3'>
                                        <div>
                                            <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                <span className='sr-only'>
                                                    Open user menu
                                                </span>
                                                <img
                                                    className='h-7 w-7 rounded-full'
                                                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
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
                                            <Menu.Items className='absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                <Menu.Item className='px-6 py-2 flex items-center'>
                                                    <div className='flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                        <img
                                                            className='h-10 w-10 rounded-full mr-2'
                                                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                                            alt=''
                                                        />
                                                        <div>
                                                            <p className='text-white'>
                                                                Hello John doe
                                                            </p>
                                                            <button className='text-gray-300 text-sm'>
                                                                Customize
                                                                channel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Menu.Item>
                                                <hr />
                                                {menuItems.map(
                                                    (Item, index) => {
                                                        return (
                                                            <Menu.Item
                                                                key={index}>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <div>
                                                                        <p
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'bg-gray-600'
                                                                                    : '',
                                                                                'block px-6 py-2 text-sm flex items-center text-white'
                                                                            )}>
                                                                            <Item.Icon className='mr-3 text-white' />
                                                                            {
                                                                                Item.linkText
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </Menu.Item>
                                                        );
                                                    }
                                                )}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
