import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const relatedVideos = await db.video.findMany({
      where: {
        channel_id: id,
      },
    });

    return NextResponse.json({ related_videos: relatedVideos.slice(0, 30) });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: true });
  }
}
