-- CreateEnum
CREATE TYPE "public"."MockTestStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."MockTestAttemptStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'TIMED_OUT');

-- CreateEnum
CREATE TYPE "public"."MockTestQuestionType" AS ENUM ('READ_ALOUD', 'REPEAT_SENTENCE', 'DESCRIBE_IMAGE', 'RETELL_LECTURE', 'ANSWER_SHORT_QUESTION', 'SUMMARIZE_WRITTEN_TEXT', 'WRITE_ESSAY', 'READING_MCM', 'READING_MCS', 'REORDER_PARAGRAPHS', 'READING_FILL_BLANKS_DRAG_DROP', 'READING_FILL_BLANKS_DROPDOWN', 'SUMMARIZE_SPOKEN_TEXT', 'LISTENING_MCM', 'LISTENING_MCS', 'LISTENING_FILL_BLANKS', 'LISTENING_HIGHLIGHT_SUMMARY', 'LISTENING_SELECT_MISSING_WORD', 'LISTENING_HIGHLIGHT_INCORRECT_WORDS', 'WRITE_FROM_DICTATION');

-- CreateTable
CREATE TABLE "public"."mock_test" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."MockTestStatus" NOT NULL DEFAULT 'DRAFT',
    "totalTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "mock_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mock_test_section" (
    "id" TEXT NOT NULL,
    "mockTestId" TEXT NOT NULL,
    "section" "public"."PteSection" NOT NULL,
    "order" INTEGER NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "instructions" TEXT,

    CONSTRAINT "mock_test_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mock_test_question" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "questionType" "public"."MockTestQuestionType" NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "mock_test_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mock_test_attempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mockTestId" TEXT NOT NULL,
    "status" "public"."MockTestAttemptStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mock_test_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mock_test_section_attempt" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "section" "public"."PteSection" NOT NULL,
    "status" "public"."MockTestAttemptStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "timeSpent" INTEGER,

    CONSTRAINT "mock_test_section_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mock_test_response" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "mockTestQuestionId" TEXT NOT NULL,
    "answerData" JSONB,
    "audioUrl" TEXT,
    "duration" INTEGER,
    "totalScore" DOUBLE PRECISION,
    "contentScore" DOUBLE PRECISION,
    "formScore" DOUBLE PRECISION,
    "grammarScore" DOUBLE PRECISION,
    "vocabularyScore" DOUBLE PRECISION,
    "spellingScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "isEvaluated" BOOLEAN NOT NULL DEFAULT false,
    "evaluatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mock_test_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mock_test_score" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "speakingScore" DOUBLE PRECISION,
    "writingScore" DOUBLE PRECISION,
    "readingScore" DOUBLE PRECISION,
    "listeningScore" DOUBLE PRECISION,
    "overallScore" DOUBLE PRECISION,
    "grammarScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "spellingScore" DOUBLE PRECISION,
    "vocabularyScore" DOUBLE PRECISION,
    "writtenDiscourse" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mock_test_score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mock_test_section_mockTestId_section_key" ON "public"."mock_test_section"("mockTestId", "section");

-- CreateIndex
CREATE UNIQUE INDEX "mock_test_question_sectionId_order_key" ON "public"."mock_test_question"("sectionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "mock_test_section_attempt_attemptId_section_key" ON "public"."mock_test_section_attempt"("attemptId", "section");

-- CreateIndex
CREATE UNIQUE INDEX "mock_test_response_attemptId_mockTestQuestionId_key" ON "public"."mock_test_response"("attemptId", "mockTestQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "mock_test_score_attemptId_key" ON "public"."mock_test_score"("attemptId");

-- AddForeignKey
ALTER TABLE "public"."mock_test_section" ADD CONSTRAINT "mock_test_section_mockTestId_fkey" FOREIGN KEY ("mockTestId") REFERENCES "public"."mock_test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_question" ADD CONSTRAINT "mock_test_question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."mock_test_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_attempt" ADD CONSTRAINT "mock_test_attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_attempt" ADD CONSTRAINT "mock_test_attempt_mockTestId_fkey" FOREIGN KEY ("mockTestId") REFERENCES "public"."mock_test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_section_attempt" ADD CONSTRAINT "mock_test_section_attempt_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."mock_test_attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_response" ADD CONSTRAINT "mock_test_response_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."mock_test_attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_response" ADD CONSTRAINT "mock_test_response_mockTestQuestionId_fkey" FOREIGN KEY ("mockTestQuestionId") REFERENCES "public"."mock_test_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mock_test_score" ADD CONSTRAINT "mock_test_score_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."mock_test_attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
