import React from 'react';
import backgroundImage from '../images/black-panther.webp';
function HeroSection() {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('${backgroundImage}')`,
                backgroundSize: 'cover',
            }}
            className='sm:p-20 p-10 flex items-center h-screen'>
            <div className='items-center'>
                <div className='text-white  max-w-[100%] md:max-w-[60%]'>
                    <h3 className='text-3xl drop-shadow-md'>
                        Trailer out now ...
                    </h3>
                    <h1 className='sm:text-7xl text-5xl drop-shadow-md'>
                        Black panther
                    </h1>
                    <p className='drop-shadow-md'>
                        Black Panther is a 2018 American superhero film based on
                        the Marvel Comics character of the same name. Produced
                        by Marvel Studios and distributed by Walt Disney Studios
                        Motion Pictures, it is the 18th film in the Marvel
                        Cinematic Universe (MCU).
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
