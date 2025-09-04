import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "FIBDD001",
    title: "The Process of Photosynthesis",
    difficulty: "MEDIUM" as const,
    content: `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process occurs in the {1} of plant cells, where {2} absorbs light energy. During photosynthesis, plants take in {3} from the air and {4} from the soil through their roots. The light energy is used to split water molecules, releasing {5} as a byproduct. The process also produces {6}, which serves as food for the plant and can be stored as starch for later use.`,
    blanks: [
      { position: 1, correctWord: "chloroplasts" },
      { position: 2, correctWord: "chlorophyll" },
      { position: 3, correctWord: "carbon dioxide" },
      { position: 4, correctWord: "water" },
      { position: 5, correctWord: "oxygen" },
      { position: 6, correctWord: "glucose" }
    ],
    distractors: ["nitrogen", "hydrogen", "mitochondria", "sunlight", "roots", "leaves"]
  },
  {
    questionId: "FIBDD002",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    content: `The water cycle is the continuous movement of water on Earth. It begins with {1}, where the sun heats water in oceans and rivers, turning it into water vapor. This water vapor rises into the atmosphere and cools down, forming {2} through condensation. When the water droplets in clouds become too heavy, they fall back to Earth as {3}. Some water flows over the surface as {4}, while other water soaks into the ground to become {5}.`,
    blanks: [
      { position: 1, correctWord: "evaporation" },
      { position: 2, correctWord: "clouds" },
      { position: 3, correctWord: "precipitation" },
      { position: 4, correctWord: "runoff" },
      { position: 5, correctWord: "groundwater" }
    ],
    distractors: ["condensation", "storms", "ice", "snow", "rivers", "oceans"]
  },
  {
    questionId: "FIBDD003",
    title: "The Human Digestive System",
    difficulty: "HARD" as const,
    content: `The human digestive system breaks down food into nutrients that the body can absorb. Digestion begins in the {1}, where saliva contains enzymes that start breaking down carbohydrates. Food then travels through the {2} to reach the {3}, where gastric acid and digestive enzymes continue the breakdown process. The partially digested food moves to the {4}, where most nutrient absorption occurs with help from the {5} and {6}. Finally, waste products are eliminated through the {7}.`,
    blanks: [
      { position: 1, correctWord: "mouth" },
      { position: 2, correctWord: "esophagus" },
      { position: 3, correctWord: "stomach" },
      { position: 4, correctWord: "small intestine" },
      { position: 5, correctWord: "liver" },
      { position: 6, correctWord: "pancreas" },
      { position: 7, correctWord: "large intestine" }
    ],
    distractors: ["kidney", "heart", "lungs", "throat", "gallbladder", "appendix", "spleen"]
  },
  {
    questionId: "FIBDD004",
    title: "Climate Change and Global Warming",
    difficulty: "MEDIUM" as const,
    content: `Climate change refers to long-term shifts in global temperatures and weather patterns. The primary cause is the increase in {1} in the atmosphere, mainly from burning {2}. These gases trap heat from the sun, causing the {3} effect. As global temperatures rise, we see melting {4}, rising {5}, and more frequent extreme weather events like {6} and floods.`,
    blanks: [
      { position: 1, correctWord: "greenhouse gases" },
      { position: 2, correctWord: "fossil fuels" },
      { position: 3, correctWord: "greenhouse" },
      { position: 4, correctWord: "ice caps" },
      { position: 5, correctWord: "sea levels" },
      { position: 6, correctWord: "droughts" }
    ],
    distractors: ["ozone layer", "solar energy", "wind patterns", "hurricanes", "mountains", "deserts"]
  },
  {
    questionId: "FIBDD005",
    title: "The Basics of Computer Programming",
    difficulty: "EASY" as const,
    content: `Computer programming involves writing instructions for computers to follow. These instructions are written in a {1} that the computer can understand. A program is a set of {2} that tells the computer what to do step by step. Programmers use {3} to write code, and the code must be free of {4} to work properly. Before running a program, it often needs to be {5} into machine language that the computer's processor can execute.`,
    blanks: [
      { position: 1, correctWord: "programming language" },
      { position: 2, correctWord: "instructions" },
      { position: 3, correctWord: "algorithms" },
      { position: 4, correctWord: "errors" },
      { position: 5, correctWord: "compiled" }
    ],
    distractors: ["hardware", "software", "internet", "database", "graphics", "keyboard"]
  },
  {
    questionId: "FIBDD006",
    title: "The Formation of Fossil Fuels",
    difficulty: "HARD" as const,
    content: `Fossil fuels formed millions of years ago from the remains of ancient {1} and plants. These organisms died and were buried under layers of {2} and rock. Over time, heat and {3} transformed the organic material into different types of fossil fuels. {4} formed from ancient marine organisms, while {5} developed from plant material in swamps and forests. {6} formed from both plant and animal remains under specific conditions. The extraction of these fuels from deep underground requires specialized {7} techniques.`,
    blanks: [
      { position: 1, correctWord: "animals" },
      { position: 2, correctWord: "sediment" },
      { position: 3, correctWord: "pressure" },
      { position: 4, correctWord: "oil" },
      { position: 5, correctWord: "coal" },
      { position: 6, correctWord: "natural gas" },
      { position: 7, correctWord: "drilling" }
    ],
    distractors: ["water", "air", "minerals", "crystals", "volcanic ash", "limestone", "mining"]
  }
]

const createFibDragDropQuestions = async () => {
  try {
    console.log("Starting to add Fill in the Blanks (Drag and Drop) questions to the database...")
    
    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage = await prisma.fillBlanksDragDropPassage.findUnique({
        where: { questionId: questionData.questionId }
      })
      
      if (existingPassage) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }
      
      // Validate blanks
      if (questionData.blanks.length === 0) {
        console.log(`⚠️ Question ${questionData.questionId} has no blanks, skipping...`)
        continue
      }
      
      // Create passage, blanks, and options in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the passage
        const passage = await tx.fillBlanksDragDropPassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            content: questionData.content,
            difficulty: questionData.difficulty
          }
        })
        
        // Create all options first (correct answers + distractors)
        const allOptions = []
        
        // Create correct answer options
        for (const blank of questionData.blanks) {
          const option = await tx.fillBlanksDragDropOption.create({
            data: {
              text: blank.correctWord,
              passageId: passage.id,
              blankPosition: blank.position
            }
          })
          allOptions.push({ ...option, isCorrect: true, position: blank.position })
        }
        
        // Create distractor options
        for (const distractor of questionData.distractors) {
          const option = await tx.fillBlanksDragDropOption.create({
            data: {
              text: distractor,
              passageId: passage.id,
              blankPosition: null // Distractors don't have a correct position
            }
          })
          allOptions.push({ ...option, isCorrect: false })
        }
        
        // Create blanks with references to correct options
        const blanks = []
        for (const blankData of questionData.blanks) {
          const correctOption = allOptions.find(
            opt => opt.isCorrect && opt.blankPosition === blankData.position
          )
          
          if (!correctOption) {
            throw new Error(`Could not find correct option for blank position ${blankData.position}`)
          }
          
          const blank = await tx.fillBlanksDragDropBlank.create({
            data: {
              position: blankData.position,
              passageId: passage.id,
              correctOptionId: correctOption.id
            }
          })
          blanks.push(blank)
        }
        
        return { passage, blanks, options: allOptions }
      })
      
      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
      console.log(`   Blanks: ${result.blanks.length}, Total options: ${result.options.length} (${questionData.blanks.length} correct + ${questionData.distractors.length} distractors)`)
      
      // Show correct answers for reference
      const correctAnswers = questionData.blanks.map(blank => 
        `{${blank.position}}: "${blank.correctWord}"`
      ).join(', ')
      console.log(`   Correct answers: ${correctAnswers}`)
    }
    
    console.log("✅ All Fill in the Blanks (Drag and Drop) questions have been processed successfully!")
    
    // Display summary
    const totalPassages = await prisma.fillBlanksDragDropPassage.count()
    const totalBlanks = await prisma.fillBlanksDragDropBlank.count()
    const totalOptions = await prisma.fillBlanksDragDropOption.count()
    const correctOptions = await prisma.fillBlanksDragDropOption.count({
      where: { blankPosition: { not: null } }
    })
    const distractorOptions = await prisma.fillBlanksDragDropOption.count({
      where: { blankPosition: null }
    })
    
    console.log(`📊 Summary:`)
    console.log(`   - Total passages: ${totalPassages}`)
    console.log(`   - Total blanks: ${totalBlanks}`)
    console.log(`   - Total options: ${totalOptions}`)
    console.log(`   - Correct options: ${correctOptions}`)
    console.log(`   - Distractor options: ${distractorOptions}`)
    console.log(`   - Average blanks per passage: ${(totalBlanks / totalPassages).toFixed(1)}`)
    console.log(`   - Average options per passage: ${(totalOptions / totalPassages).toFixed(1)}`)
    
  } catch (error) {
    console.error("❌ Error creating Fill in the Blanks (Drag and Drop) questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createFibDragDropQuestions()