"use client";

import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import hero_background_img from "@public/hero-background.jpg";
import hero_background_mobile_img from "@public/hero-background-mobile.jpg";
import Image from "next/image";
import { Fetch } from "@/app/lib/Fetch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Heading from "@/atoms/Heading";
import { Channel } from "@/types/Channel";
import Loading from "@/organisms/Loading";
import Button from "@/atoms/Button";
import { monthNames } from "@/app/lib/monthNames";
import Video from "@/molecules/Video";
import { Video as VideoType } from "@prisma/client";
import ElfsightWidget from "@/app/components/SiteBanner/SiteBanner";

export default function Home() {
  const pathname = usePathname();

  const username = pathname.slice(pathname.lastIndexOf("/") + 1);

  const [channelData, setChannelData] = useState<Omit<Channel, "sub">>();
  const [channelVideos, setChannelVideos] = useState<VideoType[]>();
  const [view, setView] = useState<"videos" | "livestream">("videos");

  const getChannelInfo = async () => {
    if (!username) return;
    const res = await Fetch(`/api/channels/getFromUsername`, "post", {
      username,
    });
    if (res.error) return toast.error("Please try again.");
    setChannelData(res.channel);
    setChannelVideos(res.videos);
  };

  useEffect(() => {
    getChannelInfo();
  }, [username]);

  return (
    <>
      <Header />
      <main className="relative pt-[80px] lg:pt-20">
        {channelData ? (
          <>
            {/* banner */}
            <section className="relative w-full overflow-hidden">
              <div className="relative max-w-[1000px] mx-auto w-full z-10 p-28">
                <img
                  className="absolute object-contain top-0 left-0 w-full h-full"
                  src={channelData.banner_image_src || hero_background_img.src}
                  alt=""
                />
              </div>
              <img
                className="absolute object-cover top-0 left-0 w-full h-full brightness-50 z-[-1] blur"
                src={channelData.banner_image_src || hero_background_img.src}
                alt=""
              />
            </section>
            {/* channel */}
            <section className="">
              <div className="flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8 max-w-[1000px] mx-auto pb-4 lg:pb-8 mb-8 border-b-2 border-solid border-grey gap-4 lg:gap-0">
                <div className="flex flex-row gap-6">
                  {channelData.profile_image_src && (
                    <img
                      className="object-contain w-32 h-32 rounded-full aspect-square border border-solid border-white bg-white/40 backdrop-blur-md"
                      src={channelData.profile_image_src}
                      alt=""
                    />
                  )}
                  {!channelData.profile_image_src && (
                    <div className="object-contain w-32 h-32 rounded-full aspect-square border border-solid border-white bg-white/40 backdrop-blur-md" />
                  )}
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <Heading
                        text={channelData.name}
                        className="text-xl lg:text-3xl uppercase lg:whitespace-nowrap"
                      />
                      <p className="">@{channelData.username}</p>
                      <p className="text-sm">
                        Joined{" "}
                        {
                          monthNames[
                            new Date(channelData.date_joined).getMonth()
                          ]
                        }
                        , {new Date(channelData.date_joined).getFullYear()}
                      </p>
                    </div>
                    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 w-full">
                      {channelData.categories.map((category) => {
                        return (
                          <p
                            key={category}
                            className="bg-white/30 px-2 py-1 rounded-full text-white border border-white border-solid text-xs sm:text-sm"
                          >
                            #{category}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <nav className="flex flex-row justify-around lg:justify-end items-center gap-6 w-full">
                  <button
                    onClick={() => setView("videos")}
                    className={`${
                      view === "videos" ? "text-white" : "text-white/80"
                    } hover:underline transition-all transition-300`}
                  >
                    Videos
                  </button>
                  <Link
                    href={`/livestreams/${channelData.id}`}
                    className={`${
                      view === "livestream" ? "text-white" : "text-white/80"
                    } hover:underline transition-all transition-300`}
                  >
                    Livestream
                  </Link>
                  {/* <Button label='Save' /> */}
                </nav>
              </div>
            </section>
            {/* videos */}
            {/* {username === "amngolf" && (
              <section className="container mx-auto mb-8">
                <ElfsightWidget />
              </section>
            )} */}
            <section className="">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start max-w-[1000px] mx-auto place-items-center w-full px-1 sm:px-0 sm:w-[90%]">
                {channelVideos?.length ? (
                  <>
                    {channelVideos.map((video) => {
                      return (
                        <Video
                          key={video.id}
                          id={video.id}
                          src={video.thumbnail}
                          title={video.title}
                          published_at={video.published_at}
                        />
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
        {/* <Image className='block lg:hidden absolute object-cover top-0 left-0 w-full h-full z-[-1]' src={hero_background_mobile_img} alt='' />
                <Image className='hidden lg:block absolute object-cover top-0 left-0 w-full h-full z-[-1] ' src={hero_background_img} alt='' /> */}
      </main>
      <Footer />
    </>
  );
}
