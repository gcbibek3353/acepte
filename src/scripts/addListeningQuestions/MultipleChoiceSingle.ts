import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "MultipleChoiceSingle");
const S3_SUBDIR = "listening-multiple-choice-single";

const questions = [
  {
    questionId: "MCS001",
    title: "Harry Burke",
    audioFile: "audio-37f2719a-4871-4532-a8a5-861d480e560a.mp3",
    questionText: "What will the man probably do next?",
    options: [
      "Change his biology lab section",
      "Show the woman his tuition bill",
      "Go to the cashier's office",
      "Pay for his biology textbooks",
    ],
    correctOptionIndex: 2,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS002",
    title: "Swimming Ways",
    audioFile: "audio-19d4218e-4699-40bf-bd41-128fa8616c11.mp3",
    questionText: "What is the main purpose of the lecture?",
    options: [
      "To explain why fish are excellent swimmers",
      "To review material that will be on a test",
      "To compare land animals and sea animals",
      "To describe how various sea animals move",
    ],
    correctOptionIndex: 3,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS003",
    title: "Psychology and Law",
    audioFile: "audio-a0431277-9903-4097-949b-b2b697864931.mp3",
    questionText:
      "According to the professor, why are psychologists interested in developing laws?",
    options: [
      "To raise the status of psychology as a serious science",
      "To be able to make predictions about human behavior",
      "To permit scientists to experiment with human subjects",
      "To help students understand the art of psychology",
    ],
    correctOptionIndex: 1,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS004",
    title: "Waterloo",
    audioFile: "audio-f50dc004-84ca-4f60-a032-5de28a3a2327.mp3",
    questionText: "What is the main topic of the talk?",
    options: [
      "Why Waterloo became well known",
      "How Napoleon died",
      "Napoleon's banishment to Waterloo",
      "Napoleon's final battle",
    ],
    correctOptionIndex: 0,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS005",
    title: "Physical Geography",
    audioFile: "audio-2a761bde-0a18-451e-a08a-f5b1b9f329e1.mp3",
    questionText: "Which statement is correct about physical geography?",
    options: [
      "Energy is the biggest subject of physical geography.",
      "It is the study of the universe.",
      "Physical geography uses many other sciences.",
      "Many other sciences use it to combine their ideas.",
    ],
    correctOptionIndex: 2,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS006",
    title: "Tests and Grades",
    audioFile: "audio-f49df6e7-88cc-47c0-9dee-1db6e5dffc13.mp3",
    questionText: "What do students have to do to get good grades?",
    options: [
      "They must get a good score on the written test.",
      "Only class participation is important.",
      "They must study the handouts and actively participate in the class.",
      "They have to study more for the oral test.",
    ],
    correctOptionIndex: 2,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS007",
    title: "Handball Violation",
    audioFile: "audio-5e00ce44-742b-4e09-bece-3601c9aa329a.mp3",
    questionText: "What will follow this lecture?",
    options: [
      "A soccer game without rules",
      "The referee in soccer games",
      "Handball violations by goalkeepers",
      "The role of intentions in handball violations",
    ],
    correctOptionIndex: 3,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS008",
    title: "Martin Luther King",
    audioFile: "audio-06b454e9-507f-4fc9-bb03-620dd30b0bfb.mp3",
    questionText:
      "What was the purpose of the demonstration led by Martin Luther King, Jr.?",
    options: [
      "The purpose was to fight against the city.",
      "The purpose was to fight against police officers and firefighters.",
      "The purpose was to fight against racism and segregation.",
      "The purpose was to fight against the state.",
    ],
    correctOptionIndex: 2,
    difficulty: "EASY" as const,
  },

  {
    questionId: "MCS009",
    title: "Literary Genres",
    audioFile: "audio-8339547f-74e8-4ee7-9de3-d9588b569e54.mp3",
    questionText:
      "Which of the following is not mentioned as being a type of genre fiction?",
    options: ["mainstream", "gothic", "fantasy", "romance"],
    correctOptionIndex: 0,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "MCS010",
    title: "Narcissism",
    audioFile: "audio-a16e4a01-013d-4258-b27a-d3ac2da6efea.mp3",
    questionText: "What is the speaker's attitude to the report on narcissism?",
    options: [
      "He is angered by it.",
      "He is skeptical of it.",
      "He is amused by it.",
      "He doesn't believe any of it is true.",
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "MCS011",
    title: "MCS-L",
    audioFile: "audio-d7ffbc73-3bb4-4809-be76-00bab86d6eff.mp3",
    questionText: "Which of the following is true according to the speaker?",
    options: [
      "The concept of reasonable force is very clearly defined.",
      "Your use of force may be judged on how strong you are compared to the other person.",
      "If you hit someone first, you cannot then claim self-defence.",
      "Courts do not expect ordinary people to react rationally.",
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "MCS012",
    title: "MCS-L",
    audioFile: "audio-19b84a2c-3eb7-41d5-a4c3-3d48e5c04baf.mp3",
    questionText:
      "In the speaker's opinion, which of the following is true of editors who are also novelists?",
    options: [
      "They are sympathetic to the difficult lives authors lead.",
      "They are always able to see the novel from the author's point of view.",
      "They find it difficult to see the author's real intentions.",
      "They may try to re-shape the novelist's work in their own way.",
    ],
    correctOptionIndex: 3,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "MCS013",
    title: "Languages",
    audioFile: "audio-dc026bf4-b4b8-4a80-859d-5436240b292f.mp3",
    questionText:
      "According to the speaker, which of the following is true of people who speak two or more languages?",
    options: [
      "They are more intelligent than people who speak only one language.",
      "They are generally regarded as being clever.",
      "They develop a more attractive personality than other people.",
      "They tend to lead healthier lives than other people.",
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "MCS014",
    title: "Map-making",
    audioFile: "audio-31fa9869-1725-4cc4-b3e6-b8836cc6c698.mp3",
    questionText:
      "Which of the following statements is true about the use of contour lines in map-making?",
    options: [
      "Before the 16th century they were used to show hills, valleys and rivers.",
      "Contour lines originally had a military purpose.",
      "They were first used on Ordnance Survey maps.",
      "Land contour lines were first used on a map of France.",
    ],
    correctOptionIndex: 3,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "MCS015",
    title: "Sign Advertising",
    audioFile: "audio-d2321a66-c83b-41e4-b438-7f69458b9308.mp3",
    questionText:
      "According to the text, when did signs advertising businesses become common?",
    options: [
      "In the 1st century",
      "In the 17th century",
      "During the Roman occupation of Britain",
      "In the Middle Ages",
    ],
    correctOptionIndex: 3,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "MCS016",
    title: "Diet",
    audioFile: "audio-9b2184b8-3b64-4527-b1ee-76e588d6ed77.mp3",
    questionText:
      "Which of the following statements is true, according to the text?",
    options: [
      "There were no root crops in medieval times.",
      "In the 16th century people had a wider choice of food.",
      "Spices were too expensive for the average person.",
      "Potatoes and tomatoes were extremely popular.",
    ],
    correctOptionIndex: 1,
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "MCS017",
    title: "Dissertations",
    audioFile: "audio-587ffa89-4f9c-4ca1-8caf-3139ed056485.mp3",
    questionText: "What does the speaker say about dissertations?",
    options: [
      "Students will not be allowed to alter their proposed topic.",
      "They are too difficult for students to do.",
      "The subject area selected may not have sufficient focus.",
      "There is a lack of understanding of how to conduct research.",
    ],
    correctOptionIndex: 2,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS018",
    title: "Beehive",
    audioFile: "audio-5a51a897-ff5d-41d8-be07-4170a5cb83e3.mp3",
    questionText: "What does the speaker say about the “Beehive”?",
    options: [
      "Its architect saw the project through to completion.",
      "It has come back into favour in recent years.",
      "Its name comes from being a centre of activity.",
      "It used to be a symbol of national pride for New Zealand.",
    ],
    correctOptionIndex: 1,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS019",
    title: "Labor Shortage",
    audioFile: "audio-9a39ec73-0898-4f68-8e45-b0e093dce2e8.mp3",
    questionText:
      "According to the passage, which of the following statements about the labor shortage is true?",
    options: [
      "The host asks the listeners for information about work in order to confirm his explanation.",
      "The phenomenon first appeared prior to the outbreak of the pandemic in the U.S.",
      "Economists have not yet pinpointed the causes for the labor shortage because of insufficient data.",
      "People are explaining the phenomenon from an economical perspective.",
    ],
    correctOptionIndex: 2,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS020",
    title: "Omicron",
    audioFile: "audio-ccbb632e-2292-43a7-851a-de4bc5024126.mp3",
    questionText:
      "What is the speaker’s attitude expressed towards holidays against the outbreak of Omicron?",
    options: [
      "She is not sure whether people should go out and reunite with their friends.",
      "It is recommended that people should stay at home and avoid going outside.",
      "Much can be done to protect people, so it is relatively safe to take a holiday.",
      "It is still possible to hold a party because the variant is not as infectious as the others.",
    ],
    correctOptionIndex: 2,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS021",
    title: "Insects and Streetlights",
    audioFile: "audio-adeb8e84-68c6-4b62-b2d9-c8b2d5f1df83.mp3",
    questionText:
      "According to the speaker, what is the result of the research into insect population near streetlights?",
    options: [
      "Most insects are killed by the strong lights.",
      "Insects are in trouble if they fly near streetlights.",
      "The number of insects doubles near the streetlights.",
      "Insect population drops 50% near streetlights.",
    ],
    correctOptionIndex: 3,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS022",
    title: "Human Interest",
    audioFile: "audio-fc6050b0-9b3d-478c-8258-4ad78decd4cf.mp3",
    questionText: "According to the passage, which of the following is true?",
    options: [
      "In order for adults to endorse their own learning, they must follow the steps of the learning process.",
      "A positive attitude toward learning is interesting to adults.",
      "Interest is a challenge that learners seek out.",
      "Interest is a result of learners being genuinely curious.",
    ],
    correctOptionIndex: 3,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS023",
    title: "Social Sciences",
    audioFile: "audio-fe441a77-5f57-4ca2-b5b6-a86d4c305676.mp3",
    questionText: "The author is primarily concerned with",
    options: [
      "advocating a more modest view, and less widespread utilization, of the social sciences",
      "analyzing the mechanisms for translating discoveries into applications in the social sciences",
      "dissolving the air of paradox inherent in human beings studying themselves",
      "explaining a peculiar dilemma that the social sciences are in",
    ],
    correctOptionIndex: 3,
    difficulty: "HARD" as const,
  },
  {
    questionId: "MCS024",
    title: "Don Giovanni",
    audioFile: "audio-1b5dc08a-50dd-4d15-b801-ab2ef1e6153a.mp3",
    questionText: "The primary purpose of the passage is to",
    options: [
      "relate the story of a somewhat likable antihero",
      "discuss how a work of art has been met by diverging responses",
      "give a history of the work of Mozart",
      "make a case for the renown of Don Giovanni",
    ],
    correctOptionIndex: 1,
    difficulty: "HARD" as const,
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Multiple Choice Single Answer questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion = await prisma.listeningMCSPassage.findUnique({
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

      const createdQuestion = await prisma.listeningMCSPassage.create({
        data: {
          questionId: question.questionId,
          title: question.title,
          questionText: question.questionText,
          options: question.options,
          correctOptionIndex: question.correctOptionIndex,
          difficulty: question.difficulty,
          audioUrl,
        },
      });

      console.log(
        `✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.title}`,
      );
    }

    console.log(
      "✅ All Multiple Choice Single Answer questions have been processed successfully!",
    );

    const totalQuestions = await prisma.listeningMCSPassage.count();
    console.log(
      `📊 Total Multiple Choice Single Answer questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
