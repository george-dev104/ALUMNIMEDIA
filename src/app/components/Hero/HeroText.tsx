import Button from "@/atoms/Button";
import Image from "next/image";
import React from "react";
const headerImageSrc =
  "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/hero-backgrounds/header-RnKpIFJvL2DRu7HzDD44sHucTNQMca.png";

const HeroText: React.FC = () => {
  return (
    <div
      className="relative h-screens bg-cover bg-center pt-40 pb-40"
      style={{ backgroundImage: `url(${headerImageSrc})` }}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>{" "}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white w-[90%] max-w-[1040px] mx-auto">
        <h1 className="mt-4 text-4xl lg:text-6xl font-bold">
          ADVERTISE WITH US
        </h1>
        <h2 className="mt-4 text-2xl lg:text-4xl font-bold">
          SHOWCASE YOUR BRAND
        </h2>
        <p className="mt-12">
          Alumni Media Network has launched the first and only Lifestyle Media
          Network that offers a unique blend of both live-stream and 24/7
          on-demand programming. This innovative platform features dozens of
          channels where athletes are at the forefront, creating and sharing
          content that delves into their personal interests and passions.
        </p>
        <p className="mt-12">
          What sets the Alumni Media Network apart is its commitment to athlete
          empowerment and ownership. Unlike traditional media networks, where
          content and network ownership typically rest with the company, this
          network hands over the reins to the athletes themselves. They have
          full control over the content they produce and retain ownership of
          both the media they create and the network as a whole.
        </p>
        <p className="mt-12">
          This model not only ensures that the content is authentic and directly
          reflective of the athletes&apos; true interests, but it also provides
          them with a platform to build their brand beyond their sports careers.
          Fans get an intimate look into the lives of their favorite athletes,
          exploring diverse topics such as fitness, cooking, travel, fashion,
          and more, through content that is directly produced and curated by the
          athletes.
        </p>

        <div className="mx-auto w-full flex justify-center items-center mt-12">
          <Button
            href="mailto:amn@alumnimedia.com"
            label="Ask About Advertising"
            className="whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroText;
