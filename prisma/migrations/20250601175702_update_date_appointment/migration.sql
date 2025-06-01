/*
  Warnings:

  - You are about to drop the column `scheduledAt` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleDate` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "scheduledAt",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "scheduleDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
