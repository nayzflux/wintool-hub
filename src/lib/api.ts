import pb from "@/lib/pocketbase";

pb.autoCancellation(false);

export const getCategories = async () => {
    const records = await pb.collection('categories').getList(1, 20, {
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

export const getImageUrl = (id: string, collection: string, filename: string, thumb: string | null) => {
    return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${collection}/${id}/${filename}?thumb=${thumb || '500x500'}`;
}

export const signIn = async (email: string, password: string) => {
    return await pb.collection('users').authWithPassword(email, password)
}
export const signUp = async (email: string, password: string, username: string, name: string, passwordConfirm: string) => {
    return await pb.collection('users').create({
        email,
        password,
        username,
        name,
        passwordConfirm
    })
}

export const star = async (appId: string, userId: string) => {
    return await pb.collection('stars').create({
        software: appId,
        user: userId
    });
}

export const unStar = async (starId: string) => {
    return await pb.collection('stars').delete(starId);
}

export const getAppStar = async (appId: string) => {
    const data = await pb.collection('stars').getFullList({
        filter: `software.id="${appId}"`
    });
    console.log(appId, data)
    return data;
}

export const getUserStar = async (userId: string) => {
    return await pb.collection('stars').getFirstListItem(`user="${userId}"`);
}