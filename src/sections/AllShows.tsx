"use client";
import Heading from "@/atoms/Heading";
import useViewportWidth from "@/hooks/useWindowDimensions";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";

export default function AllShows() {
  const width = useViewportWidth();

  const slides = [
    // {
    //   href: "/channels/amngolf",
    //   src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/3/banner-image-Ps4kh5r5UPiM3kWBRagGyYTlH97pt2.webp",
    // },
    // {
    //   href: "/channels/amnbusiness",
    //   src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/5/alumnibusinessnetwork-0nJBQD25VJTha44smq7E7TQsVdW6WZ.jpg",
    // },
    // {
    //   href: "/channels/wfafootball",
    //   src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/12/womenstacklefootball-iURPkAATo4Nwn2Pf8QB6RiiwSaoQZC.jpg",
    // },
    // {
    //   href: "/channels/dcdivas",
    //   src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/13/dcdivas-EBVus4FhdZUpATPZBJdFnoAsmz6Shd.jpg",
    // },

    // {
    //   href: "/channels/amnfootball",
    //   src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/14/thefootballchannel-54VL43hWvCWthwDKYAFj8BUTludmNh.jpeg",
    // },

    {
      href: "/channels/gameonxoxo",
      src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/22/gameonxoxo-dtwoaRUnJkJ3sgJXe4cUAc6q6yumsv.png",
    },

    {
      href: "/channels/theexpressway",
      src: "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/21/TheExpressWay-Card-jR3LPmzV9o6ann3XHnV09mBrp5P2ho.jpg",
    },

    // {
    //   href: "/channels/esports",
    //   src: "/shows/getauthentic.jpg",
    // },
    {
      href: "/channels/alumnitv",
      src: "/shows/ahmangreens.jpeg",
    },
    {
      href: "/channels/officialringsideshow",
      src: "/shows/ringside.png",
    },
    {
      href: "/channels/alumnitv",
      src: "/shows/pmsi.jpg",
    },
    {
      href: "/channels/alumnitv",
      src: "/shows/greenandgold.png",
    },
    // {
    //   href: "/channels/alumnitv",
    //   src: "/shows/inthadawgpound.png",
    //   comingSoon: true,
    // },
    // {
    //   href: "/channels/pfrpadaily",
    //   src: "/slides/pfrpa.jpeg",
    // },
    {
      href: "/channels/alumnitv",
      src: "/slides/halloffame.jpg",
      comingSoon: true,
    },
    {
      href: "/channels/alumnitv",
      src: "/slides/alumnifitness.jpg",
      comingSoon: true,
    },
    // {
    //   href: "/channels/amnnews",
    //   src: "/slides/alumninews.jpg",
    // },
    {
      href: "/channels/alumnitv",
      src: "/slides/food.jpg",
      comingSoon: true,
    },
  ];

  // Sort the slides array
  const sortedSlides = slides.sort((a, b) => {
    if (a.comingSoon && !b.comingSoon) {
      return -1;
    }
    if (!a.comingSoon && b.comingSoon) {
      return 1;
    }
    return 0;
  });

  return (
    <section className="">
      <div className="max-w-[1600px] mx-auto p-4 py-12 lg:p-16">
        <div className="flex flex-col items-center lg:flex-row lg:items-center justify-start mb-8">
          <Heading
            text="All Shows"
            className="text-4xl lg:text-[45px] uppercase font-bold mb-4 lg:mb-0 lg:pr-8 text-center lg:text-left"
          />
        </div>
        <div className="grid gap-7 p-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
          {sortedSlides.map((slide) => (
            <div key={slide.src} className="grid-item relative">
              {slide.comingSoon && (
                <button className="absolute top-[-15px] left-[-15px] px-2 py-1 rounded-full text-black border border-black text-xs sm:text-sm z-10 bg-white">
                  Coming Soon
                </button>
              )}
              {slide.comingSoon ? (
                <div className="block relative aspect-video w-full rounded-md overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      fill={true}
                      className="object-cover"
                      src={slide.src}
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <Link
                  className="block relative aspect-video w-full rounded-md overflow-hidden"
                  href={slide.href}
                >
                  <div className="relative w-full h-full">
                    <Image
                      fill={true}
                      className="object-cover"
                      src={slide.src}
                      alt=""
                    />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
