import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "MultipleChoiceSingle")
const S3_SUBDIR = "listening-multiple-choice-single"

const questions = [
  {
    questionId: "MCS001",
    title: "Climate Change Discussion",
    audioFile: "climate-change-discussion.mp3",
    questionText: "What is the main concern about climate change mentioned in the recording?",
    options: [
      "Economic impacts on developing countries",
      "Rising sea levels threatening coastal cities",
      "Changes in agricultural productivity",
      "Increased frequency of natural disasters"
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "MCS002",
    title: "University Library Services",
    audioFile: "library-services.mp3",
    questionText: "According to the librarian, what is the best way to access digital resources?",
    options: [
      "Visit the library in person",
      "Use the online portal with student ID",
      "Call the help desk for assistance",
      "Send an email request"
    ],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "MCS003",
    title: "Renewable Energy Research",
    audioFile: "renewable-energy-research.mp3",
    questionText: "What does the researcher say is the biggest challenge in solar energy adoption?",
    options: [
      "High initial installation costs",
      "Lack of government support",
      "Technology limitations",
      "Public awareness issues"
    ],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "MCS004",
    title: "Student Accommodation Options",
    audioFile: "student-accommodation.mp3",
    questionText: "What type of accommodation does the advisor recommend for first-year students?",
    options: [
      "Private rental apartments",
      "Shared houses with other students",
      "University dormitories",
      "Homestay with local families"
    ],
    correctOptionIndex: 2,
    difficulty: "EASY" as const
  },
  {
    questionId: "MCS005",
    title: "Artificial Intelligence in Medicine",
    audioFile: "ai-medicine.mp3",
    questionText: "According to the speaker, what is the primary benefit of AI in medical diagnosis?",
    options: [
      "Reduces healthcare costs significantly",
      "Eliminates the need for human doctors",
      "Improves accuracy and speed of diagnosis",
      "Makes healthcare accessible to everyone"
    ],
    correctOptionIndex: 2,
    difficulty: "HARD" as const
  },
  {
    questionId: "MCS006",
    title: "Campus Transportation System",
    audioFile: "campus-transportation.mp3",
    questionText: "What is the recommended way to travel between campus buildings?",
    options: [
      "Walking on designated pathways",
      "Using the campus shuttle bus",
      "Riding personal bicycles",
      "Taking university-provided scooters"
    ],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "MCS007",
    title: "Urban Planning Strategies",
    audioFile: "urban-planning.mp3",
    questionText: "What does the urban planner identify as the most effective strategy for reducing traffic congestion?",
    options: [
      "Building more highways and roads",
      "Implementing congestion pricing",
      "Developing public transportation networks",
      "Encouraging remote work policies"
    ],
    correctOptionIndex: 2,
    difficulty: "HARD" as const
  },
  {
    questionId: "MCS008",
    title: "Academic Writing Workshop",
    audioFile: "academic-writing.mp3",
    questionText: "What does the instructor emphasize as the most important aspect of academic writing?",
    options: [
      "Using complex vocabulary and sentence structures",
      "Following proper citation and referencing",
      "Writing lengthy and detailed paragraphs",
      "Including personal opinions and experiences"
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "MCS009",
    title: "Environmental Conservation Project",
    audioFile: "conservation-project.mp3",
    questionText: "What is the primary goal of the conservation project mentioned in the recording?",
    options: [
      "Protecting endangered wildlife species",
      "Reducing plastic waste in oceans",
      "Restoring damaged forest ecosystems",
      "Promoting renewable energy adoption"
    ],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "MCS010",
    title: "Technology in Education",
    audioFile: "tech-education.mp3",
    questionText: "According to the education expert, what is the main advantage of online learning platforms?",
    options: [
      "They are cheaper than traditional education",
      "They provide personalized learning experiences",
      "They require less time to complete courses",
      "They eliminate the need for teachers"
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "MCS011",
    title: "Health and Nutrition Advice",
    audioFile: "health-nutrition.mp3",
    questionText: "What does the nutritionist recommend as the best approach to maintaining a healthy diet?",
    options: [
      "Following strict calorie counting",
      "Eliminating all processed foods",
      "Eating a variety of whole foods",
      "Taking multiple vitamin supplements"
    ],
    correctOptionIndex: 2,
    difficulty: "EASY" as const
  },
  {
    questionId: "MCS012",
    title: "Space Exploration Mission",
    audioFile: "space-mission.mp3",
    questionText: "What is the main objective of the upcoming Mars mission discussed in the recording?",
    options: [
      "Establishing a permanent human colony",
      "Searching for signs of past or present life",
      "Mining valuable minerals and resources",
      "Testing new spacecraft technologies"
    ],
    correctOptionIndex: 1,
    difficulty: "HARD" as const
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Multiple Choice Single Answer questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningMCSPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const createdQuestion = await prisma.listeningMCSPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          questionText: question.questionText,
          options: question.options,
          correctOptionIndex: question.correctOptionIndex,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`)
    }

    console.log("✅ All Multiple Choice Single Answer questions have been processed successfully!")

    const totalQuestions = await prisma.listeningMCSPassage.count()
    console.log(`📊 Total Multiple Choice Single Answer questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
