'use client'
import React from 'react';
import Image from 'next/image';
import type { User } from '../types/user';
import { signOut } from 'next-auth/react';

const Avatar = ({ user, isMobile }: { user: User, isMobile: boolean }) => {
    function triggerAvatarPopUp() {
        document.getElementById('AvatarPopUp')!.classList.toggle('hidden')
    }

    return isMobile === false ?
        (
            <div className='relative'>
                <div onClick={() => triggerAvatarPopUp()} className='w-11 h-11 rounded-full bg-gray-500 overflow-hidden cursor-pointer'>
                    <Image src={user.image} alt="user avatar" width={600} height={600} className='w-full' />

                </div>
                <div id='AvatarPopUp' className='fixed bg-bb_third flex top-[63px] right-2 flex-col p-2 rounded-md hidden transition-opacity max-w-[120px]'>
                    <p className='text-sm text-bb_text flex'>{user.name}</p>
                    <hr className='mt-1 mb-1  border-gray-400' />
                    <button onClick={() => signOut()} className='text-sm text-red-600'>Se déconnecter</button>
                </div>
            </div>
        ) : (
            <div className='flex items-center gap-3 relative top-[-1px] ml-1'>
                <div className='w-10 h-10 rounded-full bg-gray-500 overflow-hidden'>
                    <Image src={user.image} alt="user avatar" width={600} height={600} className='w-full' />
                </div>
                <p className='text-ellipsis max-w-[180px] overflow-hidden'>{user.name}</p>
            </div>
        )
};

export default Avatar;