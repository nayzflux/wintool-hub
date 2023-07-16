"use client";

import {Button} from "@/components/ui/button";
import {HandThumbDownIcon, StarIcon} from "@heroicons/react/24/outline";
import {StarIcon as SolidStarIcon} from "@heroicons/react/24/solid";
import React, {useEffect, useState} from "react";
import useAuthModal from "@/hooks/useAuthModal";
import {star, unStar} from "@/lib/api";
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

        if (isStarring) {
            unStar(stars?.find((o: any) => o.user === user?.id).id)
                .then(record => {
                    console.log("Star Remove Success:", record)

                    toast.toast({
                        title: "Star Removed!",
                        description: "You removed a star from an app",
                    })

                    router.refresh();
                }).catch((err) => {
                console.log("Star Remove Error:", err)

                toast.toast({
                    title: "Something went wrong!",
                    description: "Star removing failed, please try again",
                    variant: 'destructive'
                })

                setIsStarring(c => !c);
            });
        } else {
            star(id, user.id)
                .then(record => {
                    console.log("Star Add Success:", record)

                    toast.toast({
                        title: "Star Added!",
                        description: "You added a ⭐ star to an app",
                    })

                    router.refresh();
                }).catch((err) => {
                console.log("Star Remove Error:", err)

                toast.toast({
                    title: "Something went wrong!",
                    description: "Star adding failed, please try again",
                    variant: 'destructive'
                })

                setIsStarring(c => !c);
            });
        }


    }

    const handleDislike = () => {
        if (!isLogged) open();
    }

    return <div className="flex gap-2 ml-auto transition-all duration-500 ease-out">
        <Button className="gap-2 hover:text-red-400" variant="outline" onClick={handleDislike}>
            <HandThumbDownIcon className="w-6 p-1"/>
        </Button>

        <Button className="gap-2 hover:text-yellow-300" variant="outline" onClick={handleStar}>
            {stars.length}
            {isStarring ?
                <SolidStarIcon className="w-6 p-1 text-yellow-300"/> :
                <StarIcon className="w-6 p-1 "/>
            }
        </Button>
    </div>;
}

export default AppButtons;