'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import googleIcon from '@/app/lib/Google__G__Logo.svg'

const SignInButton = () => {

    return (
        <button onClick={() => signIn('google')} className='flex bg-white p-3 rounded-sm gap-3'>
            <img src={googleIcon.src} alt="google icon" className="w-6 h-6" />
            Se connecter avec google
        </button>
    );
};

export default SignInButton;