/*
  Warnings:

  - You are about to drop the column `youtube_url` on the `Channel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[youtube_id]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `youtube_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Made the column `profile_image_src` on table `Channel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banner_image_src` on table `Channel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Channel_youtube_url_key";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "youtube_url",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "youtube_id" TEXT NOT NULL,
ALTER COLUMN "profile_image_src" SET NOT NULL,
ALTER COLUMN "banner_image_src" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_youtube_id_key" ON "Channel"("youtube_id");
