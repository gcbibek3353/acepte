import prisma from "@/lib/prisma"

const dummyQuestions = [
  {
    questionId: "RA001",
    title: "Climate Change and Global Warming",
    difficulty: "EASY" as const,
    passage: "Climate change refers to long-term shifts in global or regional climate patterns. Since the mid-20th century, the pace of climate change has increased dramatically due to increased levels of atmospheric carbon dioxide and other greenhouse gases produced by human activities."
  },
  {
    questionId: "RA002", 
    title: "The Benefits of Regular Exercise",
    difficulty: "EASY" as const,
    passage: "Regular physical activity is one of the most important things you can do for your health. It can help control your weight, reduce your risk of heart disease, strengthen your bones and muscles, and improve your mental health and mood."
  },
  {
    questionId: "RA003",
    title: "Artificial Intelligence in Healthcare",
    difficulty: "MEDIUM" as const,
    passage: "Artificial intelligence is revolutionizing healthcare by enabling more accurate diagnoses, personalized treatment plans, and efficient drug discovery. Machine learning algorithms can analyze vast amounts of medical data to identify patterns that might be missed by human doctors, leading to earlier detection of diseases and better patient outcomes."
  },
  {
    questionId: "RA004",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    passage: "The water cycle is the continuous movement of water on, above, and below the surface of Earth. Water evaporates from oceans and rivers, forms clouds in the atmosphere, and eventually returns to Earth as precipitation in the form of rain or snow."
  },
  {
    questionId: "RA005",
    title: "Renewable Energy Sources",
    difficulty: "MEDIUM" as const,
    passage: "Renewable energy sources such as solar, wind, and hydroelectric power are becoming increasingly important as the world seeks to reduce its dependence on fossil fuels. These sustainable energy sources produce electricity without generating harmful emissions, making them crucial for combating climate change and ensuring energy security for future generations."
  },
  {
    questionId: "RA006",
    title: "The Importance of Biodiversity",
    difficulty: "MEDIUM" as const,
    passage: "Biodiversity refers to the variety of life on Earth, including the different species of plants, animals, and microorganisms, their genetic variations, and the ecosystems they form. This diversity is essential for maintaining ecological balance, providing ecosystem services, and ensuring the resilience of natural systems against environmental changes."
  },
  {
    questionId: "RA007",
    title: "Digital Transformation in Education",
    difficulty: "HARD" as const,
    passage: "The digital transformation of education has accelerated significantly, particularly in response to global challenges that have necessitated remote learning. Educational institutions are increasingly adopting innovative technologies such as virtual reality, artificial intelligence, and adaptive learning platforms to create more engaging, personalized, and accessible learning experiences for students across diverse geographical and socioeconomic backgrounds."
  },
  {
    questionId: "RA008",
    title: "Photosynthesis Process",
    difficulty: "MEDIUM" as const,
    passage: "Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy from the sun into chemical energy stored in glucose molecules. This fundamental biological process involves the absorption of carbon dioxide from the atmosphere and water from the soil, producing oxygen as a byproduct that is essential for most life forms on Earth."
  },
  {
    questionId: "RA009",
    title: "Quantum Computing Revolution",
    difficulty: "HARD" as const,
    passage: "Quantum computing represents a paradigmatic shift in computational methodology, leveraging quantum mechanical phenomena such as superposition and entanglement to process information in ways that classical computers cannot. These revolutionary machines have the potential to solve complex problems in cryptography, drug discovery, and optimization that would require thousands of years for traditional computers to complete."
  },
  {
    questionId: "RA010",
    title: "Urban Planning and Sustainability",
    difficulty: "HARD" as const,
    passage: "Contemporary urban planning increasingly emphasizes sustainable development principles, incorporating green infrastructure, mixed-use developments, and transit-oriented design to create environmentally responsible and socially equitable cities. This holistic approach addresses challenges such as population growth, resource scarcity, and climate change while promoting economic vitality and community well-being."
  },
  {
    questionId: "RA011",
    title: "The Internet of Things",
    difficulty: "MEDIUM" as const,
    passage: "The Internet of Things refers to the network of interconnected devices that can collect and exchange data without human intervention. From smart home appliances to industrial sensors, IoT technology is transforming how we interact with our environment and enabling more efficient resource management and automated decision-making processes."
  },
  {
    questionId: "RA012",
    title: "Space Exploration Benefits",
    difficulty: "EASY" as const,
    passage: "Space exploration has led to numerous technological innovations that benefit life on Earth. From satellite communications and GPS systems to medical devices and materials science breakthroughs, the challenges of space travel have driven scientific advancement and improved our understanding of the universe and our place within it."
  }
]

const createReadAloudQuestions = async () => {
  try {
    console.log("Starting to add Speaking Read Aloud questions to the database...")
    
    for (const questionData of dummyQuestions) {
      // Check if question already exists
      const existingQuestion = await prisma.speakingReadAloudQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })
      
      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }
      
      // Validate passage length
      if (questionData.passage.length < 50) {
        console.log(`⚠️ Question ${questionData.questionId} passage is too short, skipping...`)
        continue
      }
      
      // Create the question
      await prisma.speakingReadAloudQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          passage: questionData.passage,
          difficulty: questionData.difficulty
        }
      })
      
      const wordCount = questionData.passage.split(' ').length
      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
      console.log(`   Difficulty: ${questionData.difficulty}, Word count: ${wordCount}`)
    }
    
    console.log("✅ All Speaking Read Aloud questions have been processed successfully!")
    
    // Display summary
    const totalQuestions = await prisma.speakingReadAloudQuestion.count()
    const easyQuestions = await prisma.speakingReadAloudQuestion.count({
      where: { difficulty: 'EASY' }
    })
    const mediumQuestions = await prisma.speakingReadAloudQuestion.count({
      where: { difficulty: 'MEDIUM' }
    })
    const hardQuestions = await prisma.speakingReadAloudQuestion.count({
      where: { difficulty: 'HARD' }
    })
    
    console.log(`📊 Summary:`)
    console.log(`   - Total questions: ${totalQuestions}`)
    console.log(`   - Easy: ${easyQuestions}`)
    console.log(`   - Medium: ${mediumQuestions}`)
    console.log(`   - Hard: ${hardQuestions}`)
    

    
  } catch (error) {
    console.error("❌ Error creating Speaking Read Aloud questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createReadAloudQuestions()