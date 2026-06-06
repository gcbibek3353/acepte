-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "country" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "examDate" TIMESTAMP(3),
ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "targetScore" INTEGER;
