-- CreateEnum
CREATE TYPE "public"."PteSection" AS ENUM ('SPEAKING', 'WRITING', 'READING', 'LISTENING');

-- CreateTable
CREATE TABLE "public"."user_activity_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "section" "public"."PteSection" NOT NULL,
    "questionType" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_activity_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_activity_log_userId_submittedAt_idx" ON "public"."user_activity_log"("userId", "submittedAt");

-- CreateIndex
CREATE INDEX "user_activity_log_userId_section_idx" ON "public"."user_activity_log"("userId", "section");

-- AddForeignKey
ALTER TABLE "public"."user_activity_log" ADD CONSTRAINT "user_activity_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
