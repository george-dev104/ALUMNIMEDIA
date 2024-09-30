import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { put } from "@vercel/blob";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        error: { message: "authentication required" },
      });
    }

    const userId = session.user.id;

    const channel = await db.channel.findFirst({
      where: {
        userId: userId,
      },
    });

    console.log("the channel is", channel);

    if (!channel)
      return NextResponse.json({ error: { message: "no channel found" } });

    const formData = await request.formData();
    const profileImage = formData.get("file");

    if (!profileImage)
      return NextResponse.json({
        error: { message: "no profile image found" },
      });

    const buffer = await (profileImage as File).arrayBuffer();

    const { url } = await put(
      `channels/${channel.id}/profile-image.${(profileImage as File).type.slice(
        (profileImage as File).type.indexOf("/") + 1
      )}`,
      buffer,
      { access: "public" }
    );

    const updatedChannel = await db.channel.update({
      where: {
        id: channel.id,
      },
      data: {
        profile_image_src: url,
      },
    });

    return NextResponse.json({ updatedProfileImageSrc: url });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: {} });
  }
}
