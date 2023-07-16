import React from 'react';
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {getApp, getImageUrl} from "@/lib/api";
import {DownloadCloudIcon} from "lucide-react";

const AppCard = async ({id}: any) => {
    const {name, description, logo, download_url,website_url, expand: {tags: tags}} = await getApp(id);

    return (
        <Card>
            <CardContent className="grid grid-cols-2 gap-4 pt-6">
                <Image className="rounded-lg" src={getImageUrl(id, 'softwares', logo)} alt="App's Logo" width={200} height={200} />

                <div className="flex flex-col gap-2 mt-auto">
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    <Button asChild className="gap-2">
                        <Link href={download_url}>
                            <DownloadCloudIcon className="w-6"/> Download
                        </Link>
                    </Button>

                    <Button asChild className="gap-2" variant="secondary">
                        <Link href={website_url}>
                            Official Website
                        </Link>
                    </Button>

                    <div className="flex gap-2">
                        {tags?.map((item: any) => (
                            <p className="p-1 rounded-full text-xs border border-green-500 text-green-500">#{item.name}</p>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppCard;