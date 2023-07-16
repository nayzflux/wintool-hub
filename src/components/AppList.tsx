import React, {Suspense} from 'react'
import {Software} from "@/types/db";
import AppCard from "@/components/AppCard";

const AppList = async ({softwares}: any) => {

    return (
        <div className="grid grid-cols-3 gap-8">
            {softwares?.map((item: Software) => (
                <Suspense fallback={<p>Loading App...</p>}>
                    <AppCard id={item.id}/>
                </Suspense>
            ))}
        </div>
    )
}
export default AppList
