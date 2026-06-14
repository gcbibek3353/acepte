import "dotenv/config"
import path from "path"
import prisma from "@/lib/prisma"
import { uploadAudioToS3 } from "./uploadAudio"

const AUDIO_DIR = path.resolve(__dirname, "groupDiscussion")
const S3_SUBDIR = "speaking-group-discussion"

const questions = [
  {
    questionId: "GD001",
    title: "Education Technology in Classrooms",
    audioFile: "education-tech-discussion.mp3",
    audioTranscribedText: "Participant 1: I think technology has greatly enhanced learning experiences in classrooms. Students are more engaged when using interactive tools. Participant 2: While I agree technology is beneficial, we shouldn't rely on it entirely. Traditional teaching methods still have their place. Participant 3: The key is finding the right balance. Technology should complement, not replace, human interaction in education. We need to ensure all students have equal access to these digital tools.",
    topic: "The role of technology in modern education and its impact on student learning outcomes",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "GD002",
    title: "Remote Work vs Office Culture",
    audioFile: "remote-work-discussion.mp3",
    audioTranscribedText: "Speaker A: Remote work has proven to increase productivity and work-life balance for many employees. Companies save on overhead costs too. Speaker B: However, we lose the collaborative spirit and spontaneous interactions that happen in physical offices. Speaker C: I think hybrid models work best - combining the flexibility of remote work with the benefits of face-to-face collaboration. Speaker A: That makes sense. The pandemic has shown us that many jobs can be done remotely without compromising quality.",
    topic: "Comparing the advantages and disadvantages of remote work versus traditional office environments",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "GD003",
    title: "Climate Change Solutions",
    audioFile: "climate-solutions-discussion.mp3",
    audioTranscribedText: "Expert 1: Individual actions like recycling and using public transport are important, but we need systemic changes from governments and corporations. Expert 2: Renewable energy investment is crucial. Solar and wind power are becoming more cost-effective than fossil fuels. Expert 3: We also need to address deforestation and promote sustainable agriculture practices. Expert 1: Carbon pricing and international cooperation are essential for meaningful progress. We can't solve this alone.",
    topic: "Strategies for addressing climate change through individual and collective action",
    difficulty: "HARD" as const
  },
  {
    questionId: "GD004",
    title: "Social Media's Impact on Society",
    audioFile: "social-media-discussion.mp3",
    audioTranscribedText: "Discussant A: Social media has revolutionized how we communicate and stay connected, especially during the pandemic. Discussant B: But it's also contributed to mental health issues, especially among young people. The constant comparison and cyberbullying are serious concerns. Discussant C: There are benefits like access to information and opportunities for small businesses to reach customers. Discussant A: The challenge is regulating harmful content while preserving free speech. We need better digital literacy education.",
    topic: "Examining the positive and negative effects of social media platforms on modern society",
    difficulty: "MEDIUM" as const
  },
  {
    questionId: "GD005",
    title: "Artificial Intelligence in Healthcare",
    audioFile: "ai-healthcare-discussion.mp3",
    audioTranscribedText: "Doctor A: AI has tremendous potential for improving diagnostic accuracy and treatment outcomes. Machine learning can identify patterns humans might miss. Researcher B: We're seeing promising results in radiology and pathology. AI can process vast amounts of medical data quickly. Ethicist C: However, we must consider privacy concerns and ensure AI doesn't replace human judgment entirely. Doctor A: Training medical professionals to work alongside AI systems is crucial for successful implementation.",
    topic: "The potential benefits and ethical considerations of implementing AI technologies in healthcare",
    difficulty: "HARD" as const
  },
  {
    questionId: "GD006",
    title: "Urban Planning and Sustainability",
    audioFile: "urban-planning-discussion.mp3",
    audioTranscribedText: "Planner 1: Smart city initiatives using IoT sensors can optimize traffic flow and reduce energy consumption. Architect 2: Green building standards and sustainable materials are becoming more affordable and accessible. Resident 3: Public transportation and cycling infrastructure need significant investment to reduce car dependency. Planner 1: Community involvement in planning decisions ensures developments meet actual residents' needs rather than just profit margins.",
    topic: "Strategies for creating sustainable and livable urban environments",
    difficulty: "MEDIUM" as const
  }
]

const createGroupDiscussionQuestions = async () => {
  try {
    console.log("Starting to add Group Discussion questions to the database...")

    for (const questionData of questions) {
      const existingQuestion = await prisma.speakingGroupDiscussionQuestion.findUnique({
        where: { questionId: questionData.questionId }
      })

      if (existingQuestion) {
        console.log(`Question ${questionData.questionId} already exists, skipping...`)
        continue
      }

      console.log(`⬆️  Uploading audio for ${questionData.questionId}: ${questionData.audioFile}`)
      const audioUrl = await uploadAudioToS3(AUDIO_DIR, questionData.audioFile, S3_SUBDIR)
      console.log(`   → ${audioUrl}`)

      await prisma.speakingGroupDiscussionQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl,
          audioTranscribedText: questionData.audioTranscribedText,
          topic: questionData.topic,
          difficulty: questionData.difficulty
        }
      })

      console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
    }

    console.log("✅ All Group Discussion questions have been processed successfully!")

    const totalQuestions = await prisma.speakingGroupDiscussionQuestion.count()
    console.log(`📊 Total Group Discussion questions in database: ${totalQuestions}`)

  } catch (error) {
    console.error("❌ Error creating Group Discussion questions:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createGroupDiscussionQuestions()
