import React from 'react';

function BlackButton(props) {
    const { text, icon } = props;
    return (
        <>
            <button className='bg-gray-900 drop-shadow-lg opacity-70 text-xl font-bold hover:bg-gray-800 text-white py-2 px-12 duration-75'>
                {icon} {text}
            </button>
        </>
    );
}

export default BlackButton;
