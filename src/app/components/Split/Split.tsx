// components/Split.tsx
"use client";

import React from "react";
import Image from "next/image";
import Button from "@/atoms/Button";

const Split: React.FC = () => {
  return (
    <>
      <section className="text-white pt-20 pb-12  px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="mx-auto flex flex-col lg:flex-row items-center  lg:space-x-12">
            <div className="flex-1 mb-8 lg:mb-0 ">
              <h2 className="text-4xl font-bold mb-4">WHO ARE WE?</h2>
              <p className="mb-4">
                Alumni Media Network has launched the first and only Lifestyle
                Media Network that offers a unique blend of both live-stream and
                24/7 on-demand programming. This innovative platform features
                dozens of channels where athletes are at the forefront, creating
                and sharing content that delves into their personal interests
                and passions.
              </p>
              <p className="mb-4">
                What sets the Alumni Media Network apart is its commitment to
                athlete empowerment and ownership. Unlike traditional media
                networks, where content and network ownership typically rest
                with the company, this network hands over the reins to the
                athletes themselves. They have full control over the content
                they produce and retain ownership of both the media they create
                and the network as a whole.
              </p>
              <p className="mb-4">
                This model not only ensures that the content is authentic and
                directly reflective of the athletes&apos; true interests, but it
                also provides them with a platform to build their brand beyond
                their sports careers. Fans get an intimate look into the lives
                of their favorite athletes, exploring diverse topics such as
                fitness, cooking, travel, fashion, and more, through content
                that is directly produced and curated by the athletes.
              </p>
              <Button
                href="/auth"
                label="Sign Up To The Network"
                className="whitespace-nowrap"
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <img
                  src="/taylor-image.png"
                  alt="Alumni Media Network"
                  width={"100%"}
                  //   height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white pt-8 pb-12 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="  mx-auto flex flex-col lg:flex-row-reverse items-center ">
            <div className="flex flex-col   w-full lg:w-1/2 mr-0 ">
              <h2 className="text-4xl font-bold mb-4">EXPLORE MORE</h2>
              <p className="mb-4">
                Like every lifestyle streaming network, the Alumni Media Network
                (AMN) features channels dedicated to themed content, ensuring
                that there is something for every viewer&apos;s interest. AMN
                boasts an impressive array of channels, each focused on specific
                themes such as Golf, Food, Fitness, E-Sports, Business, Health,
                and Football, just to name a few. These channels are not just
                ordinary segments; they are creatively powered and brought to
                life by renowned athletes who infuse their expertise, passion,
                and unique perspectives into the content.
              </p>
              <p className="mb-4">
                Among the distinguished athletes driving these channels are the
                network&apos;s co-founders and other notable sports figures.
                Bernie Kosar leads the Wellness channel, offering insights into
                physical and mental health. Terrell Owens brings his flair to
                the Home Decor channel, sharing tips and ideas for stylish
                living spaces. Ahman Green spearheads the E-Sports channel,
                diving into the world of competitive gaming. Lawrence Taylor
                supports charitable causes through the Foundations channel.
                Terrell Buckley brings his expertise to the Golf channel,
                providing viewers with golfing tips and updates. Ray Leonard,
                Jr. energizes the Boxing channel, delivering exciting content
                related to the sport.
              </p>

              <Button
                href="/channels"
                label="View All Channels"
                className="whitespace-nowrap"
              />
            </div>
            <div className="flex  w-full lg:w-1/2 ml-0 mr-[40px] mt-4">
              <div className="relative">
                <img
                  src="/montage.png"
                  alt="Alumni Media Network"
                  width={"100%"}
                  //   height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Split;
