import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const BookCard = ({ book }: any) => {
    return (
        <Link href={`/book/${book.id}`} className='w-[90%] sm:w-auto'>
            <div className='group  w-full min-h-[120px] sm:min-h-0 sm:w-[220px] lg:w-[245px] sm:h-[305px] rounded-md bg-bb_bgDark/10 dark:bg-bb_bgLight/10 hover:bg-bb_bgDark/30 hover:dark:bg-bb_bgLight/30 flex sm:flex-col items-center cursor-pointer ps-4 sm:ps-0 pt-4 pb-4 sm:pt-0 sm:pb-0 transition-all duration-300 hover:scale-105'>
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
    );
};

export default BookCard;