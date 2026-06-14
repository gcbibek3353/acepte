import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "summarizeSpokenText");
const S3_SUBDIR = "listening-summarize-spoken-text";

const questions = [
  {
    questionId: "SST001",
    title: "Melatonin",
    audioTranscribedText:
      "I’m just going to take on where we left off. The hormone I want to now talk about is called melatonin. The synthesis is in the pineal gland, which is very small. It is the size of a pea in your brain. Descartes called it the “seat of the soul,” and it is where melatonin is made. It also has a rhythm. In a sense, it is the opposite of cortisol. It peaks at night. We call it the “darkness hormone.” In every species that we have studied, melatonin occurs at night. It is a hormone that prepares you for the things that your species does at night. So, of course, in humans we sleep, but animals like rodents are awake. So, it is a hormone that is related to darkness behavior.",
    audioFile: "audio-934e5c6b-14b3-4401-99f2-c899b1e85188.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST002",
    title: "Waste Food",
    audioTranscribedText:
      "In the USA and in Oceania, which Australia is a part of, we're not only the biggest wasters and losers of food in the world, but around 60% of it is at the consumption end. Much of this waste occurs in supermarkets because of an obsession with use-by dates. People also tend to buy more food than they need and have lost respect for food as a valuable resource.",
    audioFile: "audio-1a013909-d968-4a50-9395-76d8774eb898.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST003",
    title: "Nuts",
    audioTranscribedText:
      "Nuts are filling, nutritious foods rich in protein, minerals, and essential fats, making them a healthy snack. However, because they are calorie-dense, eating large quantities of foods like almonds, cashews, or avocados can make it difficult for people to maintain a healthy weight and keep fat intake under control.",
    audioFile: "audio-8fea5b51-6756-48ba-8992-bccb2bfdde5f.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST004",
    title: "Andrew Carnegie",
    audioTranscribedText:
      "Andrew Carnegie was born in Scotland in 1835 and later moved to America. After working in several industries and investing successfully, he built a highly profitable steel business. He devoted much of his fortune to philanthropy, funding libraries, universities, hospitals, museums, and Carnegie Hall, giving away around 90% of his wealth.",
    audioFile: "audio-ec23db30-5707-4fc2-9902-217ed5184295.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST005",
    title: "Clone",
    audioTranscribedText:
      "The word clone comes from an ancient Greek term meaning a twig or small branch. The concept originated from horticulture, where twigs from one tree are grafted onto another rootstock to produce genetically identical copies of the original tree. The term was first used to describe groups of cultivated plants reproduced in this way.",
    audioFile: "audio-01711602-c34a-4dc0-bc18-4af625d73645.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST006",
    title: "Speech-Language Therapy",
    audioTranscribedText:
      "Speech-language therapists can work with children or adults experiencing communication difficulties in settings such as hospitals, charities, or private practice. Educational programs combine academic knowledge with clinical training and emphasize reflective learning and case-based problem solving to prepare students for professional practice.",
    audioFile: "audio-b5b16b88-bd79-43b7-bf6f-d8318a955ebd.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST007",
    title: "Credit Card Experiment",
    audioTranscribedText:
      "Research shows that people dislike losses more than they appreciate equivalent gains. This asymmetry creates framing effects, causing individuals to make different decisions depending on whether outcomes are presented as losses or gains, even when the logical situation remains unchanged.",
    audioFile: "audio-7b95191c-0b43-4b29-927a-eda6bb374d2f.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST008",
    title: "History of Green Tea",
    audioTranscribedText:
      "Green tea originated in China around 2737 BC and was accidentally discovered by Emperor Shennong. It later became more widely available and was documented in 'The Classic of Tea' by Lu Yu. Eventually, green tea spread to Europe and America, playing a notable role in events such as the Boston Tea Party before becoming globally popular.",
    audioFile: "audio-8bfb21e0-3870-4e08-be16-e3b782a3277d.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST009",
    title: "Cognitive Efficiency",
    audioTranscribedText:
      "Cognitive efficiency refers to how quickly and accurately a person processes information. It develops significantly during childhood and is important because humans have limited information-processing capacity. Efficient thinking improves problem solving and memory by making better use of these limited cognitive resources.",
    audioFile: "audio-0d28ca9e-b629-4273-a3b5-dd42966bccd8.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST010",
    title: "Smaller Brains",
    audioTranscribedText:
      "Human brains have gradually become smaller over thousands of years. While some theories attribute this to energy efficiency or heat management, another explanation suggests that humans have evolved from generalists into specialists who depend on one another, reducing the need for every individual to master all survival skills.",
    audioFile: "audio-5ea69d5a-79a6-4983-93a7-989d3490714a.mp3",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "SST011",
    title: "What Causes Literature to Emerge?",
    audioTranscribedText:
      "Literary theory asks not only what literature is but also what causes literature and what effects it has. These questions naturally lead to inquiries about the role of the author and the reader. The field explores whether literature is shaped by language, the human psyche, or broader social, economic, and historical forces.",
    audioFile: "audio-7a93cf28-1bc1-4e45-9faf-31c1a32fa697.mp3",
    difficulty: "HARD" as const,
  },
  {
    questionId: "SST012",
    title: "Glass Cliff",
    audioTranscribedText:
      "The glass ceiling refers to barriers preventing women from reaching senior positions, while the glass cliff describes women being appointed to unstable leadership roles with a high risk of failure. Research by Michelle Ryan and Alex Haslam found that women are often placed in precarious positions across many industries, making them more vulnerable to criticism and removal.",
    audioFile: "audio-5f48d10f-fc48-49fe-861c-cd284a3b0bfc.mp3",
    difficulty: "HARD" as const,
  },
  {
    questionId: "SST013",
    title: "Advancements in Telescopes",
    audioTranscribedText:
      "Larger telescopes collect more light, allowing astronomers to observe fainter objects and produce clearer images by reducing diffraction effects. Modern digital detectors are nearly one hundred times more efficient than the human eye at capturing light, greatly enhancing the capabilities of optical astronomy over recent decades.",
    audioFile: "audio-20888596-e85a-4ee8-8903-fa81a292146f.mp3",
    difficulty: "HARD" as const,
  },
  {
    questionId: "SST014",
    title: "Water and Growth of Los Angeles",
    audioTranscribedText:
      "Los Angeles was established in 1781 and experienced rapid population growth following the California Gold Rush. As demand for water increased, the city sought new supplies beyond the Los Angeles River. Under the leadership of William Holland, officials chose Owens Valley as a major water source, enabling further urban expansion while creating significant environmental consequences.",
    audioFile: "audio-88e8e7bd-2010-40bb-96bf-f2da69fddfd0.mp3",
    difficulty: "HARD" as const,
  },
  {
    questionId: "SST015",
    title: "Approach and Avoidance Motivation",
    audioTranscribedText:
      "Approach and avoidance motivation consists of three key concepts: approach, avoidance, and motivation. Approach drives people toward desirable outcomes, whereas avoidance encourages movement away from undesirable situations to reduce anxiety. Motivation provides the energy and direction for behavior, with positive stimuli typically encouraging approach and negative stimuli encouraging avoidance.",
    audioFile: "audio-e11c0fae-427d-4024-9264-5a379a95c339.mp3",
    difficulty: "HARD" as const,
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Summarize Spoken Text questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.summarizeSpokenTextQuestion.findUnique({
          where: { questionId: question.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${question.questionId} already exists, skipping...`,
        );
        continue;
      }

      console.log(
        `⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`,
      );
      const audioUrl = await uploadAudioToS3(
        AUDIO_DIR,
        question.audioFile,
        S3_SUBDIR,
      );
      console.log(`   → ${audioUrl}`);

      const createdQuestion = await prisma.summarizeSpokenTextQuestion.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          audioTranscribedText: question.audioTranscribedText,
          difficulty: question.difficulty,
          audioUrl,
        },
      });

      console.log(
        `✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`,
      );
    }

    console.log(
      "✅ All Summarize Spoken Text questions have been processed successfully!",
    );

    const totalQuestions = await prisma.summarizeSpokenTextQuestion.count();
    console.log(
      `📊 Total Summarize Spoken Text questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
