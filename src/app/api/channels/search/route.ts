import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    const channels = await db.channel.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({ channels });
  } catch (e) {
    return NextResponse.json({ error: true });
  }
}
