"use client"
import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import { Button } from '@nextui-org/react';

const DiscoverSearchBooks = ({ books }: { books: any }) => {
    const [offset, setOffset] = useState(15); // Initial offset value

    const handleLoadMore = () => {
        setOffset((prevOffset) => prevOffset + 15); // Augmente l'offset de 15 lorsque l'utilisateur clique sur "Charger plus"
    };

    return (
        <>
            <div className='flex flex-col items-center sm:flex-row w-full gap-4 flex-wrap justify-center mt-6 '>
                {books.slice(0, offset).map((book: any, index: number) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>
            {offset < books.length && (
                <button
                    className='m-6 px-6 py-2 text-white rounded-md font-semibold transition-all !duration-400 bg-gradient-to-tl from-bb_secondary to-bb_third bg-size-200 bg-pos-0 hover:bg-pos-100 hover:scale-105'
                    onClick={handleLoadMore}
                >
                    Charger plus
                </button>
            )}
        </>
    );
};

export default DiscoverSearchBooks;
