"use client"

import React, {useEffect, useState} from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {UserIcon} from "@heroicons/react/24/solid";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/outline";
import useAuthModal from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import {getImageUrl} from "@/lib/api";
import Link from "next/link";

const UserDropdown = () => {
    const [isMounted, setIsMounted] = useState(false);
    const authModal = useAuthModal();
    const {user, authStore, setUser} = useUser();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return;

    const handleLogout = () => {
        authStore.clear();
        setUser(null);
    }

    if (!user) {
        return (
            <Button className="ml-auto rounded-full flex flex-row gap-3" onClick={() => authModal.open()}>
                Sign In
            </Button>
        )
    }

    return (
        <div className="ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="rounded-full flex flex-row gap-3">
                        {user?.avatar ?
                            <Image src={getImageUrl(user?.id, 'users', user?.avatar, '75x75')} alt={"User's avatar"}
                                   width={75} height={75} className="rounded-full w-6 h-6"/> :
                            <UserIcon className="w-6"/>
                        }
                        {user?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem><Link href={"/profile"}
                                            className="h-full w-full">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem>Liked</DropdownMenuItem>
                    <DropdownMenuItem>Packages</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="flex flex-row gap-3" onClick={handleLogout}>
                        <ArrowLeftOnRectangleIcon className="w-6"/>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserDropdown;