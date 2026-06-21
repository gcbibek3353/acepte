import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadImageToS3 } from "./uploadImage";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.resolve(__dirname, "describeImage");
const S3_SUBDIR = "speaking-describe-image";

const questions = [
  {
    questionId: "DI001",
    title: "Internet Users Via Mobile Phone",
    imageFile: "image-ba78c17f76fdb9c56f6f91f17d7d924f.jpg",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "DI002",
    title: "Nutritional Composition",
    imageFile: "image-5612728d1f5268d7884e4657ed2fe816.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "DI003",
    title: "Egg Experiment",
    imageFile: "image-2a29f78d-f6a1-46c4-bbb4-6da025d584e7.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI004",
    title: "Satisfaction Levels",
    imageFile: "image-8aa6d5d8-6e95-44a8-ab20-a70ee1924b93.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI005",
    title: "Customer Purchasing Reasons",
    imageFile: "image-fa6ebd0c-f885-4543-b6a3-a6c7d313253a.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI006",
    title: "Online Purchase Trend",
    imageFile: "image-b96a1319-0c55-43b6-aa8d-e75ad85e8602.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI007",
    title: "Uninstallation of APPS",
    imageFile: "image-b45916f3-c83c-49c5-a91c-2286021578ef.jpeg",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI008",
    title: "Film Producing Nations",
    imageFile: "image-33e0caf0-646d-4e4b-a844-d7e33c9c2a83.jpeg",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI009",
    title: "Number of Vehicles",
    imageFile: "image-150ee52c-3f46-498d-ae93-1b00583ae563.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI010",
    title: "Grasshopper Life Cycle",
    imageFile: "image-1e288f79-d9bc-4232-8fc1-75310ed523e3.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "DI011",
    title: "Satellite Image",
    imageFile: "image-5a9e627d011147f374721fac5f7862d9.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "DI012",
    title: "Atlantic Cod Stocks",
    imageFile: "image-e6dadf71b2dab6b0f880ea8c4359161b.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "DI013",
    title: "Rice and Grains",
    imageFile: "image-45b9536392a9c815a864703c7fc61721.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "DI014",
    title: "Skull",
    imageFile: "image-9c8b7725defb98bdf471b37b3cc0a9ee.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "DI015",
    title: "Beach",
    imageFile: "image-5bee6ec20c9e28301105e47e79df0f1a.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "DI016",
    title: "Tree Rings",
    imageFile: "image-bccd132c67c14693ea6a57af3bb91be0.webp",
    instruction:
      "Analyze and describe the information presented in this image.",
    difficulty: "HARD" as const,
  },
];

const createDescribeImageQuestions = async () => {
  try {
    console.log("Starting to add Describe Image questions to the database...");

    for (const questionData of questions) {
      const existingQuestion =
        await prisma.speakingDescribeImageQuestion.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      console.log(
        `⬆️  Uploading image for ${questionData.questionId}: ${questionData.imageFile}`,
      );
      const imageUrl = await uploadImageToS3(
        IMAGE_DIR,
        questionData.imageFile,
        S3_SUBDIR,
      );
      console.log(`   → ${imageUrl}`);

      await prisma.speakingDescribeImageQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          imageUrl,
          instruction: questionData.instruction,
          difficulty: questionData.difficulty,
        },
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
    }

    console.log(
      "✅ All Describe Image questions have been processed successfully!",
    );

    const totalQuestions = await prisma.speakingDescribeImageQuestion.count();
    console.log(
      `📊 Total Describe Image questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating Describe Image questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createDescribeImageQuestions();
