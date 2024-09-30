"use client";

import Button from "@/atoms/Button";
import Heading from "@/atoms/Heading";
import Logo from "@/atoms/Logo";
import Search from "@/molecules/Search";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import hero_background_mobile_img from "@public/hero-background-mobile.jpg";

export const navigationLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/channels/alumnitv",
    label: "Alumni TV",
  },
  // {
  //     href: '/channels/alumnitv',
  //     label: 'Quick Hits'
  // },
  {
    href: "/channels",
    label: "Channels",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/advertise",
    label: "Advertise",
  },
];

export default function Header() {
  return <_Header />;
}

function _Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header
        className={`bg-primary flex flex-row items-center justify-between px-3 gap-4 md:px-6 py-4 fixed w-full h-20 z-50 bg-opacity-60 backdrop-blur`}
      >
        <div className="w-full max-w-[150px] md:mr-14">
          <Logo />
        </div>
        <nav className="hidden lg:flex flex-row justify-start items-center gap-6 mr-auto">
          {navigationLinks.map((link) => {
            return (
              <Link
                className={`${
                  pathname === link.href ? "text-white" : "text-grey"
                } hover:text-white transition-all transition-300`}
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-row items-center gap-6">
          <Search />

          {status !== "loading" && session?.user ? (
            <>
              <Button
                href="/account"
                label="My Account"
                className="whitespace-nowrap hidden sm:block"
              />
            </>
          ) : (
            <>
              <Button
                href="/auth"
                label="Sign Up"
                className="whitespace-nowrap hidden sm:block"
              />
            </>
          )}

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden flex w-8 h-8 flex-col gap-1.5 justify-center"
          >
            <div className="w-full h-1 rounded-full bg-white" />
            <div className="w-full h-1 rounded-full bg-white" />
            <div className="w-full h-1 rounded-full bg-white" />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-[100%] left-0 h-screen w-screen">
              <nav className="relative z-10 flex flex-col justify-start items-center gap-4 mx-auto pt-12">
                {navigationLinks.map((link) => {
                  return (
                    <Link
                      className={`${
                        pathname === link.href ? "text-white" : "text-grey"
                      } text-lg hover:text-white transition-all transition-300`}
                      key={link.href}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {status !== "loading" && session?.user ? (
                  <>
                    <Link
                      href={"/account"}
                      className={`flex transition-all transition-300 flex-row items-center gap-3 hover:bg-grey/30 ${
                        pathname.includes("/account") ? "bg-grey/10" : ""
                      } p-2 rounded`}
                    >
                      <div className="rounded-full aspect-square border border-white border-solid grid place-items-center w-[35px] h-[35px] select-none bg-white bg-opacity-30">
                        <p className="leading-none">
                          {session.user.email.charAt(0).toUpperCase()}
                        </p>
                      </div>
                      <p className="text-white uppercase text-sm max-w-[88px] overflow-hidden text-ellipsis">
                        Account
                      </p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      href="/auth"
                      label="Sign Up"
                      className="whitespace-nowrap   sm:block"
                    />
                  </>
                )}
              </nav>
              <Image
                className="absolute object-cover top-0 left-0 w-[calc(100vw+10px)] brightness-50 h-full blur-sm z-[-1]"
                src={hero_background_mobile_img}
                alt=""
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
