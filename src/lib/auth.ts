import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import EmailProvider from "next-auth/providers/email";
import { Client } from "postmark";
import type { JWT } from "next-auth/jwt";
import type { Session, TokenUser, User } from "next-auth";

const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN ?? "");

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: { email: identifier },
          select: { emailVerified: true },
        });

        const isNewUser = user ? user.emailVerified === null : true;
        let templateId;

        if (isNewUser) {
          templateId = process.env.POSTMARK_FIRST_SIGN_IN_TEMPLATE; // Template for new users
        } else {
          templateId = process.env.POSTMARK_SIGN_IN_TEMPLATE; // Template for existing users
        }

        if (!templateId) {
          throw new Error("Template ID is missing");
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          To: identifier,
          From: provider.from as string,
          TemplateModel: {
            action_url: url,
            product_name: "Alumni Media",
            product_url: "https://www.alumnimedia.com",
            support_email: "amn@alumnimedia.com",
          },
          Headers: [
            {
              Name: "X-Entity-Ref-ID",
              Value: new Date().getTime() + "",
            },
          ],
        });

        if (result.ErrorCode) {
          throw new Error(result.Message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
    }: {
      token: JWT & { user?: TokenUser };
      user?: User;
      trigger?: string;
    }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          accountType: user.accountType,
        };
      } else if (trigger === "update") {
        const dbUser = await db.user.findUnique({
          where: { id: (token.user as TokenUser).id },
        });

        if (dbUser) {
          token.user = {
            id: dbUser.id,
            email: dbUser.email,
            first_name: dbUser.first_name || "",
            last_name: dbUser.last_name || "",
            accountType: dbUser.accountType || "",
          };
        }
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { user?: TokenUser };
    }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          email: token.user.email,
          first_name: token.user.first_name,
          last_name: token.user.last_name,
          accountType: token.user.accountType,
        };
      }

      return session;
    },
  },
};
