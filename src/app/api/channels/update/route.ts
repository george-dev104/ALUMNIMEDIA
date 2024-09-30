import { NextResponse, NextRequest } from "next/server";
import { Channel } from "@/types/Channel";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // const prisma: PrismaClient = new PrismaClient();

    const {
      userId,
      email,
      newEmail,
      id,
      name,
      username,
      youtube_id,
      categories,
      description,
    }: any = await request.json();

    // Update the email first if it's different
    if (newEmail && newEmail !== email) {
      await db.user.update({
        where: { id: userId },
        data: {
          email: newEmail,
        },
      });
    }

    // Now lets update the other channel Fields

    const updatedChannel = await db.channel.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        youtube_id,
        categories,
        description,
      },
    });

    if (updatedChannel) return NextResponse.json({ updated: updatedChannel });
    return NextResponse.json({ channel: null });
  } catch (e: any) {
    console.error("Error updating channel:", e);
    if (e.code === "P2002") {
      // Unique constraint failed
      return NextResponse.json(
        { error: "Username must be unique" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
