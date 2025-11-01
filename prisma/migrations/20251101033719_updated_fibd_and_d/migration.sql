/*
  Warnings:

  - You are about to drop the column `correctOptionId` on the `fill_blanks_drag_drop_blank` table. All the data in the column will be lost.
  - You are about to drop the `fill_blanks_drag_drop_option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correctOptionIndex` to the `fill_blanks_drag_drop_blank` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_blank" DROP CONSTRAINT "fill_blanks_drag_drop_blank_correctOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_option" DROP CONSTRAINT "fill_blanks_drag_drop_option_passageId_fkey";

-- DropIndex
DROP INDEX "public"."fill_blanks_drag_drop_blank_correctOptionId_key";

-- AlterTable
ALTER TABLE "public"."fill_blanks_drag_drop_blank" DROP COLUMN "correctOptionId",
ADD COLUMN     "correctOptionIndex" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."fill_blanks_drag_drop_option";
