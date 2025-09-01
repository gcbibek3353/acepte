-- CreateTable
CREATE TABLE "public"."summarize_spoken_text_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioTranscribedText" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "summarize_spoken_text_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."summarize_spoken_text_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "wordCount" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "formScore" DOUBLE PRECISION,
    "grammarScore" DOUBLE PRECISION,
    "vocabularyScore" DOUBLE PRECISION,
    "spellingScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "summarize_spoken_text_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."summarize_spoken_text_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "summarize_spoken_text_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcm_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioTranscribedText" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_mcm_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcm_question" (
    "id" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_mcm_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcm_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "listening_mcm_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcm_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedOptions" TEXT[],
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_mcm_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcm_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_mcm_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_fill_blank_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioTranscribedText" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "passage" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_fill_blank_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_fill_blank" (
    "id" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "correctWord" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_fill_blank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_fill_blank_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_fill_blank_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_fill_blank_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_fill_blank_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_summary_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "passage" TEXT,
    "questionText" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_highlight_summary_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_summary_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "passageId" TEXT NOT NULL,

    CONSTRAINT "listening_highlight_summary_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_summary_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_highlight_summary_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_summary_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_highlight_summary_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcs_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_mcs_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcs_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "passageId" TEXT NOT NULL,

    CONSTRAINT "listening_mcs_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcs_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_mcs_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_mcs_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_mcs_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_select_missing_word_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "instruction" TEXT,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_select_missing_word_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_select_missing_word_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "passageId" TEXT NOT NULL,

    CONSTRAINT "listening_select_missing_word_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_select_missing_word_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_select_missing_word_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_select_missing_word_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_select_missing_word_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_incorrect_words_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "passage" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_highlight_incorrect_words_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_incorrect_word" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_incorrect_word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_incorrect_words_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedWords" TEXT[],
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_highlight_incorrect_words_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_highlight_incorrect_words_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_highlight_incorrect_words_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_write_from_dictation_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_write_from_dictation_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_write_from_dictation_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listening_write_from_dictation_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listening_write_from_dictation_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listening_write_from_dictation_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "summarize_spoken_text_question_questionId_key" ON "public"."summarize_spoken_text_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "summarize_spoken_text_bookmark_userId_questionId_key" ON "public"."summarize_spoken_text_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_mcm_passage_questionId_key" ON "public"."listening_mcm_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_mcm_question_passageId_key" ON "public"."listening_mcm_question"("passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_mcm_bookmark_userId_passageId_key" ON "public"."listening_mcm_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_fill_blank_passage_questionId_key" ON "public"."listening_fill_blank_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_fill_blank_bookmark_userId_passageId_key" ON "public"."listening_fill_blank_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_highlight_summary_passage_questionId_key" ON "public"."listening_highlight_summary_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_highlight_summary_bookmark_userId_passageId_key" ON "public"."listening_highlight_summary_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_mcs_passage_questionId_key" ON "public"."listening_mcs_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_mcs_bookmark_userId_passageId_key" ON "public"."listening_mcs_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_select_missing_word_passage_questionId_key" ON "public"."listening_select_missing_word_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_select_missing_word_bookmark_userId_passageId_key" ON "public"."listening_select_missing_word_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_highlight_incorrect_words_passage_questionId_key" ON "public"."listening_highlight_incorrect_words_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_highlight_incorrect_words_bookmark_userId_passage_key" ON "public"."listening_highlight_incorrect_words_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_write_from_dictation_passage_questionId_key" ON "public"."listening_write_from_dictation_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "listening_write_from_dictation_bookmark_userId_passageId_key" ON "public"."listening_write_from_dictation_bookmark"("userId", "passageId");

-- AddForeignKey
ALTER TABLE "public"."summarize_spoken_text_answer" ADD CONSTRAINT "summarize_spoken_text_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_spoken_text_answer" ADD CONSTRAINT "summarize_spoken_text_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."summarize_spoken_text_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_spoken_text_bookmark" ADD CONSTRAINT "summarize_spoken_text_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."summarize_spoken_text_bookmark" ADD CONSTRAINT "summarize_spoken_text_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."summarize_spoken_text_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_question" ADD CONSTRAINT "listening_mcm_question_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcm_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_option" ADD CONSTRAINT "listening_mcm_option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."listening_mcm_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_answer" ADD CONSTRAINT "listening_mcm_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_answer" ADD CONSTRAINT "listening_mcm_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcm_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_bookmark" ADD CONSTRAINT "listening_mcm_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcm_bookmark" ADD CONSTRAINT "listening_mcm_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcm_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_fill_blank" ADD CONSTRAINT "listening_fill_blank_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_fill_blank_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_fill_blank_answer" ADD CONSTRAINT "listening_fill_blank_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_fill_blank_answer" ADD CONSTRAINT "listening_fill_blank_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_fill_blank_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_fill_blank_bookmark" ADD CONSTRAINT "listening_fill_blank_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_fill_blank_bookmark" ADD CONSTRAINT "listening_fill_blank_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_fill_blank_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_summary_option" ADD CONSTRAINT "listening_highlight_summary_option_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_highlight_summary_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_summary_answer" ADD CONSTRAINT "listening_highlight_summary_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_summary_answer" ADD CONSTRAINT "listening_highlight_summary_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_highlight_summary_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_summary_bookmark" ADD CONSTRAINT "listening_highlight_summary_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_summary_bookmark" ADD CONSTRAINT "listening_highlight_summary_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_highlight_summary_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcs_option" ADD CONSTRAINT "listening_mcs_option_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcs_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcs_answer" ADD CONSTRAINT "listening_mcs_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcs_answer" ADD CONSTRAINT "listening_mcs_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcs_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcs_bookmark" ADD CONSTRAINT "listening_mcs_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_mcs_bookmark" ADD CONSTRAINT "listening_mcs_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_mcs_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_select_missing_word_option" ADD CONSTRAINT "listening_select_missing_word_option_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_select_missing_word_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_select_missing_word_answer" ADD CONSTRAINT "listening_select_missing_word_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_select_missing_word_answer" ADD CONSTRAINT "listening_select_missing_word_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_select_missing_word_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_select_missing_word_bookmark" ADD CONSTRAINT "listening_select_missing_word_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_select_missing_word_bookmark" ADD CONSTRAINT "listening_select_missing_word_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_select_missing_word_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_incorrect_word" ADD CONSTRAINT "listening_incorrect_word_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_highlight_incorrect_words_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_incorrect_words_answer" ADD CONSTRAINT "listening_highlight_incorrect_words_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_incorrect_words_answer" ADD CONSTRAINT "listening_highlight_incorrect_words_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_highlight_incorrect_words_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_incorrect_words_bookmark" ADD CONSTRAINT "listening_highlight_incorrect_words_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_highlight_incorrect_words_bookmark" ADD CONSTRAINT "listening_highlight_incorrect_words_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_highlight_incorrect_words_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_write_from_dictation_answer" ADD CONSTRAINT "listening_write_from_dictation_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_write_from_dictation_answer" ADD CONSTRAINT "listening_write_from_dictation_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_write_from_dictation_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_write_from_dictation_bookmark" ADD CONSTRAINT "listening_write_from_dictation_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."listening_write_from_dictation_bookmark" ADD CONSTRAINT "listening_write_from_dictation_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."listening_write_from_dictation_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
