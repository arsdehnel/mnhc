-- CreateTable
CREATE TABLE "Trail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "pdfURL" TEXT NOT NULL,
    "videoURL" TEXT NOT NULL,
    "dnrURL" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);