import Image from "next/image";
import React from "react";
const headerImageSrc =
  "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/hero-backgrounds/header-RnKpIFJvL2DRu7HzDD44sHucTNQMca.png";

const Hero: React.FC = () => {
  return (
    <div
      className="relative h-screens bg-cover bg-center pt-40 pb-40"
      style={{ backgroundImage: `url(${headerImageSrc})` }}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>{" "}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white w-[70%] max-w-[1040px] mx-auto">
        <h1 className="mt-4 text-4xl lg:text-6xl font-bold">ABOUT</h1>
        <Image src="/logo.png" alt="Logo" width={700} height={100} />
      </div>
    </div>
  );
};

export default Hero;
