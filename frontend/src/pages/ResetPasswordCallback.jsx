import React from 'react';
import LogoIcon from '../assets/images/Logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    resetPasswordCallback,
    reset,
} from '../redux/features/account/accountSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

function ResetPasswordCallback() {
    const passwordValidation = Yup.string()

        .matches(/(?=.*?[A-Z])/, {
            message: 'Password must contain atleast one uppercase letter.',
        })
        .matches(/(?=.*?[a-z])/, {
            message: 'Password must contain atleast one lowercase letter.',
        })
        .matches(/(?=.*?[0-9])/, {
            message: 'Password must contain atleast one digit.',
        })
        .matches(/(?=.*?[#?!@$%^&*-])/, {
            message: 'Password must contain atleast one special character',
        })
        .min(8, 'Password must contain minimum 8 characters');

    const resetPasswordFormSchema = Yup.object().shape({
        newPassword: passwordValidation.required('Enter new password'),
        confirmPassword: passwordValidation
            .required('Confirm password')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    // At least one upper case English letter, (?=.*?[A-Z]) *
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)

    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message,user } = useSelector(
        (state) => state.account
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
            navigate('/login');
        }

        if (isSuccess) {
            toast.success(message);
            navigate('/login');
        }

        if(user){
            navigate('/')
        }

        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess, message, navigate, dispatch]);

    return (
        <div className='h-screen bg-gray-800'>
            <div className='container mx-auto flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-sm space-y-5'>
                    <Formik
                        initialValues={{
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={resetPasswordFormSchema}
                        onSubmit={(values) => {
                            dispatch(resetPasswordCallback({ values, token }));
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
                                    <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-300'>
                                        Reset password
                                    </h2>

                                    <div className='relative'>
                                        <Field
                                            name='newPassword'
                                            type='password'
                                            className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                            placeholder='New password'
                                        />
                                        <div className='text-red-500 absolute text-[13px]'>
                                            <ErrorMessage
                                                name='newPassword'
                                                className='text-gray-500'
                                            />
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <Field
                                            type='password'
                                            name='confirmPassword'
                                            className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                            placeholder='Confirm password'
                                        />
                                        <div className='text-red-500 absolute text-[13px] drop-shadow-md'>
                                            <ErrorMessage
                                                name='confirmPassword'
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
                                                `hover:bg-red-600` && !isLoading
                                            } focus:outline-none focus:ring-1 focus:ring-red-700 focus:ring-offset-1`}>
                                            {isLoading && (
                                                <div
                                                    className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full absolute left-10'
                                                    role='status'></div>
                                            )}
                                            Reset password
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordCallback;
