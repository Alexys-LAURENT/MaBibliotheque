import React from 'react';

const BookDescriptionLayout = ({ book }: any) => {
    return (
        <div className='mt-0 2xl:mt-[1vw] 3xl:mt-[5vw] w-[100%] max-w-[1600px] relative flex flex-col lg:flex-row'>
            <div className='w-full h-full mt-14 lg:w-5/12 '>
                <h3 className='p-2 lg:ps-14 font-bold text-bb_text text-3xl'>Description</h3>
                {book.volumeInfo.description ?
                    <p className='p-2 lg:ps-14 text-bb_text opacity-70 leading-7'>{book.volumeInfo.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    : <p className='p-2 lg:ps-14 text-bb_text opacity-70 leading-7'>Aucune description n'est disponible pour ce livre.</p>
                }
                <div className='p-2 lg:ps-14 flex gap-4 flex-wrap'>
                    {book.volumeInfo.categories && book.volumeInfo.categories[0].split('/').map((category: any) => (
                        <span className='inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>{category}</span>
                    ))}

                </div>
            </div>
            <div className='w-full lg:w-7/12 lg:mt-14  h-full'></div>
        </div>
    );
};

export default BookDescriptionLayout;