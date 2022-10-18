import React from 'react';

function Spinner() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div
                className='spinner-border animate-spin w-20 h-20 border-2 rounded-full'></div>
        </div>
    );
}

export default Spinner;
