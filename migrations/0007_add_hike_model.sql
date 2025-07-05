-- CreateTable
CREATE TABLE "Hike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "trailId" TEXT NOT NULL,
    "hikeDate" DATETIME NOT NULL,
    "comments" TEXT NOT NULL,
    CONSTRAINT "Hike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hike_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "Trail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Hike_userId_key" ON "Hike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Hike_trailId_key" ON "Hike"("trailId");

-- CreateIndex
CREATE INDEX "Hike_userId_idx" ON "Hike"("userId");

-- CreateIndex
CREATE INDEX "Hike_trailId_idx" ON "Hike"("trailId");
