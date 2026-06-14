import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { fileURLToPath } from "url";

import { uploadAudioToS3 } from "./uploadAudio";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.resolve(__dirname, "selectMissingword");
const S3_SUBDIR = "listening-select-missing-word";

const questions = [
  {
    questionId: "SMW001",
    title: "Happiest Times",
    audioFile: "audio-d723c961-557a-42cd-82b5-3debe8374344.mp3",
    instruction:
      "Listen to the recording and select the word or phrase that completes the sentence.",
    options: [
      "studying and partying",
      "work and life",
      "studying and computer games",
      "friends and parents",
    ],
    correctOptionIndex: 0,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW002",
    title: "Insurance",
    audioFile: "audio-ea10b2ce-2ba0-45a0-9457-ffee985ef92b.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["insurance", "problems", "security", "accident"],
    correctOptionIndex: 0,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW003",
    title: "Science",
    audioFile: "audio-daaf3418-0317-44d0-b90e-4f9615016e22.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["discovery", "math", "humanity", "space"],
    correctOptionIndex: 0,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW004",
    title: "Domestic Animals",
    audioFile: "audio-d49e879d-4293-4387-af07-e59b28ec5a85.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["follow", "accept", "repeat", "end"],
    correctOptionIndex: 0,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW005",
    title: "Hiroshi Ishiguro",
    audioFile: "audio-d48bbb3a-209d-48cf-9802-ced169f4a935.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: [
      "acting differently",
      "walking round",
      "discussing politics",
      "appearing elsewhere",
    ],
    correctOptionIndex: 1,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW006",
    title: "Food Preference",
    audioFile: "audio-c0c8dae2-8dbd-4a10-8e0e-679c074d2e39.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: [
      "eat plenty of vegetables every day",
      "has health benefits",
      "is recommended by doctors",
      "contains natural sugars",
    ],
    correctOptionIndex: 0,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW007",
    title: "Flowers",
    audioFile: "audio-51436725-d7e8-4b9d-b434-301057d17d1a.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["wrong", "changing", "true", "worthy"],
    correctOptionIndex: 2,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW008",
    title: "Attention Economy",
    audioFile: "audio-0cca50dc-faa4-4dee-b4b2-1c06ca236d3a.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["action", "game", "attention", "affection"],
    correctOptionIndex: 2,
    difficulty: "EASY" as const,
  },
  {
    questionId: "SMW009",
    title: "Faint Sound",
    audioFile: "audio-f78ae473-7a93-41a2-b7e4-0c37063fe541.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["calming", "illusory", "disturbing", "inaudible"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SMW010",
    title: "Surfing",
    audioFile: "audio-fe7a3c92-19fd-4617-93a3-bf638d2811e2.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: ["took place", "were at stake", "were discovered", "could fail"],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SMW011",
    title: "Presentation",
    audioFile: "audio-d468576a-c585-46c0-8423-b00cf006840c.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: [
      "they did not speak as clearly as they should have done",
      "they made an inappropriate choice of topic",
      "they used illustrations and evidence well",
      "they showed they had grasped the content of the course",
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SMW012",
    title: "Paper Money",
    audioFile: "audio-978be3f6-cf5a-4285-894c-dd8f3a512074.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["drafts", "notes", "accounts", "paper"],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SMW013",
    title: "Archaeological Site",
    audioFile: "audio-a5236635-baa3-4e5a-98f6-ffc98ae1163e.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: [
      "belonged to that culture",
      "are much older than expected",
      "are real",
      "could very possibly be fake",
    ],
    correctOptionIndex: 3,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "SMW014",
    title: "Microscope",
    audioFile: "audio-9e861346-113e-418c-a3b1-672d6bbbfacd.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["unreal", "complex", "invisible", "confusing"],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "SMW015",
    title: "Careers",
    audioFile: "audio-69a9d822-2d3a-40ae-a74b-b3a22736d189.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["successful", "hopeful", "realistic", "fulfilling"],
    correctOptionIndex: 2,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "SMW016",
    title: "Earth's Climate",
    audioFile: "audio-d5b25899-2f43-43b3-b2ba-ccacea99ae62.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: [
      "food production and health",
      "good production and wealth",
      "no production or health",
      "full production and wealth",
    ],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "SMW017",
    title: "Black Smokers",
    audioFile: "audio-24d96d0d-2bb6-4fc9-910b-cd8ca619a8d6.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: [
      "a very tall structure",
      "you can't see anything",
      "something rather uninteresting",
      "all this fabulous life",
    ],
    correctOptionIndex: 3,
    difficulty: "HARD" as const,
  },

  {
    questionId: "SMW018",
    title: "Art Never Die",
    audioFile: "audio-396e2658-e6c4-4a02-8859-6f830de8ba40.mp3",
    instruction:
      "Listen to the recording and select the phrase that completes the sentence.",
    options: ["demotivated", "dependent", "a longer form", "a shorter form"],
    correctOptionIndex: 2,
    difficulty: "HARD" as const,
  },

  {
    questionId: "SMW019",
    title: "Pirates",
    audioFile: "audio-d1a04f59-f8ee-415e-bf33-c51553827926.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["thrill", "language", "image", "episode"],
    correctOptionIndex: 2,
    difficulty: "HARD" as const,
  },

  {
    questionId: "SMW020",
    title: "Government",
    audioFile: "audio-eb4e17ca-ca9f-4cff-a036-0603820587c8.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["charity", "helping", "entitlement", "inclusion"],
    correctOptionIndex: 2,
    difficulty: "HARD" as const,
  },

  {
    questionId: "SMW021",
    title: "Cells of Mammals",
    audioFile: "audio-25a31af7-2f3e-4d5a-aea5-fb3f3218d9b1.mp3",
    instruction:
      "Listen to the recording and select the word that completes the sentence.",
    options: ["shape", "difference", "structure", "temperature"],
    correctOptionIndex: 3,
    difficulty: "HARD" as const,
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Select Missing Word questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.listeningSelectMissingWordPassage.findUnique({
          where: { questionId: question.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${question.questionId} already exists, skipping...`,
        );
        continue;
      }

      console.log(
        `⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`,
      );
      const audioUrl = await uploadAudioToS3(
        AUDIO_DIR,
        question.audioFile,
        S3_SUBDIR,
      );
      console.log(`   → ${audioUrl}`);

      const createdQuestion =
        await prisma.listeningSelectMissingWordPassage.create({
          data: {
            questionId: question.questionId,
            title: question.title,
            instruction: question.instruction,
            options: question.options,
            correctOptionIndex: question.correctOptionIndex,
            difficulty: question.difficulty,
            audioUrl,
          },
        });

      console.log(
        `✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`,
      );
    }

    console.log(
      "✅ All Select Missing Word questions have been processed successfully!",
    );

    const totalQuestions =
      await prisma.listeningSelectMissingWordPassage.count();
    console.log(
      `📊 Total Select Missing Word questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
