import React, {Suspense} from 'react'
import CategoryList from "@/components/CategoryList";
import Heading from "@/components/Heading";

export const revalidate = 60;

const CategoryPage = () => {
    return (
        <>
            <Heading>Explore Categories</Heading>

            <main>
                <Suspense fallback={<p>Loading categories...</p>}>
                    <CategoryList/>
                </Suspense>
            </main>
        </>
    )
}

export default CategoryPage;
