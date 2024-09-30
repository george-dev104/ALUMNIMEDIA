"use client";

import { Fetch } from "@/app/lib/Fetch";
import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import Loading from "@/organisms/Loading";
import { Channel, Video as VideoType } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDistance, subDays } from "date-fns";
import { getTime } from "@/app/lib/getTime";
import Link from "next/link";
import { monthNames } from "@/app/lib/monthNames";
import Video from "@/molecules/Video";
import Heading from "@/atoms/Heading";

export default function VideoPage() {
  const pathname = usePathname();

  const videoId = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  const [videoData, setVideoData] = useState<{
    id: number;
    channel_id: number;
    title: string;
    description: string;
    thumbnail: string;
    youtube_video_id: string;
    published_at: string;
  } | null>();

  const [relatedVideos, setRelatedVideos] = useState<VideoType[]>([]);

  const [channelData, setChannelData] = useState<Omit<Channel, "sub">>();

  const getVideoInfo = async () => {
    if (!videoId) return;
    const res = await Fetch(`/api/videos/getFromId`, "post", { id: videoId });
    if (res.error) return toast.error("Please try again.");
    setVideoData(res.video);
    setChannelData(res.channel);
    const relatedVideosRes = await Fetch(`/api/videos/getRelated`, "post", {
      id: videoId,
    });
    if (relatedVideosRes.error) return;
    setRelatedVideos(relatedVideosRes.related_videos);
  };

  useEffect(() => {
    getVideoInfo();
  }, [videoId]);

  return (
    <>
      <Header />
      <main className="relative lg:pt-20 lg:h-screen overflow-hidden">
        {videoData && channelData ? (
          <>
            <section className="relative flex flex-col lg:grid grid-cols-6">
              <div className="lg:col-span-4 flex flex-col gap-2 p-4 lg:p-8 lg:h-[calc(100dvh-80px)] lg:overflow-y-scroll pt-[100px]">
                <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    width="560"
                    height="315"
                    src={`https://www.youtube-nocookie.com/embed/${videoData.youtube_video_id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  ></iframe>
                </div>
                <p className="text-left text-xl font-bold lg:w-[500px] text-nowrap overflow-hidden text-ellipsis">
                  {videoData.title}
                </p>
                <Link
                  href={`/channels/${channelData.username}`}
                  className="flex flex-row gap-3 mb-3 p-2 hover:bg-grey/30 rounded-xl"
                >
                  {channelData.profile_image_src && (
                    <img
                      className="object-contain w-20 h-20 rounded-full aspect-square border border-solid border-white bg-white/40 backdrop-blur-md"
                      src={channelData.profile_image_src}
                      alt=""
                    />
                  )}
                  {!channelData.profile_image_src && (
                    <div className="object-contain w-20 h-20 rounded-full aspect-square border border-solid border-white bg-white/40 backdrop-blur-md" />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold">{channelData.name}</p>
                    <p className="">@{channelData.username}</p>
                    <p className="text-sm">
                      Joined{" "}
                      {
                        monthNames[
                          new Date(channelData.date_joined!).getMonth()
                        ]
                      }
                      , {new Date(channelData.date_joined!).getFullYear()}
                    </p>
                  </div>
                </Link>
                <div className="rounded-xl bg-grey/30 p-4 flex flex-col gap-3">
                  <p className="text-left text-grey text-sm block">
                    Posted {getTime(videoData.published_at)}
                  </p>
                  <p className="text-left text-white text-sm block">
                    {videoData.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 col-span-2 px-[10%] gap-4 lg:h-[calc(100dvh-80px)] bg-[rgb(1,57,120)] backdrop-blur lg:overflow-y-scroll">
                <div>
                  <Heading text="Suggested Content" className="text-xl" />
                </div>
                {relatedVideos.map((video) => {
                  return (
                    <Video
                      key={video.id}
                      title={video.title}
                      src={video.thumbnail}
                      published_at={video.published_at}
                      id={video.id}
                    />
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
}
