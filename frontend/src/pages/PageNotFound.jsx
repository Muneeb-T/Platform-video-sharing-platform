import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    const onClickGoHomepage = () => {
        navigate('/');
    };

    return (
        <div className='container p-5 mx-auto max-h-screen h-screen flex items-center justify-center'>
            <div className='text-center'>
                <p className='text-gray-500 text-6xl sm:text-8xl font-bold'>404!</p>
                <p className='text-3xl sm:text-5xl text-red-500 font-bold'>
                    Oops ! Page not found
                </p>
                <p className='text-gray-500'>
                    We looked everywhere for this page.Are you sure the URL is
                    correct ?
                </p>
                <button
                    className='rounded-md text-gray-300 border border-red-500 px-3 py-2 font-bold mt-3'
                    onClick={onClickGoHomepage}>
                    Go Homepage
                </button>
            </div>
        </div>
    );
}

export default PageNotFound;
