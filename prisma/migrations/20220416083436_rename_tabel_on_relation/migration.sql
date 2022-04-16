/*
  Warnings:

  - The primary key for the `TabelOnRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tabelId` on the `TabelOnRelation` table. All the data in the column will be lost.
  - Added the required column `mainTabelId` to the `TabelOnRelation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TabelOnRelation" (
    "mainTabelId" INTEGER NOT NULL,
    "relationId" INTEGER NOT NULL,
    "main" TEXT NOT NULL,
    "cross" TEXT NOT NULL,

    PRIMARY KEY ("mainTabelId", "relationId"),
    CONSTRAINT "TabelOnRelation_mainTabelId_fkey" FOREIGN KEY ("mainTabelId") REFERENCES "Tabel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TabelOnRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TabelOnRelation" ("cross", "main", "relationId") SELECT "cross", "main", "relationId" FROM "TabelOnRelation";
DROP TABLE "TabelOnRelation";
ALTER TABLE "new_TabelOnRelation" RENAME TO "TabelOnRelation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
