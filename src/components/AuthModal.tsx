"use client"

import React from 'react';
import useAuthModal from "@/hooks/useAuthModal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SignUpForm from "@/components/forms/SignUpForm";
import SignInForm from "@/components/forms/SignInForm";

const AuthModal = () => {
    const {isOpen, close} = useAuthModal();

    return (
        <Dialog open={isOpen} onOpenChange={() => close()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Authentication</DialogTitle>
                    <DialogDescription>Log-in to your WinTool Hub Account</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="signin" className="w-full flex flex-col items-center">
                    <TabsList className="my-5">
                        <TabsTrigger value="signin">I already have an account</TabsTrigger>
                        <TabsTrigger value="signup">I don't have an account</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <SignInForm/>
                    </TabsContent>

                    <TabsContent value="signup">
                       <SignUpForm/>
                    </TabsContent>
                </Tabs>
            </DialogContent>
    </Dialog>
    );
};

export default AuthModal;