import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getChannel,
    reset,
    updateChannel,
} from '../../../redux/features/channel/channelSlice';
import Spinner2 from '../../Spinner2';
import { toast } from 'react-toastify';
function BasicInfo() {
    const dispatch = useDispatch();

    const { id: requestedUserId } = useParams();
    const {
        channel,
        isGetChannelLoading,
        updateChannelLoading,
        updateChannelSuccess,
        updateChannelError,
        updateChannelMessage,
    } = useSelector((state) => state.channel);
    const { owner, description, links, contact, linksOnBanner } = channel || {};
    const { email, phoneNumber } = contact || {};

    console.log(updateChannelMessage);

    useEffect(() => {
        dispatch(getChannel({ userId: requestedUserId }));
        if (updateChannelSuccess) {
            toast.success(updateChannelMessage);
        }
        if (updateChannelError) {
            toast.error(updateChannelError);
        }
        return () => {
            dispatch(reset());
        };
    }, [requestedUserId, updateChannelSuccess, updateChannelError]);

    if (isGetChannelLoading) {
        return <Spinner2 />;
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                channelName: owner?.username || '',
                description: description || '',
                links: [
                    {
                        _id: links ? links[0]?._id : '',
                        title: links ? links[0]?.title : '',
                        url: links ? links[0]?.url : '',
                    },
                    {
                        _id: links ? links[1]?._id : '',
                        title: links ? links[1]?.title : '',
                        url: links ? links[1]?.url : '',
                    },
                    {
                        _id: links ? links[2]?._id : '',
                        title: links ? links[2]?.title : '',
                        url: links ? links[2]?.url : '',
                    },
                ],
                linksOnBanner: linksOnBanner || 0,
                contact: {
                    email: email || '',
                    phoneNumber: phoneNumber || '',
                },
            }}
            onSubmit={(values) => {
                console.log(values);
                dispatch(updateChannel({ channelId: channel?._id, ...values }));
            }}>
            {(form) => {
                return (
                    <>
                        <Form className='col-span-4 gap-2 overflow-y-scroll scrollbar-hide space-y-2'>
                            <div>
                                <ul className='space-y-4 mt-3'>
                                    <li>
                                        <div>
                                            <p className='text-gray-400 text-sm'>
                                                Channel name
                                            </p>
                                            <div className='flex gap-3'>
                                                <Field
                                                    id='channelName'
                                                    name='channelName'
                                                    className='bg-transparent w-full rounded-sm border-b border-gray-500 py-1 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                    placeholder='Channel name'
                                                />
                                                <div className='text-red-500 absolute text-[13px]'>
                                                    <ErrorMessage
                                                        name='channel-name'
                                                        className='text-gray-500'
                                                    />
                                                </div>
                                                <button
                                                    disabled={
                                                        updateChannelLoading
                                                    }
                                                    type='submit'
                                                    className={`px-10 group relative flex items-center justify-center rounded-sm border border-transparent ${
                                                        updateChannelLoading
                                                            ? `bg-red-800`
                                                            : `bg-red-700`
                                                    } py-1 text-sm font-medium text-white ${
                                                        `hover:bg-red-600` &&
                                                        updateChannelLoading
                                                    } focus:outline-none`}>
                                                    {updateChannelLoading && (
                                                        <div
                                                            className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full absolute left-3'
                                                            role='status'></div>
                                                    )}
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <p className='text-gray-400 text-sm'>
                                            Channel description
                                        </p>
                                        <Field
                                            as='textarea'
                                            id='channel-description'
                                            name='description'
                                            rows='5'
                                            className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                            placeholder='Enter video description'
                                        />
                                        <div className='text-red-500 absolute text-[13px]'>
                                            <ErrorMessage
                                                name='description'
                                                className='text-gray-500'
                                            />
                                        </div>
                                    </li>
                                    <hr className='opacity-30' />
                                    <li>
                                        <p className='text-gray-400 text-sm'>
                                            Links
                                        </p>
                                        <ul className='space-y-2 text-sm'>
                                            <li className='flex gap-3'>
                                                <div>
                                                    <p className='text-gray-300'>
                                                        Title
                                                    </p>
                                                    <Field
                                                        type='text'
                                                        id='linkName1'
                                                        name='links[0].title'
                                                        className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                        placeholder='Eg: Facebook'
                                                    />
                                                    <div className='text-red-500 absolute text-[13px]'>
                                                        <ErrorMessage
                                                            name='links[0].title'
                                                            className='text-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-full'>
                                                    <p className='text-gray-300'>
                                                        URL
                                                    </p>
                                                    <Field
                                                        type='text'
                                                        id='linkUrl1'
                                                        name='links[0].url'
                                                        className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                        placeholder='Enter URL here'
                                                    />
                                                    <div className='text-red-500 absolute text-[13px]'>
                                                        <ErrorMessage
                                                            name='links[0].url'
                                                            className='text-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='flex gap-3'>
                                                <div>
                                                    <p className='text-gray-300'>
                                                        Title
                                                    </p>
                                                    <Field
                                                        type='text'
                                                        id='linkName2'
                                                        name='links[1].title'
                                                        className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                        placeholder='Eg: Twitter'
                                                    />
                                                    <div className='text-red-500 absolute text-[13px]'>
                                                        <ErrorMessage
                                                            name='links[1].title'
                                                            className='text-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-full'>
                                                    <p className='text-gray-300'>
                                                        URL
                                                    </p>
                                                    <Field
                                                        type='text'
                                                        id='linkUrl2'
                                                        name='links[1].url'
                                                        className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                        placeholder='Enter URL here'
                                                    />
                                                    <div className='text-red-500 absolute text-[13px]'>
                                                        <ErrorMessage
                                                            name='links[1].url'
                                                            className='text-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='flex gap-3'>
                                                <div>
                                                    <p className='text-gray-300'>
                                                        Title
                                                    </p>
                                                    <Field
                                                        type='text'
                                                        id='linkName3'
                                                        name='links[2].title'
                                                        className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                        placeholder='Eg: Instagram'
                                                    />
                                                    <div className='text-red-500 absolute text-[13px]'>
                                                        <ErrorMessage
                                                            name='links[2].title'
                                                            className='text-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-full'>
                                                    <p className='text-gray-300'>
                                                        URL
                                                    </p>
                                                    <Field
                                                        type='text'
                                                        id='linkUrl3'
                                                        name='links[2].url'
                                                        className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                        placeholder='Enter URL here'
                                                    />
                                                    <div className='text-red-500 absolute text-[13px]'>
                                                        <ErrorMessage
                                                            name='links[2].url'
                                                            className='text-gray-500'
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <hr className='opacity-30' />
                                    <li>
                                        <p className='text-gray-400 text-sm'>
                                            Links on banner (Links to show on
                                            channel banner)
                                        </p>
                                        <Field
                                            as='select'
                                            name='linksOnBanner'
                                            id='links-on-banner'
                                            className='relative  rounded-sm border-0 outline-0 text-gray-300 py-2 px-3 bg-gray-700 shadow-sm '
                                            placeholder='Language'>
                                            <option value={0}>None</option>
                                            <option value={1}>
                                                First 1 link
                                            </option>
                                            <option value={2}>
                                                First 2 links
                                            </option>
                                            <option value={3}>
                                                First 3 links
                                            </option>
                                        </Field>
                                    </li>
                                    <li>
                                        <p className='text-gray-400 text-sm'>
                                            Contact info
                                        </p>

                                        <div className='flex gap-3'>
                                            <div>
                                                <p className='text-gray-300'>
                                                    Phone
                                                </p>
                                                <Field
                                                    type='text'
                                                    id='phone'
                                                    name='contact.phoneNumber'
                                                    className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                    placeholder='Phone number'
                                                />
                                                <div className='text-red-500 absolute text-[13px]'>
                                                    <ErrorMessage
                                                        name='contact.phoneNumber'
                                                        className='text-gray-500'
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-gray-300'>
                                                    Email
                                                </p>
                                                <Field
                                                    type='email'
                                                    id='email'
                                                    name='contact.email'
                                                    className='relative block w-full bg-transparent appearance-none rounded-sm border border-gray-500 px-3 py-2 text-gray-300 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500'
                                                    placeholder='Email address'
                                                />
                                                <div className='text-red-500 absolute text-[13px]'>
                                                    <ErrorMessage
                                                        name='contact.email'
                                                        className='text-gray-500'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
}

export default BasicInfo;
