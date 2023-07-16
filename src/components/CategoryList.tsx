import React from 'react'
import {getCategories} from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";

export const revalidate = 0;


const CategoryList = async () => {
    const categories = await getCategories();

    return (
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {categories?.map((item) => (
                <CategoryCard key={item.id} id={item.id} name={item.name} softwares={item.expand.softwares}
                              description={item.description} slug={item.slug} cover={item.cover}/>
            ))}
        </div>
    )
}
export default CategoryList
