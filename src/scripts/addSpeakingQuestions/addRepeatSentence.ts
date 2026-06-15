import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.resolve(__dirname, "repeatSentence");
const S3_SUBDIR = "speaking-repeat-sentence";

const questions = [
  {
    questionId: "RS001",
    title: "Essay Deadline",
    audioFile: "audio-40233cb6-384a-4c0d-b788-b9ec242414a9.mp3",
    transcript: "The deadline for the essay is tomorrow.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS002",
    title: "Train Departure",
    audioFile: "audio-57899f01-7e93-4aff-9e32-765b1c034df2.mp3",
    transcript: "The train is leaving in a few minutes.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS003",
    title: "School Meal Service",
    audioFile: "audio-8807d5c1-0bcd-4509-ac5d-bb84b93d0d69.mp3",
    transcript: "The school will provide hot food.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS004",
    title: "Doctor Appointment",
    audioFile: "audio-96823015-6f84-434d-935a-96970fb4179a.mp3",
    transcript: "You must call your doctor to make an appointment.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS005",
    title: "Library Books",
    audioFile: "audio-9f6684b6-eee0-474a-94e4-6369ddba66ab.mp3",
    transcript: "You can find the books in the library.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS006",
    title: "Library Holiday Schedule",
    audioFile: "audio-c6735c87-96b7-45a6-abaa-1e712276ae8e.mp3",
    transcript: "The library will be closed except on holidays.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS007",
    title: "Public Telephone",
    audioFile: "audio-dc868120-00df-4495-8700-19e3db6317bf.mp3",
    transcript: "A public telephone is available in the shop.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS008",
    title: "Manager Report",
    audioFile: "audio-f50b7dc6-6ef7-4d4f-8ded-8ffd5140843e.mp3",
    transcript: "Prepare the report for the manager.",
    difficulty: "EASY" as const,
  },

  {
    questionId: "RS009",
    title: "Supermarket Location",
    audioFile: "audio-a38cd1b7-7655-40a3-83b3-c92fd432d808.mp3",
    transcript: "The supermarket is located near the theater.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RS010",
    title: "Holiday Facility Access",
    audioFile: "audio-6d0539e0-174c-4254-9020-42c6f97ec58d.mp3",
    transcript:
      "Students also have access to the facilities and the library during the holidays.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RS011",
    title: "Plagiarism Policy",
    audioFile: "audio-79892c08-55db-4125-8d17-f9a4dd25958c.mp3",
    transcript:
      "Lack of citation and evidence in an article will be regarded as plagiarism.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RS012",
    title: "University Calendar",
    audioFile: "audio-4c5bc880-8732-4d9d-86f8-634e8f0a3d6d.mp3",
    transcript:
      "Downloading the calendar can help you find more activities at our university.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RS013",
    title: "Mineral Resource Exploration",
    audioFile: "audio-5e95e27c-86b1-4dad-88bd-fd5d0a022e6e.mp3",
    transcript:
      "Mineral resource exploration has been rising, leading to local environmental degradation.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "RS014",
    title: "Student Computers",
    audioFile: "audio-a7696114-7479-4b07-8433-7ae728c08aad.mp3",
    transcript: "Every student has their own computer.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "RS015",
    title: "Bus to London",
    audioFile: "audio-cfd55c11-d0fc-4fbb-8324-c189e996095c.mp3",
    transcript: "The bus right out front will take you to London.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "RS016",
    title: "Employee Parking Space",
    audioFile: "audio-9ee3614a-b671-4f07-a1cb-f70cf4b23c28.mp3",
    transcript: "This parking space is for the employee of the month.",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "RS017",
    title: "Common Lunch Break",
    audioFile: "audio-fdf80e52-c264-4fcd-bb44-237f39849ec3.mp3",
    transcript:
      "Students have the opportunity to share their lunch during the common lunch break around noon.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "RS018",
    title: "Department Collaboration",
    audioFile: "audio-1be32928-a430-4c0c-91e1-f2813ce5df43.mp3",
    transcript:
      "Collaboration between departments has led to groundbreaking research.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "RS019",
    title: "Postgraduate Evaluation Form",
    audioFile: "audio-280e0ebf-1702-4d99-b089-4f3f647108d4.mp3",
    transcript:
      "Postgraduate students need to complete the evaluation form before the end of the term.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "RS020",
    title: "Welcome Events",
    audioFile: "audio-345c5d18-28f6-4b9a-b3af-4911455b19b1.mp3",
    transcript:
      "There are office welcome events for both undergraduate and postgraduate students.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "RS021",
    title: "Replacement Travel Pass",
    audioFile: "audio-3b3794da-045e-4dd1-a678-ed68550f91d3.mp3",
    transcript:
      "The woman said she could help me get a replacement travel pass.",
    difficulty: "HARD" as const,
  },
  {
    questionId: "RS022",
    title: "Assignment Due Date",
    audioFile: "audio-886c50c9-301b-44cb-bdd4-fb81c0168099.mp3",
    transcript:
      "Marks will be deducted for assignments handed in after the due date.",
    difficulty: "HARD" as const,
  },
];

const createRepeatSentenceQuestions = async () => {
  try {
    console.log("Starting to add Repeat Sentence questions to the database...");

    for (const questionData of questions) {
      const existingQuestion =
        await prisma.speakingRepeatSentenceQuestion.findUnique({
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

      await prisma.speakingRepeatSentenceQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl,
          transcript: questionData.transcript,
          difficulty: questionData.difficulty,
        },
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
    }

    console.log(
      "✅ All Repeat Sentence questions have been processed successfully!",
    );

    const totalQuestions = await prisma.speakingRepeatSentenceQuestion.count();
    console.log(
      `📊 Total Repeat Sentence questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating Repeat Sentence questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createRepeatSentenceQuestions();
