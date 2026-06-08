import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "writeFromDictation")
const S3_SUBDIR = "listening-write-from-dictation"

const questions = [
  {
    questionId: "WFD001",
    title: "University Course Registration",
    audioFile: "course-registration.mp3",
    transcript: "Students must register for courses before the deadline to secure their preferred schedule.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD002",
    title: "Library Resources Access",
    audioFile: "library-access.mp3",
    transcript: "Digital resources are available to all registered students through the online portal.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD003",
    title: "Climate Change Research",
    audioFile: "climate-research.mp3",
    transcript: "Scientists have discovered significant evidence of accelerating climate change in polar regions.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "WFD004",
    title: "Technology Innovation Lecture",
    audioFile: "tech-innovation.mp3",
    transcript: "Artificial intelligence continues to revolutionize industries across the global economy.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "WFD005",
    title: "Academic Writing Guidelines",
    audioFile: "academic-writing.mp3",
    transcript: "Proper citation and referencing are essential components of scholarly research papers.",
    difficulty: "HARD" as const
  },
  {
    questionId: "WFD006",
    title: "Campus Safety Procedures",
    audioFile: "campus-safety.mp3",
    transcript: "Emergency protocols must be followed immediately when the alarm system is activated.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "WFD007",
    title: "Environmental Conservation",
    audioFile: "environmental-conservation.mp3",
    transcript: "Sustainable practices are increasingly important for protecting biodiversity and natural ecosystems.",
    difficulty: "HARD" as const
  },
  {
    questionId: "WFD008",
    title: "Student Health Services",
    audioFile: "health-services.mp3",
    transcript: "Medical appointments can be scheduled online or by calling the health center directly.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD009",
    title: "Research Methodology Training",
    audioFile: "research-methodology.mp3",
    transcript: "Quantitative and qualitative methods require different approaches to data collection and analysis.",
    difficulty: "HARD" as const
  },
  {
    questionId: "WFD010",
    title: "International Student Services",
    audioFile: "international-services.mp3",
    transcript: "Visa regulations and immigration requirements vary significantly between different countries.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "WFD011",
    title: "Digital Learning Platforms",
    audioFile: "digital-learning.mp3",
    transcript: "Online education platforms provide flexible learning opportunities for students worldwide.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD012",
    title: "Economic Development Seminar",
    audioFile: "economic-development.mp3",
    transcript: "Global economic trends significantly influence local market conditions and employment opportunities.",
    difficulty: "HARD" as const
  },
  {
    questionId: "WFD013",
    title: "Laboratory Safety Training",
    audioFile: "lab-safety.mp3",
    transcript: "Personal protective equipment must be worn at all times in laboratory environments.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "WFD014",
    title: "Academic Conference Announcement",
    audioFile: "conference-announcement.mp3",
    transcript: "Abstract submissions for the annual research conference are due next Friday.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD015",
    title: "Space Exploration Discussion",
    audioFile: "space-exploration.mp3",
    transcript: "Recent Mars missions have provided unprecedented insights into planetary formation and evolution.",
    difficulty: "HARD" as const
  },
  {
    questionId: "WFD016",
    title: "Career Development Workshop",
    audioFile: "career-development.mp3",
    transcript: "Professional networking skills are crucial for career advancement in competitive industries.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "WFD017",
    title: "Transportation Services",
    audioFile: "transportation-services.mp3",
    transcript: "The campus shuttle operates every fifteen minutes during peak hours.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD018",
    title: "Psychology Research Methods",
    audioFile: "psychology-research.mp3",
    transcript: "Ethical considerations are paramount when conducting research involving human participants.",
    difficulty: "HARD" as const
  },
  {
    questionId: "WFD019",
    title: "Information Technology Support",
    audioFile: "it-support.mp3",
    transcript: "Technical assistance is available through the help desk portal or phone support.",
    difficulty: "EASY" as const
  },
  {
    questionId: "WFD020",
    title: "Financial Aid Information",
    audioFile: "financial-aid.mp3",
    transcript: "Scholarship applications require complete documentation and must be submitted before the deadline.",
    difficulty: "MEDIUM" as const
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Write From Dictation questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningWriteFromDictationPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const createdQuestion = await prisma.listeningWriteFromDictationPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          transcript: question.transcript,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`)
    }

    console.log("✅ All Write From Dictation questions have been processed successfully!")

    const totalQuestions = await prisma.listeningWriteFromDictationPassage.count()
    console.log(`📊 Total Write From Dictation questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
