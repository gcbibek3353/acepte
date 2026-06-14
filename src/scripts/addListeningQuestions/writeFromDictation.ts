import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "writeFromDictation");
const S3_SUBDIR = "listening-write-from-dictation";

const questions = [
  {
    questionId: "WFD001",
    title: "We are rethinking solutions",
    audioFile: "audio-50bf5842-c647-4974-be40-4884dc84fcc9.mp3",
    transcript: "We are rethinking solutions for society.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD002",
    title: "The media influences human",
    audioFile: "audio-83e8c96f-eb69-4d83-a327-914c2bb95ba2.mp3",
    transcript: "The media influences human opinions.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD003",
    title: "The department is doing research",
    audioFile: "audio-9f70919a-6a05-49ea-a6e2-ff9420ab0b9f.mp3",
    transcript: "The department is doing research in biology.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD004",
    title: "There is a lot of debate",
    audioFile: "audio-216ba045-8f46-494c-a6d2-ba04781ee184.mp3",
    transcript: "There is a lot of debate about that topic.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD005",
    title: "Students should take their time",
    audioFile: "audio-66e9eedb-2787-46b2-a9e3-9defde1db119.mp3",
    transcript: "Students should take their time to study.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD006",
    title: "More physical activity is beneficial",
    audioFile: "audio-61ea4655-04b4-4255-a99c-6eedb888abd5.mp3",
    transcript: "More physical activity is beneficial to your health.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD007",
    title: "Campaign spot on website",
    audioFile: "audio-7ec95060-5c2b-4f45-bc73-738da5485c2c.mp3",
    transcript: "You can find the campaign spot on the website.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD008",
    title: "Complaint form on website",
    audioFile: "audio-e5133506-cd6a-4b7f-bea9-8eb79d09974e.mp3",
    transcript: "You can find the complaint form on the website.",
    difficulty: "EASY" as const,
  },
  {
    questionId: "WFD009",
    title: "Professor discussed article",
    audioFile: "b56938de-e306-4358-a267-c379d870a409.mp3",
    transcript: "The professor discussed the article in class yesterday.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD010",
    title: "Design incorporates modern architecture",
    audioFile: "8a48ffe3-8f7c-4363-ac85-5d83043844e3.mp3",
    transcript:
      "Her design incorporates the best aspects of modern architecture.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD011",
    title: "University auditorium nearby",
    audioFile: "9d8c4f7c-b692-46b0-a52b-5e5737ca471c.mp3",
    transcript: "The university auditorium is just around the corner.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD012",
    title: "Class Discussion",
    audioFile: "4930a799-bec9-45ef-8019-716942eed18d.mp3",
    transcript: "The professor will have a discussion in the class.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD013",
    title: "Engineering Opportunities",
    audioFile: "audio-d35c2917-b817-4bfe-ab6a-69195d391497.mp3",
    transcript: "In the engineering field, there are many opportunities.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD014",
    title: "Exam Postponement",
    audioFile: "audio-b1d0b644-a06a-49b7-9dc1-be2111185b02.mp3",
    transcript: "The exam will not be conducted until further notice.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD015",
    title: "Sleep Journals",
    audioFile: "audio-8f9e0eb3-5f58-425a-92ef-942879e2f245.mp3",
    transcript: "Participants recorded their sleep hours in their journals.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD016",
    title: "Biology Exam Subject",
    audioFile: "audio-fe35be43-b621-43ee-9a77-1a5ef01e883b.mp3",
    transcript:
      "The professor said biology is not the only subject on the exam.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD017",
    title: "Quiz Next Week",
    audioFile: "audio-7fd66527-5796-414d-95b0-d118866ad00a.mp3",
    transcript: "There will be a quiz next week.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD018",
    title: "Mathematics and Problem Solving",
    audioFile: "audio-d53d043d-ec12-4f9a-867a-e49a20fba42e.mp3",
    transcript: "Mathematics uses numbers and shapes to solve problems.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "WFD019",
    title: "Modern Architecture Design",
    audioFile: "8a48ffe3-8f7c-4363-ac85-5d83043844e3.mp3",
    transcript:
      "Her design incorporates the best aspects of modern architecture.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "WFD020",
    title: "Glittering Lake Surface",
    audioFile: "audio-99ed67ef-82cb-4074-b2c8-c652aea8a2ec.mp3",
    transcript: "The glittering lake surface camouflages the fish.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "WFD021",
    title: "Culture and Language",
    audioFile: "audio-b43ca7da-6d2c-4f40-abfb-ca0b25cfadf3.mp3",
    transcript:
      "The article illuminates the intricate relationship between culture and language.",
    difficulty: "HARD" as const,
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Write From Dictation questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.listeningWriteFromDictationPassage.findUnique({
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
        await prisma.listeningWriteFromDictationPassage.create({
          data: {
            questionId: question.questionId,
            title: question.title,
            transcript: question.transcript,
            difficulty: question.difficulty,
            audioUrl,
          },
        });

      console.log(
        `✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`,
      );
    }

    console.log(
      "✅ All Write From Dictation questions have been processed successfully!",
    );

    const totalQuestions =
      await prisma.listeningWriteFromDictationPassage.count();
    console.log(
      `📊 Total Write From Dictation questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
