import React from 'react';

const SideBar = () => {
    return (
        <div className='min-w-[40px] h-screen bg-bb_secondary flex-col items-center hidden sm:flex'>
            <p className='sideText font-literata mt-1 text-lg relative left-[-2px]'>Ma bibliothèque</p>
            <div className='bg-[#B5B5B5] w-full h-4 mt-5'></div>
        </div>
    );
};

export default SideBar;