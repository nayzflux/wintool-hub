import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";
import {Toaster} from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'WinTool Hub',
    description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
        <body className={inter.className + " flex flex-col min-h-screen"}>
        <Toaster/>

        <AuthModal/>

        <Header/>

        <div className=" p-5 md:p-10 lg:p-16 xl:p-20">
            {children}
        </div>

        <Footer/>
        </body>
        </html>
    )
}
