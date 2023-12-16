'use client'
import React, { useEffect } from 'react';
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from '@nextui-org/card';
import BookCard from '../components/BookCard';

const TabsLayout = ({ toReadBooks, haveReadBooks, readingNowBooks }: any) => {

    const [allUniqueItems, setAllUniqueItems] = React.useState<any>(null);

    useEffect(() => {
        if (!toReadBooks || !haveReadBooks || !readingNowBooks) return;
        const temp = [...toReadBooks, ...haveReadBooks, ...readingNowBooks]

        const allUniqueItems = temp.reduce((unique: any, item: any) => {
            const isUnique = !unique.some((obj: any) => obj.id === item.id);
            return isUnique ? [...unique, item] : unique;
        }, []);
        setAllUniqueItems(allUniqueItems);
    }, [toReadBooks, haveReadBooks, readingNowBooks]);


    if (!toReadBooks || !haveReadBooks || !readingNowBooks) return <p>Chargement...</p>

    return toReadBooks && haveReadBooks && readingNowBooks && allUniqueItems && (
        <Tabs aria-label="Options">
            <Tab key="Tous" title="Tous">
                {allUniqueItems && allUniqueItems.length > 0 ?
                    <div className='flex w-full flex-wrap flex-col sm:flex-row items-center p-2 gap-4'>
                        {allUniqueItems.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    :
                    <p className='p-2 text-bb_textDark dark:text-bb_textLight'>Vous n'avez pas encore de livres dans votre bibliothèque</p>}
            </Tab>
            <Tab key="A lire" title="A lire">
                {toReadBooks && toReadBooks.length > 0 ?
                    <div className='flex w-full flex-wrap flex-col sm:flex-row items-center p-2 gap-4'>
                        {toReadBooks.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    :
                    <p className='p-2 text-bb_textDark dark:text-bb_textLight'>Vous n'avez pas encore de livres à lire</p>}
            </Tab>
            <Tab key="Lus" title="Lus">
                {haveReadBooks && haveReadBooks.length > 0 ?
                    <div className='flex w-full flex-wrap flex-col sm:flex-row items-center p-2 gap-4'>
                        {haveReadBooks.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    :
                    <p className='p-2 text-bb_textDark dark:text-bb_textLight'>Vous n'avez pas encore de livres lus</p>}
            </Tab>
            <Tab key="En cours" title="En cours">
                {readingNowBooks && readingNowBooks.length > 0 ?
                    <div className='flex w-full flex-wrap flex-col sm:flex-row items-center p-2 gap-4'>
                        {readingNowBooks.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    :
                    <p className='p-2 text-bb_textDark dark:text-bb_textLight'>Vous n'avez pas encore de livres en cours de lecture</p>}
            </Tab>
        </Tabs>
    );
};

export default TabsLayout;