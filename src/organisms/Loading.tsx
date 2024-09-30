import Logo from "@/atoms/Logo";
import Image from "next/image";
import background_img from '@public/hero-background.jpg';
import { useEffect } from "react";

export default function Loading() {

    useEffect(() => { import('ldrs').then(defaultExport => defaultExport.ring.register()) }, []);

    return (
        <div className="relative w-screen h-screen grid place-items-center overflow-hidden">
            <div className="w-[150px] grid place-items-center gap-6">
                <Logo />
                <l-ring
                    size="40"
                    stroke="5"
                    bg-opacity="0"
                    speed="2"
                    color="rgb(194, 199, 204)"
                />
            </div>
            <Image src={background_img} alt="" className="absolute object-cover top-0 left-0 w-full h-full blur-sm z-[-1] overflow-hidden" />
        </div>
    )
}