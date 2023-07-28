'use client'
import React from 'react';
import Image from 'next/image';
import MenuIcon from '@/app/lib/list.svg'

const OpenMobileMenuIcon = () => {
    function showMobileMenu() {
        document.getElementById('mobileMenu')!.animate([
            { transform: 'translateX(100%)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 200,
            iterations: 1,
            fill: 'forwards'
        })

        document.getElementById('mobileMenu')!.classList.remove('hidden')
    }
    return (
        <Image onClick={() => showMobileMenu()} src={MenuIcon.src} alt="menu icon" width={600} height={600} className='w-10 h-10 cursor-pointer' />
    );
};

export default OpenMobileMenuIcon;