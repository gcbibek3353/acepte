/*
  Warnings:

  - You are about to drop the column `score` on the `summarize_written_text_answer` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpent` on the `summarize_written_text_answer` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `write_essay_answer` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpent` on the `write_essay_answer` table. All the data in the column will be lost.
  - You are about to drop the column `max_word_limit` on the `write_essay_question` table. All the data in the column will be lost.
  - You are about to drop the column `min_word_limit` on the `write_essay_question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."summarize_written_text_answer" DROP COLUMN "score",
DROP COLUMN "timeSpent",
ADD COLUMN     "contentScore" DOUBLE PRECISION,
ADD COLUMN     "formScore" DOUBLE PRECISION,
ADD COLUMN     "grammerScore" DOUBLE PRECISION,
ADD COLUMN     "totalScore" DOUBLE PRECISION,
ADD COLUMN     "vocabScore" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."write_essay_answer" DROP COLUMN "score",
DROP COLUMN "timeSpent",
ADD COLUMN     "DSCScore" DOUBLE PRECISION,
ADD COLUMN     "GLRScore" DOUBLE PRECISION,
ADD COLUMN     "contentScore" DOUBLE PRECISION,
ADD COLUMN     "formScore" DOUBLE PRECISION,
ADD COLUMN     "grammerScore" DOUBLE PRECISION,
ADD COLUMN     "spellingScore" DOUBLE PRECISION,
ADD COLUMN     "totalScore" DOUBLE PRECISION,
ADD COLUMN     "vocabScore" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."write_essay_question" DROP COLUMN "max_word_limit",
DROP COLUMN "min_word_limit";
