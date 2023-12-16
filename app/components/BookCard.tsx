import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserBooksContext } from '../context/UserBooksContext';
import { usePathname } from 'next/navigation';

const BookCard = ({ book }: any) => {
    const { favBooks, toReadBooks, haveReadBooks, readingNowBooks, toggleFavorite, removeFromShelf } = useContext(UserBooksContext);
    const [isInLibrary, setIsInLibrary] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        if (toReadBooks && toReadBooks.length > 0 && toReadBooks.some((favBook: any) => favBook.id === book.id)) {
            setIsInLibrary(true);
        }
        if (haveReadBooks && haveReadBooks.length > 0 && haveReadBooks.some((favBook: any) => favBook.id === book.id)) {
            setIsInLibrary(true);
        }
        if (readingNowBooks && readingNowBooks.length > 0 && readingNowBooks.some((favBook: any) => favBook.id === book.id)) {
            setIsInLibrary(true);
        }
        if (favBooks && favBooks.length > 0 && favBooks.some((favBook: any) => favBook.id === book.id)) {
            setIsFavorite(true);
        }
    }, [favBooks, toReadBooks, haveReadBooks, readingNowBooks, book.id]);

    return (
        <div className='hover:scale-105 transition-all duration-300 relative w-[90%] sm:w-auto'>
            <Link href={`/book/${book.id}`} className='w-full'>
                <div className='group  w-full min-h-[120px] sm:min-h-0 sm:w-[220px] lg:w-[245px] sm:h-[305px] rounded-md bg-bb_bgDark/10 dark:bg-bb_bgLight/10 hover:bg-bb_bgDark/30 hover:dark:bg-bb_bgLight/30 flex sm:flex-col items-center cursor-pointer ps-4 sm:ps-0 pt-4 pb-4 sm:pt-0 sm:pb-0'>
                    <div className='min-h-[78%] '>
                        {book.volumeInfo.imageLinks ?
                            <Image src={book.volumeInfo.imageLinks.thumbnail} className='sm:mt-5 w-[160px] max-w-[70px] sm:max-w-none sm:w-[128px] sm:h-[197px]' alt="book cover" width={128} height={197} />
                            :
                            <Image src={'/images/bookCover3.png'} className='sm:mt-5 w-[160px] max-w-[70px] sm:max-w-none sm:w-[128px] sm:h-[197px]' alt="book cover" width={128} height={197} />
                        }
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='w-full max-h-[30px]  line-clamp-1 text-ellipsis p-2 pb-0 text-bb_textDark dark:text-bb_textLight font-bold text-xl sm:text-sm transition-all duration-300 '>{book.volumeInfo.title}</p>
                        {book.volumeInfo.authors &&
                            <p className='w-full max-h-[30px]  line-clamp-1 text-ellipsis p-2 pb-0 pt-0 text-bb_textDark dark:text-bb_textLight opacity-60 text-lg sm:text-sm transition-all duration-300 '>{book.volumeInfo.authors[0]}</p>
                        }
                    </div>
                </div>
            </Link>
            {
                isInLibrary && pathName === '/maBibliotheque' &&
                <button onClick={() => removeFromShelf(book)} className='absolute top-2 right-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill hover:scale-105 hover:fill-red-500 hover:cursor-pointer" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </button>
            }
            {
                isFavorite && pathName === '/favoris' &&
                <button onClick={() => toggleFavorite(book)} className='absolute top-2 right-2'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill fill-bb_secondary" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1" />
                    </svg>

                </button>
            }
        </div>
    );
};

export default BookCard;