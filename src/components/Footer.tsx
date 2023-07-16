import React from 'react';
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex flex-col mt-auto items-center">
            <Separator/>

            <div className="flex h-full w-full items-center justify-around py-5 ">
                <Link href={"https://github.com/nayzflux/wintool-hub"}
                      className="hover:underline text-blue-600 text-xs">Github</Link>
                <Link href={"https://github.com/nayzflux/wintool-hub/issues"}
                      className="hover:underline text-blue-600 text-xs">Any Suggestions</Link>
                <Link href={"https://github.com/nayzflux/wintool-hub/issues"}
                      className="hover:underline text-blue-600 text-xs">Report Bugs</Link>
                <Link href={"https://discord.gg/nhHXf2tSpP"} className="hover:underline text-blue-600 text-xs">Contact
                    Me</Link>
            </div>

            <Separator className="w-11/12"/>

            <div className="flex h-full w-full items-center justify-center py-5">
                <p className="text-sm text-neutral-500">© 2023 - 2023 dev.wingtool.nayz.fr - All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;