// "use client";

import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import FeaturedChannels from "@/sections/FeaturedChannels";
import type { Metadata } from "next";

// Function to generate metadata for this page
export const generateMetadata = (): Metadata => {
  return {
    title: "Alumni Media | Channels",
  };
};

export default function Channels() {
  return (
    <>
      <Header />
      <main className="relative pt-[80px] lg:pt-20">
        <FeaturedChannels />
      </main>
      <Footer />
    </>
  );
}
