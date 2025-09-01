import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "SST001",
    title: "Climate Change and Global Warming",
    audioTranscribedText: "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate change is a natural phenomenon, scientific evidence shows that human activities have been the main driver since the 1800s. The burning of fossil fuels like coal, oil, and gas produces greenhouse gas emissions that trap heat in the atmosphere. These gases include carbon dioxide from burning fossil fuels, methane from agriculture and waste, and other industrial gases. The effects of climate change include rising sea levels, extreme weather events, droughts, and shifts in wildlife habitats. To address this challenge, countries worldwide are implementing renewable energy solutions, improving energy efficiency, and developing new technologies to reduce emissions.",
    audioUrl: "https://example.com/audio/climate-change.mp3",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SST002",
    title: "The Impact of Technology on Education",
    audioTranscribedText: "Technology has revolutionized education in numerous ways over the past few decades. Digital learning platforms have made education more accessible to students worldwide, breaking down geographical barriers. Interactive whiteboards, tablets, and educational software have transformed traditional classrooms into dynamic learning environments. Online courses and MOOCs have enabled millions of people to acquire new skills and knowledge from the comfort of their homes. However, technology in education also presents challenges. The digital divide means that not all students have equal access to technological resources. Additionally, excessive screen time and reduced face-to-face interaction may impact social development. Teachers must now adapt to new teaching methods and continuously update their technical skills.",
    audioUrl: "https://example.com/audio/technology-education.mp3",
    difficulty: "HARD" as const
  },
  {
    questionId: "SST003",
    title: "Benefits of Regular Exercise",
    audioTranscribedText: "Regular physical exercise provides numerous benefits for both physical and mental health. Exercise strengthens the cardiovascular system, reducing the risk of heart disease and stroke. It helps maintain healthy body weight and builds muscle strength and bone density. Physical activity also boosts the immune system, making the body more resistant to illnesses. Beyond physical benefits, exercise has significant positive effects on mental health. It releases endorphins, which are natural mood elevators that help reduce stress and anxiety. Regular exercise can improve sleep quality and increase energy levels throughout the day. Even moderate activities like walking, swimming, or cycling for 30 minutes daily can make a substantial difference in overall health and well-being.",
    audioUrl: "https://example.com/audio/exercise-benefits.mp3",
    difficulty: "EASY" as const
  },
  {
    questionId: "SST004",
    title: "The Future of Renewable Energy",
    audioTranscribedText: "Renewable energy sources are becoming increasingly important as the world transitions away from fossil fuels. Solar and wind power have seen dramatic cost reductions and efficiency improvements over the past decade. Advanced battery storage systems are solving the intermittency challenges associated with renewable sources. Countries like Denmark and Costa Rica have demonstrated that high percentages of renewable energy are achievable. Electric vehicles are driving demand for clean electricity and creating new opportunities for grid integration. Smart grid technologies are enabling better management of distributed energy resources. However, challenges remain in terms of infrastructure investment, policy frameworks, and ensuring energy security during the transition period.",
    audioUrl: "https://example.com/audio/renewable-energy.mp3",
    difficulty: "HARD" as const
  },
  {
    questionId: "SST005",
    title: "The Importance of Reading",
    audioTranscribedText: "Reading is one of the most fundamental skills that benefits people throughout their lives. Regular reading improves vocabulary, comprehension, and communication skills. It enhances critical thinking abilities and helps develop analytical skills. Reading exposes individuals to different perspectives, cultures, and ideas, promoting empathy and understanding. Studies show that people who read regularly have better memory retention and cognitive function as they age. Reading also provides entertainment and stress relief, offering an escape from daily pressures. Whether through books, newspapers, or digital content, reading keeps the mind active and engaged. Parents and educators play crucial roles in fostering reading habits from an early age.",
    audioUrl: "https://example.com/audio/importance-reading.mp3",
    difficulty: "EASY" as const
  },
  {
    questionId: "SST006",
    title: "Urban Planning and Sustainability",
    audioTranscribedText: "Sustainable urban planning is essential for creating livable cities that can accommodate growing populations while minimizing environmental impact. Green building standards and energy-efficient designs are becoming standard practice in modern construction. Public transportation systems reduce traffic congestion and air pollution while providing affordable mobility options. Urban green spaces, including parks and community gardens, improve air quality and provide recreational opportunities for residents. Mixed-use development reduces the need for long commutes and creates vibrant neighborhoods. Water management systems, including rainwater harvesting and greywater recycling, help cities become more resilient to climate change. Smart city technologies can optimize traffic flow, energy consumption, and waste management.",
    audioUrl: "https://example.com/audio/urban-planning.mp3",
    difficulty: "HARD" as const
  },
  {
    questionId: "SST007",
    title: "The Role of Social Media in Modern Communication",
    audioTranscribedText: "Social media platforms have fundamentally changed how people communicate and share information. These platforms enable instant global communication and have democratized access to information sharing. Businesses use social media for marketing, customer service, and brand building. Social movements can organize and spread awareness more effectively through these networks. However, social media also presents challenges including privacy concerns, cyberbullying, and the spread of misinformation. The addictive nature of these platforms can negatively impact mental health and productivity. Digital literacy has become increasingly important to help users navigate these platforms responsibly and critically evaluate information sources.",
    audioUrl: "https://example.com/audio/social-media.mp3",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "SST008",
    title: "Benefits of Learning Multiple Languages",
    audioTranscribedText: "Learning multiple languages provides cognitive, cultural, and professional advantages. Bilingual and multilingual individuals often demonstrate enhanced problem-solving skills and improved multitasking abilities. Language learning strengthens memory and may delay the onset of age-related cognitive decline. From a cultural perspective, knowing multiple languages opens doors to understanding different societies and worldviews. It enables deeper travel experiences and cross-cultural communication. Professionally, multilingual skills are increasingly valuable in the global economy. Many employers actively seek candidates who can communicate with international clients and partners. Modern language learning apps and online resources have made acquiring new languages more accessible than ever before.",
    audioUrl: "https://example.com/audio/multiple-languages.mp3",
    difficulty: "MEDIUM" as const
  }
]

const createQuestions = async () => {
  try {
    console.log("Starting to add Summarize Spoken Text questions to the database...")
    
    for (const question of questions) {
      const existingQuestion = await prisma.summarizeSpokenTextQuestion.findUnique({
        where: { questionId: question.questionId }
      })
      
      if (existingQuestion) {
        console.log(`Question ${question.questionId} already exists, skipping...`)
        continue
      }
      
      const createdQuestion = await prisma.summarizeSpokenTextQuestion.create({
        data: question
      })
      
      console.log(`✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`)
    }
    
    console.log("✅ All Summarize Spoken Text questions have been processed successfully!")
    
    // Display summary
    const totalQuestions = await prisma.summarizeSpokenTextQuestion.count()
    console.log(`📊 Total Summarize Spoken Text questions in database: ${totalQuestions}`)
    
  } catch (error) {
    console.error("❌ Error creating questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createQuestions()