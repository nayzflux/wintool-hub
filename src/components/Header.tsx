"use client";

import React from 'react';
import {ArrowDownSquareIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    const routes = [
        {
            path: '/',
            label: 'Home',
        },
        {
            path: '/category',
            label: 'Categories',
        }
    ]
    
    return (
        <header className="w-full shadow px-5 md:px-10 lg:px-16 xl:px-20 py-5 xl:py-10 gap-10 flex items-center">
            <div className="font-black text-xl uppercase flex items-center gap-2">
                <ArrowDownSquareIcon className="w-8" size={32}/>
                <p>WinTool Hub</p>
            </div>

            <nav>
                <ul className="flex gap-6">
                    {routes.map((item) => (
                        <li key={item.label} >
                            <Link className={`uppercase hover:underline ${pathname === item.path && 'font-semibold'}`} href={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;