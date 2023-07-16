import React from 'react';
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {getApp, getAppStar, getImageUrl} from "@/lib/api";
import {DownloadCloudIcon} from "lucide-react";
import AppButtons from "@/components/AppButtons";

export const revalidate = 0;

const AppCard = async ({id}: any) => {
    const [{
        name,
        description,
        logo,
        download_url,
        website_url,
        expand: {tags: tags}
    }, stars] = await Promise.all([await getApp(id), await getAppStar(id)]);


    return (
        <Card className="group cursor-pointer">
            <CardContent className="flex gap-4 pt-6">
                <Image className="rounded-lg" src={getImageUrl(id, 'softwares', logo)} alt="App's Logo" width={200}
                       height={200}/>

                <div className="flex flex-col gap-2 flex-grow">
                    <div className="flex gap-4">
                        <div className="flex gap-2 items-center">
                            {tags?.map((item: any) => (
                                <p className="p-1 rounded-full text-xs border border-green-500 text-green-500 items-center">#{item.name}</p>
                            ))}
                        </div>

                        <AppButtons id={id} stars={stars}/>
                    </div>

                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{description} {stars?.length || 0}</CardDescription>

                    <div className="flex gap-4 mt-auto w-full ">
                        <Button asChild className="gap-2 flex-grow">
                            <Link href={download_url}>
                                <DownloadCloudIcon className="w-6"/> Download
                            </Link>
                        </Button>

                        <Button asChild className="gap-2 flex-grow" variant="outline">
                            <Link href={website_url}>
                                Official Website
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppCard;