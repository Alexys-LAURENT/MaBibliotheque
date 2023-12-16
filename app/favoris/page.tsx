"use client"
import React, { useContext } from 'react';
import BookCard from '../components/BookCard';
import { UserBooksContext } from '../context/UserBooksContext';
import { Spinner } from '@nextui-org/react';
const Favoris = () => {
    const { favBooks } = useContext(UserBooksContext);

    if (!favBooks) return <div className='w-full h-[150px] flex justify-center items-center'><Spinner classNames={{
        circle1: "border-b-bb_secondary",
        circle2: "border-b-bb_third",
    }} /></div>

    return favBooks && favBooks.length > 0 && (
        <div className='flex w-full justify-center'>
            <div className='mt-4 w-[100%] max-w-[1600px]  p-4 flex flex-col '>
                <h1 className='p-2 ps-10 sm:ps-2 font-bold text-bb_textDark dark:text-bb_textLight text-3xl'>Vos livres favoris</h1>
                {favBooks && favBooks.length > 0 ?
                    <div className='flex w-full flex-wrap flex-col sm:flex-row items-center p-2 gap-4'>
                        {favBooks.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    :
                    <p className='p-2 text-bb_textDark dark:text-bb_textLight'>Vous n'avez pas encore de livres favoris</p>}
            </div>
        </div>
    );
};

export default Favoris;