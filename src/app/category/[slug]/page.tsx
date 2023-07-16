import React from 'react'
import Heading from "@/components/Heading";
import {getCategory} from "@/lib/api";
import AppList from "@/components/AppList";

export const revalidate = 60;

const CategoryPage = async ({params}: any) => {
    const slug = params.slug;
    const category = await getCategory(slug);

    return (
        <>
            <Heading>Explore {category.name} Apps</Heading>

            <main>
                <AppList softwares={category.expand.softwares}/>
            </main>
        </>
    )
}
export default CategoryPage;
