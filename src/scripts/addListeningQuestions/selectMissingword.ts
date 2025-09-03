import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "SMW001",
    title: "University Lecture on Climate Science",
    audioUrl: "https://example.com/audio/climate-science-lecture.mp3",
    instruction: "Listen to the recording and select the word that completes the sentence.",
    options: ["therefore", "however", "moreover", "nevertheless"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW002",
    title: "Campus Library Announcement",
    audioUrl: "https://example.com/audio/library-announcement.mp3",
    instruction: "Select the correct word to complete the announcement.",
    options: ["available", "accessible", "permitted", "allowed"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW003",
    title: "Research Methodology Seminar",
    audioUrl: "https://example.com/audio/research-methodology.mp3",
    instruction: "Choose the word that best completes the speaker's statement.",
    options: ["significant", "substantial", "considerable", "remarkable"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW004",
    title: "Student Orientation Session",
    audioUrl: "https://example.com/audio/student-orientation.mp3",
    instruction: "Listen carefully and select the missing word.",
    options: ["registration", "enrollment", "admission", "application"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW005",
    title: "Environmental Science Discussion",
    audioUrl: "https://example.com/audio/environmental-science.mp3",
    instruction: "Select the correct option to complete the recording.",
    options: ["biodiversity", "ecosystem", "habitat", "conservation"],
    correctOptionIndex: 2,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW006",
    title: "Academic Writing Workshop",
    audioUrl: "https://example.com/audio/academic-writing-workshop.mp3",
    instruction: "Choose the word that completes the instructor's explanation.",
    options: ["coherence", "consistency", "clarity", "conciseness"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW007",
    title: "Technology Conference Presentation",
    audioUrl: "https://example.com/audio/tech-conference.mp3",
    instruction: "Listen to the recording and select the appropriate word.",
    options: ["innovation", "advancement", "development", "progress"],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW008",
    title: "Health Sciences Lecture",
    audioUrl: "https://example.com/audio/health-sciences.mp3",
    instruction: "Select the word that best fits the context.",
    options: ["diagnosis", "treatment", "prevention", "therapy"],
    correctOptionIndex: 2,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW009",
    title: "Economics Seminar Discussion",
    audioUrl: "https://example.com/audio/economics-seminar.mp3",
    instruction: "Choose the correct word to complete the economist's statement.",
    options: ["fluctuation", "variation", "volatility", "instability"],
    correctOptionIndex: 2,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW010",
    title: "Campus Safety Briefing",
    audioUrl: "https://example.com/audio/campus-safety.mp3",
    instruction: "Listen and select the missing word from the announcement.",
    options: ["procedures", "protocols", "guidelines", "regulations"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW011",
    title: "Psychology Course Introduction",
    audioUrl: "https://example.com/audio/psychology-intro.mp3",
    instruction: "Select the correct option to complete the recording.",
    options: ["behavior", "conduct", "attitude", "response"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW012",
    title: "Engineering Project Presentation",
    audioUrl: "https://example.com/audio/engineering-project.mp3",
    instruction: "Choose the word that completes the technical explanation.",
    options: ["efficiency", "effectiveness", "performance", "productivity"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  },
  {
    questionId: "SMW013",
    title: "Student Services Information",
    audioUrl: "https://example.com/audio/student-services.mp3",
    instruction: "Listen carefully and select the appropriate word.",
    options: ["assistance", "support", "guidance", "help"],
    correctOptionIndex: 1,
    difficulty: "EASY" as const
  },
  {
    questionId: "SMW014",
    title: "Business Administration Lecture",
    audioUrl: "https://example.com/audio/business-admin.mp3",
    instruction: "Select the word that best completes the statement.",
    options: ["strategy", "approach", "method", "technique"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SMW015",
    title: "International Relations Symposium",
    audioUrl: "https://example.com/audio/international-relations.mp3",
    instruction: "Choose the correct word to complete the speaker's analysis.",
    options: ["diplomacy", "negotiation", "cooperation", "collaboration"],
    correctOptionIndex: 0,
    difficulty: "HARD" as const
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Select Missing Word questions to the database...")
    
    for (const question of questions) {
      const existingQuestion = await prisma.listeningSelectMissingWordPassage.findUnique({
        where: { questionId: question.questionId }
      })
      
      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }
      
      const createdQuestion = await prisma.listeningSelectMissingWordPassage.create({
        data: question
      })
      
      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`)
    }
    
    console.log("✅ All Select Missing Word questions have been processed successfully!")
    
    // Display summary
    const totalQuestions = await prisma.listeningSelectMissingWordPassage.count()
    console.log(`📊 Total Select Missing Word questions in database: ${totalQuestions}`)
    
  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createQuestions()