import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import Genres from '../components/Genres';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../redux/features/video/videoSlice';
import Spinner from '../components/Spinner';
const genres = ['Entertainment', 'news and globs'];
function Home() {
    const { getVideosLoading, getVideosError, getVideosSuccess, getVideosMessage, videos } =
        useSelector((state) => state.video);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideos());
    }, []);
    if (getVideosLoading) {
        return <Spinner />;
    }

    return (
        <>
            <HeroSection />

            {videos.length ? (
                genres.map((genre, index) => {
                    const videosByGenre = videos.filter((video) => video.category === genre);
                    if (videosByGenre.length)
                        return <Genres videos={videosByGenre} title={genre} key={index} />;
                    return null;
                })
            ) : (
                <div className='container p-5 mx-auto flex items-center justify-center pb-20'>
                    <div className='text-center'>
                        <p className='text-gray-500 text-6xl font-bold'>Sorry</p>
                        <p className='text-3xl sm:text-5xl text-red-500 font-bold'>No Content</p>
                        <p className='text-gray-500'>
                            There are no any content in Platform.Upload your contents.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
