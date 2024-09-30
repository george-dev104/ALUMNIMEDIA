import Link from "next/link";
import logo from "@public/logo.png"
import Image from "next/image";

export default function Logo() {
    return (
        <Link className="" href={'/'}>
            <Image src={logo} alt="" />
        </Link>
    )
}