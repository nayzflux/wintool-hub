import pb from "@/lib/pocketbase";

export const getCategories = async () => {
    const records = await pb.collection('categories').getList(1, 20,{
        sort: 'created',
        expand: 'softwares'
    });
    return records.items;
}

export const getCategory = async (slug: string) => {
    return await pb.collection('categories').getFirstListItem(`slug="${slug}"`, {
        expand: 'softwares'
    });
}

export const getApp = async (id: string) => {
    return await pb.collection('softwares').getOne(id, {
        expand: 'tags'
    });
}

export const getImageUrl = (id: string, collection: string, filename: string) => {
    return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${collection}/${id}/${filename}`;
}