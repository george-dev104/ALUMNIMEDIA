-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "sub" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "youtube_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_joined" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "profile_image_src" TEXT,
    "banner_image_src" TEXT,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "sub" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "membership" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "channels_sub_key" ON "channels"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "channels_username_key" ON "channels"("username");

-- CreateIndex
CREATE UNIQUE INDEX "channels_youtube_url_key" ON "channels"("youtube_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_sub_key" ON "users"("sub");

