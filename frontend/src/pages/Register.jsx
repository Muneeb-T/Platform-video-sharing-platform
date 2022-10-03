import React from 'react';
import LogoIcon from '../images/Logo.png';
import FacebookIcon from '../images/facebook-icon.png';
import GoogleIcon from '../images/google-icon.png';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(register(userData));
    };
    return (
        <div className='h-screen bg-gray-800'>
            <div className='flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-sm space-y-5'>
                    <form
                        className='mt-8 space-y-6 border border-gray-600 shadow-md rounded px-9 pt-6 pb-8 mb-4'
                        onSubmit={onSubmit}>
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
                        <div className='-space-y-px rounded-md shadow-sm'>
                            <div>
                                <label
                                    htmlFor='email-address'
                                    className='sr-only'>
                                    Email address
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                    placeholder='Email address'
                                />
                            </div>
                            <div>
                                <label htmlFor='password' className='sr-only'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                                    placeholder='Password'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='group relative flex w-full justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
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
                            <img className='h-10 w-auto' src={FacebookIcon} />
                            <img className='h-10 w-auto' src={GoogleIcon} />
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
