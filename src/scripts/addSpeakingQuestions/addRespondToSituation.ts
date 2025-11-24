import prisma from "@/lib/prisma"

const questions = [
  {
    questionId: "RS001", 
    title: "Library Research Assistance",
    situation: "You are at a university library and need help finding resources for your research project. You approach the librarian's desk to ask for assistance.",
    audioUrl: "https://example.com/audio/library-situation.mp3",
    instruction: "Explain your research topic and ask the librarian for help in finding relevant academic sources. Be specific about what type of materials you need.",
    difficulty: "EASY" as const
  },
  {
    questionId: "RS002",
    title: "Restaurant Complaint Resolution", 
    situation: "You are dining at a restaurant and there is an issue with your order. The food arrived cold and is not what you ordered. The server approaches your table.",
    audioUrl: null,
    instruction: "Politely explain the problem with your order and request an appropriate solution. Maintain a respectful tone while expressing your dissatisfaction.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RS003",
    title: "Job Interview Follow-up",
    situation: "You had a job interview last week and haven't heard back from the employer. You decide to call the HR department to inquire about the status of your application.",
    audioUrl: "https://example.com/audio/interview-followup.mp3",
    instruction: "Call the HR department to politely inquire about your interview status. Express continued interest in the position while remaining professional.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RS004",
    title: "Academic Deadline Extension",
    situation: "Due to unexpected family circumstances, you are unable to submit your assignment by the original deadline. You need to speak with your professor about getting an extension.",
    audioUrl: null, 
    instruction: "Explain your situation to your professor and request a deadline extension. Provide a reasonable timeline and show your commitment to completing the work.",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "RS005",
    title: "Apartment Maintenance Issue",
    situation: "The heating system in your rental apartment has broken down during winter, and you need to contact your landlord to request immediate repairs.",
    audioUrl: "https://example.com/audio/maintenance-issue.mp3",
    instruction: "Contact your landlord to report the heating problem and request urgent repairs. Explain how this affects your daily life and request a timeline for the fix.",
    difficulty: "EASY" as const
  },
  {
    questionId: "RS006",
    title: "Medical Appointment Scheduling",
    situation: "You need to schedule an urgent medical appointment with a specialist. When you call the clinic, they tell you the next available appointment is in two months.",
    audioUrl: null,
    instruction: "Explain the urgency of your medical condition and negotiate for an earlier appointment. Be persuasive but respectful in your approach.",
    difficulty: "HARD" as const
  },
  {
    questionId: "RS007",
    title: "Flight Delay Compensation",
    situation: "Your flight has been delayed for 6 hours due to airline operational issues, causing you to miss an important business meeting. You approach the airline customer service desk.",
    audioUrl: "https://example.com/audio/flight-delay.mp3",
    instruction: "Explain the impact of the delay on your business commitments and request appropriate compensation or alternative arrangements from the airline.",
    difficulty: "HARD" as const
  },
  {
    questionId: "RS008",
    title: "Group Project Coordination",
    situation: "You are leading a group project for your university course, and one team member has not been contributing their fair share of work. The project deadline is approaching.",
    audioUrl: null,
    instruction: "Address the situation with your team member constructively. Discuss the issue and work together to find a solution that ensures project completion.",
    difficulty: "MEDIUM" as const
  }
]

const createRespondSituationQuestions = async () => {
  try {
    console.log("Starting to add Respond to Situation questions to the database...")

    for (const questionData of questions) {
      // Check if question already exists
      const existingQuestion = await prisma.speakingRespondSituationQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }

      // Create the question
      const question = await prisma.speakingRespondSituationQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          situation: questionData.situation,
          audioUrl: questionData.audioUrl,
          instruction: questionData.instruction,
          difficulty: questionData.difficulty
        }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
    }

    console.log("✅ All Respond to Situation questions have been processed successfully!")

    // Display summary
    const totalQuestions = await prisma.speakingRespondSituationQuestion.count()
    console.log(`📊 Total Respond to Situation questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating Respond to Situation questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the function
createRespondSituationQuestions()