import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "selectMissingword")
const S3_SUBDIR = "listening-select-missing-word"

const questions = [
  {
    questionId: "SMW001",
    title: "University Lecture on Climate Science",
    audioFile: "climate-science-lecture.mp3",
    instruction: "Listen to the recording and select the word that completes the sentence.",
    options: ["therefore", "however", "moreover", "nevertheless"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW002",
    title: "Campus Library Announcement",
    audioFile: "library-announcement.mp3",
    instruction: "Select the correct word to complete the announcement.",
    options: ["available", "accessible", "permitted", "allowed"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW003",
    title: "Research Methodology Seminar",
    audioFile: "research-methodology.mp3",
    instruction: "Choose the word that best completes the speaker's statement.",
    options: ["significant", "substantial", "considerable", "remarkable"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW004",
    title: "Student Orientation Session",
    audioFile: "student-orientation.mp3",
    instruction: "Listen carefully and select the missing word.",
    options: ["registration", "enrollment", "admission", "application"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW005",
    title: "Environmental Science Discussion",
    audioFile: "environmental-science.mp3",
    instruction: "Select the correct option to complete the recording.",
    options: ["biodiversity", "ecosystem", "habitat", "conservation"],
    correctOptionIndex: 2,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW006",
    title: "Academic Writing Workshop",
    audioFile: "academic-writing-workshop.mp3",
    instruction: "Choose the word that completes the instructor's explanation.",
    options: ["coherence", "consistency", "clarity", "conciseness"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW007",
    title: "Technology Conference Presentation",
    audioFile: "tech-conference.mp3",
    instruction: "Listen to the recording and select the appropriate word.",
    options: ["innovation", "advancement", "development", "progress"],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW008",
    title: "Health Sciences Lecture",
    audioFile: "health-sciences.mp3",
    instruction: "Select the word that best fits the context.",
    options: ["diagnosis", "treatment", "prevention", "therapy"],
    correctOptionIndex: 2,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW009",
    title: "Economics Seminar Discussion",
    audioFile: "economics-seminar.mp3",
    instruction: "Choose the correct word to complete the economist's statement.",
    options: ["fluctuation", "variation", "volatility", "instability"],
    correctOptionIndex: 2,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW010",
    title: "Campus Safety Briefing",
    audioFile: "campus-safety.mp3",
    instruction: "Listen and select the missing word from the announcement.",
    options: ["procedures", "protocols", "guidelines", "regulations"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW011",
    title: "Psychology Course Introduction",
    audioFile: "psychology-intro.mp3",
    instruction: "Select the correct option to complete the recording.",
    options: ["behavior", "conduct", "attitude", "response"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW012",
    title: "Engineering Project Presentation",
    audioFile: "engineering-project.mp3",
    instruction: "Choose the word that completes the technical explanation.",
    options: ["efficiency", "effectiveness", "performance", "productivity"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW013",
    title: "Student Services Information",
    audioFile: "student-services.mp3",
    instruction: "Listen carefully and select the appropriate word.",
    options: ["assistance", "support", "guidance", "help"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW014",
    title: "Business Administration Lecture",
    audioFile: "business-admin.mp3",
    instruction: "Select the word that best completes the statement.",
    options: ["strategy", "approach", "method", "technique"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW015",
    title: "International Relations Symposium",
    audioFile: "international-relations.mp3",
    instruction: "Choose the correct word to complete the speaker's analysis.",
    options: ["diplomacy", "negotiation", "cooperation", "collaboration"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Select Missing Word questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningSelectMissingWordPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const createdQuestion = await prisma.listeningSelectMissingWordPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          instruction: question.instruction,
          options: question.options,
          correctOptionIndex: question.correctOptionIndex,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`)
    }

    console.log("✅ All Select Missing Word questions have been processed successfully!")

    const totalQuestions = await prisma.listeningSelectMissingWordPassage.count()
    console.log(`📊 Total Select Missing Word questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
