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

                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className={favBooks && favBooks.length > 0 && favBooks.some((favBook: any) => favBook.id === book.id) ? "bi bi-suit-heart-fill fill-bb_secondary" : "bi bi-suit-heart fill-white"} viewBox="0 0 16 16">
                    {
                        favBooks && favBooks.length > 0 && favBooks.some((favBook: any) => favBook.id === book.id) ?
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1" />
                            :
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                    }
                </svg>



            </button>
        </>
    );
};

export default ButtonsRow;