"use client";
import Button from "@/atoms/Button";
import Heading from "@/atoms/Heading";
import useViewportWidth from "@/hooks/useWindowDimensions";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";

interface GridIronLegendsProps {
  removetitle?: Boolean;
}

export default function GridIronLegends({ removetitle }: GridIronLegendsProps) {
  const width = useViewportWidth();

  const slides = [
    {
      href: "/channels/alumnitv",
      src: "/gridiron/ahmangreen.jpeg",
      name: "Ahman Green",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/munoz.jpeg",
      name: "Anthony Munoz",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/beesly.jpeg",
      name: "Beasly Reece",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/beau.jpeg",
      name: "Beau macmillan",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/taylor.jpeg",
      name: "billy taylor",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/bishop.jpeg",
      name: "blaine bishop",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/hopkins.jpg",
      name: "brad hopkins",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/way.jpeg",
      name: "charles way",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/lapham.jpeg",
      name: "dave lapham",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/mason.jpeg",
      name: "derrick mason",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/levens.jpeg",
      name: "dorsey levens",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/metcalf.jpeg",
      name: "eric metcalf",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/stams.jpg",
      name: "frank stams",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/jones.jpeg",
      name: "george jones",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/brown.jpeg",
      name: "gilbert brown",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/freotte.jpg",
      name: "gus freotte",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/dixon.jpeg",
      name: "hanford dixon",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/fryar.jpeg",
      name: "irving fryar",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/breech.jpeg",
      name: "jim breech",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/booty.jpeg",
      name: "john booty",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/mecklenburg.jpg",
      name: "karl mecklenburg",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/anderson.jpeg",
      name: "ken anderson",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/harvey.jpg",
      name: "ken harvey",
    },
    {
      href: "/channels/alumnitv",
      src: "/gridiron/laurencetaylor.jpg",
      name: "laurence taylor",
    },
  ];

  return (
    <section className="">
      <div className="max-w-[1600px] mx-auto p-4 py-12 lg:p-16">
        {!removetitle && (
          <Heading
            text="Connect directly with GridIron legends"
            className="text-4xl lg:text-[45px] uppercase font-bold mb-4"
          />
        )}

        <Splide
          options={{
            perPage:
              (width > 1300 && 4) ||
              (width > 1000 && 2) ||
              (width > 600 && 2) ||
              (width > 300 && 1),
            direction: "ltr",
            padding: "5rem",
            pagination: false,
          }}
        >
          {slides.map((slide) => {
            return (
              <SplideSlide key={slide.src}>
                <div className="block relative w-[300px] h-[300px] rounded-md overflow-hidden">
                  <Image
                    fill={true}
                    className="object-cover brightness-75"
                    src={slide.src}
                    alt=""
                  />
                  <div className="absolute bottom-4 left-4">
                    <Heading
                      text={slide.name}
                      className="uppercase text-xl font-bold"
                    />
                    <Button
                      theme="outline"
                      href={slide.href}
                      label="WATCH NOW"
                    />
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
}
