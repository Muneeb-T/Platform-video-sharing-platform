import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import FilterListIcon from '@mui/icons-material/FilterList';
import VideoGroup2 from '../components/VideoGroup-2';
const categories = [
    { id: '1', name: 'Movies' },
    { id: '2', name: 'News & politics' },
    { id: '3', name: 'Entertainment' },
    { id: '3', name: 'Beauty and vlogs' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function SearchResults() {
    return (
        <div className='container mx-auto h-max bg-gray-900 py-20 px-5'>
            <div className='flex space-between'>
                <div className='flex flex-1 space-x-3 items-center scrollbar-hide overflow-x-scroll'>
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
                <Menu
                    as='div'
                    className='relative flex-none inline-block text-left'>
                    <div>
                        <Menu.Button className='flex space-x-5 items-center w-full justify-center text-gray-300 px-4 py-2 text-sm text-md font-bold'>
                            <FilterListIcon />
                            Filter
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
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-max origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='py-1'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Release date
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Video quality (HD)
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href='#'
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Popular
                                        </a>
                                    )}
                                </Menu.Item>
                                <form method='POST' action='#'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                type='submit'
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}>
                                                HD only
                                            </button>
                                        )}
                                    </Menu.Item>
                                </form>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className='mt-4'>
                <VideoGroup2 />
            </div>
        </div>
    );
}

export default SearchResults;
