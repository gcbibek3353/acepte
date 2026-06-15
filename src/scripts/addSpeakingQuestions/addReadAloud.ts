import prisma from "@/lib/prisma";

const dummyQuestions = [
  {
    questionId: "RA001",
    title: "Climate Change and Global Warming",
    difficulty: "EASY" as const,
    passage:
      "Climate change refers to long-term shifts in global or regional climate patterns. Since the mid-20th century, the pace of climate change has increased dramatically due to increased levels of atmospheric carbon dioxide and other greenhouse gases produced by human activities.",
  },
  {
    questionId: "RA002",
    title: "The Benefits of Regular Exercise",
    difficulty: "EASY" as const,
    passage:
      "Regular physical activity is one of the most important things you can do for your health. It can help control your weight, reduce your risk of heart disease, strengthen your bones and muscles, and improve your mental health and mood.",
  },
  {
    questionId: "RA003",
    title: "Artificial Intelligence in Healthcare",
    difficulty: "MEDIUM" as const,
    passage:
      "Artificial intelligence is revolutionizing healthcare by enabling more accurate diagnoses, personalized treatment plans, and efficient drug discovery. Machine learning algorithms can analyze vast amounts of medical data to identify patterns that might be missed by human doctors, leading to earlier detection of diseases and better patient outcomes.",
  },
  {
    questionId: "RA004",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    passage:
      "The water cycle is the continuous movement of water on, above, and below the surface of Earth. Water evaporates from oceans and rivers, forms clouds in the atmosphere, and eventually returns to Earth as precipitation in the form of rain or snow.",
  },
  {
    questionId: "RA005",
    title: "Renewable Energy Sources",
    difficulty: "MEDIUM" as const,
    passage:
      "Renewable energy sources such as solar, wind, and hydroelectric power are becoming increasingly important as the world seeks to reduce its dependence on fossil fuels. These sustainable energy sources produce electricity without generating harmful emissions, making them crucial for combating climate change and ensuring energy security for future generations.",
  },
  {
    questionId: "RA006",
    title: "The Importance of Biodiversity",
    difficulty: "MEDIUM" as const,
    passage:
      "Biodiversity refers to the variety of life on Earth, including the different species of plants, animals, and microorganisms, their genetic variations, and the ecosystems they form. This diversity is essential for maintaining ecological balance, providing ecosystem services, and ensuring the resilience of natural systems against environmental changes.",
  },
  {
    questionId: "RA007",
    title: "Digital Transformation in Education",
    difficulty: "HARD" as const,
    passage:
      "The digital transformation of education has accelerated significantly, particularly in response to global challenges that have necessitated remote learning. Educational institutions are increasingly adopting innovative technologies such as virtual reality, artificial intelligence, and adaptive learning platforms to create more engaging, personalized, and accessible learning experiences for students across diverse geographical and socioeconomic backgrounds.",
  },
  {
    questionId: "RA008",
    title: "Photosynthesis Process",
    difficulty: "MEDIUM" as const,
    passage:
      "Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy from the sun into chemical energy stored in glucose molecules. This fundamental biological process involves the absorption of carbon dioxide from the atmosphere and water from the soil, producing oxygen as a byproduct that is essential for most life forms on Earth.",
  },
  {
    questionId: "RA009",
    title: "Quantum Computing Revolution",
    difficulty: "HARD" as const,
    passage:
      "Quantum computing represents a paradigmatic shift in computational methodology, leveraging quantum mechanical phenomena such as superposition and entanglement to process information in ways that classical computers cannot. These revolutionary machines have the potential to solve complex problems in cryptography, drug discovery, and optimization that would require thousands of years for traditional computers to complete.",
  },
  {
    questionId: "RA010",
    title: "Urban Planning and Sustainability",
    difficulty: "HARD" as const,
    passage:
      "Contemporary urban planning increasingly emphasizes sustainable development principles, incorporating green infrastructure, mixed-use developments, and transit-oriented design to create environmentally responsible and socially equitable cities. This holistic approach addresses challenges such as population growth, resource scarcity, and climate change while promoting economic vitality and community well-being.",
  },
  {
    questionId: "RA011",
    title: "The Internet of Things",
    difficulty: "MEDIUM" as const,
    passage:
      "The Internet of Things refers to the network of interconnected devices that can collect and exchange data without human intervention. From smart home appliances to industrial sensors, IoT technology is transforming how we interact with our environment and enabling more efficient resource management and automated decision-making processes.",
  },
  {
    questionId: "RA012",
    title: "Space Exploration Benefits",
    difficulty: "EASY" as const,
    passage:
      "Space exploration has led to numerous technological innovations that benefit life on Earth. From satellite communications and GPS systems to medical devices and materials science breakthroughs, the challenges of space travel have driven scientific advancement and improved our understanding of the universe and our place within it.",
  },
  {
    questionId: "RA013",
    title: "Returning Book",
    difficulty: "MEDIUM" as const,
    passage:
      "When returning a borrowed book, if there are missing pages, experts say transparency is key. Librarians and etiquette coaches note a recent rise in damaged book disputes, often caused by silent returns or unreported defects. If something goes wrong, acknowledge it. A simple apology and an offer to make it right prevent a small mistake from becoming a big misunderstanding.",
  },
  {
    questionId: "RA014",
    title: "Smart Cooking",
    difficulty: "MEDIUM" as const,
    passage:
      "You don't have to spend a lot of time in the kitchen on weekends, say nutrition experts and home chefs who promote smart cooking habits. The trend, which has taken off on social media and in lifestyle magazines this year, encourages simple meal prep, batch cooking, and the use of time-saving appliances to reduce stress.",
  },
  {
    questionId: "RA015",
    title: "Community Gardening",
    difficulty: "MEDIUM" as const,
    passage:
      "We bring together people, resources, and education to benefit lives and neighborhoods through community gardening. From our beginnings, the American Community Gardening Association has encouraged networking among members to share community gardening information, experience, and best practices. We also offer formal educational opportunities, such as local and regional workshops, webinars, publications, and online resources.",
  },
  {
    questionId: "RA016",
    title: "Trisauropodiscus",
    difficulty: "HARD" as const,
    passage:
      "Numerous fossil sites in southern Africa preserve distinctive three-toed footprints that have been named Trisauropodiscus. For many years, researchers have debated what animals might have left these tracks, as well as precisely how many different species, technically called ichnospecies, of Trisauropodiscus there are.",
  },
  {
    questionId: "RA017",
    title: "Roosmalens' Dwarf Porcupine",
    difficulty: "HARD" as const,
    passage:
      "A new study has provided valuable insights into the Roosmalens dwarf porcupine, a neotropical species that has been poorly understood until now. This research, conducted after 22 years of limited knowledge, reveals important information about its distribution, evolutionary relationships, and potential risks to its conservation.",
  },
  {
    questionId: "RA018",
    title: "Existentialism",
    difficulty: "HARD" as const,
    passage:
      "Existentialism is a philosophical movement that explores the nature of human existence and the individual's struggle to find meaning in a chaotic and absurd world. It emphasizes personal freedom, responsibility, and the importance of subjective experience. Existentialist thinkers like Jean Paul Sartre and Friedrich Nietzsche delve into concepts such as authenticity, anxiety, and the inevitability of death.",
  },
  {
    questionId: "RA019",
    title: "Earworms",
    difficulty: "HARD" as const,
    passage:
      "Like the science of yawns, the reason for earworms is fascinating. They are a form of auditory imagery where we perceive tone in the brain in the absence of actually hearing it. The auditory cortex is located in the temporal lobe of the brain, says Samata Sharma, MD, director of addiction consult psychiatry at Brigham and Women's Hospital in Boston, who has published research on this topic.",
  },
  {
    questionId: "RA020",
    title: "Enough Fluid",
    difficulty: "EASY" as const,
    passage:
      "Your body is nearly 66% water. It is therefore very important that you consume enough fluid to stay hydrated and healthy. If you do not get enough fluid, you may feel tired, get headaches, and not perform at your best.",
  },
];

const createReadAloudQuestions = async () => {
  try {
    console.log(
      "Starting to add Speaking Read Aloud questions to the database...",
    );

    for (const questionData of dummyQuestions) {
      // Check if question already exists
      const existingQuestion =
        await prisma.speakingReadAloudQuestion.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      // Validate passage length
      if (questionData.passage.length < 50) {
        console.log(
          `⚠️ Question ${questionData.questionId} passage is too short, skipping...`,
        );
        continue;
      }

      // Create the question
      await prisma.speakingReadAloudQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          passage: questionData.passage,
          difficulty: questionData.difficulty,
        },
      });

      const wordCount = questionData.passage.split(" ").length;
      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
      console.log(
        `   Difficulty: ${questionData.difficulty}, Word count: ${wordCount}`,
      );
    }

    console.log(
      "✅ All Speaking Read Aloud questions have been processed successfully!",
    );

    // Display summary
    const totalQuestions = await prisma.speakingReadAloudQuestion.count();
    const easyQuestions = await prisma.speakingReadAloudQuestion.count({
      where: { difficulty: "EASY" },
    });
    const mediumQuestions = await prisma.speakingReadAloudQuestion.count({
      where: { difficulty: "MEDIUM" },
    });
    const hardQuestions = await prisma.speakingReadAloudQuestion.count({
      where: { difficulty: "HARD" },
    });

    console.log(`📊 Summary:`);
    console.log(`   - Total questions: ${totalQuestions}`);
    console.log(`   - Easy: ${easyQuestions}`);
    console.log(`   - Medium: ${mediumQuestions}`);
    console.log(`   - Hard: ${hardQuestions}`);
  } catch (error) {
    console.error("❌ Error creating Speaking Read Aloud questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the function
createReadAloudQuestions();
