import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "WE001",
    essayTitle: "University Class Attendance",
    essay_description: "Some people believe that university students should be required to attend classes. Others believe that going to classes should be optional for students. Which point of view do you agree with? Use specific reasons and examples to support your answer.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 200,
    max_word_limit: 300
  },
  {
    questionId: "WE002", 
    essayTitle: "Technology in Education",
    essay_description: "Do you agree or disagree with the following statement? Technology has made children less creative than they were in the past. Use specific reasons and examples to support your answer.",
    difficulty: "HARD" as const,
    min_word_limit: 250,
    max_word_limit: 350
  },
  {
    questionId: "WE003",
    essayTitle: "Work From Home",
    essay_description: "Some people prefer to work from home, while others prefer to work in an office. Which do you think is better? Use specific reasons and examples to support your opinion.",
    difficulty: "EASY" as const,
    min_word_limit: 150,
    max_word_limit: 250
  },
  {
    questionId: "WE004",
    essayTitle: "Social Media Impact",
    essay_description: "Do you agree or disagree with the following statement? Social media has had a positive impact on society. Use specific reasons and examples to support your answer.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 200,
    max_word_limit: 300
  },
  {
    questionId: "WE005",
    essayTitle: "Environmental Protection",
    essay_description: "Some people think that environmental problems are too big for individuals to solve. Others believe that individuals can make a significant difference. Which view do you agree with? Use specific reasons and examples to support your answer.",
    difficulty: "HARD" as const,
    min_word_limit: 250,
    max_word_limit: 350
  },
  {
    questionId: "WE006",
    essayTitle: "Public Transportation",
    essay_description: "Do you agree or disagree with the following statement? Governments should invest more money in public transportation than in building new roads. Use specific reasons and examples to support your answer.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 200,
    max_word_limit: 300
  },
  {
    questionId: "WE007",
    essayTitle: "Learning Foreign Languages",
    essay_description: "Some people believe that children should learn a foreign language from elementary school. Others think that learning a foreign language should start in high school. Which point of view do you agree with? Use specific reasons and examples to support your answer.",
    difficulty: "EASY" as const,
    min_word_limit: 150,
    max_word_limit: 250
  },
  {
    questionId: "WE008",
    essayTitle: "Artificial Intelligence in Jobs",
    essay_description: "Do you agree or disagree with the following statement? Artificial intelligence will replace most human jobs in the future. Use specific reasons and examples to support your answer.",
    difficulty: "HARD" as const,
    min_word_limit: 250,
    max_word_limit: 350
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add questions to the database...")
    
    for (const question of questions) {
      const existingQuestion = await prisma.writeEssayQuestion.findUnique({
        where: { questionId: question.questionId }
      })
      
      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }
      
      const createdQuestion = await prisma.writeEssayQuestion.create({
        data: question
      })
      
      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.essayTitle}`)
    }
    
    console.log("✅ All questions have been processed successfully!")
    
    // Display summary
    const totalQuestions = await prisma.writeEssayQuestion.count()
    console.log(`📊 Total questions in database: ${totalQuestions}`)
    
  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
// createQuestions()