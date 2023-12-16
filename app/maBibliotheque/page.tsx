
"use client"
import { useContext } from 'react';
import { UserBooksContext } from '../context/UserBooksContext';
import TabsLayout from '../layout/TabsLayout';
import { Spinner } from '@nextui-org/react';

const MaBibliotheque = () => {
    const { toReadBooks, haveReadBooks, readingNowBooks } = useContext(UserBooksContext);

    if (!toReadBooks || !haveReadBooks || !readingNowBooks) return <div className='w-full h-[150px] flex justify-center items-center'><Spinner classNames={{
        circle1: "border-b-bb_secondary",
        circle2: "border-b-bb_third",
    }} /></div>

    return (
        <div className='flex w-full justify-center'>
            <div className='mt-4 w-[100%] max-w-[1600px] p-4 flex flex-col '>
                <h1 className='p-2 ps-10 sm:ps-2 font-bold text-bb_textDark dark:text-bb_textLight text-3xl'>Votre bibliothèque</h1>

                <TabsLayout toReadBooks={toReadBooks} haveReadBooks={haveReadBooks} readingNowBooks={readingNowBooks} />
            </div>
        </div>
    );
};

export default MaBibliotheque;