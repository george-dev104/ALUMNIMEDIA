"use client";
import { useState } from "react";
import Heading from "@/atoms/Heading";
import useViewportWidth from "@/hooks/useWindowDimensions";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const categories = [
  "All",
  "Sports",
  "Golf",
  "E-Sports",
  "Business",
  "Football",
  "Fitness",
  "Livestreams",
];

interface FeaturedChannelsProps {
  bottomSpacer?: Boolean;
}

export default function FeaturedChannels({
  bottomSpacer,
}: FeaturedChannelsProps) {
  const width = useViewportWidth();
  const { data: slides, error } = useSWR("/api/channels/getFeatured", fetcher, {
    // revalidateOnFocus: true, # Consider adding this in once management portal created
    // refreshInterval: 60000, # 60s - # Also consider this if channels data is changing a lot.
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (error) return;
  if (!slides) return;

  const filteredSlides =
    selectedCategory === "All"
      ? slides
      : slides.filter((slide: { categories: string[] }) =>
          slide.categories.includes(selectedCategory)
        );

        console.log(filteredSlides);

  return (
    <section className="">
      <div
        className={`max-w-[1600px] mx-auto p-4 py-12 lg:p-16 ${
          bottomSpacer ? "lg:pb-32" : ""
        }`}
      >
        <div className="flex flex-col items-center lg:flex-row lg:items-center justify-start mb-8">
          <Heading
            text="Featured Channels"
            className="text-4xl lg:text-[45px] uppercase font-bold mb-4 lg:mb-0 lg:pr-8 text-center lg:text-left"
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-2 py-1 rounded-full text-white border border-white border-solid text-xs sm:text-sm mx-1 ${
                  selectedCategory === category
                    ? "bg-darkBlue/30"
                    : "bg-white/30"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <Splide
          options={{
            perPage:
              (width > 1435 && 4) ||
              (width > 1140 && 3) ||
              (width > 1000 && 2) ||
              (width > 740 && 2) ||
              (width > 300 && 1),
            direction: "ltr",
            padding: "40px",
            pagination: false,
            gap: "10px", // Adjust this value as needed
          }}
        >
          {filteredSlides &&
            filteredSlides.map(
              (slide: {
                href: string;
                src: string;
                username: string;
                cover_image_src: string;
              }) => (
                <SplideSlide key={slide.src}>
                  <Link
                    className="block relative aspect-video w-[300px] rounded-md overflow-hidden"
                    href={ slide.username == `pfrpadaily` ? `https://www.youtube.com/@pfrpa` : `/channels/${slide.username}`}
                  >
                    <div className="relative w-full h-full">
                      {/* <button className="absolute top-2 left-2 px-2 py-1 rounded-full text-white border border-white text-xs sm:text-sm z-10 bg-black bg-opacity-50">
                        Coming Soon
                      </button> */}
                      <Image
                        fill={true}
                        className="object-cover"
                        src={slide.cover_image_src}
                        alt=""
                      />
                    </div>
                  </Link>
                </SplideSlide>
              )
            )}
        </Splide>
      </div>
    </section>
  );
}
