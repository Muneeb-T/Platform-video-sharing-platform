import React from 'react';

function Spinner() {
    return (
        <div className='bg-gray-900 h-screen flex items-center justify-center text-gray-300'>
            <div
                className='spinner-border animate-spin inline-block w-10 h-10 border-2 rounded-full'
                role='status'></div>
        </div>
    );
}

export default Spinner;
