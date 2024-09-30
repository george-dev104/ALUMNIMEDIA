import Button from "@/atoms/Button";
import Image from "next/image";
import React from "react";
const headerImageSrc =
  "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/hero-backgrounds/header-RnKpIFJvL2DRu7HzDD44sHucTNQMca.png";

const HeroAboutSecond: React.FC = () => {
  return (
    <div
      className="relative h-screens bg-cover bg-center pt-20 pb-40"
      style={{ backgroundImage: `url(${headerImageSrc})` }}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>{" "}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white w-[90%] max-w-[1040px] mx-auto">
        <h1 className="mt-4 text-4xl lg:text-6xl font-bold">THE FUTURE </h1>

        <p className="mt-12">
          By the end of 2024, the Alumni Media Network is projected to achieve
          remarkable milestones. The network aims to reach a combined social
          media following of 50 million, attract 40 million unique visitors, and
          generate 500 million impressions. These ambitious goals reflect the
          network’s potential to become a major player in the lifestyle media
          industry, offering an engaging and athlete-driven viewing experience
          that resonates with a wide audience.
        </p>
        <p className="mt-12">
          The strategic involvement of these high-profile athletes not only
          enhances the authenticity and quality of the content but also helps in
          expanding the network’s reach and influence. Each athlete’s personal
          brand and following contribute to the overall growth and visibility of
          AMN, making it a powerful and unique platform in the crowded streaming
          landscape. In summary, the Alumni Media Network is set to
          revolutionize lifestyle media with its athlete-driven content and
          diverse themed channels. By leveraging the expertise and popularity of
          its athlete partners, AMN is poised to become a leading destination
          for viewers seeking high-quality, engaging, and authentic lifestyle
          programming.
        </p>

        <div className="flex mt-12 gap-6 sm:gap-12">
          <Button
            href="/auth"
            label="Member Sign Up"
            className="whitespace-nowrap"
          />
          <Button
            href="/auth"
            label="Channel Sign Up"
            className="whitespace-nowrap"
          />
        </div>
      </div>
      <div className="text-center   w-full absolute bottom-[-20px] sm:bottom-[-40px]">
        <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold  ">
          STREAM NOW
        </h2>
      </div>
    </div>
  );
};

export default HeroAboutSecond;
