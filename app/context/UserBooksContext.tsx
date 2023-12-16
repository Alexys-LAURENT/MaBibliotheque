"use client"

import React, { createContext, useState, useEffect } from 'react';
import booksApi from '../utils/fetchBookApi';
import { useSession } from 'next-auth/react';
import bookShels from '../utils/bookShelf';
import { is } from 'date-fns/locale';

interface Book {
    [key: string]: any; // Toutes les propriétés de livre sont autorisées
}

export interface UserBooksContextProps {
    favBooks: Book[] | null;
    toggleFavorite: (book: Book) => void;
    toReadBooks: Book[] | null;
    haveReadBooks: Book[] | null;
    readingNowBooks: Book[] | null;
    toggleInShelf: (book: Book, shelf: number) => void;
    removeFromShelf: (book: Book) => void;
}

export const UserBooksContext = createContext<UserBooksContextProps>({} as UserBooksContextProps);

export const UserBooksProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();

    const [initialized, setInitialized] = useState(false);

    const [favBooks, setFavBooks] = useState<Book[] | null>(null);
    const [toReadBooks, setToReadBooks] = useState<Book[] | null>(null);
    const [haveReadBooks, setHaveReadBooks] = useState<Book[] | null>(null);
    const [readingNowBooks, setReadingNowBooks] = useState<Book[] | null>(null);

    useEffect(() => {

        // Exécuter le code uniquement si ce n'est pas encore initialisé
        if (!initialized && session?.user) {
            const fetchData = async () => {
                const favBooksRes = await booksApi.getBooksFromShelf(bookShels.Favorites, session.user.accessToken);
                const toReadBooksRes = await booksApi.getBooksFromShelf(bookShels.To_read, session.user.accessToken);
                const haveReadBooksRes = await booksApi.getBooksFromShelf(bookShels.Have_read, session.user.accessToken);
                const readingNowBooksRes = await booksApi.getBooksFromShelf(bookShels.Reading_now, session.user.accessToken);
                setFavBooks(favBooksRes.items || []);
                setToReadBooks(toReadBooksRes.items || []);
                setHaveReadBooks(haveReadBooksRes.items || []);
                setReadingNowBooks(readingNowBooksRes.items || []);

                // Marquer comme initialisé après la première exécution
                setInitialized(true);
            };

            fetchData();
        }
    }, [session, initialized]);

    const toggleFavorite = (book: Book) => {
        if (!session?.user) return;

        // if the book is already in favorites
        if (favBooks && favBooks.length > 0) {
            if (favBooks.some((favBook: any) => favBook.id === book.id)) {
                booksApi.deleteBookFromShelf(book.id, bookShels.Favorites, session!.user.accessToken).then((res) => {
                    if (Object.keys(res).length === 0) {
                        setFavBooks(favBooks.filter((favBook: any) => favBook.id !== book.id))
                    }
                })
            } else {
                booksApi.addBookToBookShelve(book.id, bookShels.Favorites, session.user.accessToken).then((res) => {
                    if (Object.keys(res).length === 0) {
                        setFavBooks([...favBooks, book])
                    }
                })
            }
        } else {
            booksApi.addBookToBookShelve(book.id, bookShels.Favorites, session.user.accessToken).then((res) => {
                if (Object.keys(res).length === 0) {
                    setFavBooks([book])
                }
            })
        }
    }

    const isInShelf = (book: Book, shelfBooks: Book[] | null) => (
        shelfBooks && shelfBooks.length > 0 && shelfBooks.some((shelfBook: any) => shelfBook.id === book.id)
    );

    const deleteFromShelf = async (book: Book, shelfType: number, setShelf: React.Dispatch<React.SetStateAction<Book[] | null>>) => {
        try {
            const res = await booksApi.deleteBookFromShelf(book.id, shelfType, session!.user.accessToken);
            if (Object.keys(res).length === 0) {
                setShelf((prevShelf) => (prevShelf ? prevShelf.filter((prevBook: any) => prevBook.id !== book.id) : null));
            }
        } catch (error) {
            console.error("Error deleting from shelf:", error);
        }
    };

    const addToShelf = async (book: Book, shelfType: number, setShelf: React.Dispatch<React.SetStateAction<Book[] | null>>) => {
        try {
            const res = await booksApi.addBookToBookShelve(book.id, shelfType, session!.user.accessToken);
            if (Object.keys(res).length === 0) {
                setShelf((prevShelf) => (prevShelf === null ? [book] : [...prevShelf, book]));
            }
        } catch (error) {
            console.error("Error adding to shelf:", error);
        }
    };

    const toggleInShelf = async (book: Book, shelf: number) => {
        if (!session?.user) return;


        if (isInShelf(book, toReadBooks)) {
            await deleteFromShelf(book, bookShels.To_read, setToReadBooks);
        }

        if (isInShelf(book, haveReadBooks)) {
            await deleteFromShelf(book, bookShels.Have_read, setHaveReadBooks);
        }

        if (isInShelf(book, readingNowBooks)) {
            await deleteFromShelf(book, bookShels.Reading_now, setReadingNowBooks);
        }

        switch (shelf) {
            case bookShels.To_read:
                if (!isInShelf(book, toReadBooks)) {
                    await addToShelf(book, bookShels.To_read, setToReadBooks);
                }
                break;
            case bookShels.Have_read:
                if (!isInShelf(book, haveReadBooks)) {
                    await addToShelf(book, bookShels.Have_read, setHaveReadBooks);
                }
                break;
            case bookShels.Reading_now:
                if (!isInShelf(book, readingNowBooks)) {
                    await addToShelf(book, bookShels.Reading_now, setReadingNowBooks);
                }
                break;
            default:
                break;
        }
    };

    const removeFromShelf = async (book: Book) => {
        if (!session?.user) return;

        if (isInShelf(book, toReadBooks)) {
            await deleteFromShelf(book, bookShels.To_read, setToReadBooks);
        }

        if (isInShelf(book, haveReadBooks)) {
            await deleteFromShelf(book, bookShels.Have_read, setHaveReadBooks);
        }

        if (isInShelf(book, readingNowBooks)) {
            await deleteFromShelf(book, bookShels.Reading_now, setReadingNowBooks);
        }
    }


    return (
        <UserBooksContext.Provider value={{ favBooks, toggleFavorite, toReadBooks, haveReadBooks, readingNowBooks, toggleInShelf, removeFromShelf }}>
            {children}
        </UserBooksContext.Provider>
    );
};

export default UserBooksProvider;