import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.resolve(__dirname, "respondToSituation");
const S3_SUBDIR = "speaking-respond-situation";

// audioFile is null for questions that have no audio prompt
const questions = [
    {
      questionId: "RTS001",
      title: "Job Interview and Lecture",
      situation:
        "You have a job interview scheduled with a local store, but you have just realised that it clashes with one of your lectures.",
      audioFile: "audio-ae6c102e-1a17-4821-a0eb-2a7331380696.mp3" as
        | string
        | null,
      instruction:
        "Explain the situation to the manager and politely request to reschedule your interview to a different time. Be clear and professional.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS002",
      title: "Rehearsal",
      situation:
        "You have a presentation next week and would like to rehearse beforehand, but you cannot find a suitable room to practice in.",
      audioFile: "audio-65dff1bb-f268-4ddc-a4dd-47f914dcc389.mp3" as
        | string
        | null,
      instruction:
        "Explain your situation to your teacher and ask for help in finding a suitable place to rehearse your presentation.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS003",
      title: "Summary of Lecture",
      situation:
        "You are not fully understanding the lecture and you are worried that you may not be able to write a good summary.",
      audioFile: "audio-c2c52669-e5b7-4da8-9c53-e9a087f4c087.mp3" as
        | string
        | null,
      instruction:
        "Ask your tutor for advice and explain your difficulty in understanding the lecture and writing a summary.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS004",
      title: "Important Class",
      situation:
        "Your friend Tom does not want to go to class tomorrow, but the class is very important.",
      audioFile: "audio-cb57959e-3f06-4fc2-914c-ef129d7bd8a1.mp3" as
        | string
        | null,
      instruction:
        "Try to convince your friend Tom to attend the class by explaining why it is important.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS005",
      title: "Oversleeping",
      situation:
        "You had agreed to take notes for your friend Tom in class, but you cannot attend because your bus broke down.",
      audioFile: "audio-81fb0730-1140-4c02-91a7-2fbee91e96d3.mp3" as
        | string
        | null,
      instruction:
        "Inform your friend about the situation and apologize for not being able to attend class as planned.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS006",
      title: "Sport and Class",
      situation:
        "You often arrive late for class because you take part in your favorite sport every Thursday afternoon.",
      audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
        | string
        | null,
      instruction:
        "Explain the reason for your lateness to your teacher and try to justify your situation politely.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS007",
      title: "Classroom Screen",
      situation:
        "You are sitting in the front row of the classroom, but you cannot see the screen clearly due to a possible technical issue.",
      audioFile: "audio-c5968c37-8a64-4afb-afb2-7ece21f25e9c.mp3" as
        | string
        | null,
      instruction:
        "Inform your teacher about the issue with visibility and politely ask for assistance to fix the problem.",
      difficulty: "EASY" as const,
    },
    {
      questionId: "RTS008",
        title: "Presentation Advice",
        situation:
          "You have a presentation to prepare, but you feel nervous speaking in front of an audience, so you ask a friend to listen to your presentation and give you some advice.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Ask your friend to listen to your presentation and give you feedback and suggestions to improve your performance.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS009",
        title: "Help from Colleague",
        situation:
          "You need to hand in some documents to your department office, but you are not feeling well today and cannot go yourself.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Ask your colleague to help you submit the documents to the department office on your behalf.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS010",
        title: "Help for Assignment",
        situation:
          "A friend asks you for help with an assignment, but you are not sure how to solve it either.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Explain to your friend that you are unsure and suggest asking the tutor for help together.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS011",
        title: "Computer and Report",
        situation:
          "Your computer has broken down, but your tutor requires you to submit a daily report, and you cannot submit tomorrow’s report because of repair work.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Inform your tutor about your computer issue and explain that you will not be able to submit the report on time.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS012",
        title: "Assignment Comment",
        situation:
          "Your tutor has commented on your assignment, saying 'Write more academically', and you are unsure what this means.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Ask your tutor to clarify what 'write more academically' means and how you can improve your assignment.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS013",
        title: "Borrowing Printer",
        situation:
          "You need to print your finished assignment, but your printer is broken and you want to borrow a printer from your friend Carl.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Ask your friend Carl if you can borrow his printer to print your assignment.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS014",
        title: "Exchange Program",
        situation:
          "You have applied for a student exchange program but have not received any response, and you are unsure about accepting a part-time job offer.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Call the exchange program officer and ask about the current status of your application.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS015",
        title: "Party for Parents",
        situation:
          "You missed your assignment deadline because your sister asked you to attend your parents’ party.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Explain the situation to your tutor and apologize for missing the deadline.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS016",
        title: "Library to Cafe",
        situation:
          "You and your friend planned to meet at the library, but the seats are double-booked so you need to change the meeting place.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Call your friend and inform them that the meeting place has changed to a cafe.",
        difficulty: "EASY" as const,
      },
      {
        questionId: "RTS017",
        title: "Presentation to Deliver",
        situation:
          "You are working on a group presentation, but your classmate has not finished their part and the tutor is urging submission.",
        audioFile: "audio-77b67e7a-e6d2-4d0f-89fe-ed7f02d1e77f.mp3" as
          | string
          | null,
        instruction:
          "Explain the situation to your tutor and request more time to complete the presentation.",
        difficulty: "EASY" as const,
      },
];

const createRespondSituationQuestions = async () => {
  try {
    console.log(
      "Starting to add Respond to Situation questions to the database...",
    );

    for (const questionData of questions) {
      const existingQuestion =
        await prisma.speakingRespondSituationQuestion.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      let audioUrl: string | null = null;
      if (questionData.audioFile) {
        console.log(
          `⬆️  Uploading audio for ${questionData.questionId}: ${questionData.audioFile}`,
        );
        audioUrl = await uploadAudioToS3(
          AUDIO_DIR,
          questionData.audioFile,
          S3_SUBDIR,
        );
        console.log(`   → ${audioUrl}`);
      }

      await prisma.speakingRespondSituationQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          situation: questionData.situation,
          audioUrl,
          instruction: questionData.instruction,
          difficulty: questionData.difficulty,
        },
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
    }

    console.log(
      "✅ All Respond to Situation questions have been processed successfully!",
    );

    const totalQuestions =
      await prisma.speakingRespondSituationQuestion.count();
    console.log(
      `📊 Total Respond to Situation questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating Respond to Situation questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createRespondSituationQuestions();
