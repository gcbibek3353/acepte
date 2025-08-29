-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "public"."write_essay_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "essayTitle" TEXT NOT NULL,
    "essay_description" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "min_word_limit" INTEGER,
    "max_word_limit" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "write_essay_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."write_essay_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "wordCount" INTEGER,
    "timeSpent" INTEGER,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "write_essay_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."write_essay_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "write_essay_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."summarize_written_text_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "textTitle" TEXT NOT NULL,
    "passage" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "min_word_limit" INTEGER,
    "max_word_limit" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "summarize_written_text_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."summarize_written_text_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "wordCount" INTEGER,
    "timeSpent" INTEGER,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "summarize_written_text_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."summarize_written_text_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "summarize_written_text_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "write_essay_question_questionId_key" ON "public"."write_essay_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "write_essay_bookmark_userId_questionId_key" ON "public"."write_essay_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "summarize_written_text_question_questionId_key" ON "public"."summarize_written_text_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "summarize_written_text_bookmark_userId_questionId_key" ON "public"."summarize_written_text_bookmark"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "public"."write_essay_answer" ADD CONSTRAINT "write_essay_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."write_essay_answer" ADD CONSTRAINT "write_essay_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."write_essay_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."write_essay_bookmark" ADD CONSTRAINT "write_essay_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."write_essay_bookmark" ADD CONSTRAINT "write_essay_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."write_essay_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_written_text_answer" ADD CONSTRAINT "summarize_written_text_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_written_text_answer" ADD CONSTRAINT "summarize_written_text_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."summarize_written_text_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_written_text_bookmark" ADD CONSTRAINT "summarize_written_text_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_written_text_bookmark" ADD CONSTRAINT "summarize_written_text_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."summarize_written_text_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
