"use client";

import React from "react";
import InfoSection from "./InfoSection";

const sections = [
  {
    heading: "BRANDED SCRIPTS",
    text: `Sample Script Example:
    <br /><br />
    “In my career I&#8217;ve learned that when it&#8217;s time to work - it&#8217;s time to work. But, when it comes to broadcasting from the comfort of my own home, well that&#8217;s when I allow myself a refreshing drink that tastes great to enjoy the game.
    <br /><br />

    &lt;Sponsor&gt; is a great &lt;spirit/beer/wine&gt; to enjoy when you&#8217;re watching any game at home with&nbsp;your&nbsp;friends.”`,
  },
  {
    heading: "ORGANIC MENTIONS & CONVERSATIONS",
    text: `Organic Mentions
    <br /><br />
    Athlete to talk about post-game rituals, after wins, drinks, etc…&#8203;
    <br /><br />
    Athlete to talk about using the sponsored partner&#8203;
    <br /><br />
    Athlete to talk about what makes a great &lt;sponsor partner product... what taste they look for, specific type, drinkability, ease of use, etc?&#8221;.&#8203;
    <br /><br />
    Athletes to talk about things relevant to your brand&nbsp;and&nbsp;industry`,
  },
];

const AdvertiseInfo: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch lg:space-x-4 px-4 lg:px-20 py-12 ">
      {sections.map((section, index) => (
        <InfoSection
          key={index}
          heading={section.heading}
          text={section.text}
        />
      ))}
    </div>
  );
};

export default AdvertiseInfo;
