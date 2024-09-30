require("dotenv").config();
import { NextResponse } from "next/server";
import { Channel } from "@prisma/client";
import { db } from "@/lib/db";

export const maxDuration = 60;
export const dynamic = "force-dynamic"; // static by default, unless reading the request

// max tokens = 11 (1 for channel + 10 playlist queries) = 500 max videos
const MAX_TOKENS = process.env.NEXT_PUBLIC_APP_ENV === "dev" ? 3 : 10;

let tokensUsed = 0;
let videosUploaded = 0;

async function addItems(
  nextPageToken: string,
  channel: Channel,
  uploads: string
) {
  if (tokensUsed > MAX_TOKENS) return;

  // query playlist for uploaded videos
  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=${nextPageToken}&playlistId=${uploads}&key=${process.env.YOUTUBE_API_KEY}`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": process.env.YOUTUBE_API_KEY!,
      },
    }
  );

  tokensUsed++;

  if (tokensUsed >= MAX_TOKENS + 1) return;

  const playlistResData = await playlistRes.json();

  if (playlistResData.error) {
    console.log(
      `[YOUTUBE_ERROR]: (Code: ${playlistResData.error.code}) (Message: ${playlistResData.error.message})`
    );
    return;
  }

  // check if playlist has items
  if (playlistResData.items && playlistResData.items.length) {
    // loop through videos and add to videos table
    for (let j = 0; j < playlistResData.items.length; j++) {
      await db.video.create({
        data: {
          published_at:
            playlistResData.items[j].contentDetails.videoPublishedAt,
          channel_id: channel.id,
          title: playlistResData.items[j].snippet.title,
          description: playlistResData.items[j]?.snippet?.description,
          thumbnail:
            playlistResData.items[j]?.snippet?.thumbnails?.maxres?.url ||
            "https://wallpapercave.com/wp/wp5751929.jpg",
          youtube_video_id: playlistResData.items[j].contentDetails.videoId,
        },
      });

      videosUploaded++;
    }

    // if more than 50 results are available
    if (playlistResData.nextPageToken)
      addItems(playlistResData.nextPageToken, channel, uploads);

    return;
  } else console.log(`no videos in uploads playlist for ${channel.name}`);

  return;
}

export async function GET() {
  try {
    const allChannels = await db.channel.findMany({
      where: {
        youtube_id: {
          not: "",
        },
      },
    });

    for (let i = 0; i < allChannels.length; i++) {
      // remove all existing videos for channel
      await db.video.deleteMany({
        where: {
          channel_id: allChannels[i].id,
        },
      });

      // query youtube api for "upload" playlist
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${allChannels[i].youtube_id}&key=${process.env.YOUTUBE_API_KEY}`,
        {
          method: "GET",
          headers: {
            "X-Goog-Api-Key": process.env.YOUTUBE_API_KEY!,
          },
        }
      );

      // TOKEN USED
      tokensUsed++;

      const channelResData = await channelRes.json();

      let channelExistsFlag = true;

      if (channelResData.error) {
        console.log(
          `[YOUTUBE_ERROR]: (Code: ${channelResData.error.code}) (Message: ${channelResData.error.message})`
        );
        continue;
      }

      if (!channelResData.items || channelResData.items.length === 0) {
        console.log(
          `youtube_id (${allChannels[i].youtube_id}) associated with ${allChannels[i].name} does not exist.`
        );
        channelExistsFlag = false;
      }

      const uploads = channelExistsFlag
        ? channelResData.items[0]?.contentDetails?.relatedPlaylists?.uploads
        : null;

      // has no uploads folder
      if (typeof uploads !== "string" || uploads.length === 0)
        console.log(`no uploads playlist for ${allChannels[i].name}`);
      else {
        // query playlist for uploaded videos
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=500&playlistId=${uploads}&key=${process.env.YOUTUBE_API_KEY}`,
          {
            method: "GET",
            headers: {
              "X-Goog-Api-Key": process.env.YOUTUBE_API_KEY!,
            },
          }
        );

        // TOKEN USED
        tokensUsed++;

        const playlistResData = await playlistRes.json();

        if (playlistResData.error) {
          console.log(
            `[YOUTUBE_ERROR]: (Code: ${playlistResData.error.code}) (Message: ${playlistResData.error.message})`
          );
          continue;
        }

        // check if playlist has items
        if (playlistResData.items && playlistResData.items.length) {
          // loop through videos and add to videos table
          for (let j = 0; j < playlistResData.items.length; j++) {
            await db.video.create({
              data: {
                published_at:
                  playlistResData.items[j].contentDetails.videoPublishedAt,
                channel_id: allChannels[i].id,
                title: playlistResData.items[j].snippet.title,
                description: playlistResData.items[j].snippet.title,
                thumbnail:
                  playlistResData.items[j]?.snippet?.thumbnails?.maxres?.url ||
                  "https://wallpapercave.com/wp/wp5751929.jpg",
                youtube_video_id:
                  playlistResData.items[j].contentDetails.videoId,
              },
            });

            videosUploaded++;
          }

          // if more than 50 results are available
          if (playlistResData.nextPageToken)
            await addItems(
              playlistResData.nextPageToken,
              allChannels[i],
              uploads
            );
        } else
          console.log(
            `no videos in uploads playlist for ${allChannels[i].name}`
          );
      }
    }

    return NextResponse.json({ tokensUsed, videosUploaded });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: true });
  }
}
