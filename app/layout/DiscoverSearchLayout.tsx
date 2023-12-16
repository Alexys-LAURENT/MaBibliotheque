import React from 'react';
import booksApi from '../utils/fetchBookApi';
import BookCard from '../components/BookCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import DiscoverSearchBooks from '../components/DiscoverSearchBooks';
const DiscoverSearchLayout = async () => {

    const { user } = await getServerSession(authOptions)



    const books = await booksApi.getRandomAuthorBooks(user.accessToken)


    return (
        <div className='w-[100%] max-w-[1600px] relative min-h-[92vh] p-4 flex flex-col items-center '>


            <div className='flex w-full ps-6 lg:ps-24 mt-[200px]'>
                <h3 className='text-bb_textDark dark:text-bb_textLight text-3xl font-semibold'>Recommendations</h3>
                {/* info bubble */}
                <div className='flex items-center justify-center w-4 h-4 rounded-full bg-white text-bb_primary cursor-help text-sm font-bold ml-2' title='Ajoutez des livres en favoris pour personnaliser vos recommandations'>
                    <p className='text-bb_textDark dark:text-bb_textLight'>i</p>
                </div>
            </div>
            <DiscoverSearchBooks books={books} />
        </div>
    );
};

export default DiscoverSearchLayout;