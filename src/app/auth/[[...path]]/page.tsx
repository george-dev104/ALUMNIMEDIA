"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import background_img from "@public/hero-background.jpg";
import Logo from "@/atoms/Logo";
import YourNewFavoriteContentExperience from "@/sections/YourNewFavoriteContentExperience";
import IfItsHappeningItsHere from "@/sections/IfItsHappeningItsHere";
import Footer from "@/organisms/Footer";
import SignIn from "@/app/components/SignIn/SignIn";

export default function Auth() {
  const [loaded, setLoaded] = useState(true);

  if (loaded) {
    return (
      <>
        <main className="">
          <section className="relative h-screen grid place-items-center overflow-hidden">
            <SignIn />

            <div className="w-full absolute top-6 left-0 lg:left-6">
              <div className="w-[150px] mx-auto lg:mx-0">
                <Logo />
              </div>
            </div>
            <Image
              src={background_img}
              alt=""
              className="absolute object-cover top-0 left-0 w-full h-full blur-sm z-[-1]"
            />
          </section>
          <YourNewFavoriteContentExperience />
          <IfItsHappeningItsHere />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <main className="relative w-screen h-screen p-4 grid place-items-center">
      <div className="absolute left-6 top-6 w-[150px]">
        <Logo />
      </div>
      <Image
        src={background_img}
        alt=""
        className="absolute object-cover top-0 left-0 w-full h-full blur-sm z-[-1]"
      />
    </main>
  );
}
