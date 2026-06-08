import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "highlightIncorrect")
const S3_SUBDIR = "listening-highlight-incorrect"

const questions = [
  {
    questionId: "HIW001",
    title: "Climate Change Impact on Agriculture",
    audioFile: "climate-agriculture.mp3",
    passage: "Climate change is significantly affecting agricultural production worldwide. Rising temperatures and changing precipitation patterns are making it difficult for farmers to maintain consistent crop yields. Many regions are experiencing severe droughts while others face unexpected flooding. Scientists recommend developing drought-resistant crop varieties and improving irrigation systems to adapt to these changes.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "production", position: 8 },
      { word: "severe", position: 35 },
      { word: "irrigation", position: 50 }
    ]
  },
  {
    questionId: "HIW002",
    title: "University Library Resources",
    audioFile: "library-resources.mp3",
    passage: "The university library offers extensive digital resources including academic journals, research databases, and electronic books. Students can access these materials remotely using their student credentials. The library also provides research assistance and citation guidance. Additionally, group study rooms are available for collaborative projects and can be reserved online through the library portal.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "credentials", position: 20 },
      { word: "citation", position: 27 },
      { word: "portal", position: 45 }
    ]
  },
  {
    questionId: "HIW003",
    title: "Renewable Energy Technology",
    audioFile: "renewable-tech.mp3",
    passage: "Solar panels and wind turbines are becoming increasingly efficient and cost-effective. Modern photovoltaic cells can convert sunlight into electricity with remarkable accuracy. Wind energy technology has also advanced significantly, with newer turbines capable of generating more power even in low wind conditions. These improvements are making renewable energy more competitive with traditional fossil fuels.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "accuracy", position: 18 },
      { word: "generating", position: 32 },
      { word: "competitive", position: 43 }
    ]
  },
  {
    questionId: "HIW004",
    title: "Urban Transportation Solutions",
    audioFile: "urban-transport.mp3",
    passage: "Cities are implementing various strategies to reduce traffic congestion and improve air quality. Electric buses are replacing traditional diesel vehicles in many metropolitan areas. Bike-sharing programs encourage residents to use sustainable transportation methods. Additionally, smart traffic management systems help optimize traffic flow and reduce commute times for daily travelers.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "metropolitan", position: 17 },
      { word: "methods", position: 25 },
      { word: "travelers", position: 42 }
    ]
  },
  {
    questionId: "HIW005",
    title: "Student Health and Wellness",
    audioFile: "student-wellness.mp3",
    passage: "Maintaining physical and mental health is crucial for academic success. Regular exercise helps students manage stress and improve concentration. The campus fitness center offers various programs including yoga classes and strength training sessions. Mental health services provide counseling and support groups for students facing emotional challenges during their studies.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "concentration", position: 16 },
      { word: "sessions", position: 29 },
      { word: "emotional", position: 40 }
    ]
  },
  {
    questionId: "HIW006",
    title: "Environmental Conservation Efforts",
    audioFile: "conservation-efforts.mp3",
    passage: "Marine protected areas are essential for preserving ocean biodiversity and supporting fish populations. These reserves provide safe habitats where marine species can reproduce and thrive without human interference. Scientists monitor water quality and track wildlife populations to assess the effectiveness of conservation measures. International cooperation is vital for protecting migratory species.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "reserves", position: 14 },
      { word: "interference", position: 25 },
      { word: "measures", position: 38 }
    ]
  },
  {
    questionId: "HIW007",
    title: "Digital Learning Platforms",
    audioFile: "digital-learning.mp3",
    passage: "Online education platforms have revolutionized how students access learning materials. Interactive multimedia content engages learners more effectively than traditional textbooks. Virtual classrooms enable real-time collaboration between students and instructors regardless of geographical boundaries. Adaptive learning algorithms personalize educational content based on individual student performance and learning preferences.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "multimedia", position: 11 },
      { word: "boundaries", position: 26 },
      { word: "preferences", position: 40 }
    ]
  },
  {
    questionId: "HIW008",
    title: "Campus Safety and Security",
    audioFile: "campus-safety.mp3",
    passage: "University security personnel patrol campus grounds regularly to ensure student safety. Emergency call boxes are strategically located throughout the campus for immediate assistance. The campus safety app allows students to request escorts and report suspicious activities. Security cameras monitor high-traffic areas and provide valuable surveillance footage when incidents occur.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "personnel", position: 3 },
      { word: "strategically", position: 14 },
      { word: "surveillance", position: 33 }
    ]
  },
  {
    questionId: "HIW009",
    title: "Research Methodology Training",
    audioFile: "research-methodology.mp3",
    passage: "Graduate students must learn proper research methodologies to conduct credible academic studies. Data collection techniques vary depending on the research objectives and target population. Statistical analysis software helps researchers interpret complex datasets and identify significant patterns. Peer review processes ensure that research findings meet academic standards before publication in scholarly journals.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "credible", position: 10 },
      { word: "objectives", position: 17 },
      { word: "scholarly", position: 42 }
    ]
  },
  {
    questionId: "HIW010",
    title: "Food Science and Nutrition",
    audioFile: "food-nutrition.mp3",
    passage: "Understanding nutritional requirements is fundamental for maintaining optimal health. Balanced diets should include adequate proteins, carbohydrates, healthy fats, vitamins, and minerals. Food processing techniques can affect the nutritional value of ingredients. Nutritionists recommend consuming fresh produce and minimizing processed foods to maximize dietary benefits and support overall wellness.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "fundamental", position: 4 },
      { word: "ingredients", position: 22 },
      { word: "dietary", position: 35 }
    ]
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Highlight Incorrect Words questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningHighlightIncorrectWordsPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const { incorrectWords } = question
      const createdPassage = await prisma.listeningHighlightIncorrectWordsPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          passage: question.passage,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      for (const incorrectWord of incorrectWords) {
        await prisma.listeningIncorrectWord.create({
          data: {
            word: incorrectWord.word,
            position: incorrectWord.position,
            passageId: createdPassage.id
          }
        })
      }

      console.log(`✅ Created question: ${createdPassage.questionId} - ${createdPassage.title} with ${incorrectWords.length} incorrect words`)
    }

    console.log("✅ All Highlight Incorrect Words questions have been processed successfully!")

    const totalQuestions = await prisma.listeningHighlightIncorrectWordsPassage.count()
    const totalIncorrectWords = await prisma.listeningIncorrectWord.count()
    console.log(`📊 Total Highlight Incorrect Words questions in database: ${totalQuestions}`)
    console.log(`📊 Total incorrect words in database: ${totalIncorrectWords}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
