// @ts-nocheck
import React from 'react';
import LogoIcon from '../images/Logo.png';
import FacebookIcon from '../images/facebook-icon.png';
import GoogleIcon from '../images/google-icon.png';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <div className='flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-sm space-y-5'>
                    <form
                        className='mt-8 space-y-6 border bg-gray-800 border-gray-600 shadow-md rounded px-9 pt-6 pb-8 mb-4'
                        action='#'
                        method='POST'>
                        <div>
                            <img
                                class='mx-auto h-12 w-auto'
                                src={LogoIcon}
                                alt='Platform logo'
                            />
                        </div>
                        <h2 class='mt-6 text-center text-3xl font-bold tracking-tight text-gray-300'>
                            Sign in to your account
                        </h2>
                        <div className='-space-y-px rounded-md shadow-sm'>
                            <div>
                                <label for='email-address' className='sr-only'>
                                    Email address
                                </label>
                                <input
                                    id='email-address'
                                    name='email'
                                    type='email'
                                    autocomplete='email'
                                    required
                                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                    placeholder='Email address'
                                />
                            </div>
                            <div>
                                <label for='password' className='sr-only'>
                                    Password
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autocomplete='current-password'
                                    required
                                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                    placeholder='Password'
                                />
                            </div>
                        </div>

                        <div className='text-sm text-right'>
                            <p className='font-medium text-gray-400 hover:text-gray-300'>
                                Forgot password?
                            </p>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='group relative flex w-full justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                                Sign in
                            </button>
                        </div>

                        <div class='relative flex py-1 items-center'>
                            <div class='flex-grow border-t border-gray-400'></div>
                            <span class='flex-shrink mx-4 text-gray-400'>
                                Or Sign in with
                            </span>
                            <div class='flex-grow border-t border-gray-400'></div>
                        </div>
                        <div className='flex justify-center gap-3'>
                            <img
                                class='h-10 w-auto'
                                src={FacebookIcon}
                                alt='Platform logo'
                            />
                            <img
                                class='h-10 w-auto'
                                src={GoogleIcon}
                                alt='Platform logo'
                            />
                        </div>
                        <div className='flex justify-center'>
                            <p className='text-red-500'>Need and account ?</p>
                            <Link to='/register'>
                                <p className='ml-2 text-gray-300 underline'>
                                    SignUp
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
