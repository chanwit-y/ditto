-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tabel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "relationId" INTEGER,
    "projectId" INTEGER,
    CONSTRAINT "Tabel_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tabel" ("description", "id", "name", "relationId") SELECT "description", "id", "name", "relationId" FROM "Tabel";
DROP TABLE "Tabel";
ALTER TABLE "new_Tabel" RENAME TO "Tabel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
