"use client"
import { Autocomplete, AutocompleteItem, Card, Link } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Loupe from '../lib/Loupe.svg';
import { useRef, useState } from 'react';
import booksApi from '../utils/fetchBookApi';

const SearchBar = () => {
    let list = useAsyncList<any>({
        async load({ signal, filterText }) {
            if (!filterText) return { items: [] };
            const result = await booksApi.getBookByName(filterText);
            console.log(result)
            const items = result.items || [];
            const uniqueItems = items.reduce((unique: any, item: any) => {
                const isUnique = !unique.some((obj: any) => obj.id === item.id);
                return isUnique ? [...unique, item] : unique;
            }, []);
            return {
                items: uniqueItems,
            };
        },
    });

    const [searchValue, setSearchValue] = useState('');
    const debounceDelay = 500; // Délai de débouncing
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);




    function test(text: string) {
        setSearchValue(text);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            list.setFilterText(text);
        }, debounceDelay);
    }

    return (
        <>
            <div className='flex bg-gradient-to-r from-bb_third to-bb_secondary w-11/12 md:w-10/12 h-fit mt-24 p-0.5 rounded-md relative'>
                <div className='w-full h-full bg-bb_bgLight dark:bg-bb_bgDark flex rounded-md'>

                    <Autocomplete
                        shouldCloseOnBlur={false}
                        aria-label="Rechercher un livre"
                        className="border-none"
                        inputValue={searchValue}
                        isLoading={list.isLoading}
                        items={list.items}
                        placeholder="Rechercher un livre"
                        variant="flat"
                        onInputChange={test}
                        radius="sm"
                        startContent={<img src={Loupe.src} alt="loupe icon" className='w-6' />}
                        inputProps={{
                            classNames: {
                                inputWrapper: "data-[hover=true]:bg-transparent bg-transparent"
                            }
                        }}
                        popoverProps={{
                            placement: "bottom",
                        }}
                    >
                        {(item) => (
                            <AutocompleteItem key={item.id} className="capitalize">
                                <Link href={`/book/${item.id}`} className="w-full">
                                    <div className='flex w-full gap-3 items-center p-2 border-gray-200' key={`SearchBar row ${item.id}`}>
                                        {item.volumeInfo.imageLinks?.thumbnail ?
                                            <img src={item.volumeInfo.imageLinks?.thumbnail} alt="book cover" className='w-10' />
                                            :
                                            <img src='./images/bookCover3.png' alt="book cover" className='w-10' />
                                        }
                                        <div className="flex flex-col">
                                            <p className='dark:text-bb_text text-bb_primary w-full text-ellipsis line-clamp-1'>{item.volumeInfo.title}</p>
                                            <p className='dark:text-bb_text text-bb_primary text-xs w-full text-ellipsis line-clamp-1'>{item.volumeInfo.authors}</p>
                                        </div>
                                    </div>
                                </Link>
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </div>

            </div>
        </>
    );
};

export default SearchBar;
