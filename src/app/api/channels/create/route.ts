import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // const prisma: PrismaClient = new PrismaClient();

    const { id, name, username, youtube_id, categories } = await request.json();

    // Check if the user is allowed to have multiple channels
    const user = await db.user.findUnique({
      where: { id },
      select: { canHaveMultipleChannels: true, accountType: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user already has a channel (if they are not allowed multiple channels)
    if (!user.canHaveMultipleChannels) {
      const existingChannel = await db.channel.findFirst({
        where: { userId: id },
      });

      if (existingChannel) {
        return NextResponse.json(
          { error: "User already has a channel" },
          { status: 400 }
        );
      }
    }

    // Update the user's account type to 'channel' if it's their first channel
    if (user.accountType !== "channel") {
      await db.user.update({
        where: { id },
        data: { accountType: "channel" },
      });
    }

    // Create a new channel for the user
    const channel = await db.channel.create({
      data: {
        name,
        username,
        youtube_id,
        categories,
        description: "",
        profile_image_src: "",
        banner_image_src: "",
        userId: id,
      },
    });

    return NextResponse.json({ channel });
  } catch (e) {
    console.error("Error creating channel:", e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
