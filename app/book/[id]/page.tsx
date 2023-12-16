import React from 'react';
import booksApi from '@/app/utils/fetchBookApi';
import BookHeaderLayout from '@/app/layout/BookHeaderLayout';
import BookDescriptionLayout from '../../layout/BookDescriptionLayout';

async function page({ params }: { params: { id: string } }) {
    const book = await booksApi.getBookById(params.id)
    return (
        <div className='flex flex-col items-center '>
            <BookHeaderLayout book={book} />
            <BookDescriptionLayout book={book} />
        </div>
    );
};

export default page;