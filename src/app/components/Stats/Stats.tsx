// components/Statistics.tsx
"use client";

import React from "react";
import CountUp from "react-countup";

const stats = [
  { value: 23, text: null, label: "CHANNELS", icon: "/icons/live.png" },
  { value: 14, text: "M", label: "SOCIAL REACH", icon: "icons/reach.png" },
  {
    value: 40,
    text: "M",
    label: "UNIQUE VISITORS",
    icon: "icons/visitors.png",
  },
  {
    value: 90,
    text: null,
    label: "AVERAGE WATCH TIME",
    icon: "icons/time.png",
  },
];

const Stats: React.FC = () => {
  return (
    <div className="container mx-auto pt-12 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 sm:p4 p-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-darkBlue text-white p-4 rounded-lg  relative pt-4 pb-4 md:pt-12 md:pb-12  lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20"
          >
            <img
              src={stat.icon}
              alt={`${stat.label} icon`}
              className="w-14 h-auto absolute top-[-30px] right-[-30px]"
            />
            <div>
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                separator=","
                className="text-6xl font-bold"
              />
              <span className="text-6xl font-bold">{stat.text}</span>
            </div>
            <p className="mt-2 text-xl font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
