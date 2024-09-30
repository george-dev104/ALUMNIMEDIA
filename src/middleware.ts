import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import type { Session } from "next-auth";

export async function middleware(request: NextRequest) {
  const session = (await getToken({ req: request })) as Session | null;

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // If there is no session and the user is not on the /auth page, redirect to /auth
  if (!session) {
    if (pathname !== "/auth") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    // Allow request to continue to /auth
    return NextResponse.next();
  }

  if (session && !session.user.accountType) {
    if (request.nextUrl.pathname !== "/account/setup") {
      return NextResponse.redirect(new URL("/account/setup", request.url));
    }
  } else {
    // If the user has a type and is on /auth or /account/setup, redirect to /account
    if (
      request.nextUrl.pathname === "/auth" ||
      request.nextUrl.pathname === "/account/setup"
    ) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  // Allow the request to continue if no redirection is needed
}

// Define the paths the middleware should match
export const config = {
  matcher: ["/auth", "/account", "/account/setup"],
};
