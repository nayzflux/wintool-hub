export type Category = {
    id: string;
    name: string;
    description: string;
    slug: string;
    cover: string;
    softwares: Software[];
}

export type Software = {
    id: string;
    name: string;
    description: string;
    slug: string;
    logo: string;
    categories: Category[];
}

