/*
  Warnings:

  - You are about to drop the `TabelRelation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Relation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tabel" ADD COLUMN "relationId" INTEGER;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TabelRelation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TabelOnRelation" (
    "tabelId" INTEGER NOT NULL,
    "relationId" INTEGER NOT NULL,
    "main" TEXT NOT NULL,
    "cross" TEXT NOT NULL,

    PRIMARY KEY ("tabelId", "relationId"),
    CONSTRAINT "TabelOnRelation_tabelId_fkey" FOREIGN KEY ("tabelId") REFERENCES "Tabel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TabelOnRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RelationToTabel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Relation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tabel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);
INSERT INTO "new_Relation" ("id", "name") SELECT "id", "name" FROM "Relation";
DROP TABLE "Relation";
ALTER TABLE "new_Relation" RENAME TO "Relation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_RelationToTabel_AB_unique" ON "_RelationToTabel"("A", "B");

-- CreateIndex
CREATE INDEX "_RelationToTabel_B_index" ON "_RelationToTabel"("B");
