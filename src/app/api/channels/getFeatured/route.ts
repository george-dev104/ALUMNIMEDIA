import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function GET(request: NextRequest) {
  console.log(request);
  try {
    const channels: any = await prisma.channel.findMany({
      where: {
        featured: true, // Filter by featured field
      },
      //   select: {
      //     id: true,
      //     cover_image_src: true,
      //     username: true,
      //     // categories,
      //   },
    });

    return NextResponse.json(channels);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 500 }
    );
  }
}
