"use client"

import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { UserBooksContext } from '../context/UserBooksContext';
const page = () => {
    const { data: session } = useSession();
    const { favBooks, setFavBooks, toReadBooks, setToReadBooks, haveReadBooks, setHaveReadBooks, readingNowBooks, setReadingNowBooks } = useContext(UserBooksContext);
    console.log(favBooks);
    // const { user } = session;
    console.log(session?.user);
    return (
        <div>

        </div>
    );
};



export default page;