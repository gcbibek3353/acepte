import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "REORDER001",
    title: "The History of Photography",
    difficulty: "MEDIUM" as const,
    paragraphs: [
      {
        text: "Photography, derived from the Greek words 'photos' (light) and 'graphos' (drawing), literally means 'drawing with light.' This revolutionary technology has transformed how we capture, preserve, and share visual memories throughout history.",
        correctOrder: 1
      },
      {
        text: "The first permanent photograph was created by Nicéphore Niépce in 1826 using a process called heliography. This breakthrough required an exposure time of several hours and produced a rather unclear image, but it marked the beginning of photographic history.",
        correctOrder: 2
      },
      {
        text: "Louis Daguerre improved upon Niépce's work and developed the daguerreotype process in 1839, which reduced exposure times to just a few minutes and produced much sharper images. This made photography more practical for portrait work.",
        correctOrder: 3
      },
      {
        text: "The invention of flexible film by George Eastman in 1888, along with his Kodak camera, made photography accessible to ordinary people. His slogan 'You press the button, we do the rest' revolutionized amateur photography.",
        correctOrder: 4
      },
      {
        text: "Today, digital photography and smartphone cameras have made taking photos instantaneous and virtually free, allowing billions of images to be captured and shared globally every day through social media platforms.",
        correctOrder: 5
      }
    ]
  },
  {
    questionId: "REORDER002", 
    title: "The Process of Coffee Production",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Coffee production begins with planting coffee seeds, typically in nurseries where they are carefully tended until they develop into small seedlings ready for transplanting to coffee farms.",
        correctOrder: 1
      },
      {
        text: "Once planted in the field, coffee trees take approximately 3-5 years to mature and begin producing coffee cherries. These trees require specific climate conditions, altitude, and soil quality to thrive.",
        correctOrder: 2
      },
      {
        text: "When the coffee cherries ripen, they are harvested either by hand-picking (selective harvesting) or strip-picking (mechanical harvesting). Hand-picking ensures only ripe cherries are collected, resulting in higher quality.",
        correctOrder: 3
      },
      {
        text: "After harvesting, the coffee cherries undergo processing to extract the beans. This can be done through either the dry method (sun-drying) or wet method (pulping and fermentation), each affecting the final flavor.",
        correctOrder: 4
      },
      {
        text: "The processed coffee beans are then sorted, graded, and packaged for export to roasters worldwide, where they will be roasted to various degrees before being ground and brewed into the coffee we drink.",
        correctOrder: 5
      }
    ]
  },
  {
    questionId: "REORDER003",
    title: "The Formation of Mountains",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Mountain formation, known as orogeny, is a geological process that occurs over millions of years through the interaction of tectonic plates beneath the Earth's surface.",
        correctOrder: 1
      },
      {
        text: "When two continental plates collide, neither can sink beneath the other due to their similar density, causing the land to buckle and fold upward, creating fold mountains like the Himalayas.",
        correctOrder: 2
      },
      {
        text: "Volcanic mountains form when molten rock (magma) from the Earth's mantle breaks through the crust, either at plate boundaries or hotspots, building up layers of solidified lava over time.",
        correctOrder: 3
      },
      {
        text: "Fault-block mountains are created when large blocks of rock are uplifted along fault lines due to tensional forces, creating steep-sided mountain ranges with relatively flat tops.",
        correctOrder: 4
      },
      {
        text: "Erosion and weathering continuously shape these mountains after their formation, carving valleys, peaks, and other distinctive features that we observe in mountain ranges today.",
        correctOrder: 5
      }
    ]
  },
  {
    questionId: "REORDER004",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "The water cycle is a continuous process that circulates water throughout the Earth's atmosphere, land, and oceans, powered primarily by energy from the sun.",
        correctOrder: 1
      },
      {
        text: "Evaporation occurs when solar energy heats water in oceans, rivers, and lakes, transforming it from liquid into water vapor that rises into the atmosphere.",
        correctOrder: 2
      },
      {
        text: "As water vapor rises higher into the atmosphere, it cools and condenses around tiny particles to form clouds and other forms of atmospheric moisture.",
        correctOrder: 3
      },
      {
        text: "When water droplets in clouds become too heavy, they fall back to Earth as precipitation in the form of rain, snow, sleet, or hail, depending on atmospheric conditions.",
        correctOrder: 4
      },
      {
        text: "The precipitated water then flows into rivers, lakes, and groundwater systems, eventually returning to the oceans where the cycle begins again, maintaining Earth's water balance.",
        correctOrder: 5
      }
    ]
  },
  {
    questionId: "REORDER005",
    title: "The Evolution of the Internet",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "The Internet's origins trace back to the 1960s with ARPANET, a project funded by the U.S. Department of Defense to create a robust communication network that could survive nuclear attacks.",
        correctOrder: 1
      },
      {
        text: "In the 1970s and 1980s, the development of TCP/IP protocols standardized how different computer networks could communicate with each other, laying the foundation for the modern Internet.",
        correctOrder: 2
      },
      {
        text: "Tim Berners-Lee invented the World Wide Web in 1989 at CERN, creating the first web browser and web server, which made the Internet accessible to ordinary users through hyperlinked documents.",
        correctOrder: 3
      },
      {
        text: "The 1990s saw explosive growth as commercial Internet service providers emerged, web browsers became user-friendly, and businesses began establishing their online presence.",
        correctOrder: 4
      },
      {
        text: "Today's Internet encompasses social media, cloud computing, mobile connectivity, and the Internet of Things, fundamentally transforming how we communicate, work, learn, and entertain ourselves globally.",
        correctOrder: 5
      }
    ]
  },
  {
    questionId: "REORDER006",
    title: "Photosynthesis Process",
    difficulty: "MEDIUM" as const,
    paragraphs: [
      {
        text: "Photosynthesis is the fundamental process by which plants convert light energy, usually from the sun, into chemical energy stored in glucose molecules.",
        correctOrder: 1
      },
      {
        text: "Chlorophyll, the green pigment in plant leaves, absorbs light energy from the sun while the roots absorb water from the soil and leaves take in carbon dioxide from the air.",
        correctOrder: 2
      },
      {
        text: "During the light-dependent reactions, chlorophyll uses absorbed light energy to split water molecules, releasing oxygen as a byproduct and generating energy-carrying molecules.",
        correctOrder: 3
      },
      {
        text: "In the light-independent reactions (Calvin cycle), the energy-carrying molecules help convert carbon dioxide into glucose through a series of chemical reactions.",
        correctOrder: 4
      },
      {
        text: "The glucose produced serves as food for the plant and the foundation of most food chains, while the oxygen released is essential for the survival of most life forms on Earth.",
        correctOrder: 5
      }
    ]
  }
]

const createReorderQuestions = async () => {
  try {
    console.log("Starting to add Reorder Paragraph questions to the database...")
    
    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage = await prisma.reorderParagraphPassage.findUnique({
        where: { questionId: questionData.questionId }
      })
      
      if (existingPassage) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }
      
      // Create passage with paragraphs in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the passage
        const passage = await tx.reorderParagraphPassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            difficulty: questionData.difficulty
          }
        })
        
        // Create the paragraphs
        const paragraphs = await Promise.all(
          questionData.paragraphs.map(paragraph =>
            tx.reorderParagraphItem.create({
              data: {
                passageId: passage.id,
                text: paragraph.text,
                correctOrder: paragraph.correctOrder
              }
            })
          )
        )
        
        return { passage, paragraphs }
      })
      
      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title} (${result.paragraphs.length} paragraphs)`)
    }
    
    console.log("✅ All Reorder Paragraph questions have been processed successfully!")
    
    // Display summary
    const totalPassages = await prisma.reorderParagraphPassage.count()
    const totalParagraphs = await prisma.reorderParagraphItem.count()
    
    console.log(`📊 Summary:`)
    console.log(`   - Total passages: ${totalPassages}`)
    console.log(`   - Total paragraphs: ${totalParagraphs}`)
    console.log(`   - Average paragraphs per passage: ${(totalParagraphs / totalPassages).toFixed(1)}`)
    
  } catch (error) {
    console.error("❌ Error creating Reorder Paragraph questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createReorderQuestions()