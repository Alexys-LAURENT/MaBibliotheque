import React from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Avatar from './Avatar';
import OpenMobileMenuIcon from './OpenMobileMenuIcon';
import CloseMobileMenuIcon from './CloseMobileMenuIcon';
import Link from 'next/link';
import MobileMenuSignOutButton from './MobileMenuSignOutButton';
const MobileAppbar = async () => {
    const session = await getServerSession(authOptions)


    return (
        <header className='flex sm:hidden items-center justify-end p-2 border-b-2 h-16 border-gray-200'>
            <OpenMobileMenuIcon />

            <div id='mobileMenu' className='flex flex-col items-center text-center w-full h-full bg-bb_primary absolute top-0 left-0 '>
                <header className='flex justify-between items-center w-full h-16 bg-bb_primary border-b-2 border-gray-200'>
                    <Avatar user={session!.user} isMobile={true} />
                    <CloseMobileMenuIcon />
                </header>
                <ul className='flex flex-col gap-3 mt-5'>
                    <li>
                        <Link href='/discover' className='font-literata font-semibold text-2xl'>
                            Découvrir
                        </Link>
                    </li>
                    <li>
                        <Link href='/favoris' className='font-literata font-semibold text-2xl'>
                            Favoris
                        </Link>
                    </li>
                    <li>
                        <Link href='/maBibliotheque' className='font-literata font-semibold text-2xl'>
                            Ma bibliothèque
                        </Link>
                    </li>
                    <hr />
                    <MobileMenuSignOutButton />
                </ul>
            </div>
        </header>
    );
};

export default MobileAppbar;