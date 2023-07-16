"use client";

import {Button} from "@/components/ui/button";
import {HandThumbDownIcon, StarIcon} from "@heroicons/react/24/outline";
import React from "react";
import useAuthModal from "@/hooks/useAuthModal";

const AppButtons = () => {
    const {open} = useAuthModal();

    return <div className="flex gap-2 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <Button className="gap-2" variant="secondary" onClick={() => open()}>
            <HandThumbDownIcon className="w-6 p-1 rounded-full"/>
        </Button>

        <Button className="gap-2" variant="secondary" onClick={() => open()}>
            <StarIcon className="w-6 p-1 rounded-full"/>
        </Button>
    </div>;
}

export default AppButtons;