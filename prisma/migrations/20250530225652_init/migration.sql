-- CreateTable
CREATE TABLE "Appointment" (
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

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);
