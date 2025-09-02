/*
  Warnings:

  - You are about to drop the column `questionId` on the `listening_mcm_option` table. All the data in the column will be lost.
  - You are about to drop the column `selectedOption` on the `listening_mcs_answer` table. All the data in the column will be lost.
  - You are about to drop the column `selectedOption` on the `listening_select_missing_word_answer` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `multiple_choice_multiple_option` table. All the data in the column will be lost.
  - You are about to drop the column `selectedOption` on the `multiple_choice_single_answer` table. All the data in the column will be lost.
  - You are about to drop the `listening_mcm_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listening_mcs_option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listening_select_missing_word_option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `multiple_choice_multiple_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `multiple_choice_single_option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `multiple_choice_single_question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passageId` to the `listening_mcm_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `listening_mcm_passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedOptionIndex` to the `listening_mcs_answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctOptionIndex` to the `listening_mcs_passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedOptionIndex` to the `listening_select_missing_word_answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctOptionIndex` to the `listening_select_missing_word_passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passageId` to the `multiple_choice_multiple_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `multiple_choice_multiple_passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedOptionIndex` to the `multiple_choice_single_answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctOptionIndex` to the `multiple_choice_single_passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `multiple_choice_single_passage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."listening_mcm_option" DROP CONSTRAINT "listening_mcm_option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."listening_mcm_question" DROP CONSTRAINT "listening_mcm_question_passageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."listening_mcs_option" DROP CONSTRAINT "listening_mcs_option_passageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."listening_select_missing_word_option" DROP CONSTRAINT "listening_select_missing_word_option_passageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."multiple_choice_multiple_option" DROP CONSTRAINT "multiple_choice_multiple_option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."multiple_choice_multiple_question" DROP CONSTRAINT "multiple_choice_multiple_question_passageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."multiple_choice_single_option" DROP CONSTRAINT "multiple_choice_single_option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."multiple_choice_single_question" DROP CONSTRAINT "multiple_choice_single_question_passageId_fkey";

-- AlterTable
ALTER TABLE "public"."listening_mcm_option" DROP COLUMN "questionId",
ADD COLUMN     "passageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."listening_mcm_passage" ADD COLUMN     "questionText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."listening_mcs_answer" DROP COLUMN "selectedOption",
ADD COLUMN     "selectedOptionIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."listening_mcs_passage" ADD COLUMN     "correctOptionIndex" INTEGER NOT NULL,
ADD COLUMN     "options" TEXT[];

-- AlterTable
ALTER TABLE "public"."listening_select_missing_word_answer" DROP COLUMN "selectedOption",
ADD COLUMN     "selectedOptionIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."listening_select_missing_word_passage" ADD COLUMN     "correctOptionIndex" INTEGER NOT NULL,
ADD COLUMN     "options" TEXT[];

-- AlterTable
ALTER TABLE "public"."multiple_choice_multiple_option" DROP COLUMN "questionId",
ADD COLUMN     "passageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."multiple_choice_multiple_passage" ADD COLUMN     "questionText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."multiple_choice_single_answer" DROP COLUMN "selectedOption",
ADD COLUMN     "selectedOptionIndex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."multiple_choice_single_passage" ADD COLUMN     "correctOptionIndex" INTEGER NOT NULL,
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "questionText" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."listening_mcm_question";

-- DropTable
DROP TABLE "public"."listening_mcs_option";

-- DropTable
DROP TABLE "public"."listening_select_missing_word_option";

-- DropTable
DROP TABLE "public"."multiple_choice_multiple_question";

-- DropTable
DROP TABLE "public"."multiple_choice_single_option";

-- DropTable
DROP TABLE "public"."multiple_choice_single_question";

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_option" ADD CONSTRAINT "multiple_choice_multiple_option_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_multiple_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_option" ADD CONSTRAINT "listening_mcm_option_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcm_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
