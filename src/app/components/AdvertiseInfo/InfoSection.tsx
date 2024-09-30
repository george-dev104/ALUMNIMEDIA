// components/InfoSection.tsx
"use client";

import Link from "next/link";
import React from "react";

interface InfoSectionProps {
  heading: string;
  text: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ heading, text }) => {
  return (
    <div className="text-white p-6 lg:p-12 rounded-lg flex flex-col items-center justify-center w-full lg:w-1/2 mb-8 lg:mb-0">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
        {heading}
      </h2>
      <div
        className="text-center mb-6"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <Link
        href="/channels"
        className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded"
      >
        View All Channels
      </Link>
    </div>
  );
};

export default InfoSection;
