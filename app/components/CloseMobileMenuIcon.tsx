'use client'
import React from 'react';
import Image from 'next/image';
import CloseIcon from '@/app/lib/close.svg'

const CloseMobileMenuIcon = () => {

    function hideMobileMenu() {
        document.getElementById('mobileMenu')!.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(100%)' }
        ], {
            duration: 200,
            iterations: 1,
            fill: 'forwards'
        })

        setTimeout(() => {
            document.getElementById('mobileMenu')!.classList.add('hidden')
        }, 200)
    }


    return (
        <Image onClick={() => hideMobileMenu()} src={CloseIcon.src} alt="close icon" width={600} height={600} className='w-12 h-12 cursor-pointer' />
    );
};

export default CloseMobileMenuIcon;