import React, { useEffect, useState } from 'react';
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
import {
    setSelectedVideos,
    resetSelectedVideos,
    updateVideo,
    reset,
} from '../../redux/features/video/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Content(props) {
    const [updatingVideoId, setUpdatingVideoId] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { videos, sort } = props || {};
    const transform = [...videos];
    const { order, credential } = sort || {};
    const { updateVideoLoading, updateVideoSuccess, updateVideoMessage } = useSelector(
        (state) => state.video
    );
    if (transform?.length && order === 'desc') {
        transform.sort(function (a, b) {
            return new Date(b[credential]) - new Date(a[credential]);
        });
    }
    if (transform?.length && order === 'asc') {
        transform.sort(function (a, b) {
            return new Date(a[credential]) - new Date(b[credential]);
        });
    }
    useEffect(() => {
        if (updateVideoSuccess) {
            toast.success(updateVideoMessage);
            dispatch(reset());
        }
    }, [updateVideoSuccess]);

    return (
        <>
            {transform?.map((video) => {
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
                        <div key={videoId} className='flex gap-2 max-w-full items-center'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input appearance-none h-4 w-4 border border-gray-500 rounded-sm  checked:bg-red-600 checked:bg-opacity-60 checked:border-gray-300 checked:border-opacity-40 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                                    type='checkbox'
                                    id='flexCheckChecked'
                                    onChange={() => dispatch(setSelectedVideos(videoId))}
                                />
                            </div>
                            <div className='flex gap-5 overflow-scroll overflow-y-hidden items-center'>
                                <div className='md:flex gap-3 items-center'>
                                    <div className='w-[200px] shrink-0'>
                                        <VideoThumbnail
                                            image={thumbnail?.url}
                                            length={videoProperties?.duration}
                                            videoUrl={videoProperties?.url}
                                        />
                                    </div>
                                    <div className='space-y-1 lg:max-w-[300px]'>
                                        <p className='text-gray-300 line-clamp-1'>{title}</p>
                                        {/* <button className='rounded-full px-1 bg-gray-300 bg-opacity-20'>
                                                        <MoreVertIcon
                                                            sx={{
                                                                fontSize: 'small',
                                                            }}
                                                        />
                                                    </button> */}

                                        <p className='line-clamp-1 text-gray-500 text-xs'>
                                            {description}
                                        </p>
                                        <ul className='flex gap-3'>
                                            <li>
                                                <Link
                                                    to={`${videoId}`}
                                                    relative='path'
                                                    className='flex gap-2 text-gray-300 items-center'>
                                                    <DetailsIcon
                                                        sx={{
                                                            fontSize: 'medium',
                                                        }}
                                                    />
                                                    <p className='hidden md:block'>Details</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className='flex gap-2 text-gray-300 items-center'>
                                                    <AnalyticsIcon
                                                        sx={{
                                                            fontSize: 'medium',
                                                        }}
                                                    />
                                                    <p className='hidden md:block'>Analytics</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className='flex gap-2 text-gray-300 items-center'>
                                                    <CommentIcon
                                                        sx={{
                                                            fontSize: 'medium',
                                                        }}
                                                    />
                                                    <p className='hidden md:block'>Comments</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='md:flex gap-3 shrink-0 space-y-4 items-center'>
                                    <div>
                                        <div className='flex gap-2'>
                                            <label className='text-xs font-medium text-gray-300 items-center'>
                                                <ViewsIcon
                                                    sx={{
                                                        marginRight: '6px',
                                                        fontSize: 'large',
                                                    }}
                                                />
                                                Visibility
                                            </label>
                                            <>
                                                {updateVideoLoading &&
                                                    videoId === updatingVideoId && (
                                                        <>
                                                            <div
                                                                className='spinner-border lg:mx-auto  text-gray-300 animate-spin w-3 h-3 border-2 rounded-full'
                                                                role='status'></div>
                                                        </>
                                                    )}
                                            </>
                                        </div>

                                        <select
                                            disabled={updateVideoLoading}
                                            id='visibility'
                                            name='visibility'
                                            onChange={(e) => {
                                                setUpdatingVideoId(videoId);
                                                dispatch(
                                                    updateVideo({
                                                        videoId,
                                                        userId: user?._id,
                                                        visibility: e.target.value,
                                                    })
                                                );
                                            }}
                                            defaultValue={visibility}
                                            className='mt-1 block w-max text-sm rounded-sm border-0 outline-0 text-gray-300 py-1 px-3 bg-gray-700 shadow-sm'>
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
                                        </select>
                                    </div>

                                    <table className='text-xs text-gray-300 shrink-0'>
                                        <tr className='gap-3'>
                                            <td className='flex items-center gap-2 px-2'>
                                                <CalendarIcon sx={{ fontSize: 'medium' }} />
                                                <p>Uploaded date</p>
                                            </td>
                                            <td className='px-2'>
                                                <p>{moment(createdAt).format('MMM DD - YYYY')}</p>
                                            </td>
                                        </tr>
                                        <tr className='gap-3'>
                                            <td className='flex items-center gap-2 px-2'>
                                                <ViewsIcon sx={{ fontSize: 'medium' }} />
                                                <p>Views</p>
                                            </td>
                                            <td className='px-2'>
                                                <p>{views} Views</p>
                                            </td>
                                        </tr>
                                        <tr className='gap-3'>
                                            <td className='flex items-center gap-2 px-2'>
                                                <LikeIcon sx={{ fontSize: 'medium' }} />
                                                <p>Likes</p>
                                            </td>
                                            <td className='px-2'>
                                                <p>{likes} Likes</p>
                                            </td>
                                        </tr>
                                        <tr className='gap-3'>
                                            <td className='flex items-center gap-2 px-2'>
                                                <DislikeIcon sx={{ fontSize: 'medium' }} />
                                                <p className='text-xs'>Dislikes</p>
                                            </td>
                                            <td className='px-2'>
                                                <p>{dislikes} Dislikes</p>
                                            </td>
                                        </tr>
                                    </table>
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
