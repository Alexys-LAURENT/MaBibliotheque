"use client"
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Switch } from "@nextui-org/react";
import type { User } from '../types/user';
import Avatar from './Avatar';
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function NextUiNavBar({ user }: { user: User }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const activePath = usePathname();
    const { theme, setTheme } = useTheme();
    const [isSelected, setIsSelected] = useState(true);
    const [isClient, setIsClient] = useState(false)

    const menuItems = [
        {
            label: "Découvrir",
            href: "/decouvrir",
        },
        {
            label: "Favoris",
            href: "/favoris",
        },
        {
            label: "Ma bibliothèque",
            href: "/maBibliotheque",
        },
    ];


    useEffect(() => {
        if (theme === 'dark') {
            setIsSelected(false)
        } else if (theme === 'light') {
            setIsSelected(true)
        }
    }, [theme])



    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll isBlurred={false} className="z-50" classNames={{ base: "!duration-400 bg-bb_bgLight dark:bg-bb_bgDark" }}>
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link className="text-bb_textDark dark:text-bb_textLight font-bold durat " href="/">
                        Ma bibliothèque
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end" className="hidden sm:flex gap-4">
                {
                    menuItems.map((item, index) => {
                        return (
                            <NavbarItem key={`navLink-${index}`} isActive={activePath === item.href}>
                                <Link className={`
                                    ${activePath === item.href ? "text-bb_secondary" : "text-bb_textDark dark:text-bb_textLight"}`
                                } href={item.href}>
                                    {item.label}
                                </Link>
                            </NavbarItem>
                        )
                    })
                }

                <NavbarItem>
                    {
                        theme !== undefined && isClient &&
                        <Switch
                            size="lg"
                            className='w-full'
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-brightness-high-fill ${className}`} viewBox="0 0 16 16">
                                        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className={`bi bi-moon-fill ${className}`} viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278" />
                                    </svg>
                                )
                            }
                            classNames={{
                                thumb: "dark:bg-gray-500",
                            }}
                            isSelected={isSelected} onValueChange={() => { setIsSelected(!isSelected); setTheme(theme === 'dark' ? 'light' : 'dark') }} />
                    }
                </NavbarItem>

                <NavbarItem>
                    <Avatar user={user} />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="flex sm:hidden gap-4">
                <NavbarItem>
                    {
                        theme !== undefined && isClient &&
                        <Switch
                            size="lg"
                            className='w-full'
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-brightness-high-fill ${className}`} viewBox="0 0 16 16">
                                        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className={`bi bi-moon-fill ${className}`} viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278" />
                                    </svg>
                                )
                            }
                            classNames={{
                                thumb: "dark:bg-gray-500",
                            }}
                            isSelected={isSelected} onValueChange={() => { setIsSelected(!isSelected); setTheme(theme === 'dark' ? 'light' : 'dark') }} />
                    }
                </NavbarItem>
                <NavbarItem>
                    <Avatar user={user} />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {
                    menuItems.map((item, index) => {
                        return (
                            <NavbarItem onClick={() => setIsMenuOpen((prev) => !prev)} key={index} isActive={activePath === item.href}>
                                <Link className={
                                    activePath === item.href ? "text-bb_secondary" : "text-bb_textDark dark:text-bb_textLight"
                                } href={item.href}>
                                    {item.label}
                                </Link>
                            </NavbarItem>
                        )
                    })
                }

                <NavbarItem>
                    <Link className="w-full" color="danger" href="#" onClick={() => signOut({ callbackUrl: "/" })}>
                        Se déconnecter
                    </Link>
                </NavbarItem>
            </NavbarMenu>

        </Navbar>
    );
}