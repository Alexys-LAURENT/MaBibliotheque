'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
const MobileMenuSignOutButton = () => {
    return (
        <li onClick={() => signOut()} className='font-literata font-semibold text-xl text-red-600 cursor-pointer'>Se déconnecter</li>
    );
};

export default MobileMenuSignOutButton;