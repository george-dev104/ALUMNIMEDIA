require('dotenv').config();

export const appInfo = {
    appName: "alumnimedianetwork",
    apiDomain: process.env.NEXT_PUBLIC_BASE_URL as string,
    websiteDomain: process.env.NEXT_PUBLIC_BASE_URL as string,
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth"
  }