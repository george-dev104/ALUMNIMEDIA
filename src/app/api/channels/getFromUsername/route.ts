import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    const channel = await db.channel.findUnique({
      where: {
        username,
      },
    });

    if (!channel) return NextResponse.json({ error: true });

    const videos = await db.video.findMany({
      where: {
        channel_id: channel.id,
      },
    });

    if (channel) {
      const { ...remainingChannelData } = channel;

      return NextResponse.json({
        channel: { ...remainingChannelData },
        videos,
      });
    }
    return NextResponse.json({ channel: null });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: true });
  }
}
