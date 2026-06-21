import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.resolve(__dirname, "answerShortQuestion");
const S3_SUBDIR = "speaking-answer-short";

const questions = [
  {
    questionId: "ASQ001",
    title: "Hair Care Product",
    audioFile: "audio-9ad324f7-e464-4d84-9f99-93a8b947bb49.mp3",
    questionText:
      "A liquid product that is specifically used for washing hair is called?",
    sampleAnswer: "Shampoo",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ002",
    title: "Computer Keyboard Key",
    audioFile: "audio-49df57ab-9984-41fb-95d2-9af8f3f0cd0c.mp3",
    questionText:
      "In a normal computer keyboard, which key can be used to delete the words you just typed?",
    sampleAnswer: "Backspace / Delete",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ003",
    title: "Sending Mail",
    audioFile: "audio-b219ed2d-f449-4174-b130-a0a622d0fa49.mp3",
    questionText:
      "Where do you go to send mail, a post office or a coffee house?",
    sampleAnswer: "Post Office",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ004",
    title: "Opposite of Negative",
    audioFile: "audio-81b31458-f7de-4c44-8aa2-804e1c4f16b9.mp3",
    questionText: "What is the opposite of negative?",
    sampleAnswer: "Positive",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ005",
    title: "English Vowels",
    audioFile: "audio-1c79c0b7-ac67-485d-8c4f-1f18f7313b8d.mp3",
    questionText: "In addition to A, E, I, and O, what is the other vowel?",
    sampleAnswer: "U",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ006",
    title: "Bank Deposits",
    audioFile: "audio-7fed85d2-5e0a-4982-9760-dcf16f32f706.mp3",
    questionText: "What is typically deposited in a bank?",
    sampleAnswer: "Money",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ007",
    title: "Italian Fast Food",
    audioFile: "audio-8d84251f-48cc-4eaa-bdc2-efcbfe6c79ba.mp3",
    questionText:
      "What is the Italian fast food dish made with topped flatbread, typically with cheese and tomatoes?",
    sampleAnswer: "Pizza",
    difficulty: "EASY" as const,
  },

  {
    questionId: "ASQ008",
    title: "Lighting a Stove",
    audioFile: "audio-1394b56f-9573-4cea-a586-e57849e97348.mp3",
    questionText: "What is needed to light a stove?",
    sampleAnswer: "Igniter / Lighter / Matchstick",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ009",
    title: "Recovering from Illness",
    audioFile: "audio-9a17cb83-b134-444f-be08-d9e005ffcd78.mp3",
    questionText: "What is a person recovering from illness called?",
    sampleAnswer: "Convalescent",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ010",
    title: "Short Organizational Meeting",
    audioFile: "audio-caec93d0-a7f5-497d-8b2b-5d6d30265e31.mp3",
    questionText: "What is a short, regular meeting in an organization called?",
    sampleAnswer: "Standup / Huddle Meeting",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ011",
    title: "Accounting Period",
    audioFile: "audio-85758e06-95ce-42b2-89a1-c737d8baaf56.mp3",
    questionText:
      "What is a 12-month accounting period used by governments, companies, and organizations for financial reporting and budgeting purposes called?",
    sampleAnswer: "Fiscal Year",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ012",
    title: "Restaurant Ordering",
    audioFile: "audio-3a80d5ce-68db-4544-9f95-dfc41d63b7e1.mp3",
    questionText:
      "What do you usually read before ordering food in a restaurant?",
    sampleAnswer: "Menu",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ013",
    title: "Female Marriage Partner",
    audioFile: "audio-5a1b415f-c8c7-430e-8b7e-0c4ad4500118.mp3",
    questionText: "What do you call the female partner in a marriage?",
    sampleAnswer: "Wife",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ014",
    title: "Intellectual Property Protection",
    audioFile: "audio-e60e8175-18ae-4a2f-9039-6b64f5005868.mp3",
    questionText:
      "Which type of legal document protects a person’s invention or intellectual property rights?",
    sampleAnswer: "Patent",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "ASQ015",
    title: "Intentional Fire Starter",
    audioFile: "audio-1ce6bc50-3ce1-42e1-859b-8cda11ab4af2.mp3",
    questionText:
      "What is the term for someone who intentionally starts a fire in a building?",
    sampleAnswer: "Arsonist",
    difficulty: "HARD" as const,
  },

  {
    questionId: "ASQ016",
    title: "Movie Opening Music",
    audioFile: "audio-abb21c96-6296-4a11-80e1-1c9819ce91c9.mp3",
    questionText:
      "What is the term for the audio or music that plays during the opening of a movie?",
    sampleAnswer: "Opening Score / Opening Theme / Opening Soundtrack",
    difficulty: "HARD" as const,
  },

  {
    questionId: "ASQ017",
    title: "Volcano Activity",
    audioFile: "audio-0f4220d4-c455-497c-bf8b-e4b8f35c1081.mp3",
    questionText:
      "What is the phenomenon called when a volcano ejects lava, ash, and steam?",
    sampleAnswer: "Volcanic Eruption",
    difficulty: "HARD" as const,
  },
];

const createAnswerShortQuestions = async () => {
  try {
    console.log("Starting to add Answer Short questions to the database...");

    for (const questionData of questions) {
      const existingQuestion =
        await prisma.speakingAnswerShortQuestion.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      console.log(
        `⬆️  Uploading audio for ${questionData.questionId}: ${questionData.audioFile}`,
      );
      const audioUrl = await uploadAudioToS3(
        AUDIO_DIR,
        questionData.audioFile,
        S3_SUBDIR,
      );
      console.log(`   → ${audioUrl}`);

      await prisma.speakingAnswerShortQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl,
          questionText: questionData.questionText,
          sampleAnswer: questionData.sampleAnswer,
          difficulty: questionData.difficulty,
        },
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
    }

    console.log(
      "✅ All Answer Short questions have been processed successfully!",
    );

    const totalQuestions = await prisma.speakingAnswerShortQuestion.count();
    console.log(
      `📊 Total Answer Short questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating Answer Short questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAnswerShortQuestions();
