import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "SWT001",
    textTitle: "Climate Change and Global Warming",
    passage: "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate change is a natural phenomenon, scientific evidence shows that human activities have been the main driver of climate change since the 1800s, primarily due to the burning of fossil fuels like coal, oil, and gas. These activities produce greenhouse gas emissions that act like a blanket wrapped around the Earth, trapping the sun's heat and raising temperatures. The main greenhouse gases that are causing climate change include carbon dioxide and methane. These come from using gasoline for driving a car or coal for heating a building, for example. Clearing land and cutting down forests can also release carbon dioxide. Energy, industry, transport, buildings, agriculture and land use are among the main sources of greenhouse gas emissions.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 50,
    max_word_limit: 70
  },
  {
    questionId: "SWT002",
    textTitle: "The Benefits of Reading Books",
    passage: "Reading books provides numerous benefits for both mental and emotional well-being. Regular reading can improve brain connectivity, increase vocabulary and comprehension skills, and enhance analytical thinking abilities. Studies have shown that people who read regularly have better memory retention and are less likely to develop cognitive decline as they age. Reading also reduces stress levels significantly - just six minutes of reading can slow down the heart rate and ease tension in muscles. Furthermore, reading before bed can help improve sleep quality by creating a bedtime routine that signals to the brain that it's time to wind down. Fiction reading, in particular, can increase empathy by allowing readers to experience different perspectives and emotions through characters' experiences.",
    difficulty: "EASY" as const,
    min_word_limit: 40,
    max_word_limit: 60
  },
  {
    questionId: "SWT003",
    textTitle: "Artificial Intelligence in Healthcare",
    passage: "Artificial Intelligence (AI) is revolutionizing healthcare by providing innovative solutions for diagnosis, treatment, and patient care. Machine learning algorithms can analyze medical images such as X-rays, MRIs, and CT scans with remarkable accuracy, often detecting diseases like cancer in their early stages when they are most treatable. AI-powered diagnostic tools can process vast amounts of medical data quickly, helping doctors make more informed decisions. Additionally, AI is being used to develop personalized treatment plans based on individual patient data, genetic information, and medical history. Robot-assisted surgeries are becoming more precise and less invasive, leading to faster recovery times and reduced complications. However, the implementation of AI in healthcare also raises concerns about data privacy, the need for human oversight, and ensuring that these technologies are accessible to all patients regardless of their socioeconomic status.",
    difficulty: "HARD" as const,
    min_word_limit: 60,
    max_word_limit: 80
  },
  {
    questionId: "SWT004",
    textTitle: "The Impact of Social Media on Communication",
    passage: "Social media platforms have fundamentally changed how people communicate and interact with each other. These platforms allow instant communication across vast distances, enabling people to maintain relationships with friends and family worldwide. Social media has also democratized information sharing, allowing individuals to share news, opinions, and experiences with large audiences. However, this shift has also led to some negative consequences. Face-to-face communication skills may be declining as people become more comfortable with digital interactions. The spread of misinformation has become a significant concern, as false information can rapidly circulate through social networks. Additionally, social media can contribute to feelings of isolation and depression, particularly among young people who may compare themselves to others' curated online personas.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 50,
    max_word_limit: 70
  },
  {
    questionId: "SWT005",
    textTitle: "Renewable Energy Sources",
    passage: "Renewable energy sources are becoming increasingly important as the world seeks to reduce its dependence on fossil fuels and combat climate change. Solar power harnesses energy from the sun using photovoltaic cells, while wind power uses turbines to convert wind movement into electricity. Hydroelectric power generates electricity from flowing water, and geothermal energy utilizes heat from the Earth's core. These renewable sources offer several advantages: they produce little to no greenhouse gas emissions during operation, they are virtually inexhaustible, and they can provide energy independence for countries. However, renewable energy also faces challenges including initial high installation costs, weather dependency for solar and wind power, and the need for advanced storage technologies to ensure consistent power supply when natural conditions are not optimal.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 50,
    max_word_limit: 70
  },
  {
    questionId: "SWT006",
    textTitle: "The Importance of Biodiversity",
    passage: "Biodiversity refers to the variety of life on Earth, including the diversity of species, ecosystems, and genetic variation within species. This biological diversity is crucial for maintaining healthy ecosystems that provide essential services such as clean air and water, food production, and climate regulation. Each species plays a unique role in its ecosystem, and the loss of even one species can have cascading effects on the entire system. Unfortunately, human activities such as deforestation, pollution, and urbanization are causing species to become extinct at an alarming rate. Scientists estimate that the current rate of extinction is 100 to 1,000 times higher than the natural background rate. Protecting biodiversity requires conservation efforts including establishing protected areas, sustainable resource management, and international cooperation to address global environmental challenges.",
    difficulty: "HARD" as const,
    min_word_limit: 60,
    max_word_limit: 80
  },
  {
    questionId: "SWT007",
    textTitle: "Online Learning vs Traditional Education",
    passage: "The rise of online learning has created new opportunities and challenges in education. Online courses offer flexibility, allowing students to learn at their own pace and from any location with internet access. This accessibility has made education available to people who might not otherwise have the opportunity to attend traditional schools due to geographical, financial, or time constraints. Online learning also allows for personalized learning experiences through adaptive technologies. However, traditional classroom education provides benefits that online learning struggles to replicate, such as face-to-face interaction with teachers and peers, hands-on laboratory experiences, and the social aspects of campus life. Many educators believe that a hybrid approach, combining online and in-person elements, may offer the best of both worlds.",
    difficulty: "EASY" as const,
    min_word_limit: 40,
    max_word_limit: 60
  },
  {
    questionId: "SWT008",
    textTitle: "Urban Agriculture and Food Security",
    passage: "Urban agriculture is emerging as a viable solution to address food security challenges in growing cities worldwide. As urban populations continue to expand, traditional rural farming may not be sufficient to meet the increasing demand for fresh produce. Urban farming techniques include rooftop gardens, vertical farming systems, and community gardens that can be established in unused urban spaces. These methods can reduce the carbon footprint associated with transporting food from rural areas to cities, provide fresh produce in food deserts, and create local employment opportunities. Additionally, urban agriculture can help cities become more resilient to climate change and supply chain disruptions. However, urban farming faces obstacles such as limited space, soil contamination concerns, higher initial costs, and the need for specialized knowledge and technology to optimize yields in urban environments.",
    difficulty: "HARD" as const,
    min_word_limit: 60,
    max_word_limit: 80
  }
]

const createSummarizeWrittenTextQuestions = async () => {
  try {
    console.log("Starting to add Summarize Written Text questions to the database...")
    
    for (const question of questions) {
      const existingQuestion = await prisma.summarizeWrittenTextQuestion.findUnique({
        where: { questionId: question.questionId }
      })
      
      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }
      
      const createdQuestion = await prisma.summarizeWrittenTextQuestion.create({
        data: question
      })
      
      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.textTitle}`)
    }
    
    console.log("✅ All Summarize Written Text questions have been processed successfully!")
    
    // Display summary
    const totalQuestions = await prisma.summarizeWrittenTextQuestion.count()
    console.log(`📊 Total Summarize Written Text questions in database: ${totalQuestions}`)
    
  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createSummarizeWrittenTextQuestions()