import React from 'react';
import DiscoverTopScene from '../layout/DiscoverTopLayout';
import DiscoverSearchLayout from '../layout/DiscoverSearchLayout';

const Discover = async () => {
    return (
        <div className='flex flex-col items-center'>
            <DiscoverTopScene />
            <DiscoverSearchLayout />
        </div>
    );
};

export default Discover;