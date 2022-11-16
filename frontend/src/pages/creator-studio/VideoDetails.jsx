import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/creator-studio/Sidebar';
import TopBar from '../../components/creator-studio/Topbar';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import languages from '../../utils/languages';
import { useSelector, useDispatch } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyIcon from '@mui/icons-material/ContentCopy';
import {
    saveVideoDetails,
    setVideoDetails,
    setVideoUploadForm,
    setUploadedThumbnail,
    getVideo,
    updateVideo,
    reset,
} from '../../redux/features/video/videoSlice';
import VideoJS from '../../components/VideoPlayer';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

function VideoDetails() {
    const rootUrl = process.env.REACT_APP_ROOT_URI;

    const { content: contentId } = useParams();
    const [schedule, setSchedule] = useState(false);
    const dispatch = useDispatch();
    const {
        getVideoLoading,
        playbackVideo,
        updateVideoLoading,
        updateVideoSuccess,
        updateVideoMessage,
        updateVideoError,
        uploadedThumbnail,
    } = useSelector((state) => state.video);

    const { title, description, video, category, language, thumbnail, visibility } =
        playbackVideo || {};

    const { user, accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getVideo({ video: contentId, user: user?._id || null }));
    }, []);

    useEffect(() => {
        if (updateVideoSuccess) {
            toast.success(updateVideoMessage);
        }
        if (updateVideoError) {
            toast.error(updateVideoMessage);
        }
    }, [updateVideoSuccess, updateVideoError]);

    const navigate = useNavigate();
    useEffect(() => {
        if (!user || !accessToken) {
            toast.error('Please login to your account.');
            navigate('/login');
        }
    }, [user, accessToken]);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: playbackVideo?.video?.url,
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

    const videoUploadFormSchema = Yup.object().shape({
        title: Yup.string().required('Enter video title'),
        description: Yup.string(),
        tags: Yup.array().of(Yup.string()),
        category: Yup.string().required('Select video category'),
        language: Yup.string().required('Select video language'),
        schedule: Yup.object().shape({
            premiere: Yup.boolean(),
            date: Yup.string(),
            time: Yup.string(),
        }),
        visibility: Yup.string().default('private'),
    });

    if (getVideoLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className='container mx-auto bg-gray-900'>
                <div className='grid grid-cols-5 gap-2 h-screen pt-20'>
                    <div className='bg-gray-300 bg-opacity-5 overflow-y-scroll scrollbar-hide'>
                        <Sidebar />
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            videoId: contentId,
                            userId: user?._id,
                            title: title || '',
                            thumbnail: thumbnail?.url,
                            description: description,
                            tags: [],
                            category: category || 'Entertainment',
                            language: language || 'English',
                            visibility: visibility,
                        }}
                        validationSchema={videoUploadFormSchema}
                        onSubmit={(values) => {
                            dispatch(updateVideo(values));
                        }}>
                        {(form) => {
                            return (
                                <>
                                    <Form className='col-span-4 gap-2 overflow-y-scroll scrollbar-hide space-y-2'>
                                        <div className='bg-gray-300 bg-opacity-5 flex justify-between items-center px-8 py-3'>
                                            <p className='text-gray-300 font-bold text-xl'>
                                                Video details
                                            </p>
                                            <div className='flex gap-3 justify-end'>
                                                <button
                                                    disabled={updateVideoLoading}
                                                    type='submit'
                                                    className={`px-10 group relative flex items-center justify-center rounded-sm border border-transparent ${
                                                        updateVideoLoading
                                                            ? `bg-red-800`
                                                            : `bg-red-700`
                                                    } py-1 text-sm font-medium text-white ${
                                                        `hover:bg-red-600` && !updateVideoLoading
                                                    } focus:outline-none focus:ring-1 focus:ring-red-700 focus:ring-offset-1`}>
                                                    {updateVideoLoading && (
                                                        <div
                                                            className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full absolute left-3'
                                                            role='status'></div>
                                                    )}
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                        <div className='bg-gray-300 bg-opacity-5 h-full p-6'>
                                            <div className='grid grid-cols-3 gap-3 mb-3'>
                                                <div className='col-span-2 space-y-5 rounded'>
                                                    <div className='relative'>
                                                        <label
                                                            htmlFor='video-title'
                                                            className='text-gray-300'>
                                                            Video Title
                                                        </label>
                                                        <Field
                                                            id='video-title'
                                                            name='title'
                                                            className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                                            placeholder='Video Title'
                                                        />
                                                        <div className='text-red-500 absolute text-[13px]'>
                                                            <ErrorMessage
                                                                name='title'
                                                                className='text-gray-500'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='relative'>
                                                        <label
                                                            htmlFor='video-description'
                                                            className='text-gray-300'>
                                                            Description
                                                        </label>
                                                        <Field
                                                            as='textarea'
                                                            id='video-description'
                                                            name='description'
                                                            rows='5'
                                                            className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                                            placeholder='Enter video description'
                                                        />
                                                        <div className='text-red-500 absolute text-[13px]'>
                                                            <ErrorMessage
                                                                name='description'
                                                                className='text-gray-500'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='relative'>
                                                        <label
                                                            htmlFor='video-thumbnail'
                                                            className='text-gray-300'>
                                                            Thumbnail
                                                            <span className='text-gray-500 text-xs ml-2'>
                                                                (Upload a thumbnail or select one
                                                                from auto generated thumbnails)
                                                            </span>
                                                        </label>
                                                        <div className='flex justify-between items-center w-full gap-3'>
                                                            <label
                                                                htmlFor='dropzone-file'
                                                                className='flex flex-col relative justify-center items-center w-[160px] h-[90px] bg-gray-50 rounded-sm border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                                                {thumbnail || uploadedThumbnail ? (
                                                                    <>
                                                                        <img
                                                                            src={
                                                                                uploadedThumbnail ||
                                                                                thumbnail?.url
                                                                            }
                                                                            className='w-full h-full'
                                                                            alt=''
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className='flex flex-col justify-center items-center'>
                                                                            <svg
                                                                                aria-hidden='true'
                                                                                className='w-10 h-10 text-gray-400'
                                                                                fill='none'
                                                                                stroke='currentColor'
                                                                                viewBox='0 0 24 24'
                                                                                xmlns='http://www.w3.org/2000/svg'>
                                                                                <path
                                                                                    stroke-linecap='round'
                                                                                    stroke-linejoin='round'
                                                                                    stroke-width='2'
                                                                                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
                                                                            </svg>
                                                                        </div>
                                                                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                                                                            Upload Thumbnail
                                                                        </p>
                                                                    </>
                                                                )}
                                                                <input
                                                                    id='dropzone-file'
                                                                    type='file'
                                                                    name='thumbnail'
                                                                    className='hidden absolute'
                                                                    onChange={(e) => {
                                                                        let file =
                                                                            e.target.files[0];

                                                                        form.setFieldValue(
                                                                            'thumbnail',
                                                                            file
                                                                        );

                                                                        const fileUrl =
                                                                            URL.createObjectURL(
                                                                                file
                                                                            );
                                                                        dispatch(
                                                                            setUploadedThumbnail(
                                                                                fileUrl
                                                                            )
                                                                        );
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className='relative flex gap-3'>
                                                        <div className='relative w-full'>
                                                            <label
                                                                htmlFor='video-language'
                                                                className='text-gray-300'>
                                                                Video language
                                                            </label>
                                                            <Field
                                                                as='select'
                                                                name='language'
                                                                id='video-language'
                                                                className='relative block w-full block w-full  rounded-sm border-0 outline-0 text-gray-300 py-2 px-3 bg-gray-700 shadow-sm sm:text-sm'
                                                                placeholder='Language'>
                                                                {languages.map((language) => {
                                                                    return (
                                                                        <>
                                                                            <option
                                                                                value={
                                                                                    language.language
                                                                                }>
                                                                                {language.language}
                                                                            </option>
                                                                        </>
                                                                    );
                                                                })}
                                                            </Field>
                                                            <div className='text-red-500 absolute text-[13px]'>
                                                                <ErrorMessage
                                                                    name='language'
                                                                    className='text-gray-500'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='relative w-full'>
                                                            <label
                                                                htmlFor='video-category'
                                                                className='text-gray-300'>
                                                                Video Category
                                                            </label>
                                                            <Field
                                                                as='select'
                                                                name='category'
                                                                className='relative block w-full block w-full  rounded-sm border-0 outline-0 text-gray-300 py-2 px-3 bg-gray-700 shadow-sm sm:text-sm'
                                                                placeholder='Category'>
                                                                <option value='news and globs'>
                                                                    News and globs
                                                                </option>
                                                                <option value='Entertainment'>
                                                                    Entertainment
                                                                </option>

                                                                <option value='Sports'>
                                                                    Sports
                                                                </option>
                                                            </Field>
                                                            <div className='text-red-500 absolute text-[13px]'>
                                                                <ErrorMessage
                                                                    name='category'
                                                                    className='text-gray-500'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='space-y-3 bg-gray-700 bg-opacity-20 py-3 px-4 h-full'>
                                                    <div>
                                                        <label className='text-gray-300 text-sm font-bold'>
                                                            Preview
                                                        </label>
                                                        <div>
                                                            <VideoJS
                                                                options={videoJsOptions}
                                                                onReady={handlePlayerReady}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className='text-gray-300 text-sm font-bold'>
                                                            Video link
                                                        </label>
                                                        <div className='flex gap-3 items-center text-gray-300'>
                                                            <input
                                                                type='text'
                                                                disabled
                                                                value={`${rootUrl}/videos/${contentId}`}
                                                                className='bg-transparent text-sm px-2 py-1 border border-gray-700 rounded-sm'
                                                            />
                                                            <CopyToClipboard
                                                                text={`${rootUrl}/videos/${contentId}`}
                                                                onCopy={() =>
                                                                    toast.success(
                                                                        'Copied to clipboard'
                                                                    )
                                                                }>
                                                                <button className='mx-auto'>
                                                                    <CopyIcon
                                                                        sx={{
                                                                            fontSize: 'medium',
                                                                        }}
                                                                    />
                                                                </button>
                                                            </CopyToClipboard>
                                                        </div>
                                                    </div>
                                                    <div className='relative'>
                                                        <label
                                                            htmlFor='video-visibility'
                                                            className='text-gray-300 text-sm font-bold'>
                                                            Visibility
                                                        </label>
                                                        <Field
                                                            as='select'
                                                            name='visibility'
                                                            className='relative block w-full block w-full  rounded-sm border-0 outline-0 text-gray-300 py-2 px-3 bg-gray-700 shadow-sm sm:text-sm'
                                                            placeholder='Visibility'>
                                                            <option value='public'>Public</option>
                                                            <option value='private'>Private</option>

                                                            <option value='unlisted'>
                                                                Unlisted
                                                            </option>
                                                        </Field>
                                                        <div className='text-red-500 absolute text-[13px]'>
                                                            <ErrorMessage name='visibility' />
                                                        </div>
                                                    </div>
                                                    {/* <div className='relative'>
                                                        <label
                                                            htmlFor='video-schedule'
                                                            className='text-gray-300 text-sm font-bold flex items-center gap-3'>
                                                            <p>Schedule</p>
                                                            <input
                                                                type='checkbox'
                                                                className='rounded-sm'
                                                                checked={
                                                                    schedule
                                                                }
                                                                onChange={(e) =>
                                                                    setSchedule(
                                                                        !schedule
                                                                    )
                                                                }
                                                            />
                                                        </label>

                                                        <div className='flex gap-3'>
                                                            <Field
                                                                type='checkbox'
                                                                disabled={
                                                                    !schedule
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'schedule.premiere',
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }}
                                                                name='schedule.premiere'
                                                                className='rounded-sm'
                                                            />
                                                            <p className='text-gray-400'>
                                                                Premiere
                                                            </p>
                                                        </div>
                                                        <div className='text-red-500 absolute text-[13px]'>
                                                            <ErrorMessage name='schedule.premiere' />
                                                        </div>

                                                        <div className='relative mb-3'>
                                                            <div className='datepicker'>
                                                                <Field
                                                                    disabled={
                                                                        !schedule
                                                                    }
                                                                    type='datetime-local'
                                                                    name='schedule.dateTime'
                                                                    className='relative block w-full block w-full  rounded-sm border-0 outline-0 text-gray-300 py-2 px-3 bg-gray-700 shadow-sm sm:text-sm'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='text-red-500 absolute text-[13px]'>
                                                            <ErrorMessage name='schedule.date' />
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default VideoDetails;
