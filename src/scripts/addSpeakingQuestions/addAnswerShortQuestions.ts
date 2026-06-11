import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "answerShortQuestions")
const S3_SUBDIR = "speaking-answer-short"

const questions = [
  {
    questionId: "ASQ001",
    title: "Geography - Capital Cities",
    audioFile: "capital-cities.mp3",
    questionText: "What is the capital city of Australia?",
    sampleAnswer: "Canberra",
    difficulty: "EASY" as const
  },
  {
    questionId: "ASQ002",
    title: "Science - Basic Physics",
    audioFile: "physics-basic.mp3",
    questionText: "What force causes objects to fall towards the Earth?",
    sampleAnswer: "Gravity",
    difficulty: "EASY" as const
  },
  {
    questionId: "ASQ003",
    title: "Mathematics - Geometry",
    audioFile: "geometry.mp3",
    questionText: "How many sides does a hexagon have?",
    sampleAnswer: "Six",
    difficulty: "EASY" as const
  },
  {
    questionId: "ASQ004",
    title: "History - World Wars",
    audioFile: "world-wars.mp3",
    questionText: "In which year did World War II end?",
    sampleAnswer: "1945",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "ASQ005",
    title: "Biology - Human Body",
    audioFile: "human-body.mp3",
    questionText: "Which organ in the human body produces insulin?",
    sampleAnswer: "Pancreas",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "ASQ006",
    title: "Literature - Famous Authors",
    audioFile: "famous-authors.mp3",
    questionText: "Who wrote the novel 'Pride and Prejudice'?",
    sampleAnswer: "Jane Austen",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "ASQ007",
    title: "Chemistry - Periodic Table",
    audioFile: "periodic-table.mp3",
    questionText: "What is the chemical symbol for gold?",
    sampleAnswer: "Au",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "ASQ008",
    title: "Economics - Currency",
    audioFile: "currency.mp3",
    questionText: "What is the currency used in Japan?",
    sampleAnswer: "Yen",
    difficulty: "EASY" as const
  }
]

const createAnswerShortQuestions = async () => {
  try {
    console.log("Starting to add Answer Short questions to the database...")

    for (const questionData of questions) {
      const existingQuestion = await prisma.speakingAnswerShortQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${questionData.questionId}: ${questionData.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, questionData.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      await prisma.speakingAnswerShortQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl,
          questionText: questionData.questionText,
          sampleAnswer: questionData.sampleAnswer,
          difficulty: questionData.difficulty
        }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
    }

    console.log("✅ All Answer Short questions have been processed successfully!")

    const totalQuestions = await prisma.speakingAnswerShortQuestion.count()
    console.log(`📊 Total Answer Short questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating Answer Short questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAnswerShortQuestions()
