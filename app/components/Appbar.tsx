import React from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Image from 'next/image';
import Avatar from './Avatar';
const Appbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <header className='hidden sm:flex items-center justify-between gap-4 p-2 border-b-2 border-gray-200'>
            <div className='ml-2'>
                <p className='font-literata font-semibold'>Rechercher un livre</p>
            </div>
            <div className='flex gap-8 items-center mr-2'>
                <ul className='list-none flex gap-5'>
                    <li className='font-literata font-semibold text-bb_text'>Découvrir</li>
                    <li className='font-literata font-semibold text-bb_text'>Favoris</li>
                    <li className='font-literata font-semibold text-bb_text'>Ma bibliothèque</li>
                </ul>
                <Avatar user={session!.user} isMobile={false} />
            </div>
        </header>
    );
};

export default Appbar;