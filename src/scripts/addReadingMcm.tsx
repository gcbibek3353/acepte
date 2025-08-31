import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "MCM001",
    title: "Climate Change Effects",
    content: `Climate change is one of the most pressing issues of our time, with far-reaching consequences for both the environment and human society. Rising global temperatures have led to melting ice caps and glaciers, causing sea levels to rise and threatening coastal communities worldwide. The increased frequency and intensity of extreme weather events, such as hurricanes, droughts, and heatwaves, have disrupted agricultural systems and food production.

Furthermore, climate change has significant impacts on biodiversity. Many species are struggling to adapt to changing environmental conditions, leading to habitat loss and increased extinction rates. Ocean acidification, caused by increased carbon dioxide absorption, threatens marine ecosystems and coral reefs.

The economic implications are equally concerning. Climate-related disasters cost billions of dollars annually in damage to infrastructure, reduced agricultural productivity, and increased healthcare costs. Developing countries are particularly vulnerable, as they often lack the resources to adapt to and mitigate the effects of climate change.

However, there are also opportunities for positive change. The transition to renewable energy sources creates new job opportunities and reduces dependence on fossil fuels. Innovation in green technologies and sustainable practices can drive economic growth while addressing environmental concerns.`,
    prompt: "According to the passage, which of the following are effects of climate change? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Rising sea levels due to melting ice caps", isCorrect: true },
      { text: "Decreased ocean acidification", isCorrect: false },
      { text: "Lower agricultural productivity", isCorrect: true },
      { text: "Reduced healthcare costs", isCorrect: false },
      { text: "Creation of new job opportunities in renewable energy", isCorrect: true }
    ]
  },
  {
    questionId: "MCM002",
    title: "Digital Technology in Education",
    content: `The integration of digital technology in education has transformed the learning landscape in unprecedented ways. Online learning platforms have made education more accessible, allowing students from remote areas to access quality educational resources. Interactive multimedia content, including videos, simulations, and virtual reality experiences, has made learning more engaging and effective for many students.

Digital tools have also enabled personalized learning experiences. Adaptive learning software can adjust to individual student needs, providing customized content and pacing. This approach helps address different learning styles and abilities within the same classroom.

However, the digital divide remains a significant challenge. Not all students have equal access to technology and high-speed internet, creating disparities in educational opportunities. Additionally, excessive screen time and reduced face-to-face interaction can impact social development and communication skills.

Teachers have had to adapt their teaching methods and acquire new technological skills. While some educators embrace these changes, others struggle with the transition, requiring extensive professional development and support.

The COVID-19 pandemic accelerated the adoption of digital learning tools, highlighting both their potential and limitations. Emergency remote learning revealed the importance of reliable technology infrastructure and the need for digital literacy among both students and teachers.`,
    prompt: "Based on the passage, which statements about digital technology in education are correct? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "Digital technology has made education more accessible to remote students", isCorrect: true },
      { text: "All students have equal access to digital learning tools", isCorrect: false },
      { text: "Personalized learning is facilitated by adaptive software", isCorrect: true },
      { text: "The COVID-19 pandemic slowed down digital learning adoption", isCorrect: false },
      { text: "Some teachers require professional development to adapt to new technologies", isCorrect: true },
    ]
  },
  {
    questionId: "MCM003",
    title: "Urban Development and Sustainability",
    content: `Modern cities face numerous challenges as urban populations continue to grow rapidly. Urban planning must balance economic development with environmental sustainability and quality of life for residents. Green building practices and sustainable architecture have become increasingly important in reducing the environmental footprint of urban areas.

Public transportation systems play a crucial role in sustainable urban development. Well-designed mass transit networks reduce traffic congestion, air pollution, and carbon emissions. Cities like Copenhagen and Amsterdam have successfully integrated cycling infrastructure, making bicycles a viable transportation option for daily commuting.

Urban green spaces, including parks, gardens, and green rooftops, provide multiple benefits. They improve air quality, reduce urban heat island effects, support biodiversity, and offer recreational opportunities for residents. These spaces also contribute to mental health and community well-being.

Smart city technologies, such as IoT sensors and data analytics, help optimize resource use and improve city services. These technologies can monitor air quality, manage traffic flow, and optimize energy consumption in buildings.

However, rapid urbanization also brings challenges such as housing shortages, increased waste generation, and strain on infrastructure. Affordable housing remains a critical issue in many major cities, often leading to gentrification and displacement of low-income communities.`,
    prompt: "According to the passage, which factors contribute to sustainable urban development? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Increased private car usage", isCorrect: false },
      { text: "Well-designed public transportation systems", isCorrect: true },
      { text: "Urban green spaces and parks", isCorrect: true },
      { text: "Smart city technologies for resource optimization", isCorrect: true },
      { text: "Rapid gentrification of neighborhoods", isCorrect: false }
    ]
  },
  {
    questionId: "MCM004",
    title: "Artificial Intelligence in Healthcare",
    content: `Artificial Intelligence (AI) is revolutionizing healthcare by improving diagnostic accuracy, treatment outcomes, and operational efficiency. Machine learning algorithms can analyze medical images with remarkable precision, often detecting diseases like cancer earlier than traditional methods. AI-powered diagnostic tools can process vast amounts of patient data to identify patterns and predict health risks.

Robot-assisted surgery has enhanced surgical precision and reduced recovery times for patients. These systems allow surgeons to perform minimally invasive procedures with greater accuracy and control. AI also supports drug discovery by analyzing molecular structures and predicting potential therapeutic compounds, significantly reducing development time and costs.

Electronic health records (EHRs) enhanced with AI capabilities can provide real-time clinical decision support. These systems can alert healthcare providers to potential drug interactions, suggest treatment protocols, and identify patients at risk of deterioration.

However, AI in healthcare also presents challenges. Privacy and security concerns arise from handling sensitive patient data. The "black box" nature of some AI algorithms makes it difficult for healthcare professionals to understand how decisions are made, raising questions about accountability and trust.

Additionally, there are concerns about job displacement as AI systems become more sophisticated. While AI can augment healthcare professionals' capabilities, it cannot replace the human touch and empathy that are essential in patient care. Ensuring equitable access to AI-enhanced healthcare services remains a significant challenge.`,
    prompt: "Based on the passage, which are benefits of AI in healthcare? (Select all that apply)",
    difficulty: "EASY" as const,
    options: [
      { text: "Improved diagnostic accuracy for disease detection", isCorrect: true },
      { text: "Accelerated drug discovery and development", isCorrect: true },
      { text: "Complete replacement of healthcare professionals", isCorrect: false },
      { text: "Elimination of all privacy concerns in healthcare", isCorrect: false },
      { text: "Reduced surgical recovery times for patients", isCorrect: true }
    ]
  },
  {
    questionId: "MCM005",
    title: "Renewable Energy Transition",
    content: `The global transition to renewable energy sources represents one of the most significant shifts in energy policy and technology in modern history. Solar and wind power have become increasingly cost-competitive with fossil fuels, making them attractive options for both developed and developing countries. Advances in battery storage technology have addressed the intermittency challenges associated with renewable sources.

Government policies and incentives have played a crucial role in accelerating renewable energy adoption. Feed-in tariffs, tax credits, and renewable energy certificates have made clean energy investments more financially viable. Many countries have set ambitious targets for renewable energy capacity and carbon neutrality.

The renewable energy sector has created millions of new jobs worldwide, from manufacturing and installation to maintenance and research. This job creation has provided economic benefits to regions that were previously dependent on fossil fuel industries.

However, the transition faces several challenges. Grid infrastructure must be upgraded to accommodate distributed renewable energy sources and manage variability in supply. Energy storage solutions, while improving, still require further development to provide reliable baseload power.

Environmental concerns also exist. Large-scale solar and wind installations can impact local ecosystems and wildlife. The manufacturing of solar panels and wind turbines requires energy-intensive processes and raw materials, though the lifecycle environmental benefits still outweigh these concerns.

The geopolitical implications of the energy transition are significant. Countries with abundant renewable resources may gain strategic advantages, while traditional oil and gas exporters face economic challenges as demand for fossil fuels declines.`,
    prompt: "According to the passage, which factors have contributed to the growth of renewable energy? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "Government policies and financial incentives", isCorrect: true },
      { text: "Advances in battery storage technology", isCorrect: true },
      { text: "Elimination of all environmental concerns", isCorrect: false },
      { text: "Complete independence from grid infrastructure upgrades", isCorrect: false },
      { text: "Ambitious government targets for carbon neutrality", isCorrect: true }
    ]
  }
]

const createMcmQuestions = async () => {
  try {
    console.log("Starting to add Multiple Choice Multiple Answer questions to the database...")
    
    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage = await prisma.multipleChoiceMultiplePassage.findUnique({
        where: { questionId: questionData.questionId }
      })
      
      if (existingPassage) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }
      
      // Create passage with question and options in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the passage
        const passage = await tx.multipleChoiceMultiplePassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            content: questionData.content,
            difficulty: questionData.difficulty
          }
        })
        
        // Create the question
        const question = await tx.multipleChoiceMultipleQuestion.create({
          data: {
            passageId: passage.id,
            prompt: questionData.prompt
          }
        })
        
        // Create the options
        const options = await Promise.all(
          questionData.options.map(option =>
            tx.multipleChoiceMultipleOption.create({
              data: {
                questionId: question.id,
                text: option.text,
                isCorrect: option.isCorrect
              }
            })
          )
        )
        
        return { passage, question, options }
      })
      
      const correctAnswers = result.options.filter(option => option.isCorrect).length
      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title} (${correctAnswers} correct answers)`)
    }
    
    console.log("✅ All Multiple Choice Multiple Answer questions have been processed successfully!")
    
    // Display summary
    const totalPassages = await prisma.multipleChoiceMultiplePassage.count()
    const totalQuestions = await prisma.multipleChoiceMultipleQuestion.count()
    const totalOptions = await prisma.multipleChoiceMultipleOption.count()
    
    console.log(`📊 Summary:`)
    console.log(`   - Total passages: ${totalPassages}`)
    console.log(`   - Total questions: ${totalQuestions}`)
    console.log(`   - Total options: ${totalOptions}`)
    
  } catch (error) {
    console.error("❌ Error creating Multiple Choice Multiple Answer questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createMcmQuestions()