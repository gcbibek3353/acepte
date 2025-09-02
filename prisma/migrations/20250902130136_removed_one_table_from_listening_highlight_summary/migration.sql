/*
  Warnings:

  - You are about to drop the column `selectedOption` on the `listening_highlight_summary_answer` table. All the data in the column will be lost.
  - You are about to drop the `listening_highlight_summary_option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `selectedOptionIndex` to the `listening_highlight_summary_answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctOptionIndex` to the `listening_highlight_summary_passage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."listening_highlight_summary_option" DROP CONSTRAINT "listening_highlight_summary_option_passageId_fkey";

-- AlterTable
ALTER TABLE "public"."listening_highlight_summary_answer" DROP COLUMN "selectedOption",
ADD COLUMN     "selectedOptionIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."listening_highlight_summary_passage" ADD COLUMN     "correctOptionIndex" INTEGER NOT NULL,
ADD COLUMN     "options" TEXT[];

-- DropTable
DROP TABLE "public"."listening_highlight_summary_option";
