import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import channelBanner from '../assets/images/channel-banner.jpeg';
import AvatarThumbnail from '../assets/images/avatar-thumbnail.png';
import WaterMark from '../assets/images/watermark.jpg';
import * as Yup from 'yup';

function UserProfile() {
    const signUpFormSchema = Yup.object().shape({
        email: Yup.string()
            .required('Enter email address')
            .email('Enter valid email address')
            .lowercase(),
        username: Yup.string()
            .required('Enter username')
            .min(30, 'Enter minimum 30 characters'),
    });

    // At least one upper case English letter, (?=.*?[A-Z]) *
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        isLoading,
        isFetchUserError,
        isFetchUserSuccess,
        message,
        user: requestedUser,
    } = useSelector((state) => state.account);

    const { user } = useSelector((state) => state.auth);

    // useEffect(() => {

    // }, [
    //     requestedUser,
    //     message,
    //     isLoading,
    //     isFetchUserError,
    //     isFetchUserSuccess,
    //     dispatch,
    //     requestedUserId,
    // ]);

    return (
        <>
            <div className='container mx-auto p-2 sm:p-10 pt-20 sm:pt-20'>
                <div className='min-h-screen rounded-sm'>
                    <div className='relative'>
                        <img src={channelBanner} alt='' />
                        <Link className='absolute right-4 top-4'>
                            <button
                                disabled={isLoading}
                                type='submit'
                                className='group relative shadow-md border border-transparent  bg-gray-700 bg-opacity-90 py-1 px-2 text-sm font-medium text-white'>
                                Customize channel
                            </button>
                        </Link>
                        <div className='absolute justify-between flex bottom-0 h-[40%] px-5 py-7 w-full bg-gray-900 bg-opacity-70 flex items-center'>
                            <div className='flex gap-4 items-center m-5'>
                                <img
                                    className='h-full w-auto rounded-full shadow-md'
                                    src={
                                        user.profilePicture
                                            ? user.profilePicture.path
                                            : user.googleAccount
                                            ? user.googleAccount.picture
                                            : user.facebookAccount
                                            ? user.facebookAccount.picture
                                            : AvatarThumbnail
                                    }
                                    referrerPolicy='no-referrer'
                                    alt=''
                                />
                                <div>
                                    <h1 className='font-bold text-lg sm:text-xl md:text-3xl lg:text:4xl text-gray-300'>
                                        {user.username}
                                    </h1>
                                    <p className='text-gray-300 text-sm sm:text-lg'>
                                        235k followers
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img
                                    className='h-20 w-20'
                                    src={WaterMark}
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className='p-10'>
                        
                    </div>
                </div>
            </div>
            {/* <div className='mt-10 sm:mt-0 pt-20 mx-auto p-10 h-max min-h-screen'>
                <div className='container mx-auto flex min-h-full items-center justify-center'>
                    <div className='mt-5'>
                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                country: '',
                                dateOfBirth: '',
                            }}
                            validationSchema={signUpFormSchema}
                            onSubmit={(values) => {}}>
                            {() => {
                                return (
                                    <Form className='mt-8 space-y-6 border border-gray-600 shadow-md rounded px-9 pt-6 pb-8 mb-4'>
                                        <div className='relative'>
                                            <Field
                                                name='username'
                                                className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                                placeholder='Username'
                                                value = {user.username}
                                            />
                                            <div className='text-red-500 absolute text-[13px]'>
                                                <ErrorMessage
                                                    name='username'
                                                    className='text-gray-500'
                                                />
                                            </div>
                                        </div>
                                        <div className='relative'>
                                            <Field
                                                type='email'
                                                name='email'
                                                className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                                placeholder='Email address'
                                            />
                                            <div className='text-red-500 absolute text-[13px] drop-shadow-md'>
                                                <ErrorMessage
                                                    name='email'
                                                    className='text-gray-500'
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                disabled={isLoading}
                                                type='submit'
                                                className={`group relative flex w-full items-center justify-center rounded-md border border-transparent ${
                                                    isLoading
                                                        ? `bg-red-800`
                                                        : `bg-red-700`
                                                } py-2 px-4 text-sm font-medium text-white ${
                                                    `hover:bg-red-600` &&
                                                    !isLoading
                                                } focus:outline-none focus:ring-1 focus:ring-red-700 focus:ring-offset-1`}>
                                                {isLoading && (
                                                    <div
                                                        className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full absolute left-10'
                                                        role='status'></div>
                                                )}
                                                Save
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default UserProfile;
