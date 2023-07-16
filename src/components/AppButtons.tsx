"use client";

import {Button} from "@/components/ui/button";
import {HandThumbDownIcon, StarIcon} from "@heroicons/react/24/outline";
import {StarIcon as SolidStarIcon} from "@heroicons/react/24/solid";
import React, {useEffect, useState} from "react";
import useAuthModal from "@/hooks/useAuthModal";
import {star} from "@/lib/api";
import useUser from "@/hooks/useUser";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const AppButtons = ({id, stars}: any) => {
    const {open} = useAuthModal();
    const {isLogged, user} = useUser();
    const toast = useToast();
    const router = useRouter();
    const [isStarring, setIsStarring] = useState(false);

    useEffect(() => {
        setIsStarring(!!stars?.find((o: any) => o.user === user?.id));
    }, [user])

    const handleStar = () => {
        if (!isLogged) return open();

        setIsStarring(c => !c);

        star(id, user.id)
            .then(record => {
                toast.toast({
                    title: "Star Added!",
                    description: "You added a ⭐ star to an app",
                })

                router.refresh();
            }).catch((err) => {
            toast.toast({
                title: "Something went wrong!",
                description: "You already starred to this app",
                variant: 'destructive'
            })
        });
    }

    const handleDislike = () => {
        if (!isLogged) open();
    }

    return <div className="flex gap-2 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <Button className="gap-2" variant="secondary" onClick={handleDislike}>
            <HandThumbDownIcon className="w-6 p-1 rounded-full"/>
        </Button>

        <Button className="gap-2" variant="secondary" onClick={handleStar}>
            {isStarring ?
                <SolidStarIcon className="w-6 p-1 rounded-full text-yellow-300"/> :
                <StarIcon className="w-6 p-1 rounded-full"/>
            }

        </Button>
    </div>;
}

export default AppButtons;