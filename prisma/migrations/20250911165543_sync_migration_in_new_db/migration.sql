-- CreateTable
CREATE TABLE "public"."speaking_read_aloud_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "passage" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_read_aloud_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_read_aloud_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_read_aloud_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_read_aloud_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_read_aloud_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_repeat_sentence_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_repeat_sentence_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_repeat_sentence_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_repeat_sentence_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_repeat_sentence_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_repeat_sentence_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_describe_image_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "instruction" TEXT,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_describe_image_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_describe_image_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_describe_image_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_describe_image_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_describe_image_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_retell_lecture_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "audioTranscribedText" TEXT,
    "imageUrl" TEXT,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_retell_lecture_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_retell_lecture_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_retell_lecture_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_retell_lecture_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_retell_lecture_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_answer_short_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "sampleAnswer" TEXT,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_answer_short_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_answer_short_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "vocabularyScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_answer_short_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_answer_short_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_answer_short_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_group_discussion_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "audioTranscribedText" TEXT,
    "topic" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_group_discussion_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_group_discussion_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_group_discussion_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_group_discussion_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_group_discussion_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_respond_situation_question" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "audioUrl" TEXT,
    "instruction" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_respond_situation_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_respond_situation_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "contentScore" DOUBLE PRECISION,
    "oralFluencyScore" DOUBLE PRECISION,
    "pronunciationScore" DOUBLE PRECISION,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaking_respond_situation_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speaking_respond_situation_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_respond_situation_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "speaking_read_aloud_question_questionId_key" ON "public"."speaking_read_aloud_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_read_aloud_bookmark_userId_questionId_key" ON "public"."speaking_read_aloud_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_repeat_sentence_question_questionId_key" ON "public"."speaking_repeat_sentence_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_repeat_sentence_bookmark_userId_questionId_key" ON "public"."speaking_repeat_sentence_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_describe_image_question_questionId_key" ON "public"."speaking_describe_image_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_describe_image_bookmark_userId_questionId_key" ON "public"."speaking_describe_image_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_retell_lecture_question_questionId_key" ON "public"."speaking_retell_lecture_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_retell_lecture_bookmark_userId_questionId_key" ON "public"."speaking_retell_lecture_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_answer_short_question_questionId_key" ON "public"."speaking_answer_short_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_answer_short_bookmark_userId_questionId_key" ON "public"."speaking_answer_short_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_group_discussion_question_questionId_key" ON "public"."speaking_group_discussion_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_group_discussion_bookmark_userId_questionId_key" ON "public"."speaking_group_discussion_bookmark"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_respond_situation_question_questionId_key" ON "public"."speaking_respond_situation_question"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "speaking_respond_situation_bookmark_userId_questionId_key" ON "public"."speaking_respond_situation_bookmark"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "public"."speaking_read_aloud_answer" ADD CONSTRAINT "speaking_read_aloud_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_read_aloud_answer" ADD CONSTRAINT "speaking_read_aloud_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_read_aloud_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_read_aloud_bookmark" ADD CONSTRAINT "speaking_read_aloud_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_read_aloud_bookmark" ADD CONSTRAINT "speaking_read_aloud_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_read_aloud_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_repeat_sentence_answer" ADD CONSTRAINT "speaking_repeat_sentence_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_repeat_sentence_answer" ADD CONSTRAINT "speaking_repeat_sentence_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_repeat_sentence_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_repeat_sentence_bookmark" ADD CONSTRAINT "speaking_repeat_sentence_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_repeat_sentence_bookmark" ADD CONSTRAINT "speaking_repeat_sentence_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_repeat_sentence_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_describe_image_answer" ADD CONSTRAINT "speaking_describe_image_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_describe_image_answer" ADD CONSTRAINT "speaking_describe_image_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_describe_image_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_describe_image_bookmark" ADD CONSTRAINT "speaking_describe_image_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_describe_image_bookmark" ADD CONSTRAINT "speaking_describe_image_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_describe_image_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_retell_lecture_answer" ADD CONSTRAINT "speaking_retell_lecture_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_retell_lecture_answer" ADD CONSTRAINT "speaking_retell_lecture_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_retell_lecture_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_retell_lecture_bookmark" ADD CONSTRAINT "speaking_retell_lecture_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_retell_lecture_bookmark" ADD CONSTRAINT "speaking_retell_lecture_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_retell_lecture_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_answer_short_answer" ADD CONSTRAINT "speaking_answer_short_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_answer_short_answer" ADD CONSTRAINT "speaking_answer_short_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_answer_short_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_answer_short_bookmark" ADD CONSTRAINT "speaking_answer_short_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_answer_short_bookmark" ADD CONSTRAINT "speaking_answer_short_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_answer_short_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_group_discussion_answer" ADD CONSTRAINT "speaking_group_discussion_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_group_discussion_answer" ADD CONSTRAINT "speaking_group_discussion_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_group_discussion_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_group_discussion_bookmark" ADD CONSTRAINT "speaking_group_discussion_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_group_discussion_bookmark" ADD CONSTRAINT "speaking_group_discussion_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_group_discussion_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_respond_situation_answer" ADD CONSTRAINT "speaking_respond_situation_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_respond_situation_answer" ADD CONSTRAINT "speaking_respond_situation_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_respond_situation_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_respond_situation_bookmark" ADD CONSTRAINT "speaking_respond_situation_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speaking_respond_situation_bookmark" ADD CONSTRAINT "speaking_respond_situation_bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."speaking_respond_situation_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
