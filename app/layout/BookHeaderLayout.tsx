import React from 'react';
import ButtonsRow from '../components/ButtonsRow';


const BookHeaderLayout = ({ book }: any) => {
    return (
        <div className='w-full flex flex-col items-center relative '>

            {/* Blur image */}
            <div className='overflow-hidden w-full  absolute top-0 z-0'>
                <div className='h-[40vh] min-h-[500px] w-full bg-black bg-opacity-40 z-10 absolute top-0'></div>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ?
                    <div className='h-[40vh] min-h-[500px] w-full bg-cover bg-center z-0 blur-2xl' style={{ backgroundImage: `url("${book.volumeInfo.imageLinks.thumbnail}")` }}></div>
                    :
                    <div className='h-[40vh] min-h-[500px] w-full bg-cover bg-center z-0 blur-2xl' style={{ backgroundImage: `url("/images/bookCover3.png")` }}></div>
                }
            </div>

            {/* content */}
            <div className='w-[100%] max-w-[1600px] relative h-[35vh] min-h-[460px] mt-[5vh] flex flex-col sm:flex-row justify-center items-center sm:justify-normal sm:items-start'>
                <div className=' w-4/12 '>
                    {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ?
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt="book cover" className='w-9/12 mb-4 sm:mb-0 sm:w-8/12 mx-auto' />
                        :
                        <img src="/images/bookCover3.png" alt="book cover" className='w-9/12 mb-4 sm:mb-0 sm:w-8/12 mx-auto' />
                    }
                </div>
                <div className='w-8/12 cursor-default' title={book.volumeInfo.title + ' - ' + book.volumeInfo.authors}>
                    <h1 className='text-2xl text-center sm:text-left me-2 sm:me-0 sm:text-6xl font-bold text-bb_text drop-shadow-2xl text-ellipsis line-clamp-3'>{book.volumeInfo.title}</h1>
                    <h2 className='text-xl text-center sm:text-left font-semiboldbold text-bb_text drop-shadow-2xl text-ellipsis line-clamp-1 mt-2'>{book.volumeInfo.authors}</h2>
                    {book.volumeInfo.publishedDate &&
                        <p className='text-base text-center sm:text-left font-semiboldbold text-bb_text drop-shadow-2xl text-ellipsis line-clamp-1 mt-2'>{book.volumeInfo.publishedDate.split('-').reverse().join('/')}</p>
                    }
                </div>
            </div>
            <div className='w-full max-w-[1600px] min-h-[70px] flex-wrap flex z-20 '>
                <div className='w-0 md:w-4/12 h-full'></div>

                <div className='w-full justify-center md:justify-end md:pe-4  lg:w-8/12 min-h-[80px] flex flex-wrap gap-3 5 items-center '>
                    <ButtonsRow book={book} />
                </div>
            </div>
        </div>
    );
};

export default BookHeaderLayout;