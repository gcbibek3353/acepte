/*
  Warnings:

  - Changed the type of `selectedWords` on the `listening_highlight_incorrect_words_answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."listening_highlight_incorrect_words_answer" DROP COLUMN "selectedWords",
ADD COLUMN     "selectedWords" JSONB NOT NULL;
