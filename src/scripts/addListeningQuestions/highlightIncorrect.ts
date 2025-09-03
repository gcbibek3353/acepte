import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "HIW001",
    title: "Climate Change Impact on Agriculture",
    audioUrl: "https://example.com/audio/climate-agriculture.mp3",
    passage: "Climate change is significantly affecting agricultural production worldwide. Rising temperatures and changing precipitation patterns are making it difficult for farmers to maintain consistent crop yields. Many regions are experiencing severe droughts while others face unexpected flooding. Scientists recommend developing drought-resistant crop varieties and improving irrigation systems to adapt to these changes.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "production", position: 8 }, // Should be "productivity"
      { word: "severe", position: 35 }, // Should be "serious"
      { word: "irrigation", position: 50 } // Should be "water management"
    ]
  },
  {
    questionId: "HIW002",
    title: "University Library Resources",
    audioUrl: "https://example.com/audio/library-resources.mp3",
    passage: "The university library offers extensive digital resources including academic journals, research databases, and electronic books. Students can access these materials remotely using their student credentials. The library also provides research assistance and citation guidance. Additionally, group study rooms are available for collaborative projects and can be reserved online through the library portal.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "credentials", position: 20 }, // Should be "identification"
      { word: "citation", position: 27 }, // Should be "referencing"
      { word: "portal", position: 45 } // Should be "website"
    ]
  },
  {
    questionId: "HIW003",
    title: "Renewable Energy Technology",
    audioUrl: "https://example.com/audio/renewable-tech.mp3",
    passage: "Solar panels and wind turbines are becoming increasingly efficient and cost-effective. Modern photovoltaic cells can convert sunlight into electricity with remarkable accuracy. Wind energy technology has also advanced significantly, with newer turbines capable of generating more power even in low wind conditions. These improvements are making renewable energy more competitive with traditional fossil fuels.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "accuracy", position: 18 }, // Should be "efficiency"
      { word: "generating", position: 32 }, // Should be "producing"
      { word: "competitive", position: 43 } // Should be "comparable"
    ]
  },
  {
    questionId: "HIW004",
    title: "Urban Transportation Solutions",
    audioUrl: "https://example.com/audio/urban-transport.mp3",
    passage: "Cities are implementing various strategies to reduce traffic congestion and improve air quality. Electric buses are replacing traditional diesel vehicles in many metropolitan areas. Bike-sharing programs encourage residents to use sustainable transportation methods. Additionally, smart traffic management systems help optimize traffic flow and reduce commute times for daily travelers.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "metropolitan", position: 17 }, // Should be "urban"
      { word: "methods", position: 25 }, // Should be "options"
      { word: "travelers", position: 42 } // Should be "commuters"
    ]
  },
  {
    questionId: "HIW005",
    title: "Student Health and Wellness",
    audioUrl: "https://example.com/audio/student-wellness.mp3",
    passage: "Maintaining physical and mental health is crucial for academic success. Regular exercise helps students manage stress and improve concentration. The campus fitness center offers various programs including yoga classes and strength training sessions. Mental health services provide counseling and support groups for students facing emotional challenges during their studies.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "concentration", position: 16 }, // Should be "focus"
      { word: "sessions", position: 29 }, // Should be "programs"
      { word: "emotional", position: 40 } // Should be "psychological"
    ]
  },
  {
    questionId: "HIW006",
    title: "Environmental Conservation Efforts",
    audioUrl: "https://example.com/audio/conservation-efforts.mp3",
    passage: "Marine protected areas are essential for preserving ocean biodiversity and supporting fish populations. These reserves provide safe habitats where marine species can reproduce and thrive without human interference. Scientists monitor water quality and track wildlife populations to assess the effectiveness of conservation measures. International cooperation is vital for protecting migratory species.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "reserves", position: 14 }, // Should be "zones"
      { word: "interference", position: 25 }, // Should be "disturbance"
      { word: "measures", position: 38 } // Should be "efforts"
    ]
  },
  {
    questionId: "HIW007",
    title: "Digital Learning Platforms",
    audioUrl: "https://example.com/audio/digital-learning.mp3",
    passage: "Online education platforms have revolutionized how students access learning materials. Interactive multimedia content engages learners more effectively than traditional textbooks. Virtual classrooms enable real-time collaboration between students and instructors regardless of geographical boundaries. Adaptive learning algorithms personalize educational content based on individual student performance and learning preferences.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "multimedia", position: 11 }, // Should be "digital"
      { word: "boundaries", position: 26 }, // Should be "limitations"
      { word: "preferences", position: 40 } // Should be "styles"
    ]
  },
  {
    questionId: "HIW008",
    title: "Campus Safety and Security",
    audioUrl: "https://example.com/audio/campus-safety.mp3",
    passage: "University security personnel patrol campus grounds regularly to ensure student safety. Emergency call boxes are strategically located throughout the campus for immediate assistance. The campus safety app allows students to request escorts and report suspicious activities. Security cameras monitor high-traffic areas and provide valuable surveillance footage when incidents occur.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "personnel", position: 3 }, // Should be "officers"
      { word: "strategically", position: 14 }, // Should be "carefully"
      { word: "surveillance", position: 33 } // Should be "security"
    ]
  },
  {
    questionId: "HIW009",
    title: "Research Methodology Training",
    audioUrl: "https://example.com/audio/research-methodology.mp3",
    passage: "Graduate students must learn proper research methodologies to conduct credible academic studies. Data collection techniques vary depending on the research objectives and target population. Statistical analysis software helps researchers interpret complex datasets and identify significant patterns. Peer review processes ensure that research findings meet academic standards before publication in scholarly journals.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "credible", position: 10 }, // Should be "reliable"
      { word: "objectives", position: 17 }, // Should be "goals"
      { word: "scholarly", position: 42 } // Should be "academic"
    ]
  },
  {
    questionId: "HIW010",
    title: "Food Science and Nutrition",
    audioUrl: "https://example.com/audio/food-nutrition.mp3",
    passage: "Understanding nutritional requirements is fundamental for maintaining optimal health. Balanced diets should include adequate proteins, carbohydrates, healthy fats, vitamins, and minerals. Food processing techniques can affect the nutritional value of ingredients. Nutritionists recommend consuming fresh produce and minimizing processed foods to maximize dietary benefits and support overall wellness.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "fundamental", position: 4 }, // Should be "essential"
      { word: "ingredients", position: 22 }, // Should be "foods"
      { word: "dietary", position: 35 } // Should be "health"
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
      
      // Separate incorrect words from main question data
      const { incorrectWords, ...passageData } = question
      
      // Create the passage first
      const createdPassage = await prisma.listeningHighlightIncorrectWordsPassage.create({
        data: passageData
      })
      
      // Then create each incorrect word separately
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
    
    // Display summary
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

// Execute the function
createQuestions()