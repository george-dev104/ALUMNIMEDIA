import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const channel = await db.channel.findUnique({
      where: {
        id,
      },
    });

    const videos = await db.video.findMany({
      where: {
        channel_id: id,
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
    return NextResponse.json({ error: true });
  }
}
