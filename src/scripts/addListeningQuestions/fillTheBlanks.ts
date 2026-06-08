import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "fillTheBlanks")
const S3_SUBDIR = "listening-fill-blanks"

const questions = [
  {
    questionId: "FIB001",
    title: "Climate Change Impact",
    audioTranscribedText: "Climate change is having a significant impact on our planet. Rising temperatures are causing ice caps to melt, leading to higher sea levels. Extreme weather events are becoming more frequent and severe. Scientists agree that human activities are the primary cause of these changes. We must take immediate action to reduce carbon emissions and protect our environment for future generations.",
    audioFile: "climate-impact.mp3",
    passage: "Climate change is having a {1} impact on our planet. Rising temperatures are causing ice caps to {2}, leading to higher sea levels. Extreme weather events are becoming more {3} and severe. Scientists agree that human activities are the primary {4} of these changes. We must take immediate action to reduce carbon emissions and {5} our environment for future generations.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "significant" },
      { position: 2, correctWord: "melt" },
      { position: 3, correctWord: "frequent" },
      { position: 4, correctWord: "cause" },
      { position: 5, correctWord: "protect" }
    ]
  },
  {
    questionId: "FIB002",
    title: "Benefits of Exercise",
    audioTranscribedText: "Regular exercise provides numerous benefits for both physical and mental health. It helps strengthen muscles and bones, improving overall fitness. Exercise also boosts the immune system, making the body more resistant to diseases. Additionally, physical activity releases endorphins, which are natural mood enhancers that reduce stress and anxiety.",
    audioFile: "exercise-benefits.mp3",
    passage: "Regular exercise provides numerous {1} for both physical and mental health. It helps {2} muscles and bones, improving overall fitness. Exercise also boosts the {3} system, making the body more resistant to diseases. Additionally, physical activity releases {4}, which are natural mood enhancers that reduce stress and {5}.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "benefits" },
      { position: 2, correctWord: "strengthen" },
      { position: 3, correctWord: "immune" },
      { position: 4, correctWord: "endorphins" },
      { position: 5, correctWord: "anxiety" }
    ]
  },
  {
    questionId: "FIB003",
    title: "Technology in Education",
    audioTranscribedText: "Technology has revolutionized the way students learn and teachers educate. Digital platforms enable interactive learning experiences that engage students more effectively. Online resources provide access to vast amounts of information and educational materials. However, the integration of technology requires proper training for educators and adequate infrastructure to ensure successful implementation.",
    audioFile: "tech-education.mp3",
    passage: "Technology has {1} the way students learn and teachers educate. Digital platforms enable {2} learning experiences that engage students more effectively. Online resources provide {3} to vast amounts of information and educational materials. However, the integration of technology requires proper {4} for educators and adequate infrastructure to ensure successful {5}.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "revolutionized" },
      { position: 2, correctWord: "interactive" },
      { position: 3, correctWord: "access" },
      { position: 4, correctWord: "training" },
      { position: 5, correctWord: "implementation" }
    ]
  },
  {
    questionId: "FIB004",
    title: "Healthy Eating Habits",
    audioTranscribedText: "Maintaining a balanced diet is essential for good health. Fresh fruits and vegetables provide important vitamins and minerals that our bodies need. Whole grains offer fiber and sustained energy throughout the day. It's important to limit processed foods and sugary drinks. Drinking plenty of water helps maintain proper hydration and supports bodily functions.",
    audioFile: "healthy-eating.mp3",
    passage: "Maintaining a {1} diet is essential for good health. Fresh fruits and vegetables provide important {2} and minerals that our bodies need. Whole grains offer fiber and sustained {3} throughout the day. It's important to limit {4} foods and sugary drinks. Drinking plenty of water helps maintain proper {5} and supports bodily functions.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "balanced" },
      { position: 2, correctWord: "vitamins" },
      { position: 3, correctWord: "energy" },
      { position: 4, correctWord: "processed" },
      { position: 5, correctWord: "hydration" }
    ]
  },
  {
    questionId: "FIB005",
    title: "Space Exploration",
    audioTranscribedText: "Space exploration has led to numerous scientific discoveries and technological advancements. Satellites orbiting Earth provide crucial data for weather forecasting and communication systems. The International Space Station serves as a laboratory for conducting experiments in microgravity. Future missions to Mars and other planets will expand our understanding of the universe and potentially discover signs of extraterrestrial life.",
    audioFile: "space-exploration.mp3",
    passage: "Space exploration has led to numerous scientific {1} and technological advancements. Satellites {2} Earth provide crucial data for weather forecasting and communication systems. The International Space Station serves as a {3} for conducting experiments in microgravity. Future missions to Mars and other planets will expand our {4} of the universe and potentially discover signs of {5} life.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "discoveries" },
      { position: 2, correctWord: "orbiting" },
      { position: 3, correctWord: "laboratory" },
      { position: 4, correctWord: "understanding" },
      { position: 5, correctWord: "extraterrestrial" }
    ]
  },
  {
    questionId: "FIB006",
    title: "Renewable Energy Sources",
    audioTranscribedText: "Renewable energy sources are becoming increasingly important for sustainable development. Solar panels convert sunlight into electricity without producing harmful emissions. Wind turbines generate clean energy by harnessing the power of moving air. Hydroelectric dams use flowing water to produce electricity. These renewable sources help reduce our dependence on fossil fuels and combat climate change.",
    audioFile: "renewable-energy.mp3",
    passage: "Renewable energy sources are becoming increasingly {1} for sustainable development. Solar panels {2} sunlight into electricity without producing harmful emissions. Wind turbines generate clean energy by {3} the power of moving air. Hydroelectric dams use flowing water to produce {4}. These renewable sources help reduce our {5} on fossil fuels and combat climate change.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "important" },
      { position: 2, correctWord: "convert" },
      { position: 3, correctWord: "harnessing" },
      { position: 4, correctWord: "electricity" },
      { position: 5, correctWord: "dependence" }
    ]
  },
  {
    questionId: "FIB007",
    title: "Ocean Conservation",
    audioTranscribedText: "Ocean conservation is critical for maintaining marine ecosystems and biodiversity. Pollution from plastic waste poses a serious threat to marine life. Overfishing has depleted many fish populations worldwide. Marine protected areas help preserve important habitats and allow fish stocks to recover. Individual actions such as reducing plastic use and supporting sustainable seafood can make a significant difference.",
    audioFile: "ocean-conservation.mp3",
    passage: "Ocean conservation is {1} for maintaining marine ecosystems and biodiversity. Pollution from plastic waste poses a serious {2} to marine life. Overfishing has {3} many fish populations worldwide. Marine protected areas help preserve important {4} and allow fish stocks to recover. Individual actions such as reducing plastic use and supporting sustainable seafood can make a significant {5}.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "critical" },
      { position: 2, correctWord: "threat" },
      { position: 3, correctWord: "depleted" },
      { position: 4, correctWord: "habitats" },
      { position: 5, correctWord: "difference" }
    ]
  },
  {
    questionId: "FIB008",
    title: "Artificial Intelligence",
    audioTranscribedText: "Artificial intelligence is transforming various industries and aspects of daily life. Machine learning algorithms can analyze vast amounts of data to identify patterns and make predictions. AI applications include voice assistants, autonomous vehicles, and medical diagnostic tools. However, the development of AI also raises ethical concerns about privacy, employment, and decision-making transparency that society must address.",
    audioFile: "artificial-intelligence.mp3",
    passage: "Artificial intelligence is {1} various industries and aspects of daily life. Machine learning algorithms can {2} vast amounts of data to identify patterns and make predictions. AI applications include voice assistants, {3} vehicles, and medical diagnostic tools. However, the development of AI also raises {4} concerns about privacy, employment, and decision-making {5} that society must address.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "transforming" },
      { position: 2, correctWord: "analyze" },
      { position: 3, correctWord: "autonomous" },
      { position: 4, correctWord: "ethical" },
      { position: 5, correctWord: "transparency" }
    ]
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Fill in the Blanks questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningFillBlankPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const { blanks } = question
      const createdPassage = await prisma.listeningFillBlankPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          audioTranscribedText: question.audioTranscribedText,
          passage: question.passage,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      for (const blank of blanks) {
        await prisma.listeningFillBlank.create({
          data: {
            passageId: createdPassage.id,
            position: blank.position,
            correctWord: blank.correctWord.trim().toLowerCase()
          }
        })
      }

      console.log(`✅ Created question: ${createdPassage.questionId} - ${createdPassage.title} with ${blanks.length} blanks`)
    }

    console.log("✅ All Fill in the Blanks questions have been processed successfully!")

    const totalQuestions = await prisma.listeningFillBlankPassage.count()
    const totalBlanks = await prisma.listeningFillBlank.count()
    console.log(`📊 Total Fill in the Blanks questions in database: ${totalQuestions}`)
    console.log(`📊 Total blanks in database: ${totalBlanks}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
