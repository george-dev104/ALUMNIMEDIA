// components/Statistics.tsx
"use client";

import React from "react";
import CountUp from "react-countup";

const blocks = [
  {
    value: 23,

    label: "FAST CHANNEL DISTRIBUTION",
    src: "/channel-distribution-img.png",
    bullets: [
      "Takeovers and Campaigns",
      "Custom Campaign Executions Including Video, Script Reads, Continuity Series, Promotions, Brand Ambassadors, Email and Newsletter Campaigns",
      "Cost effective Access to talent",
      "Official Partnerships (Category Exclusive) Franchise Ownership",
    ],
  },
  {
    value: 14,
    label: "PAY PER CLICK",
    src: "/ppc-img.png",
    bullets: [
      "Users pay for access to unique content",
      "Users donate to a cause",
      "Events can be any length and from any location",
      "Audience size range 10-50,000",
    ],
  },
  {
    value: 40,

    label: "PREMIUM SUBSCRIPTION",
    src: "/premium-subscription.png",
    bullets: [
      "Custom content programs",
      "Shift to shoppable commerce",
      "Vertical specific channels",
      "Sponsorship plus Affiliate e-commerce revenue share",
    ],
  },
];

const AdvertiseBlocks: React.FC = () => {
  return (
    <div className="container mx-auto pt-12  pb-12 xl:pb-52">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  xl:grid-cols-3 gap-6 md:gap-6 lg:gap-16 sm:p4 p-8">
        {blocks.map((block) => (
          <div
            key={block.label}
            // className="flex flex-col items-center justify-center bg-darkBlue text-white p-4 rounded-lg  relative pt-4 pb-4 md:pt-12 md:pb-12  lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20"
            className="flex flex-col items-start xl:items-center   bg-darkBlue text-white p-4 rounded-lg  relative pt-4 pb-4 xl:pb-20 justify-start "
          >
            <p className="mt-2 mb-4 text-xl font-semibold font-heading">
              {block.label}
            </p>
            <ul className="list-disc list-outside pl-6 ">
              {block.bullets.map((bullet, index) => (
                <li key={index} className="mb-2 ml-4">
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="hidden xl:block absolute lg:bottom-[-130px] 2xl:bottom-[-150px]">
              <img
                src={block.src}
                alt="Alumni Media Network"
                width={"90%"}
                height={"auto"}
                className="rounded-lg mx-auto  "
              />
            </div>

            <div className="hidden xl:block absolute lg:bottom-[-130px] 2xl:bottom-[-150px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertiseBlocks;
