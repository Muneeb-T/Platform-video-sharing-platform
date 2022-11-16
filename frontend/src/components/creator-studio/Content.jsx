import React from 'react';
import VideoThumbnail from '../VideoThumbnail';
import DetailsIcon from '@mui/icons-material/Edit';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ViewsIcon from '@mui/icons-material/Visibility';
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import moment from 'moment';

function Content(props) {
    const { videos } = props;
    return (
        <>
            {videos?.map((video) => {
                const {
                    _id: videoId,
                    thumbnail,
                    title,
                    video: videoProperties,
                    views,
                    createdAt,
                    description,
                    visibility,
                    likes,
                    dislikes,
                } = video;
                return (
                    <>
                        <div className='flex'>
                            <div className='flex p-4 items-center justify-center'>
                                <div className='form-check'>
                                    <input
                                        className='form-check-input appearance-none h-6 w-6 border border-gray-500 rounded-sm  checked:bg-red-600 checked:bg-opacity-60 checked:border-gray-300 checked:border-opacity-40 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                                        type='checkbox'
                                        id='flexCheckChecked'
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-4 gap-8'>
                                <div className='col-span-2'>
                                    <div className='grid grid-cols-3 gap-2 flex items-center'>
                                        <div className='flex items-center'>
                                            <VideoThumbnail
                                                image={thumbnail?.url}
                                                length={
                                                    videoProperties?.duration
                                                }
                                                videoUrl={videoProperties?.url}
                                            />
                                        </div>
                                        <div className='col-span-2 space-y-1'>
                                            <div className='flex text-gray-300 justify-between'>
                                                <p className='line-clamp-1 max-w-[90%]'>
                                                    {title}
                                                </p>
                                                <button className='rounded-full px-1 bg-gray-300 bg-opacity-20'>
                                                    <MoreVertIcon
                                                        sx={{
                                                            fontSize: 'small',
                                                        }}
                                                    />
                                                </button>
                                            </div>

                                            <p className='text-xs text-gray-600 line-clamp-2'>
                                                {description}
                                            </p>
                                            <div className='grid grid-cols-3 gap-2 text-sm'>
                                                <Link
                                                    to={`${videoId}`}
                                                    relative='path'
                                                    className='flex gap-2 text-gray-300 items-center'>
                                                    <DetailsIcon
                                                        sx={{
                                                            fontSize: 'medium',
                                                        }}
                                                    />
                                                    <p>Details</p>
                                                </Link>
                                                <Link className='flex gap-2 text-gray-300 items-center'>
                                                    <AnalyticsIcon
                                                        sx={{
                                                            fontSize: 'medium',
                                                        }}
                                                    />
                                                    <p>Analytics</p>
                                                </Link>
                                                <Link className='flex gap-2 text-gray-300 items-center'>
                                                    <CommentIcon
                                                        sx={{
                                                            fontSize: 'medium',
                                                        }}
                                                    />
                                                    <p>Comments</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='text-center'>
                                        <label className='block text-xs font-medium text-gray-300'>
                                            <ViewsIcon
                                                sx={{
                                                    marginRight: '6px',
                                                    fontSize: 'large',
                                                }}
                                            />
                                            Visibility
                                        </label>
                                        <select
                                            id='visibility'
                                            name='visibility'
                                            defaultValue={visibility}
                                            className='mt-1 block w-full  rounded-sm border-0 outline-0 text-gray-300 py-2 px-3 bg-gray-700 shadow-sm sm:text-sm'>
                                            <option value='public'>
                                                <div className='p-3'>
                                                    <ViewsIcon /> <p>Public</p>
                                                </div>
                                            </option>
                                            <option value='private'>
                                                <div className='p-3'>
                                                    <ViewsIcon /> <p>Private</p>
                                                </div>
                                            </option>
                                            <option value='unlisted'>
                                                <div className='p-3'>
                                                    <ViewsIcon />
                                                    <p>Unlisted</p>
                                                </div>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center w-max'>
                                    <div className='space-y-1 '>
                                        <div className='flex justify-between gap-3'>
                                            <div className='flex gap-2 items-center text-gray-300'>
                                                <CalendarIcon
                                                    sx={{ fontSize: 'medium' }}
                                                />
                                                <p className='text-xs'>
                                                    Uploaded date
                                                </p>
                                            </div>
                                            <p className='text-gray-300 text-xs'>
                                                {moment(createdAt).format(
                                                    'MMMM Do YY'
                                                )}
                                            </p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-2 items-center text-gray-300'>
                                                <ViewsIcon
                                                    sx={{ fontSize: 'medium' }}
                                                />
                                                <p className='text-xs'>Views</p>
                                            </div>
                                            <p className='text-gray-300 text-xs'>
                                                {views} Views
                                            </p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-2 items-center text-gray-300'>
                                                <LikeIcon
                                                    sx={{ fontSize: 'medium' }}
                                                />
                                                <p className='text-xs'>Likes</p>
                                            </div>
                                            <p className='text-gray-300 text-xs'>
                                                {likes} Likes
                                            </p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-2 items-center text-gray-300'>
                                                <DislikeIcon
                                                    sx={{ fontSize: 'medium' }}
                                                />
                                                <p className='text-xs'>
                                                    Dislikes
                                                </p>
                                            </div>
                                            <p className='text-gray-300 text-xs'>
                                                {dislikes} Dislikes
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='opacity-30' />
                    </>
                );
            })}
        </>
    );
}

export default Content;
