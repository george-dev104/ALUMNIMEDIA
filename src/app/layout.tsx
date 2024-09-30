// "use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import background_img from "@public/background.jpg";

const inter = Inter({ subsets: ["latin"] });

import { Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./redux/provider";
import SessionWrapper from "./components/SessionProvider";

const headingFont = Oswald({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alumni Media Network",
  description: "Alumni Media Network: STREAMING IN A LEAGUE OF ITS OWN",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <SessionWrapper>
          <body
            className={inter.className + " " + headingFont.className}
            style={{
              background: `url(${background_img.src})`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Toaster />
            {children}
          </body>
        </SessionWrapper>
      </ReduxProvider>
    </html>
  );
}
