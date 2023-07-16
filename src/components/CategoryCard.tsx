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
                {cover ?
                    <Image className="rounded-lg" src={getImageUrl(id, 'categories', cover, '200x200')}
                           alt="Category's Cover" width={200} height={200}/> :
                    <div className="w-[200px] h-[200px] rounded-lg bg-neutral-100/20"></div>
                }

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
            <CardFooter className="flex gap-2 overflow-hidden ">
                {softwares?.map((item: any) => (
                    item.logo ?
                        <Image src={getImageUrl(item.id, 'softwares', item.logo, '75x75')} alt={"App Logo"}
                               className="rounded-lg" height={75} width={75}/> :
                        <span className="w-[75px] h-[75px] rounded-lg bg-neutral-100"></span>
                ))}
            </CardFooter>
        </Card>
    );
};

export default CategoryCard;