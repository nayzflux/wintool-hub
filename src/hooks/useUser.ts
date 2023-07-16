import {create} from 'zustand'
import pocketbase from "@/lib/pocketbase";

interface UserStore {
    user: any;
    authStore: any;
    isLogged: boolean
    setUser: (user: any) => void;
}

const useUser = create<UserStore>((set) => ({
    user: pocketbase?.authStore?.model || null,
    authStore: pocketbase?.authStore || null,
    isLogged: !!(pocketbase?.authStore?.model),
    setUser: (user: any) => set(() => ({user: user, isLogged: !!user})),
    logout: set(() => ({user: null, isLogged: false, authStore: null})),
}));

export default useUser