import Button from "@/atoms/Button";
import Image from "next/image";
import React from "react";

const DividerText: React.FC = () => {
  return (
    <div className="relative ">
      <div className="absolute inset-0 bg-black opacity-75"></div>{" "}
      <div className="text-center   w-full absolute bottom-[-20px] sm:bottom-[-40px]">
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-bold  ">
          ADVERTISE NOW
        </h2>
      </div>
    </div>
  );
};

export default DividerText;
