import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import FeaturedChannels from "@/sections/FeaturedChannels";
import type { Metadata } from "next";
import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import GridIronLegends from "@/sections/GridIronLegends";
import HeroAboutSecond from "../components/Hero/HeroAboutSecond";
import Button from "@/atoms/Button";
import Split from "../components/Split/Split";

// Function to generate metadata for this page
export const generateMetadata = (): Metadata => {
  return {
    title: "Alumni Media | About Us",
  };
};

export default function About() {
  return (
    <>
      <Header />
      <main className="relative pt-[80px] lg:pt-20">
        <Hero />
        <div className="bg-darkerBlue pt-12 pb-12">
          <h2 className="mt-4 text-3xl lg:text-5xl font-bold text-center">
            LEARN ABOUT US{" "}
          </h2>
          <Stats />
          <div className="mx-auto w-full flex justify-center items-center ">
            <Button
              href="/auth"
              label="Member Sign Up"
              className="whitespace-nowrap"
            />
          </div>
          <Split />
        </div>
        <FeaturedChannels />

        <HeroAboutSecond />
        <div className="mt-20 mb-20 text-center">
          <GridIronLegends removetitle={true} />
        </div>
        <div className="mt-20 mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold">
            INTERESTED IN ADVERTISING?{" "}
            <a
              href="mailto:gus@nflamedia.com"
              className="text-5xl md:text-6xl font-bold"
            >
              CLICK HERE
            </a>
          </h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
