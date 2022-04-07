-- CreateTable
CREATE TABLE "Tabel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Field" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "tabelId" INTEGER,
    "dataTypeId" INTEGER NOT NULL,
    CONSTRAINT "Field_tabelId_fkey" FOREIGN KEY ("tabelId") REFERENCES "Tabel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Field_dataTypeId_fkey" FOREIGN KEY ("dataTypeId") REFERENCES "DataType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DataType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Field_dataTypeId_key" ON "Field"("dataTypeId");
