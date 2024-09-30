import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

// TODO: update initial setup with userid input as well.

export async function POST(request: NextRequest) {
  try {
    // const prisma: PrismaClient = new PrismaClient();

    const { id, email, newEmail, first_name, last_name, accountType } =
      await request.json();

    console.log("about to update the user in the database");

    // Update the email first if it's different
    if (newEmail && newEmail !== email) {
      await db.user.update({
        where: { id },
        data: {
          email: newEmail,
        },
      });
    }

    // Update other fields
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        first_name,
        last_name,
        accountType,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (e) {
    //TEMP
    console.log("error", e, "with: ", request);

    return NextResponse.json({ error: true });
  }
}
