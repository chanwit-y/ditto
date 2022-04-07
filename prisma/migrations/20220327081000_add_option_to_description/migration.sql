-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Field" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "length" INTEGER NOT NULL,
    "tabelId" INTEGER,
    "dataTypeId" INTEGER NOT NULL,
    CONSTRAINT "Field_tabelId_fkey" FOREIGN KEY ("tabelId") REFERENCES "Tabel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Field_dataTypeId_fkey" FOREIGN KEY ("dataTypeId") REFERENCES "DataType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Field" ("dataTypeId", "description", "id", "length", "name", "tabelId") SELECT "dataTypeId", "description", "id", "length", "name", "tabelId" FROM "Field";
DROP TABLE "Field";
ALTER TABLE "new_Field" RENAME TO "Field";
CREATE UNIQUE INDEX "Field_dataTypeId_key" ON "Field"("dataTypeId");
CREATE TABLE "new_DataType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_DataType" ("description", "id", "name") SELECT "description", "id", "name" FROM "DataType";
DROP TABLE "DataType";
ALTER TABLE "new_DataType" RENAME TO "DataType";
CREATE TABLE "new_Tabel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Tabel" ("description", "id", "name") SELECT "description", "id", "name" FROM "Tabel";
DROP TABLE "Tabel";
ALTER TABLE "new_Tabel" RENAME TO "Tabel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
