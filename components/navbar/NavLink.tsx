"use client"

import { NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
    label: string;
    href: string;
}

const NavLink = ({ label, href }: Props) => {
    const pathname = usePathname();

    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}</NavbarItem>
    )
}

export default NavLink