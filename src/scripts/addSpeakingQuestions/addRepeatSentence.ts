import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "RS001",
    title: "Academic Vocabulary - Research Methods",
    audioUrl: "https://example.com/audio/rs001.mp3",
    transcript: "The research methodology employed in this study utilizes both qualitative and quantitative approaches to ensure comprehensive data collection.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RS002", 
    title: "Business Communication",
    audioUrl: "https://example.com/audio/rs002.mp3",
    transcript: "Effective communication skills are essential for successful project management in today's competitive business environment.",
    difficulty: "EASY" as const
  },
  {
    questionId: "RS003",
    title: "Scientific Process",
    audioUrl: "https://example.com/audio/rs003.mp3", 
    transcript: "The hypothesis was tested through controlled experiments that demonstrated significant correlations between the variables under investigation.",
    difficulty: "HARD" as const
  },
  {
    questionId: "RS004",
    title: "Technology Innovation",
    audioUrl: "https://example.com/audio/rs004.mp3",
    transcript: "Artificial intelligence and machine learning algorithms are revolutionizing various industries by automating complex decision-making processes.",
    difficulty: "HARD" as const
  },
  {
    questionId: "RS005",
    title: "Environmental Awareness", 
    audioUrl: "https://example.com/audio/rs005.mp3",
    transcript: "Climate change mitigation requires immediate action from governments, businesses, and individuals to reduce greenhouse gas emissions.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RS006",
    title: "Educational Psychology",
    audioUrl: "https://example.com/audio/rs006.mp3",
    transcript: "Students learn more effectively when educational content is presented through multiple sensory channels and interactive learning experiences.",
    difficulty: "MEDIUM" as const
  }
]

const createRepeatSentenceQuestions = async () => {
  try {
    console.log("Starting to add Repeat Sentence questions to the database...")

    for (const questionData of questions) {
      // Check if question already exists
      const existingQuestion = await prisma.speakingRepeatSentenceQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }

      // Create the question
      const question = await prisma.speakingRepeatSentenceQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl: questionData.audioUrl,
          transcript: questionData.transcript,
          difficulty: questionData.difficulty
        }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
    }

    console.log("✅ All Repeat Sentence questions have been processed successfully!")

    // Display summary
    const totalQuestions = await prisma.speakingRepeatSentenceQuestion.count()
    console.log(`📊 Total Repeat Sentence questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating Repeat Sentence questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createRepeatSentenceQuestions()