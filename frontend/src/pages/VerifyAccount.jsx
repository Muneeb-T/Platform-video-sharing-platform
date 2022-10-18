import React from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyAccount, reset } from '../redux/features/auth/authSlice';
import WarningIcon from '@mui/icons-material/ReportProblem';

function VerifyAccount() {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } =
        useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(verifyAccount(token));
        return () => {
            dispatch(reset());
        };
    }, []);

    if (isSuccess || isError) {
        setTimeout(() => {
            navigate('/');
        }, 5000);
    }

    return (
        <div className='h-screen container flex mx-auto justify-center items-center'>
            <div className='h-[30%] w-[60%] flex items-center justify-center border border-gray-700 gap-2'>
                {isLoading && (
                    <>
                        <div className='spinner-border animate-spin w-5 h-5 border-2 rounded-full'></div>
                        <p className='text-md text-green-500'>
                            Email verification is under process
                        </p>
                    </>
                )}
                {isSuccess && (
                    <>
                        <div>
                            <div className='flex gap-3'>
                                <div className='spinner-border animate-spin w-5 h-5 border-2 rounded-full'></div>
                                <div className='text-gray-300 text-md'>
                                    <p className='text-green-500'>{message}</p>

                                    <p className='text-center text-gray-300'>
                                        Redirecting to homepage...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {isError && (
                    <>
                        <div className='flex gap-3'>
                            <WarningIcon className='text-red-600' />
                            <div className='text-gray-300 text-md'>
                                <p>{message}</p>
                                <p className='text-center'>
                                    Please try again...
                                </p>
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='spinner-border animate-spin w-5 h-5 border-2 rounded-full'></div>
                                    <p className='text-gray-300'>
                                        Redirecting to homepage...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyAccount;
