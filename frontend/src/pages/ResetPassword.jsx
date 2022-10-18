import React from 'react';
import LogoIcon from '../assets/images/Logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, resetPassword } from '../redux/features/account/accountSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

function ResetPassword() {
    const resetPasswordFormSchema = Yup.object().shape({
        email: Yup.string()
            .required('Enter email address')
            .email('Enter valid email address'),
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message, user } = useSelector(
        (state) => state.account
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }
        if (user) {
            navigate('/');
        }
    }, [isError, isSuccess, message, navigate, dispatch]);

    return (
        <div className='h-screen bg-gray-800'>
            <div className='container mx-auto flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-sm space-y-5'>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={resetPasswordFormSchema}
                        onSubmit={(values) => {
                            dispatch(resetPassword(values));
                        }}>
                        {() => {
                            return (
                                <Form className='mt-8 space-y-6 border border-gray-600 shadow-md rounded px-9  py-20'>
                                    <div>
                                        <img
                                            className='mx-auto h-12 w-auto'
                                            src={LogoIcon}
                                            alt='Platform logo'
                                        />
                                    </div>

                                    <div>
                                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-300'>
                                            Reset password
                                        </h2>

                                        {!isSuccess && (
                                            <p className='text-gray-500 text-sm text-center'>
                                                Enter your email address to
                                                reset password.We will send you
                                                a verification email and click
                                                on the link from email and
                                                verify it's you.
                                            </p>
                                        )}
                                    </div>

                                    {isSuccess ? (
                                        <>
                                            <div>
                                                <p className='text-gray-500 text-sm text-green-500 text-center'>
                                                    {message}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='relative'>
                                                <Field
                                                    name='email'
                                                    type='email'
                                                    className='relative block w-full appearance-none border border-gray-300 px-3 rounded-sm py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                                    placeholder='Enter email address'
                                                />
                                                <div className='text-red-500 absolute text-[13px]'>
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
                                                    className={`group relative flex w-full items-center justify-center rounded-sm border border-transparent ${
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
                                                    Reset
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
