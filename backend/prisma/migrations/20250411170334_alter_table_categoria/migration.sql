/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_categoriaId_fkey";

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
