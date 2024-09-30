import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { id } = session?.user || {};

  if (!id) {
    return new Response(JSON.stringify({ error: "Not Authorised" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  try {
    // Get the channel
    const channel = await db.channel.findFirst({
      where: {
        userId: id,
      },
    });

    return NextResponse.json({ channel });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
