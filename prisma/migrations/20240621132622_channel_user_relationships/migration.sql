/*
  Warnings:

  - You are about to drop the column `sub` on the `Channel` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Channel_sub_key";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "sub",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "canHaveMultipleChannels" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
