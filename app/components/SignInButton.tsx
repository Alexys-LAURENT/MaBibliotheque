'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import googleIcon from '@/app/lib/Google__G__Logo.svg'
import { Button } from '@nextui-org/react';

const SignInButton = () => {

    return (
        <Button onClick={() => signIn('google')} className='flex bg-bb_bgDark dark:bg-bb_bgLight p-3 rounded-md gap-3'>
            <img src={googleIcon.src} alt="google icon" className="w-6 h-6" />
            <p className='dark:text-bb_textDark text-bb_textLight'>
                Se connecter avec google
            </p>
        </Button>
    );
};

export default SignInButton;