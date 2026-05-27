import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "FIBDD001",
    title: "The Process of Photosynthesis",
    difficulty: "MEDIUM" as const,
    content: `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process occurs in the {1} of plant cells, where {2} absorbs light energy. During photosynthesis, plants take in {3} from the air and {4} from the soil through their roots. The light energy is used to split water molecules, releasing {5} as a byproduct. The process also produces {6}, which serves as food for the plant and can be stored as starch for later use.`,
    blanks: [
      {
        position: 1, correctOptionIndex: 1,
        explanation: "'Chloroplasts' is correct because photosynthesis is a light-dependent process that takes place specifically in the chloroplasts — the organelles that contain chlorophyll. Mitochondria handle respiration, not photosynthesis, and roots/leaves refer to structural parts of the plant, not cellular locations."
      },
      {
        position: 2, correctOptionIndex: 7,
        explanation: "'Chlorophyll' is correct because it is the green pigment inside chloroplasts that captures light energy and initiates the photosynthesis reaction. Without chlorophyll, plants cannot absorb the sunlight needed to drive the process."
      },
      {
        position: 3, correctOptionIndex: 2,
        explanation: "'Carbon dioxide' is correct because it is one of the two raw materials for photosynthesis (along with water). Plants absorb CO₂ from the air through tiny pores called stomata. Nitrogen and sunlight are not absorbed through the same mechanism."
      },
      {
        position: 4, correctOptionIndex: 3,
        explanation: "'Water' is correct because it is the second raw material absorbed through the roots. The light energy splits water molecules (photolysis), releasing hydrogen (used to make glucose) and oxygen (released as a byproduct)."
      },
      {
        position: 5, correctOptionIndex: 5,
        explanation: "'Oxygen' is correct because it is a byproduct of splitting water molecules during the light-dependent reactions. This released oxygen is what supports aerobic life on Earth. Hydrogen is retained to help build glucose."
      },
      {
        position: 6, correctOptionIndex: 9,
        explanation: "'Glucose' is correct because it is the sugar produced during the Calvin cycle (light-independent reactions) using CO₂ and the hydrogen from water. It serves as the plant's primary energy store and building block."
      }
    ],
    options: ["hydrogen", "chloroplasts", "carbon dioxide", "water", "mitochondria", "oxygen", "chlorophyll", "nitrogen", "sunlight", "glucose", "roots", "leaves"]
  },
  {
    questionId: "FIBDD002",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    content: `The water cycle is the continuous movement of water on Earth. It begins with {1}, where the sun heats water in oceans and rivers, turning it into water vapor. This water vapor rises into the atmosphere and cools down, forming {2} through condensation. When the water droplets in clouds become too heavy, they fall back to Earth as {3}. Some water flows over the surface as {4}, while other water soaks into the ground to become {5}.`,
    blanks: [
      {
        position: 1, correctOptionIndex: 2,
        explanation: "'Evaporation' is correct because it is the first stage of the water cycle — the sun's heat converts liquid water into water vapor. Condensation and precipitation happen later in the cycle, not at the start."
      },
      {
        position: 2, correctOptionIndex: 7,
        explanation: "'Clouds' is correct because water vapor rises, cools, and condenses around tiny particles to form visible clouds. This is the condensation stage. Ice and snow refer to precipitation forms, not the condensed vapor stage."
      },
      {
        position: 3, correctOptionIndex: 0,
        explanation: "'Precipitation' is correct because it is the collective term for all forms of water falling from clouds — rain, snow, hail, or sleet. The sentence describes the general process, so the broad scientific term fits best."
      },
      {
        position: 4, correctOptionIndex: 9,
        explanation: "'Runoff' is correct because it refers to water that flows across the land surface without soaking in. This is contrasted directly with groundwater in the next clause, making 'runoff' the precise term for surface-flowing water."
      },
      {
        position: 5, correctOptionIndex: 4,
        explanation: "'Groundwater' is correct because it specifically describes water that has percolated through the soil and accumulated underground. This is the standard scientific term for subsurface water stores."
      }
    ],
    options: ["precipitation", "condensation", "evaporation", "storms", "groundwater", "ice", "snow", "clouds", "rivers", "runoff", "oceans"]
  },
  {
    questionId: "FIBDD003",
    title: "The Human Digestive System",
    difficulty: "HARD" as const,
    content: `The human digestive system breaks down food into nutrients that the body can absorb. Digestion begins in the {1}, where saliva contains enzymes that start breaking down carbohydrates. Food then travels through the {2} to reach the {3}, where gastric acid and digestive enzymes continue the breakdown process. The partially digested food moves to the {4}, where most nutrient absorption occurs with help from the {5} and {6}. Finally, waste products are eliminated through the {7}.`,
    blanks: [
      {
        position: 1, correctOptionIndex: 3,
        explanation: "'Mouth' is correct because digestion begins there — salivary amylase in saliva starts breaking down starch before the food even reaches the stomach. The stomach handles acid-based digestion, not the initial carbohydrate breakdown."
      },
      {
        position: 2, correctOptionIndex: 8,
        explanation: "'Esophagus' is correct because it is the muscular tube connecting the mouth to the stomach. Food travels through it via peristalsis after being swallowed. The throat is informal and technically broader; the esophagus is the precise anatomical term."
      },
      {
        position: 3, correctOptionIndex: 1,
        explanation: "'Stomach' is correct because it secretes gastric acid (HCl) and pepsin to break down proteins. The sentence specifically mentions gastric acid, which is exclusive to the stomach."
      },
      {
        position: 4, correctOptionIndex: 11,
        explanation: "'Small intestine' is correct because it is the primary site of nutrient absorption. Its walls contain villi and microvilli that dramatically increase the surface area for absorbing digested nutrients into the bloodstream."
      },
      {
        position: 5, correctOptionIndex: 6,
        explanation: "'Liver' is correct because it produces bile, which is stored in the gallbladder and released into the small intestine to emulsify fats — a key step in fat digestion and absorption."
      },
      {
        position: 6, correctOptionIndex: 0,
        explanation: "'Pancreas' is correct because it secretes digestive enzymes (lipase, amylase, protease) directly into the small intestine. Along with the liver, it provides the enzymes needed for full digestion of all macronutrients."
      },
      {
        position: 7, correctOptionIndex: 9,
        explanation: "'Large intestine' is correct because it is where water is reabsorbed from undigested material and waste is compacted before elimination. The small intestine handles absorption; the large intestine handles waste processing."
      }
    ],
    options: ["pancreas", "stomach", "kidney", "mouth", "heart", "lungs", "liver", "throat", "esophagus", "large intestine", "gallbladder", "small intestine", "appendix", "spleen"]
  },
  {
    questionId: "FIBDD004",
    title: "Climate Change and Global Warming",
    difficulty: "MEDIUM" as const,
    content: `Climate change refers to long-term shifts in global temperatures and weather patterns. The primary cause is the increase in {1} in the atmosphere, mainly from burning {2}. These gases trap heat from the sun, causing the {3} effect. As global temperatures rise, we see melting {4}, rising {5}, and more frequent extreme weather events like {6} and floods.`,
    blanks: [
      {
        position: 1, correctOptionIndex: 8,
        explanation: "'Greenhouse gases' is correct because the sentence is discussing the atmospheric cause of climate change. Carbon dioxide, methane, and nitrous oxide are all greenhouse gases that trap heat. 'Ozone layer' refers to a protective layer, not the gases driving warming."
      },
      {
        position: 2, correctOptionIndex: 2,
        explanation: "'Fossil fuels' is correct because burning coal, oil, and natural gas releases CO₂ stored over millions of years into the atmosphere. Solar energy and wind are renewables that don't produce emissions."
      },
      {
        position: 3, correctOptionIndex: 5,
        explanation: "'Greenhouse' is correct because the passage describes the mechanism where gases trap solar heat — this is precisely the greenhouse effect. The ozone layer is a separate phenomenon involving UV protection."
      },
      {
        position: 4, correctOptionIndex: 0,
        explanation: "'Ice caps' is correct because polar ice and glaciers are directly melting due to rising temperatures. This is one of the most visually documented effects of global warming, and the term pairs naturally with 'melting'."
      },
      {
        position: 5, correctOptionIndex: 10,
        explanation: "'Sea levels' is correct because melting ice and thermal expansion of warming oceans both cause sea levels to rise. This is a direct consequence of global warming and one of the most significant long-term threats."
      },
      {
        position: 6, correctOptionIndex: 4,
        explanation: "'Droughts' is correct because it pairs logically with 'floods' — both are extreme weather events intensified by climate change. Hurricanes are also a valid effect, but 'droughts' creates a better contrast with floods in this context."
      }
    ],
    options: ["ice caps", "ozone layer", "fossil fuels", "solar energy", "droughts", "greenhouse", "wind patterns", "hurricanes", "greenhouse gases", "mountains", "sea levels", "deserts"]
  },
  {
    questionId: "FIBDD005",
    title: "The Basics of Computer Programming",
    difficulty: "EASY" as const,
    content: `Computer programming involves writing instructions for computers to follow. These instructions are written in a {1} that the computer can understand. A program is a set of {2} that tells the computer what to do step by step. Programmers use {3} to write code, and the code must be free of {4} to work properly. Before running a program, it often needs to be {5} into machine language that the computer's processor can execute.`,
    blanks: [
      {
        position: 1, correctOptionIndex: 7,
        explanation: "'Programming language' is correct because it is the formal system (e.g., Python, Java, C++) used to write instructions that a computer can interpret. 'Software' and 'hardware' describe categories of computing, not the medium used to write instructions."
      },
      {
        position: 2, correctOptionIndex: 3,
        explanation: "'Instructions' is correct because a computer program is fundamentally a sequence of commands telling the processor what operations to perform. 'Algorithms' describe the logic behind a solution, but 'instructions' is the precise term for what a program contains."
      },
      {
        position: 3, correctOptionIndex: 0,
        explanation: "'Algorithms' is correct here because programmers use algorithms — step-by-step logical procedures — to structure their code solutions. The sentence describes the tool programmers apply, not the hardware they use."
      },
      {
        position: 4, correctOptionIndex: 9,
        explanation: "'Errors' is correct because code with bugs, syntax mistakes, or logic flaws will not run correctly. In programming, removing errors (debugging) is essential before a program can function as intended."
      },
      {
        position: 5, correctOptionIndex: 5,
        explanation: "'Compiled' is correct because many programming languages (C, Java, Go) require a compiler to translate high-level source code into machine language (binary) that the CPU can directly execute."
      }
    ],
    options: ["algorithms", "hardware", "software", "instructions", "internet", "compiled", "database", "programming language", "graphics", "errors", "keyboard"]
  },
  {
    questionId: "FIBDD006",
    title: "The Formation of Fossil Fuels",
    difficulty: "HARD" as const,
    content: `Fossil fuels formed millions of years ago from the remains of ancient {1} and plants. These organisms died and were buried under layers of {2} and rock. Over time, heat and {3} transformed the organic material into different types of fossil fuels. {4} formed from ancient marine organisms, while {5} developed from plant material in swamps and forests. {6} formed from both plant and animal remains under specific conditions. The extraction of these fuels from deep underground requires specialized {7} techniques.`,
    blanks: [
      {
        position: 1, correctOptionIndex: 6,
        explanation: "'Animals' is correct because fossil fuels — particularly oil — formed from the decomposed remains of ancient marine animals and microorganisms alongside plant matter. The sentence structure 'ancient ___ and plants' requires an animal term."
      },
      {
        position: 2, correctOptionIndex: 11,
        explanation: "'Sediment' is correct because organisms were buried under layers of sand, silt, and mud (sediment) over geological time. This burial cuts off oxygen, preventing decay and allowing gradual transformation under heat and pressure."
      },
      {
        position: 3, correctOptionIndex: 2,
        explanation: "'Pressure' is correct because both heat AND pressure (from overlying rock and sediment) are the physical forces that chemically transform organic matter into coal, oil, or gas. Neither alone is sufficient — both are required."
      },
      {
        position: 4, correctOptionIndex: 8,
        explanation: "'Oil' is correct because petroleum forms primarily from the remains of microscopic marine organisms (plankton, algae) buried under ocean sediments. Coal forms from land plants, not marine organisms."
      },
      {
        position: 5, correctOptionIndex: 0,
        explanation: "'Coal' is correct because it forms from the compression of ancient plant material — particularly from vast swamp forests of the Carboniferous period. The swamp and forest context in the sentence directly points to coal formation."
      },
      {
        position: 6, correctOptionIndex: 4,
        explanation: "'Natural gas' is correct because it can form from both plant and animal organic matter under high heat and pressure at greater depths. It often occurs alongside oil deposits and forms under a wider range of conditions."
      },
      {
        position: 7, correctOptionIndex: 12,
        explanation: "'Drilling' is correct because extracting oil, gas, and even some coal requires drilling deep wells or boreholes into the Earth's crust. 'Mining' applies more to surface or shallow coal extraction, while 'drilling' is the term for deep subsurface extraction."
      }
    ],
    options: ["coal", "water", "pressure", "air", "natural gas", "minerals", "animals", "crystals", "oil", "volcanic ash", "limestone", "sediment", "drilling", "mining"]
  }
]

const createFibDragDropQuestions = async () => {
  try {
    console.log("Starting to add Fill in the Blanks (Drag and Drop) questions to the database...")

    for (const questionData of questions) {
      const existingPassage = await prisma.fillBlanksDragDropPassage.findUnique({
        where: { questionId: questionData.questionId },
        include: { blanks: true }
      })

      if (existingPassage) {
        // Update existing blanks with explanations
        for (const blankData of questionData.blanks) {
          const existingBlank = existingPassage.blanks.find(b => b.position === blankData.position)
          if (existingBlank) {
            await prisma.fillBlanksDragDropBlank.update({
              where: { id: existingBlank.id },
              data: { explanation: blankData.explanation }
            })
          }
        }
        console.log(`✅ Updated explanations for ${questionData.questionId}`)
        continue
      }

      if (questionData.blanks.length === 0) {
        console.log(`⚠️ Question ${questionData.questionId} has no blanks, skipping...`)
        continue
      }

      const result = await prisma.$transaction(async (tx) => {
        const passage = await tx.fillBlanksDragDropPassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            content: questionData.content,
            difficulty: questionData.difficulty,
            options: questionData.options
          }
        })

        const blanks = []
        for (const blankData of questionData.blanks) {
          if (blankData.correctOptionIndex >= questionData.options.length) {
            throw new Error(`Invalid correctOptionIndex ${blankData.correctOptionIndex} for question ${questionData.questionId}.`)
          }
          const blank = await tx.fillBlanksDragDropBlank.create({
            data: {
              position: blankData.position,
              passageId: passage.id,
              correctOptionIndex: blankData.correctOptionIndex,
              explanation: blankData.explanation
            }
          })
          blanks.push(blank)
        }

        return { passage, blanks }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
      console.log(`   Blanks: ${result.blanks.length}, Total options: ${questionData.options.length}`)

      const correctAnswers = questionData.blanks.map(blank =>
        `{${blank.position}}: "${questionData.options[blank.correctOptionIndex]}"`
      ).join(', ')
      console.log(`   Correct answers: ${correctAnswers}`)
    }

    console.log("✅ All Fill in the Blanks (Drag and Drop) questions have been processed successfully!")

    const totalPassages = await prisma.fillBlanksDragDropPassage.count()
    const totalBlanks = await prisma.fillBlanksDragDropBlank.count()

    console.log(`📊 Summary:`)
    console.log(`   - Total passages: ${totalPassages}`)
    console.log(`   - Total blanks: ${totalBlanks}`)
    console.log(`   - Average blanks per passage: ${(totalBlanks / totalPassages).toFixed(1)}`)

  } catch (error) {
    console.error("❌ Error creating Fill in the Blanks (Drag and Drop) questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createFibDragDropQuestions()
