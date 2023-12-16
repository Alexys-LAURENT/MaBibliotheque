import React from 'react';
import SearchBar from '../components/SearchBar';

const DiscoverTopScene = () => {
    return (
        <div className='w-[100%] max-w-[1600px] relative min-h-[92vh] p-4 flex flex-col items-center justify-center'>
            <h1 className='text-bb_textDark dark:text-bb_textLight font-semibold text-4xl sm:text-6xl text-center mb-36 leading-relaxed tracking-wide z-40 backdrop-blur-lg'>Votre bibliothèque <br /> en ligne !</h1>
            <div className='bg-white h-56 w-56 rounded-full absolute bg-gradient-to-b from-50% from-bb_secondary to-bb_third blur-3xl opacity-70 left-10 top-32'></div>
            <div className='bg-white h-56 w-56 rounded-full absolute bg-gradient-to-b from-50% from-bb_secondary to-bb_third blur-3xl opacity-70 right-10 top-80'></div>
            <div className='bg-white h-56 w-56 rounded-full absolute bg-gradient-to-b from-50% from-bb_secondary to-bb_third blur-3xl opacity-70 left-36 top-[590px]'></div>
            <SearchBar />
        </div>
    );
};

export default DiscoverTopScene;