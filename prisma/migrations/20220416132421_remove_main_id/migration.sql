/*
  Warnings:

  - You are about to drop the column `mainId` on the `TabelOnRelation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TabelOnRelation" (
    "mainTabelId" INTEGER NOT NULL,
    "relationId" INTEGER NOT NULL,
    "crossId" INTEGER NOT NULL,

    PRIMARY KEY ("mainTabelId", "relationId"),
    CONSTRAINT "TabelOnRelation_mainTabelId_fkey" FOREIGN KEY ("mainTabelId") REFERENCES "Tabel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TabelOnRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TabelOnRelation" ("crossId", "mainTabelId", "relationId") SELECT "crossId", "mainTabelId", "relationId" FROM "TabelOnRelation";
DROP TABLE "TabelOnRelation";
ALTER TABLE "new_TabelOnRelation" RENAME TO "TabelOnRelation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
