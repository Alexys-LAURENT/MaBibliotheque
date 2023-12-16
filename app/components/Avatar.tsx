'use client'
import React from 'react';
import type { User } from '../types/user';
import { signOut } from 'next-auth/react';
import { Avatar as NextUiAvatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
const Avatar = ({ user }: { user: User }) => {


    return (
        <>
            <Popover placement="bottom" classNames={{ base: "hidden sm:flex" }} offset={16}>
                <PopoverTrigger>
                    <NextUiAvatar className='hover:cursor-pointer hidden sm:flex' isBordered src={user.image} />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2 justify-center flex-col items-center gap-2 hidden sm:flex">
                        <p className='text-sm dark:text-bb_text text-bb_primary flex'>{user.name}</p>

                        <hr className='w-full  border-gray-400' />
                        <button onClick={() => signOut({ callbackUrl: "/" })} className='text-sm text-red-600'>Se déconnecter</button>
                    </div>
                </PopoverContent>
            </Popover>

            <div className='flex items-center gap-3 relative top-[-1px] ml-1 sm:hidden'>
                <div className='w-10 h-10 rounded-full bg-gray-500 overflow-hidden'>
                    <NextUiAvatar isBordered src={user.image} />
                </div>
            </div>
        </>
    )
};

export default Avatar;