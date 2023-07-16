"use client";

import React, {useEffect, useState} from 'react';
import Heading from "@/components/Heading";
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import pb from "@/lib/pocketbase";
import Image from "next/image";
import {getImageUrl} from "@/lib/api";

const ProfilePage = () => {
    const {user, setUser} = useUser();
    const {open, isOpen} = useAuthModal();
    const [hasSeen, setHasSeen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const [file, setFile] = useState(null);

    useEffect(() => {
        setIsMounted(true);

        // If close modal
        if (hasSeen && !user) {
            return router.push('/');
        }

        if (!user) {
            setHasSeen(true)
            open();
        }
    }, [isOpen]);

    if (!isMounted) return <p>Loading...</p>;

    const handleFileChoose = (e: any) => {
        setFile(e?.target?.files?.[0]);
    }

    const handleFileUpload = (e: any) => {
        e.preventDefault();

        if (!file) return;
        const formData = new FormData();
        // listen to file input changes and add the selected files to the form data
        // formData.append('documents', file);

        // set some other regular text field value
        formData.append('avatar', file);


        // upload and create new record
        pb.collection('users').update(user?.id, formData)
            .then(r =>
                setUser(r)
            );
    }


    return (
        <>
            <Heading>Your Profile</Heading>

            <main className="flex flex-col gap-3">
                <Image priority={true} src={getImageUrl(user?.id, 'users', user?.avatar, '200x200')}
                       alt={"User's avatar"} width={200} height={200} className="rounded-full"/>

                <p>
                    {user?.name}
                </p>
                <p>
                    {user?.username}
                </p>
                <p>
                    {user?.email}
                </p>
                <p>
                    {user?.id}
                </p>

                <label>Avatar</label>
                <input accept="image/.jpg image/.png image/.jpeg image/.gif image/.svg" type="file"
                       onChange={handleFileChoose}/>
                <button onClick={handleFileUpload}>
                    Upload!
                </button>
            </main>
        </>
    );
};

export default ProfilePage;