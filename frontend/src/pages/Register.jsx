import React from 'react';
import LogoIcon from '../assets/images/Logo.png';
import FacebookIcon from '../assets/images/facebook-icon.png';
import GoogleIcon from '../assets/images/google-icon.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    register,
    reset,
    facebookAuth,
} from '../redux/features/auth/authSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
const backendHostName = process.env.REACT_APP_BACKEND_HOSTNAME;

function Register() {
    const signUpFormSchema = Yup.object().shape({
        email: Yup.string()
            .required('Enter email address')
            .email('Enter valid email address')
            .lowercase(),
        password: Yup.string()
            .required('Enter password')
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
            .min(8, 'Password must contain minimum 8 characters'),
    });

    // At least one upper case English letter, (?=.*?[A-Z]) *
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const responseFacebook = (userData) => {
        if (userData && userData.accessToken) {
            dispatch(facebookAuth(userData));
        } else {
            toast.error('Something went wrong.Facebook authentication failed.');
        }
    };

    const { isLoading, isError, isSuccess, message, user } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            navigate('/');
        }

        if (user) {
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch, user]);

    return (
        <div className='h-screen bg-gray-800'>
            <div className='container mx-auto flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-sm space-y-5'>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={signUpFormSchema}
                        onSubmit={(values) => {
                            dispatch(register(values));
                        }}>
                        {() => {
                            return (
                                <Form className='mt-8 space-y-6 border border-gray-600 shadow-md rounded px-9 pt-6 pb-8 mb-4'>
                                    <div>
                                        <img
                                            className='mx-auto h-12 w-auto'
                                            src={LogoIcon}
                                            alt='Platform logo'
                                        />
                                    </div>
                                    <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-300'>
                                        Sign up to platform
                                    </h2>

                                    <div className='relative'>
                                        <Field
                                            name='email'
                                            className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                            placeholder='Email address'
                                        />
                                        <div className='text-red-500 absolute text-[13px]'>
                                            <ErrorMessage
                                                name='email'
                                                className='text-gray-500'
                                            />
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <Field
                                            type='password'
                                            name='password'
                                            className='relative block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                            placeholder='Password'
                                        />
                                        <div className='text-red-500 absolute text-[13px] drop-shadow-md'>
                                            <ErrorMessage
                                                name='password'
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
                                            Sign up
                                        </button>
                                    </div>

                                    <div className='relative flex py-1 items-center'>
                                        <div className='flex-grow border-t border-gray-400'></div>
                                        <span className='flex-shrink mx-4 text-gray-400'>
                                            Or Sign up with
                                        </span>
                                        <div className='flex-grow border-t border-gray-400'></div>
                                    </div>
                                    <div className='flex justify-center gap-3'>
                                        <FacebookLogin
                                            appId={facebookAppId}
                                            fields='id,name,birthday,email,gender,picture'
                                            isDisabled={isLoading}
                                            render={(renderProps) => (
                                                <img
                                                    onClick={
                                                        renderProps.onClick
                                                    }
                                                    disabled={
                                                        renderProps.isDisabled
                                                    }
                                                    className='h-10 w-auto'
                                                    src={FacebookIcon}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    alt='facebook auth'
                                                />
                                            )}
                                            callback={responseFacebook}
                                        />
                                        <a
                                            href={`/${backendHostName}/api/auth/google-auth`}>
                                            <img
                                                className='h-10 w-auto'
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                src={GoogleIcon}
                                                alt='google auth'
                                            />
                                        </a>
                                    </div>

                                    <div className='flex justify-center'>
                                        <p className='text-red-500'>
                                            Do you have account ?
                                        </p>
                                        <Link to='/login'>
                                            <p className='ml-2 text-gray-300 underline'>
                                                SignIn
                                            </p>
                                        </Link>
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

export default Register;
