import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const video = await db.video.findUnique({
      where: {
        id,
      },
    });

    const channel = await db.channel.findUnique({
      where: {
        id: video?.channel_id,
      },
    });

    if (!channel) return NextResponse.json({ error: {} });

    const { ...remainingChannelData } = channel;

    return NextResponse.json({ video, channel: remainingChannelData });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: true });
  }
}
