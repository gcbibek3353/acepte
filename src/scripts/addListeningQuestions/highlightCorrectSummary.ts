import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "highlightCorrectSummary")
const S3_SUBDIR = "listening-highlight-correct-summary"

const questions = [
  {
    questionId: "HCS001",
    title: "Renewable Energy Transition",
    audioFile: "renewable-energy-transition.mp3",
    passage: "The global transition to renewable energy sources is accelerating due to environmental concerns and technological advances. Solar and wind power costs have decreased significantly, making them competitive with fossil fuels. Governments worldwide are implementing policies to support clean energy adoption.",
    questionText: "Listen to the recording and select the most accurate summary of the main points discussed.",
    options: [
      "Renewable energy is becoming more expensive and governments are reducing support for clean energy projects.",
      "The shift to renewable energy is speeding up because of environmental issues and improved technology, with solar and wind becoming cost-competitive.",
      "Fossil fuels remain the cheapest energy source despite government attempts to promote renewable alternatives.",
      "Solar and wind power are still too expensive for widespread adoption without significant government subsidies."
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "HCS002",
    title: "Benefits of Urban Gardens",
    audioFile: "urban-gardens.mp3",
    passage: "Urban gardens provide fresh produce to city residents while promoting community engagement. These green spaces also help improve air quality and reduce the urban heat island effect. Many cities are supporting community garden initiatives through funding and land allocation.",
    questionText: "Choose the summary that best captures the key benefits of urban gardens mentioned in the recording.",
    options: [
      "Urban gardens only provide food and have no environmental benefits for cities.",
      "City gardens offer fresh food, build community connections, improve air quality, and cool urban areas, with growing municipal support.",
      "Urban gardens are expensive projects that cities cannot afford to maintain long-term.",
      "Community gardens primarily serve as recreational spaces with minimal impact on food security."
    ],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "HCS003",
    title: "Digital Learning Platforms",
    audioFile: "digital-learning.mp3",
    passage: "Digital learning platforms have revolutionized education by providing personalized learning experiences. These systems use artificial intelligence to adapt content difficulty based on individual student progress. However, concerns about screen time and reduced social interaction remain significant challenges.",
    questionText: "Select the summary that accurately reflects the main points about digital learning platforms.",
    options: [
      "Digital platforms have transformed education through personalized AI-driven content, though screen time and social interaction concerns persist.",
      "Traditional classroom learning is superior to digital platforms in all aspects of education.",
      "Digital learning platforms are only useful for advanced students and cannot adapt to different learning styles.",
      "Artificial intelligence in education has solved all learning difficulties without any drawbacks."
    ],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "HCS004",
    title: "Ocean Plastic Pollution",
    audioFile: "ocean-plastic.mp3",
    passage: "Plastic pollution in oceans has reached critical levels, threatening marine ecosystems and human health. Microplastics enter the food chain through fish consumption. Several international initiatives are working to reduce plastic waste through improved recycling and alternative materials.",
    questionText: "Choose the most accurate summary of the ocean plastic pollution discussion.",
    options: [
      "Ocean plastic pollution is a minor issue that will resolve itself naturally over time.",
      "Plastic waste in oceans has reached dangerous levels, affecting marine life and humans through food chains, prompting global cleanup efforts.",
      "Only large plastic items in oceans are problematic, while microplastics pose no threat to ecosystems.",
      "International efforts to address plastic pollution have completely solved the ocean contamination problem."
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "HCS005",
    title: "Remote Work Productivity",
    audioFile: "remote-work-productivity.mp3",
    passage: "Studies show mixed results regarding remote work productivity. While some employees report increased focus and efficiency at home, others struggle with distractions and isolation. Companies are experimenting with hybrid models to balance flexibility with collaboration needs.",
    questionText: "Select the summary that best represents the findings on remote work productivity.",
    options: [
      "Remote work always increases productivity and should be adopted by all companies immediately.",
      "Research shows varied remote work results - some workers are more productive while others face challenges, leading to hybrid workplace experiments.",
      "All employees prefer working from home and are consistently more productive than in traditional offices.",
      "Remote work has been proven to decrease productivity in all industries and should be eliminated."
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "HCS006",
    title: "Artificial Intelligence in Healthcare",
    audioFile: "ai-healthcare.mp3",
    passage: "Artificial intelligence is transforming healthcare through improved diagnostic accuracy and personalized treatment plans. AI systems can analyze medical images faster than human radiologists and identify patterns in patient data. However, implementation challenges include data privacy concerns and the need for regulatory approval.",
    questionText: "Choose the summary that accurately captures the role of AI in healthcare.",
    options: [
      "AI in healthcare only creates problems and should not be used for medical diagnosis.",
      "Artificial intelligence enhances healthcare through better diagnostics and personalized care, while facing privacy and regulatory challenges.",
      "AI has completely replaced human doctors and eliminated all medical errors.",
      "Healthcare AI is limited to simple tasks and cannot handle complex medical analysis."
    ],
    correctOptionIndex: 1,
    difficulty: "HARD" as const
  },
  {
    questionId: "HCS007",
    title: "Sustainable Transportation",
    audioFile: "sustainable-transport.mp3",
    passage: "Cities are investing in sustainable transportation options including electric buses, bike-sharing programs, and pedestrian-friendly infrastructure. These initiatives aim to reduce air pollution and traffic congestion while promoting public health through increased physical activity.",
    questionText: "Select the most comprehensive summary of sustainable transportation initiatives.",
    options: [
      "Cities are only focusing on electric vehicles and ignoring other transportation alternatives.",
      "Urban areas are developing various sustainable transport solutions like electric buses and bike programs to cut pollution and improve health.",
      "Sustainable transportation is too expensive and provides no real benefits to city residents.",
      "Traditional transportation methods are more efficient than any sustainable alternatives."
    ],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "HCS008",
    title: "Mental Health Awareness",
    audioFile: "mental-health-awareness.mp3",
    passage: "Mental health awareness campaigns have increased public understanding and reduced stigma around psychological conditions. More people are seeking professional help, and employers are implementing workplace wellness programs. However, access to mental health services remains limited in many regions.",
    questionText: "Choose the summary that best reflects the current state of mental health awareness.",
    options: [
      "Mental health awareness has solved all psychological problems and eliminated the need for professional treatment.",
      "Awareness campaigns have improved understanding and reduced stigma, increasing help-seeking behavior, though access challenges persist.",
      "Public awareness of mental health issues has not changed and stigma remains as strong as ever.",
      "Only workplace wellness programs are effective in addressing mental health concerns."
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "HCS009",
    title: "Climate Change Adaptation",
    audioFile: "climate-adaptation.mp3",
    passage: "Communities worldwide are developing adaptation strategies to cope with climate change impacts. These include building sea walls to protect coastal areas, developing drought-resistant crops, and creating early warning systems for extreme weather events. International cooperation is essential for sharing knowledge and resources.",
    questionText: "Select the summary that accurately describes climate change adaptation efforts.",
    options: [
      "Climate change adaptation is unnecessary because global warming is not a real threat.",
      "Communities are creating various strategies like sea walls and drought-resistant crops to handle climate impacts, requiring global cooperation.",
      "Only wealthy countries can afford climate adaptation measures, leaving developing nations vulnerable.",
      "Early warning systems are the only effective method for dealing with climate change effects."
    ],
    correctOptionIndex: 1,
    difficulty: "HARD" as const
  },
  {
    questionId: "HCS010",
    title: "Food Security Challenges",
    audioFile: "food-security.mp3",
    passage: "Global food security faces challenges from population growth, climate change, and supply chain disruptions. Innovations in vertical farming, precision agriculture, and alternative protein sources offer potential solutions. However, ensuring equitable access to nutritious food remains a significant challenge.",
    questionText: "Choose the most accurate summary of global food security issues and solutions.",
    options: [
      "Food security problems have been completely solved through modern agricultural technology.",
      "Global food security faces multiple challenges but innovations in farming and proteins offer solutions, though equitable access remains difficult.",
      "Population growth is the only factor affecting food security worldwide.",
      "Alternative protein sources are unnecessary and will never replace traditional farming methods."
    ],
    correctOptionIndex: 1,
    difficulty: "HARD" as const
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Highlight Correct Summary questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningHighlightSummaryPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const createdQuestion = await prisma.listeningHighlightSummaryPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          passage: question.passage,
          questionText: question.questionText,
          options: question.options,
          correctOptionIndex: question.correctOptionIndex,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`)
    }

    console.log("✅ All Highlight Correct Summary questions have been processed successfully!")

    const totalQuestions = await prisma.listeningHighlightSummaryPassage.count()
    console.log(`📊 Total Highlight Correct Summary questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
