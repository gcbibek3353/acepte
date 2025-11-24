import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "RL001",
    title: "Psychology - Memory and Learning",
    audioUrl: "https://example.com/audio/psychology-memory.mp3",
    audioTranscribedText: "Today's lecture focuses on the relationship between memory formation and learning processes. Research has shown that the hippocampus plays a crucial role in converting short-term memories into long-term storage. The process of consolidation involves repeated neural firing patterns that strengthen synaptic connections. Students can improve their learning by utilizing spaced repetition techniques and creating meaningful associations with new information.",
    imageUrl: "https://example.com/images/brain-memory-diagram.jpg",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RL002", 
    title: "Environmental Science - Renewable Energy",
    audioUrl: "https://example.com/audio/renewable-energy.mp3",
    audioTranscribedText: "The transition to renewable energy sources represents one of the most significant challenges of our time. Solar and wind technologies have experienced dramatic cost reductions, making them competitive with fossil fuels in many markets. However, intermittency issues require advanced storage solutions and smart grid technologies. Government policies and carbon pricing mechanisms are essential drivers for accelerating the adoption of clean energy systems.",
    imageUrl: "https://example.com/images/renewable-energy-chart.jpg",
    difficulty: "HARD" as const
  },
  {
    questionId: "RL003",
    title: "Economics - Market Dynamics",
    audioUrl: "https://example.com/audio/market-dynamics.mp3", 
    audioTranscribedText: "Market dynamics are influenced by the fundamental forces of supply and demand. When demand exceeds supply, prices typically rise, encouraging producers to increase output. Conversely, when supply exceeds demand, prices tend to fall. External factors such as government regulations, technological innovations, and consumer preferences can significantly impact these basic market mechanisms.",
    imageUrl: null,
    difficulty: "EASY" as const
  },
  {
    questionId: "RL004",
    title: "History - Industrial Revolution Impact",
    audioUrl: "https://example.com/audio/industrial-revolution.mp3",
    audioTranscribedText: "The Industrial Revolution fundamentally transformed human society from agricultural-based economies to manufacturing-centered systems. This period saw unprecedented technological innovations, including steam engines, mechanized textile production, and improved transportation networks. While these changes increased productivity and living standards for some, they also created new social challenges including urbanization problems and labor exploitation.",
    imageUrl: "https://example.com/images/industrial-revolution-timeline.jpg", 
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RL005",
    title: "Biology - Cellular Respiration",
    audioUrl: "https://example.com/audio/cellular-respiration.mp3",
    audioTranscribedText: "Cellular respiration is the process by which cells convert glucose and oxygen into carbon dioxide, water, and ATP energy. This complex biochemical process occurs in three main stages: glycolysis in the cytoplasm, the citric acid cycle in the mitochondrial matrix, and the electron transport chain in the inner mitochondrial membrane. Understanding this process is fundamental to comprehending how organisms obtain and utilize energy.",
    imageUrl: "https://example.com/images/cellular-respiration-diagram.jpg",
    difficulty: "HARD" as const
  },
  {
    questionId: "RL006",
    title: "Literature - Modernist Movement", 
    audioUrl: "https://example.com/audio/modernist-literature.mp3",
    audioTranscribedText: "The modernist literary movement emerged in the early 20th century as writers sought to break away from traditional narrative structures and themes. Authors like James Joyce and Virginia Woolf experimented with stream-of-consciousness techniques and fragmented storytelling. This movement reflected the social and cultural upheavals of the time, including world wars and rapid technological change.",
    imageUrl: null,
    difficulty: "MEDIUM" as const
  }
]

const createRetellLectureQuestions = async () => {
  try {
    console.log("Starting to add Retell Lecture questions to the database...")

    for (const questionData of questions) {
      // Check if question already exists
      const existingQuestion = await prisma.speakingRetellLectureQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }

      // Create the question
      const question = await prisma.speakingRetellLectureQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl: questionData.audioUrl,
          audioTranscribedText: questionData.audioTranscribedText,
          imageUrl: questionData.imageUrl,
          difficulty: questionData.difficulty
        }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
    }

    console.log("✅ All Retell Lecture questions have been processed successfully!")

    // Display summary
    const totalQuestions = await prisma.speakingRetellLectureQuestion.count()
    console.log(`📊 Total Retell Lecture questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating Retell Lecture questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createRetellLectureQuestions()