import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "MultiplechoiceMultiple")
const S3_SUBDIR = "listening-multiple-choice-multiple"

const questions = [
  {
    questionId: "MCM001",
    title: "Climate Change Solutions",
    questionText: "Based on the audio, which of the following are mentioned as solutions to climate change? Select all that apply.",
    audioTranscribedText: "To combat climate change, experts recommend several key strategies. First, transitioning to renewable energy sources like solar and wind power can significantly reduce carbon emissions. Second, improving energy efficiency in buildings and transportation systems helps minimize overall energy consumption. Third, protecting and restoring forests acts as natural carbon sinks. Fourth, developing carbon capture technologies can remove existing CO2 from the atmosphere. Finally, implementing carbon pricing policies encourages businesses to reduce their emissions. These combined efforts are essential for limiting global temperature rise.",
    audioFile: "climate-solutions.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Transitioning to renewable energy sources", isCorrect: true },
      { text: "Increasing fossil fuel production", isCorrect: false },
      { text: "Improving energy efficiency", isCorrect: true },
      { text: "Cutting down more forests", isCorrect: false },
      { text: "Developing carbon capture technologies", isCorrect: true },
      { text: "Implementing carbon pricing policies", isCorrect: true }
    ]
  },
  {
    questionId: "MCM002",
    title: "Benefits of Remote Work",
    questionText: "According to the speaker, what are the advantages of remote work? Choose all correct answers.",
    audioTranscribedText: "Remote work has transformed the modern workplace and offers numerous benefits. Employees enjoy increased flexibility in their schedules, allowing for better work-life balance. Companies save money on office space and utilities, reducing overhead costs. Workers eliminate daily commuting, which saves time and reduces stress. Productivity often increases as employees have fewer office distractions. Access to a global talent pool allows companies to hire the best candidates regardless of location. However, remote work also presents challenges such as potential isolation and communication difficulties.",
    audioFile: "remote-work.mp3",
    difficulty: "EASY" as const,
    options: [
      { text: "Increased flexibility for employees", isCorrect: true },
      { text: "Higher office rental costs", isCorrect: false },
      { text: "Reduced commuting time", isCorrect: true },
      { text: "More office distractions", isCorrect: false },
      { text: "Access to global talent pool", isCorrect: true },
      { text: "Guaranteed increase in salary", isCorrect: false }
    ]
  },
  {
    questionId: "MCM003",
    title: "Healthy Eating Habits",
    questionText: "Which foods and practices are recommended for maintaining a healthy diet? Select all that are mentioned.",
    audioTranscribedText: "Maintaining a healthy diet involves several key principles. First, include plenty of fruits and vegetables in your daily meals, aiming for at least five servings per day. Whole grains should replace refined grains whenever possible. Lean proteins such as fish, chicken, and legumes are essential for muscle health. Staying hydrated by drinking adequate water throughout the day is crucial. Limiting processed foods and added sugars helps prevent various health issues. Regular meal timing and portion control also play important roles in maintaining good nutrition.",
    audioFile: "healthy-eating.mp3",
    difficulty: "EASY" as const,
    options: [
      { text: "Eating plenty of fruits and vegetables", isCorrect: true },
      { text: "Consuming more processed foods", isCorrect: false },
      { text: "Choosing whole grains over refined grains", isCorrect: true },
      { text: "Including lean proteins in meals", isCorrect: true },
      { text: "Drinking adequate water", isCorrect: true },
      { text: "Eating unlimited amounts of food", isCorrect: false }
    ]
  },
  {
    questionId: "MCM004",
    title: "Artificial Intelligence Applications",
    questionText: "What are the current applications of artificial intelligence mentioned in the audio? Choose all correct options.",
    audioTranscribedText: "Artificial intelligence is revolutionizing various industries with diverse applications. In healthcare, AI assists in medical diagnosis and drug discovery, improving patient outcomes. The automotive industry uses AI for developing autonomous vehicles and advanced driver assistance systems. Financial services employ AI for fraud detection and algorithmic trading. In education, AI powers personalized learning platforms and automated grading systems. Entertainment platforms use AI for content recommendation and creation. However, concerns about job displacement and ethical implications require careful consideration as AI technology advances.",
    audioFile: "ai-applications.mp3",
    difficulty: "HARD" as const,
    options: [
      { text: "Medical diagnosis and drug discovery", isCorrect: true },
      { text: "Autonomous vehicle development", isCorrect: true },
      { text: "Manual data entry", isCorrect: false },
      { text: "Fraud detection in financial services", isCorrect: true },
      { text: "Personalized learning platforms", isCorrect: true },
      { text: "Replacing all human workers", isCorrect: false },
      { text: "Content recommendation systems", isCorrect: true }
    ]
  },
  {
    questionId: "MCM005",
    title: "Sustainable Transportation",
    questionText: "Based on the audio, which transportation methods are considered environmentally sustainable? Select all that apply.",
    audioTranscribedText: "Sustainable transportation is crucial for reducing environmental impact and creating livable cities. Public transportation systems like buses, trains, and light rail significantly reduce per-capita emissions compared to private vehicles. Cycling and walking are zero-emission options that also promote physical health. Electric vehicles powered by renewable energy sources offer a cleaner alternative to gasoline cars. Car-sharing and ride-sharing services can reduce the total number of vehicles needed. However, traditional gasoline and diesel vehicles remain major contributors to air pollution and greenhouse gas emissions.",
    audioFile: "sustainable-transport.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Public transportation systems", isCorrect: true },
      { text: "Gasoline-powered private cars", isCorrect: false },
      { text: "Cycling and walking", isCorrect: true },
      { text: "Electric vehicles with renewable energy", isCorrect: true },
      { text: "Diesel trucks for personal use", isCorrect: false },
      { text: "Car-sharing services", isCorrect: true }
    ]
  },
  {
    questionId: "MCM006",
    title: "Digital Privacy and Security",
    questionText: "What measures are mentioned for protecting digital privacy and security? Choose all correct answers.",
    audioTranscribedText: "Protecting digital privacy and security requires multiple layers of defense. Using strong, unique passwords for each account is fundamental. Two-factor authentication adds an extra security layer. Regular software updates patch security vulnerabilities. Being cautious about sharing personal information on social media prevents identity theft. Using secure, encrypted communication tools protects sensitive conversations. Avoiding public Wi-Fi for sensitive activities reduces exposure to hackers. Additionally, being aware of phishing attempts and suspicious links helps prevent malware infections.",
    audioFile: "digital-security.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Using strong, unique passwords", isCorrect: true },
      { text: "Sharing all personal information online", isCorrect: false },
      { text: "Enabling two-factor authentication", isCorrect: true },
      { text: "Avoiding software updates", isCorrect: false },
      { text: "Using encrypted communication tools", isCorrect: true },
      { text: "Always using public Wi-Fi for banking", isCorrect: false },
      { text: "Being aware of phishing attempts", isCorrect: true }
    ]
  },
  {
    questionId: "MCM007",
    title: "Space Exploration Benefits",
    questionText: "According to the audio, what benefits does space exploration provide? Select all that are mentioned.",
    audioTranscribedText: "Space exploration has yielded numerous benefits for humanity beyond scientific discovery. Satellite technology enables global communications, weather forecasting, and GPS navigation. Medical research conducted in space has led to new treatments and medical devices. Advanced materials developed for spacecraft have found applications in everyday products. Earth observation satellites help monitor climate change and natural disasters. The International Space Station serves as a platform for scientific experiments impossible on Earth. Additionally, space exploration inspires future generations to pursue science and engineering careers.",
    audioFile: "space-exploration.mp3",
    difficulty: "HARD" as const,
    options: [
      { text: "Global communications through satellites", isCorrect: true },
      { text: "Immediate colonization of other planets", isCorrect: false },
      { text: "Medical research and new treatments", isCorrect: true },
      { text: "Development of advanced materials", isCorrect: true },
      { text: "Climate change monitoring", isCorrect: true },
      { text: "Elimination of all Earth-based problems", isCorrect: false },
      { text: "Inspiring future scientists and engineers", isCorrect: true }
    ]
  },
  {
    questionId: "MCM008",
    title: "Mental Health Awareness",
    questionText: "What factors contribute to good mental health according to the speaker? Choose all correct options.",
    audioTranscribedText: "Maintaining good mental health requires attention to multiple factors. Regular physical exercise releases endorphins and reduces stress hormones. Quality sleep is essential for emotional regulation and cognitive function. Strong social connections and supportive relationships provide emotional resilience. Mindfulness practices and meditation can reduce anxiety and improve focus. Professional counseling or therapy offers valuable support when needed. Limiting excessive social media use helps prevent comparison and anxiety. Additionally, pursuing hobbies and interests contributes to personal fulfillment and stress relief.",
    audioFile: "mental-health.mp3",
    difficulty: "EASY" as const,
    options: [
      { text: "Regular physical exercise", isCorrect: true },
      { text: "Isolation from all social contact", isCorrect: false },
      { text: "Quality sleep", isCorrect: true },
      { text: "Strong social connections", isCorrect: true },
      { text: "Excessive social media use", isCorrect: false },
      { text: "Mindfulness and meditation practices", isCorrect: true },
      { text: "Professional counseling when needed", isCorrect: true }
    ]
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Multiple Choice Multiple Answer questions to the database...")

    for (const question of questions) {
      const existingQuestion = await prisma.listeningMCMPassage.findUnique({
        where: { questionId: question.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, question.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      const { options } = question
      const createdPassage = await prisma.listeningMCMPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          questionText: question.questionText,
          audioTranscribedText: question.audioTranscribedText,
          difficulty: question.difficulty,
          audioUrl,
        }
      })

      for (const option of options) {
        await prisma.listeningMCMOption.create({
          data: {
            text: option.text,
            isCorrect: option.isCorrect,
            passageId: createdPassage.id
          }
        })
      }

      console.log(`✅ Created question: ${createdPassage.questionId} - ${createdPassage.title} with ${options.length} options`)
    }

    console.log("✅ All Multiple Choice Multiple Answer questions have been processed successfully!")

    const totalQuestions = await prisma.listeningMCMPassage.count()
    const totalOptions = await prisma.listeningMCMOption.count()
    console.log(`📊 Total Multiple Choice Multiple Answer questions in database: ${totalQuestions}`)
    console.log(`📊 Total options in database: ${totalOptions}`)

  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createQuestions()
