import React from 'react';
import backgroundImage from '../assets/images/black-panther.webp';
import BlackButton from '../components/BlackButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import _1thumbnail from '../assets/images/video thumbnail 1.jpg';
import _2thumbnail from '../assets/images/video thumbnail 2.jpg';
import VideoThumbnail from './VideoThumbnail';
import RightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
function HeroSection() {
    return (
        <div>
            <div
                id='hero-carousel'
                className='carousel slide relative'
                data-bs-ride='carousel'>
                <div className='carousel-inner relative w-full overflow-hidden'>
                    <div className='carousel-item active relative w-full'>
                        <div
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('${backgroundImage}')`,
                                backgroundSize: 'cover',
                            }}
                            className='sm:p-20 p-10 flex items-center h-screen w-full'>
                            <div className='container mx-auto items-center'>
                                <div className='text-white  max-w-[100%] lg:max-w-[60%] space-y-4'>
                                    <h3 className='text-2xl mt-10 drop-shadow-md'>
                                        Trailer out now ...
                                    </h3>
                                    <h1 className='sm:text-7xl text-5xl font-bold drop-shadow-md'>
                                        Black panther
                                    </h1>
                                    <p className='drop-shadow-md text-sm'>
                                        Black Panther is a 2018 American
                                        superhero film based on the Marvel
                                        Comics character of the same name.
                                        Produced by Marvel Studios and
                                        distributed by Walt Disney Studios
                                        Motion Pictures, it is the 18th film in
                                        the Marvel Cinematic Universe (MCU).
                                    </p>
                                    <BlackButton
                                        icon={<PlayArrowIcon />}
                                        text='Play trailer'
                                    />
                                    <div className='relative flex items-center'>
                                        <div className='flex drop-shadow-sm gap-3 pb-10 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-700 overflow-y-hidden'>
                                            <Link className='w-[240px] h-[135px] shrink-0 mt-6'>
                                                <VideoThumbnail
                                                    className='drop-shadow-md'
                                                    image={_2thumbnail}
                                                    length='00:04:03'
                                                />
                                                <p className='text-gray-100 line-clamp-1'>
                                                    Black Panther | Trailer | HD
                                                </p>
                                            </Link>
                                            <Link className='w-[240px] h-[135px] shrink-0 mt-6'>
                                                <VideoThumbnail
                                                    className='drop-shadow-md'
                                                    image={_1thumbnail}
                                                    length='00:02:14'
                                                />
                                                <p className='text-gray-100 line-clamp-1'>
                                                    Black Panther | Trailer | HD
                                                </p>
                                            </Link>
                                            <Link className='w-[240px] h-[135px] shrink-0 mt-6'>
                                                <VideoThumbnail
                                                    className='drop-shadow-md'
                                                    image={_2thumbnail}
                                                    length='00:04:03'
                                                />
                                                <p className='text-gray-100 line-clamp-1'>
                                                    Black Panther | Trailer | HD 
                                                </p>
                                            </Link>
                                            <Link className='w-[240px] h-[135px] shrink-0 mt-6'>
                                                <VideoThumbnail
                                                    className='drop-shadow-md'
                                                    image={_1thumbnail}
                                                    length='00:02:14'
                                                />
                                                <p className='text-gray-100'>
                                                    Black Panther | Trailer | HD
                                                </p>
                                            </Link>
                                        </div>

                                        <RightIcon className='scale-[4] absolute right-12 drop-shadow-md opacity-80 fixed' />
                                        <RightIcon className='scale-[3] absolute right-4 drop-shadow-md opacity-70 fixed' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className='carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0'
                    type='button'
                    data-bs-target='#hero-carousel'
                    data-bs-slide='next'>
                    <span
                        className='carousel-control-next-icon inline-block bg-no-repeat'
                        aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>
        </div>
    );
}

export default HeroSection;
