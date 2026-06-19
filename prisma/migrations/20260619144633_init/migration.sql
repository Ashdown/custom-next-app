-- CreateTable
CREATE TABLE "Thing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Thing_pkey" PRIMARY KEY ("id")
);
