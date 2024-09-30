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

// Temporary Data from Networking
const slides1 = [
  {
      "id": 3,
      "name": "Alumni Media Golf",
      "username": "amngolf",
      "youtube_id": "UC0294Og7qPg-avaQhKtjboQ",
      "description": "",
      "date_joined": "2024-05-09T20:16:37.342Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/3/profile-image-aD6jdokyyJ1yb7eYBo5l3XxNzKfwav.png",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/3/banner-image-TbLgHW2bL6PI74zBoK6dcU4EltDUlN.png",
      "categories": [
          "Golf"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/3/banner-image-Ps4kh5r5UPiM3kWBRagGyYTlH97pt2.webp",
      "featured": true,
      "userId": null
  },
  {
      "id": 4,
      "name": "Alumni Media E-Sports",
      "username": "esports",
      "youtube_id": "UCM-UD0fNX1rm2qe_hzavIoA",
      "description": "",
      "date_joined": "2024-05-12T01:29:37.027Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/4/profile-image-mD90wNcSMvrNA7bvOoClFHnWfjoA2d.webp",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/4/banner-image-mvWKRgl9Asp6Ez1amX21frC7gOMM4U.webp",
      "categories": [
          "E-Sports"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/4/banner-image-7ymFbfQTTaRhsXbSHyHGMfNJ5U8Kmo.jpeg",
      "featured": true,
      "userId": null
  },
  {
      "id": 6,
      "name": "Alumni Media Network News",
      "username": "amnnews",
      "youtube_id": "UCeszrwvyt_2fqdW8b3piyDg",
      "description": "",
      "date_joined": "2024-05-20T00:38:01.252Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/6/alumninews-profile-image-ozWAdG8KEIczjGEcS2WLCJC1BaTDtR.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/6/banner-image-79EkI827L34FVHNMRz5BVpO6H8RJSG.jpeg",
      "categories": [
          "Sports",
          "Business",
          "E-Sports",
          "Fitness",
          "Livestreams"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/6/alumninews-DER0RXszTPUS5Bmvvk1WEirwIUNTxt.jpg",
      "featured": true,
      "userId": null
  },
  {
      "id": 5,
      "name": "Alumni Media Business",
      "username": "amnbusiness",
      "youtube_id": "UC6cem4_8AFw01yBVa6M-NPQ",
      "description": "",
      "date_joined": "2024-05-14T19:40:55.446Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/5/AlumniMediaBusinessNetwork-profile-image-tIoWHztHyPVKN18E9j6P0HUMHAsQ5i.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/5/AlumniMediaBusinessNetwork-profile-banner-image-WLImJlcqPetHXE56UMfhArOOXORe6G.jpg",
      "categories": [
          "Business"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/5/alumnibusinessnetwork-0nJBQD25VJTha44smq7E7TQsVdW6WZ.jpg",
      "featured": true,
      "userId": null
  },
  {
      "id": 11,
      "name": "PFRPA Daily",
      "username": "pfrpadaily",
      "youtube_id": "UCeAB1iIo273ptAkXuWql7dA",
      "description": "",
      "date_joined": "2024-05-12T01:29:37.027Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/11/pfrpa-daily-profile-image-CgmX9GZMt9rNrjL9DbEadrGk161AvU.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/11/pfrpa-daily-profile-banner-image-LNe5Y2LYrxC8RAJy6FvuZw1MC78dcb.jpg",
      "categories": [
          "Sports",
          "Football"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/11/pfrpa-SSHEABjvBaVSVmASGlYkWamVQ9bIZS.jpeg",
      "featured": true,
      "userId": null
  },
  {
      "id": 12,
      "name": "Women's Football Alliance",
      "username": "wfafootball",
      "youtube_id": "UCwiOLXvs3Uti7gFzBh0J3Zw",
      "description": "",
      "date_joined": "2024-05-12T01:29:37.027Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/12/wfafootball-profile-image-fAP7CMIA3PvlAdtudAuPXA4iLATdRO.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/12/wfafootball-profile-banner-image-5gyql4AUg2HY31mLFw9O4o4I2syzAi.jpg",
      "categories": [
          "Sports",
          "Football"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/12/womenstacklefootball-iURPkAATo4Nwn2Pf8QB6RiiwSaoQZC.jpg",
      "featured": true,
      "userId": null
  },
  {
      "id": 13,
      "name": "DC Divas Football",
      "username": "dcdivas",
      "youtube_id": "UC738VpYX3K7l0NwF27ZJD3A",
      "description": "",
      "date_joined": "2024-05-12T01:29:37.027Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/13/dcdivas-profile-image-1k7zfqs8hbtdaE0fODRloSA2XScYn2.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/13/dcdivas-profile-banner-image-YICW4vYKdetBKzWg19BGvwkEoq9fJ5.jpg",
      "categories": [
          "Sports",
          "Football"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/13/dcdivas-EBVus4FhdZUpATPZBJdFnoAsmz6Shd.jpg",
      "featured": true,
      "userId": null
  },
  {
      "id": 14,
      "name": "The Football Channel",
      "username": "amnfootball",
      "youtube_id": "UCJBZBV44_i2yCye312woqwg",
      "description": "",
      "date_joined": "2024-05-02T14:14:53.194Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/14/the-football-channel-profile-image-6HT6asTQu2fJC0M2AEJL1CqWYWKP5F.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/14/the-football-channel-profile-banner-image-oWKNe5jOY8mvpSgI6Y8nJwcyMPjirz.jpg",
      "categories": [
          "Sports",
          "Football"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/14/thefootballchannel-54VL43hWvCWthwDKYAFj8BUTludmNh.jpeg",
      "featured": true,
      "userId": null
  },
  {
      "id": 15,
      "name": "Ringside",
      "username": "officialringsideshow",
      "youtube_id": "UCboTt_SwilZbvRIFkYfpzxw",
      "description": "",
      "date_joined": "2024-06-22T13:43:13.636Z",
      "profile_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/15/ringside-profile-image-VC3bbsMJfMy9vJU5mVdetOTtTc342T.jpg",
      "banner_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/15/ringside-profile-banner-image-mbdeAUgVArGTi3MF4vnKnjhcc83s2S.jpg",
      "categories": [
          "Sports",
          "Boxing",
          "Football"
      ],
      "cover_image_src": "https://yqvp1h6cfzxiqmeb.public.blob.vercel-storage.com/channels/15/ringside-mheJyN56s4FM9nlJAPKiWBauyL6Nr2.png",
      "featured": true,
      "userId": null
  }
]

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
      ? slides1
      : slides1.filter((slide: { categories: string[] }) =>
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
