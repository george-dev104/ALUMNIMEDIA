// "use client";

import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import FeaturedChannels from "@/sections/FeaturedChannels";
import type { Metadata } from "next";
import Hero from "../components/Hero/Hero";
import HeroText from "../components/Hero/HeroText";
import Stats from "../components/Stats/Stats";
import Button from "@/atoms/Button";
import HeroAboutSecond from "../components/Hero/HeroAboutSecond";
import GridIronLegends from "@/sections/GridIronLegends";
import AdvertiseBlocks from "../components/AdvertiseBlocks/AdvertiseBlocks";
import AdvertiseInfo from "../components/AdvertiseInfo/AdvertiseInfo";
import DividerText from "../components/DividerText/DividerText";

// Function to generate metadata for this page
export const generateMetadata = (): Metadata => {
  return {
    title: "Alumni Media | Advertise with us",
  };
};

export default function Advertise() {
  return (
    <>
      <Header />
      <main className="relative pt-[80px] lg:pt-20">
        <HeroText />
        <div className="bg-darkerBlue pt-12 pb-12">
          <AdvertiseBlocks />
          <h2 className="text-5xl lg:text-6xl font-bold text-center px-4">
            CHANGING MEDIA TO CHANGE THE FUTURE…TOGETHER
          </h2>

          <h2 className="text-4xl lg:text-5xl font-bold text-center mt-20">
            IN-SHOW ADS{" "}
          </h2>

          <AdvertiseInfo />
          <h2 className="text-5xl lg:text-6xl font-bold text-center px-4 mb-20">
            BROAD RANGE OF SPONSORSHIP OPPORTUNITIES{" "}
          </h2>
        </div>
        <FeaturedChannels bottomSpacer={true} />

        <DividerText />

        <div className="bg-darkerBlue pt-12 pb-12">
          <Stats />
        </div>
      </main>
      <Footer />
    </>
  );
}
