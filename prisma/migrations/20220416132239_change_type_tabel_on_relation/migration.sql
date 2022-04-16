/*
  Warnings:

  - You are about to drop the column `cross` on the `TabelOnRelation` table. All the data in the column will be lost.
  - You are about to drop the column `main` on the `TabelOnRelation` table. All the data in the column will be lost.
  - Added the required column `crossId` to the `TabelOnRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainId` to the `TabelOnRelation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TabelOnRelation" (
    "mainTabelId" INTEGER NOT NULL,
    "relationId" INTEGER NOT NULL,
    "mainId" INTEGER NOT NULL,
    "crossId" INTEGER NOT NULL,

    PRIMARY KEY ("mainTabelId", "relationId"),
    CONSTRAINT "TabelOnRelation_mainTabelId_fkey" FOREIGN KEY ("mainTabelId") REFERENCES "Tabel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TabelOnRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TabelOnRelation" ("mainTabelId", "relationId") SELECT "mainTabelId", "relationId" FROM "TabelOnRelation";
DROP TABLE "TabelOnRelation";
ALTER TABLE "new_TabelOnRelation" RENAME TO "TabelOnRelation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
