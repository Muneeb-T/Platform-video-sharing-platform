import React from 'react';

function Spinner2() {
    return (
        <div className='h-screen flex pt-20 justify-center text-gray-300'>
            <div
                className='spinner-border animate-spin inline-block w-10 h-10 border-2 rounded-full'
                role='status'></div>
        </div>
    );
}

export default Spinner2;
