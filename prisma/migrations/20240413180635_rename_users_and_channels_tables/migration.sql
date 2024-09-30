/*
  Warnings:

  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "channels";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "sub" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "youtube_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_joined" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "profile_image_src" TEXT,
    "banner_image_src" TEXT,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "sub" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "membership" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_sub_key" ON "Channel"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_username_key" ON "Channel"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_youtube_url_key" ON "Channel"("youtube_url");

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");
