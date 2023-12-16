'use client'
import React, { useContext } from 'react';
import { UserBooksContext } from '../context/UserBooksContext';
import Link from 'next/link';
import FnacImg from '../../public/images/Fnac.webp'
import AmazonImg from '../../public/images/amazon.webp'
import { Button, Select, SelectItem } from '@nextui-org/react';
import bookShels from '../utils/bookShelf';


const ButtonsRow = ({ book }: any) => {
    const { favBooks, toggleFavorite, toggleInShelf, toReadBooks, haveReadBooks, readingNowBooks } = useContext(UserBooksContext);

    const items = [
        { key: bookShels.Have_read, value: "Lus" },
        { key: bookShels.To_read, value: "À lire" },
        { key: bookShels.Reading_now, value: "En cours de lecture" },
    ];

    const findDefaultSelectedKey = (book: any) => {
        if (toReadBooks && toReadBooks.length > 0 && toReadBooks.some((favBook: any) => favBook.id === book.id)) {
            return [items[1].key.toString()];
        }
        if (haveReadBooks && haveReadBooks.length > 0 && haveReadBooks.some((favBook: any) => favBook.id === book.id)) {
            return [items[0].key.toString()];
        }
        if (readingNowBooks && readingNowBooks.length > 0 && readingNowBooks.some((favBook: any) => favBook.id === book.id)) {
            return [items[2].key.toString()];
        }
        return undefined;
    }

    return (
        <>

            <Select key={"select" + book.id + ""}
                label="Ajouter à ma bibliothèque"
                className="max-w-xs"
                items={items}
                onChange={(e) => toggleInShelf(book, parseInt(e.target.value))}
                defaultSelectedKeys={findDefaultSelectedKey(book)}
                classNames={{
                    trigger: "bg-default-200"
                }}
            >
                {((item) => (
                    <SelectItem key={item.key} value={item.key}>
                        {item.value}
                    </SelectItem>
                ))}

            </Select>

            <Link href={`https://www.fnac.com/SearchResult/ResultList.aspx?Search=${book.volumeInfo.title}`} target='_blank'>
                <Button startContent={<img src={'' + FnacImg.src} alt="" className="w-8 h-8" />}>
                    Fnac
                </Button>
            </Link>

            {book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[1] ?
                <Link href={`http://www.amazon.fr/gp/search?index=books&linkCode=qs&keywords=${book.volumeInfo.industryIdentifiers[1].identifier}`} target='_blank'>
                    <Button startContent={<img src={'' + AmazonImg.src} alt="" className="w-8 h-8" />}>
                        Amazon
                    </Button>
                </Link>
                :
                <Link href={`http://www.amazon.fr/gp/search?index=books&linkCode=qs&keywords=${book.volumeInfo.title}`} target='_blank'>
                    <Button startContent={<img src={'' + AmazonImg.src} alt="" className="w-8 h-8" />}>
                        Amazon
                    </Button>
                </Link>
            }


            <button onClick={() => toggleFavorite(book)}>

                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill={favBooks && favBooks.length > 0 && favBooks.some((favBook: any) => favBook.id === book.id) ? "yellow" : "white"} className={favBooks && favBooks.length > 0 && favBooks.some((favBook: any) => favBook.id === book.id) ? "bi bi-star-fill" : "bi bi-star"} viewBox="0 0 16 16">
                    {
                        favBooks && favBooks.length > 0 && favBooks.some((favBook: any) => favBook.id === book.id) ?
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            :
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    }
                </svg>

            </button>
        </>
    );
};

export default ButtonsRow;