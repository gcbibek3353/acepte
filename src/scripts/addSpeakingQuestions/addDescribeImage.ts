import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadImageToS3 } from "./uploadImage"

const IMAGE_DIR = path.resolve(__dirname, "describeImage")
const S3_SUBDIR = "speaking-describe-image"

const questions = [
  {
    questionId: "DI001",
    title: "Bar Chart - Student Performance",
    imageFile: "bar-chart-students.jpg",
    instruction: "Describe the bar chart showing student performance across different subjects in various schools.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "DI002",
    title: "Line Graph - Climate Change",
    imageFile: "line-graph-climate.jpg",
    instruction: "Explain the trends shown in this line graph depicting global temperature changes over the past century.",
    difficulty: "HARD" as const
  },
  {
    questionId: "DI003",
    title: "Pie Chart - Market Share",
    imageFile: "pie-chart-market.jpg",
    instruction: "Describe the pie chart showing market share distribution among different technology companies.",
    difficulty: "EASY" as const
  },
  {
    questionId: "DI004",
    title: "Process Diagram - Water Cycle",
    imageFile: "water-cycle-diagram.jpg",
    instruction: "Explain the process shown in this diagram illustrating the natural water cycle.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "DI005",
    title: "Floor Plan - Office Layout",
    imageFile: "office-floor-plan.jpg",
    instruction: "Describe the layout and features of this office floor plan, including the location of different departments.",
    difficulty: "EASY" as const
  },
  {
    questionId: "DI006",
    title: "Statistical Chart - Population Growth",
    imageFile: "population-growth-chart.jpg",
    instruction: "Analyze and describe the population growth trends shown in this statistical representation.",
    difficulty: "HARD" as const
  }
]

const createDescribeImageQuestions = async () => {
  try {
    console.log("Starting to add Describe Image questions to the database...")

    for (const questionData of questions) {
      const existingQuestion = await prisma.speakingDescribeImageQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading image for ${questionData.questionId}: ${questionData.imageFile}`)
      const imageUrl = await uploadImageToS3(IMAGE_DIR, questionData.imageFile, S3_SUBDIR)
      console.log(`   → ${imageUrl}`)

      await prisma.speakingDescribeImageQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          imageUrl,
          instruction: questionData.instruction,
          difficulty: questionData.difficulty
        }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
    }

    console.log("✅ All Describe Image questions have been processed successfully!")

    const totalQuestions = await prisma.speakingDescribeImageQuestion.count()
    console.log(`📊 Total Describe Image questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating Describe Image questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createDescribeImageQuestions()
