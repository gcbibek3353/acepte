import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "MCS001",
    title: "The Benefits of Regular Exercise",
    difficulty: "EASY" as const,
    content: `Regular exercise is one of the most important things you can do for your health. It has both immediate and long-term health benefits. Most importantly, regular activity can improve your quality of life. A minimum of 30 minutes a day can allow you to enjoy these benefits.

Physical activity can help you control your weight by using excess calories that would otherwise be stored as fat. Most foods you eat contain calories, and everything you do uses calories, including sleeping, breathing, and digesting food. Any physical activity in addition to what you normally do will burn those extra calories.

Exercise also helps prevent heart disease and stroke by strengthening your heart muscle, lowering your blood pressure, raising your high-density lipoprotein (HDL) levels and lowering low-density lipoprotein (LDL) levels, and improving blood flow.

Regular physical activity can also help prevent type 2 diabetes and metabolic syndrome. Studies show that physically active people have a lower risk of developing type 2 diabetes than people who are not physically active.`,
    questionText: "According to the passage, what is the minimum daily exercise time recommended to gain health benefits?",
    options: [
      "15 minutes a day",
      "30 minutes a day",
      "45 minutes a day", 
      "60 minutes a day"
    ],
    correctOptionIndex: 1
  },
  {
    questionId: "MCS002",
    title: "The History of the Internet",
    difficulty: "MEDIUM" as const,
    content: `The Internet began in the 1960s as a project of the Advanced Research Projects Agency (ARPA), a branch of the U.S. Department of Defense. The original network, called ARPANET, was designed to allow researchers at different universities and government agencies to share computer resources and communicate with each other.

In 1971, Ray Tomlinson sent the first email message over ARPANET, choosing the @ symbol to separate the user name from the computer name. By 1973, international connections were established, linking networks in the United Kingdom and Norway.

The term "Internet" was first used in 1974, and the network continued to grow throughout the 1970s and 1980s. However, it wasn't until 1989 that Tim Berners-Lee invented the World Wide Web at CERN in Switzerland. The Web made the Internet much more user-friendly by allowing people to access information through web browsers and hyperlinks.

The first web browser, called WorldWideWeb (later renamed Nexus), was created by Berners-Lee in 1990. The Internet became available to the general public in 1991, and by 1993, there were over 500 web servers worldwide.`,
    questionText: "Who invented the World Wide Web?",
    options: [
      "Ray Tomlinson",
      "Tim Berners-Lee",
      "The U.S. Department of Defense",
      "ARPA researchers"
    ],
    correctOptionIndex: 1
  },
  {
    questionId: "MCS003",
    title: "Climate Change and Global Warming",
    difficulty: "HARD" as const,
    content: `Climate change refers to long-term changes in temperature and weather patterns. While climate variations occur naturally, since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas.

Burning fossil fuels generates greenhouse gas emissions that act like a blanket wrapped around Earth, trapping the sun's heat and raising temperatures. The main greenhouse gases that are causing climate change include carbon dioxide and methane. These come from using gasoline for driving a car or coal for heating a building, for example. Clearing land and cutting down forests can also release carbon dioxide.

The consequences of climate change now include, among others, intense droughts, water scarcity, severe fires, rising sea levels, flooding, melting polar ice, catastrophic storms, and declining biodiversity. Climate change can affect our health, ability to grow food, housing, safety, and work. Some of us are already more vulnerable to climate impacts, such as people living in small island nations and other developing countries.

Scientists agree that limiting global warming to no more than 1.5°C would help us avoid the most catastrophic climate impacts and maintain a livable climate. Yet based on current national climate plans, global warming is projected to reach around 3°C by the end of the century.`,
    questionText: "According to the passage, what temperature limit do scientists believe would help avoid the most catastrophic climate impacts?",
    options: [
      "1.0°C above current levels",
      "1.5°C above pre-industrial levels", 
      "2.0°C above pre-industrial levels",
      "3.0°C above current levels"
    ],
    correctOptionIndex: 1
  },
  {
    questionId: "MCS004",
    title: "The Process of Photosynthesis",
    difficulty: "MEDIUM" as const,
    content: `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process is essential for life on Earth as it produces the oxygen that most living organisms need to survive.

The process occurs in two main stages. The first stage, called the light-dependent reactions, takes place in the chloroplasts of plant cells. During this stage, chlorophyll absorbs light energy, which is used to split water molecules. This process releases oxygen as a byproduct and produces energy-carrying molecules.

The second stage, known as the Calvin cycle or light-independent reactions, uses the energy from the first stage to convert carbon dioxide from the air into glucose, a type of sugar. This glucose serves as food for the plant and can be stored as starch for later use.

Photosynthesis is not only crucial for plants but also forms the foundation of most food chains on Earth. The oxygen produced during photosynthesis is released into the atmosphere, where it can be used by animals and other organisms for respiration.`,
    questionText: "Where do the light-dependent reactions of photosynthesis take place?",
    options: [
      "In the roots of plants",
      "In the chloroplasts of plant cells",
      "In the stem of plants",
      "In the atmosphere around plants"
    ],
    correctOptionIndex: 1
  },
  {
    questionId: "MCS005",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    content: `The water cycle is the continuous movement of water on, above, and below the surface of Earth. This cycle is powered by energy from the sun and is essential for all life on our planet.

The cycle begins with evaporation, where the sun heats up water in rivers, lakes, and oceans, turning it into water vapor that rises into the atmosphere. Plants also contribute to this process through transpiration, where they release water vapor through their leaves.

As water vapor rises higher into the atmosphere, it cools down and condenses around tiny particles to form clouds. This process is called condensation. When the water droplets in clouds become too heavy, they fall back to Earth as precipitation in the form of rain, snow, sleet, or hail.

Once the water reaches the ground, it follows different paths. Some water flows over the surface as runoff into streams and rivers, eventually reaching the oceans. Other water soaks into the ground to become groundwater, which can feed into underground streams or be absorbed by plant roots. The cycle then repeats continuously.`,
    questionText: "What powers the water cycle?",
    options: [
      "Wind from the atmosphere",
      "Energy from the sun",
      "Heat from the Earth's core",
      "Gravity from the moon"
    ],
    correctOptionIndex: 1
  },
  {
    questionId: "MCS006",
    title: "Artificial Intelligence in Modern Society",
    difficulty: "HARD" as const,
    content: `Artificial Intelligence (AI) has become increasingly prevalent in modern society, transforming various aspects of our daily lives. From virtual assistants like Siri and Alexa to recommendation algorithms on streaming platforms, AI technologies are now embedded in countless applications that we interact with regularly.

Machine learning, a subset of AI, enables systems to automatically learn and improve from experience without being explicitly programmed for every task. This capability has revolutionized fields such as healthcare, where AI can analyze medical images to detect diseases with remarkable accuracy, sometimes even surpassing human specialists.

However, the rapid advancement of AI also raises important ethical considerations. Issues such as algorithmic bias, job displacement, and privacy concerns have sparked debates among policymakers, technologists, and society at large. For instance, AI systems trained on biased data can perpetuate or even amplify existing societal inequalities.

Despite these challenges, the potential benefits of AI are substantial. In transportation, autonomous vehicles promise to reduce traffic accidents caused by human error. In climate science, AI models help predict weather patterns and analyze climate change data more effectively than ever before. The key lies in developing AI systems that are transparent, accountable, and aligned with human values.`,
    questionText: "According to the passage, what is one way that AI systems can perpetuate societal problems?",
    options: [
      "By replacing human workers in all industries",
      "By consuming too much electrical energy",
      "By being trained on biased data that amplifies inequalities",
      "By making decisions too quickly for humans to understand"
    ],
    correctOptionIndex: 2
  }
]

const createMcsQuestions = async () => {
  try {
    console.log("Starting to add Multiple Choice Single Answer questions to the database...")
    
    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage = await prisma.multipleChoiceSinglePassage.findUnique({
        where: { questionId: questionData.questionId }
      })
      
      if (existingPassage) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }
      
      // Validate that we have exactly 4 options
      if (questionData.options.length !== 4) {
        console.log(`⚠️ Question ${questionData.questionId} does not have exactly 4 options, skipping...`)
        continue
      }
      
      // Validate correct option index
      if (questionData.correctOptionIndex < 0 || questionData.correctOptionIndex >= questionData.options.length) {
        console.log(`⚠️ Question ${questionData.questionId} has invalid correct option index, skipping...`)
        continue
      }
      
      // Create the passage
      const passage = await prisma.multipleChoiceSinglePassage.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          content: questionData.content,
          questionText: questionData.questionText,
          options: questionData.options,
          correctOptionIndex: questionData.correctOptionIndex,
          difficulty: questionData.difficulty
        }
      })
      
      const correctOption = questionData.options[questionData.correctOptionIndex]
      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
      console.log(`   Correct answer: "${correctOption}" (Option ${String.fromCharCode(65 + questionData.correctOptionIndex)})`)
    }
    
    console.log("✅ All Multiple Choice Single Answer questions have been processed successfully!")
    
    // Display summary
    const totalPassages = await prisma.multipleChoiceSinglePassage.count()
    const easyQuestions = await prisma.multipleChoiceSinglePassage.count({
      where: { difficulty: 'EASY' }
    })
    const mediumQuestions = await prisma.multipleChoiceSinglePassage.count({
      where: { difficulty: 'MEDIUM' }
    })
    const hardQuestions = await prisma.multipleChoiceSinglePassage.count({
      where: { difficulty: 'HARD' }
    })
    
    console.log(`📊 Summary:`)
    console.log(`   - Total passages: ${totalPassages}`)
    console.log(`   - Easy: ${easyQuestions}`)
    console.log(`   - Medium: ${mediumQuestions}`)
    console.log(`   - Hard: ${hardQuestions}`)
    
  } catch (error) {
    console.error("❌ Error creating Multiple Choice Single Answer questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createMcsQuestions()