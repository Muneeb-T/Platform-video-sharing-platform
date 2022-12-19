import React from 'react';

function About({ description, contact, links }) {
    console.log(links);
    return (
        <div className='p-6 text-center space-y-3'>
            {description ? (
                <p className='text-gray-300'>{description}.</p>
            ) : (
                <p className='text-gray-500'>No description.</p>
            )}
            {contact?.phoneNumber && <p className='text-gray-400'>Phone: {contact?.phoneNumber}</p>}

            {contact?.phoneNumber && <p className='text-gray-400'>Email : {contact?.email}</p>}
            {links?.length
                ? links?.map((link) => (
                      <p className='text-gray-400' key={link?._id}>
                          {link?.title} : {link?.url}
                      </p>
                  ))
                : null}
        </div>
    );
}

export default About;
