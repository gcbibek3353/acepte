-- CreateTable
CREATE TABLE "public"."fill_blanks_dropdown_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "fill_blanks_dropdown_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_dropdown_blank" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "passageId" TEXT NOT NULL,
    "correctIndex" INTEGER NOT NULL,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fill_blanks_dropdown_blank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_dropdown_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fill_blanks_dropdown_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_dropdown_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fill_blanks_dropdown_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_multiple_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "multiple_choice_multiple_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_multiple_question" (
    "id" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multiple_choice_multiple_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_multiple_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "multiple_choice_multiple_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_multiple_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedOptions" TEXT[],
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multiple_choice_multiple_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_multiple_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "multiple_choice_multiple_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reorder_paragraph_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "reorder_paragraph_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reorder_paragraph_item" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "correctOrder" INTEGER NOT NULL,
    "passageId" TEXT NOT NULL,

    CONSTRAINT "reorder_paragraph_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reorder_paragraph_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "userOrder" TEXT[],
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reorder_paragraph_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reorder_paragraph_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reorder_paragraph_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_drag_drop_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "fill_blanks_drag_drop_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_drag_drop_blank" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "passageId" TEXT NOT NULL,
    "correctOptionId" TEXT NOT NULL,

    CONSTRAINT "fill_blanks_drag_drop_blank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_drag_drop_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "blankPosition" INTEGER,

    CONSTRAINT "fill_blanks_drag_drop_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_drag_drop_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fill_blanks_drag_drop_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fill_blanks_drag_drop_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fill_blanks_drag_drop_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_single_passage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "multiple_choice_single_passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_single_question" (
    "id" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multiple_choice_single_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_single_option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "multiple_choice_single_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_single_answer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multiple_choice_single_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."multiple_choice_single_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "multiple_choice_single_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fill_blanks_dropdown_passage_questionId_key" ON "public"."fill_blanks_dropdown_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "fill_blanks_dropdown_bookmark_userId_passageId_key" ON "public"."fill_blanks_dropdown_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "multiple_choice_multiple_passage_questionId_key" ON "public"."multiple_choice_multiple_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "multiple_choice_multiple_question_passageId_key" ON "public"."multiple_choice_multiple_question"("passageId");

-- CreateIndex
CREATE UNIQUE INDEX "multiple_choice_multiple_bookmark_userId_passageId_key" ON "public"."multiple_choice_multiple_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "reorder_paragraph_passage_questionId_key" ON "public"."reorder_paragraph_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "reorder_paragraph_bookmark_userId_passageId_key" ON "public"."reorder_paragraph_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "fill_blanks_drag_drop_passage_questionId_key" ON "public"."fill_blanks_drag_drop_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "fill_blanks_drag_drop_blank_correctOptionId_key" ON "public"."fill_blanks_drag_drop_blank"("correctOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "fill_blanks_drag_drop_bookmark_userId_passageId_key" ON "public"."fill_blanks_drag_drop_bookmark"("userId", "passageId");

-- CreateIndex
CREATE UNIQUE INDEX "multiple_choice_single_passage_questionId_key" ON "public"."multiple_choice_single_passage"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "multiple_choice_single_question_passageId_key" ON "public"."multiple_choice_single_question"("passageId");

-- CreateIndex
CREATE UNIQUE INDEX "multiple_choice_single_bookmark_userId_passageId_key" ON "public"."multiple_choice_single_bookmark"("userId", "passageId");

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_dropdown_blank" ADD CONSTRAINT "fill_blanks_dropdown_blank_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_dropdown_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_dropdown_answer" ADD CONSTRAINT "fill_blanks_dropdown_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_dropdown_answer" ADD CONSTRAINT "fill_blanks_dropdown_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_dropdown_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_dropdown_bookmark" ADD CONSTRAINT "fill_blanks_dropdown_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_dropdown_bookmark" ADD CONSTRAINT "fill_blanks_dropdown_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_dropdown_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_question" ADD CONSTRAINT "multiple_choice_multiple_question_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_multiple_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_option" ADD CONSTRAINT "multiple_choice_multiple_option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."multiple_choice_multiple_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_answer" ADD CONSTRAINT "multiple_choice_multiple_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_answer" ADD CONSTRAINT "multiple_choice_multiple_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_multiple_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_bookmark" ADD CONSTRAINT "multiple_choice_multiple_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_multiple_bookmark" ADD CONSTRAINT "multiple_choice_multiple_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_multiple_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reorder_paragraph_item" ADD CONSTRAINT "reorder_paragraph_item_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."reorder_paragraph_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reorder_paragraph_answer" ADD CONSTRAINT "reorder_paragraph_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reorder_paragraph_answer" ADD CONSTRAINT "reorder_paragraph_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."reorder_paragraph_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reorder_paragraph_bookmark" ADD CONSTRAINT "reorder_paragraph_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reorder_paragraph_bookmark" ADD CONSTRAINT "reorder_paragraph_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."reorder_paragraph_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_blank" ADD CONSTRAINT "fill_blanks_drag_drop_blank_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_drag_drop_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_blank" ADD CONSTRAINT "fill_blanks_drag_drop_blank_correctOptionId_fkey" FOREIGN KEY ("correctOptionId") REFERENCES "public"."fill_blanks_drag_drop_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_option" ADD CONSTRAINT "fill_blanks_drag_drop_option_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_drag_drop_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_answer" ADD CONSTRAINT "fill_blanks_drag_drop_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_answer" ADD CONSTRAINT "fill_blanks_drag_drop_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_drag_drop_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_bookmark" ADD CONSTRAINT "fill_blanks_drag_drop_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fill_blanks_drag_drop_bookmark" ADD CONSTRAINT "fill_blanks_drag_drop_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."fill_blanks_drag_drop_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_single_question" ADD CONSTRAINT "multiple_choice_single_question_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_single_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_single_option" ADD CONSTRAINT "multiple_choice_single_option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."multiple_choice_single_question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_single_answer" ADD CONSTRAINT "multiple_choice_single_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_single_answer" ADD CONSTRAINT "multiple_choice_single_answer_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_single_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_single_bookmark" ADD CONSTRAINT "multiple_choice_single_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."multiple_choice_single_bookmark" ADD CONSTRAINT "multiple_choice_single_bookmark_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "public"."multiple_choice_single_passage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
