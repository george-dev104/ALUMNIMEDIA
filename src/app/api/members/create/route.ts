import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const prisma: PrismaClient = new PrismaClient();

    const { first_name, last_name, email } = await request.json();

    const user = await prisma.user.create({
      data: {
        // sub,
        first_name,
        last_name,
        email,
        membership: "free",
      },
    });

    return NextResponse.json({ user });
  } catch (e) {
    //TEMP
    console.log("error", e, "with: ", request);

    return NextResponse.json({ error: true });
  }
}
