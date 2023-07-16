import React from 'react';
import {Separator} from "@/components/ui/separator";

const Heading = ({children}: any) => {
    return (
        <div className="flex flex-col gap-4 mb-4">
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-bold">
                {children}
            </h1>

            <Separator />
        </div>
    );
};

export default Heading;