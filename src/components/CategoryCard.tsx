import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {getImageUrl} from "@/lib/api";
import {EyeIcon} from "@heroicons/react/24/outline";

const CategoryCard = ({id, name, description, slug, softwares, cover}: any) => {
    return (
        <Card>
            <CardContent className="grid grid-cols-2 gap-4 pt-6">
                <Image className="rounded-lg" src={getImageUrl(id, 'categories', cover)} alt="Category's Cover" width={200} height={200} />

                <div className="flex flex-col gap-2 mt-auto">
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className="truncate">{description}</CardDescription>
                    <Button asChild className="gap-2">
                        <Link href={`/category/${slug}`}>
                            <EyeIcon className="w-6"/> See Category
                        </Link>
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 overflow-hidden">
                {softwares?.map((item: any) => (
                    <Image src={getImageUrl(item.id, 'softwares', item.logo)} alt={"App Logo"}  className="rounded-lg" height={75} width={75}/>
                ))}
            </CardFooter>
        </Card>
    );
};

export default CategoryCard;