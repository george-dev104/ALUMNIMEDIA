import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      accountType?: string; // Ensure type is included here
      // Add other fields as needed
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    createdDate: Date;
    membership: string;
    isAdmin: boolean;
    accountType?: string; // Ensure type is included here
  }

  interface TokenUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    accountType?: string;
  }
}
