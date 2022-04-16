-- CreateTable
CREATE TABLE "Relation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TabelRelation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tabelId" INTEGER NOT NULL,
    "relationId" INTEGER NOT NULL,
    "main" TEXT NOT NULL,
    "cross" TEXT NOT NULL,
    CONSTRAINT "TabelRelation_tabelId_fkey" FOREIGN KEY ("tabelId") REFERENCES "Tabel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TabelRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
