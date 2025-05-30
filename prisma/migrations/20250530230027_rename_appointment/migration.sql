/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Appointment";

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "animalName" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "service" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);
