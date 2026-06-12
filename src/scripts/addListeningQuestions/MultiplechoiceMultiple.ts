import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "MultiplechoiceMultiple");
const S3_SUBDIR = "listening-multiple-choice-multiple";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const withRetry = async <T>(label: string, operation: () => Promise<T>): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      const isRetryable =
        error?.code === "P1017" ||
        error?.message?.includes("Server has closed the connection") ||
        error?.message?.includes("Connection terminated unexpectedly");

      if (!isRetryable || attempt === 3) throw error;

      console.warn(
        `⚠️  ${label} failed on attempt ${attempt}, retrying in ${attempt}s...`,
      );
      await wait(attempt * 1000);
    }
  }

  throw lastError;
};

const questions = [
  {
    questionId: "MCM001",
    title: "Hunters",
    questionText: "What animals did the northwoods tribes hunt?",
    audioTranscribedText:
      "The men of the Northwoods tribes were the hunters. The hunting season began in the fall and continued until midwinter. These expeditions frequently took the hunters away from the village for long periods of time. Moose, deer, beaver, bear, and elk were the animals sought. Large deer drives were common, and small animals were taken with snares or the bow and arrow. Did the women ever go hunting with the men The women often accompanied their husbands on hunting parties. Their job was to take charge of the camps. Do you mean they just cooked for the men I thought the Native Americans had more of a system of equality. Overall, men and women shared the labor. On hunting expeditions, women basically supported the men whose job was to procure the game. On the other hand, women controlled other realms of life. For example, women managed all of the agricultural operations. Also, a woman headed each clan, and these women were respected for their role as keepers of the clan.",
    audioFile: "audio-30cc4cab-2501-4773-8227-003fee6dd846.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Eagle", isCorrect: false },
      { text: "Lion", isCorrect: false },
      { text: "Moose", isCorrect: true },
      { text: "Deer", isCorrect: true },
    ],
  },
  {
    questionId: "MCM002",
    title: "Art Career",
    questionText:
      "According to the professor, what factors are important in choosing a career in the arts?",
    audioTranscribedText:
      "Before you undertake a career in the arts, there are a number of factors to consider. Talent is an essential consideration, but talent alone won't guarantee a successful career in the arts. You also need training, experience and self-discipline. Most importantly, a career in the arts requires a personal sense of commitment. Many artists have insecure employment and often supplement their income with other work. Experience and exposure to real work in the arts is the best way to understand the field.",
    audioFile: "audio-8f751dbd-b6b7-4ef8-b1cb-30802383ef94.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Luck", isCorrect: false },
      { text: "Talent", isCorrect: true },
      { text: "Experience", isCorrect: true },
      { text: "Wealth", isCorrect: false },
    ],
  },
  {
    questionId: "MCM003",
    title: "New Library",
    questionText: "Which of the following are mentioned about the new library?",
    audioTranscribedText:
      "The new library has spacious study areas and comfortable chairs, making it better than the old crowded library. However, it is far from campus and takes about 20 minutes by bus to reach, so students may not always go there when in a hurry.",
    audioFile: "audio-ba865819-96fc-44ec-8226-e98bf6164373.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "It has comfortable chairs.", isCorrect: true },
      { text: "It isn't very near the university.", isCorrect: true },
      { text: "It allows students to rent a bicycle.", isCorrect: false },
      {
        text: "It is hard to find a place to sit down and study.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM004",
    title: "Biology",
    questionText:
      "According to the professor, why is biology the most demanding of all sciences?",
    audioTranscribedText:
      "Biology is the science of life and is considered the most demanding science because living systems are very complex. It is also multidisciplinary, requiring knowledge of chemistry, physics, and mathematics, and is closely linked to social sciences and humanities.",
    audioFile: "audio-401dad5a-74a8-4888-a631-1421e688cc33.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Biology deals with controversial issues.", isCorrect: false },
      { text: "Biology studies complex living systems.", isCorrect: true },
      {
        text: "Biology requires knowledge of other sciences.",
        isCorrect: true,
      },
      {
        text: "Biology cannot answer every question about life.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM005",
    title: "Photosynthesis",
    questionText: "What must be present for photosynthesis to begin?",
    audioTranscribedText:
      "Photosynthesis begins when carbon dioxide and water are present in the leaf. Sunlight provides energy absorbed by chlorophyll, but the essential raw materials are carbon dioxide and water.",
    audioFile: "audio-5c66d785-2306-4f5e-bf5b-7e8befb11d43.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Carbon dioxide", isCorrect: true },
      { text: "Water", isCorrect: true },
      { text: "Glucose", isCorrect: false },
      { text: "Nitrogen", isCorrect: false },
    ],
  },
  {
    questionId: "MCM006",
    title: "Hearing Loss",
    questionText: "Which sounds could contribute to hearing loss?",
    audioTranscribedText:
      "Long-term exposure to loud noise above 90 decibels can damage hearing. Examples include a rock band at close range and a jet engine at close range, both extremely loud and harmful to the inner ear.",
    audioFile: "audio-0018d17a-5148-4a29-9fed-2e9b60115ced.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "A vacuum cleaner at close range", isCorrect: false },
      { text: "A conversation at close range", isCorrect: false },
      { text: "A jet engine at close range", isCorrect: true },
      { text: "A rock band at close range", isCorrect: true },
    ],
  },
  {
    questionId: "MCM007",
    title: "Hunters",
    questionText: "What animals did the north woods hunt?",
    audioTranscribedText:
      "The Northwoods tribes hunted moose, deer, beaver, bear, and elk during the hunting season, using bows, arrows, and snares.",
    audioFile: "audio-420e5be1-2925-488b-87c1-45a02c2805a8.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Eagle", isCorrect: false },
      { text: "Moose", isCorrect: true },
      { text: "Lion", isCorrect: false },
      { text: "Deer", isCorrect: true },
    ],
  },
  {
    questionId: "MCM008",
    title: "Spirituality",
    questionText: "What is correct about spiritual education?",
    audioTranscribedText:
      "Spirituality is about connecting to the higher self and being connected to humanity. It emphasizes generosity, peace of mind, and is linked with prosperity. It is also compared to financial learning in terms of personal growth and development.",
    audioFile: "audio-16bd4023-0891-44a7-aef0-f1f3d0dae32b.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Study of spirituality and study of finance is similar.",
        isCorrect: true,
      },
      { text: "Spirituality is following a god.", isCorrect: false },
      {
        text: "Spirituality is nothing but connecting to one’s higher self.",
        isCorrect: true,
      },
      {
        text: "Great inventions did nothing for the human race.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM009",
    title: "Language Skills",
    questionText:
      "According to the audio, which of the following statements are false?",
    audioTranscribedText:
      "Studies show music training can improve language skills. Piano lessons help children detect pitch changes and distinguish similar sounds. Researchers suggest benefits are not limited to tonal languages.",
    audioFile: "audio-78c923c4-d570-4f9f-96c8-3d563b576db2.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Scientists still do not know why music probably helps language learning.",
        isCorrect: false,
      },
      {
        text: "Piano lessons can heighten the brain's response to changes in pitch.",
        isCorrect: false,
      },
      {
        text: "Children who have attended kindergarten are more interested in music.",
        isCorrect: true,
      },
      {
        text: "Mandarin is a tonal language, which is different from English.",
        isCorrect: false,
      },
      {
        text: "Music lessons only benefit language learners who learn tonal languages.",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM010",
    title: "English Landscape Garden",
    questionText:
      "Which of the following are mentioned as influences on the English landscape garden?",
    audioTranscribedText:
      "English landscape gardens were influenced by Italian classical painting, the Romantic movement, and thinkers like Alexander Pope. Designers also drew inspiration from classical ideals and naturalistic aesthetics.",
    audioFile: "audio-2241bd36-ac56-4820-b8af-724df6fbd341.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Italian classical painting", isCorrect: true },
      { text: "Gardens from classical Greece and Rome", isCorrect: false },
      { text: "The Romantic Movement", isCorrect: true },
      { text: "A person's political affiliations", isCorrect: false },
      { text: "The poet Alexander Pope", isCorrect: true },
    ],
  },
  {
    questionId: "MCM011",
    title: "Children's Education",
    questionText:
      "Which of the following conditions need to be met by parents who want to have their children educated at home?",
    audioTranscribedText:
      "Parents educating children at home must show lesson plans, book lists, and ensure adequate physical education and learning opportunities. Education authorities may inspect progress and materials.",
    audioFile: "audio-be4ce24f-130f-4540-8816-7c8c81a8a590.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "They must keep a record of attendance.", isCorrect: false },
      { text: "They must ensure their child plays a sport.", isCorrect: true },
      { text: "They must provide regular assessments.", isCorrect: false },
      { text: "They must provide lesson plans.", isCorrect: true },
      { text: "They must provide book lists.", isCorrect: true },
    ],
  },
  {
    questionId: "MCM012",
    title: "Politics",
    questionText:
      "Which of the following are suggested as reasons why contemporary writers on politics are less readable and relevant than the ancient writers?",
    audioTranscribedText:
      "Modern political writers tend to specialize and focus narrowly on specific institutions rather than broad questions. Being university-based encourages specialization, which reduces accessibility and general readership.",
    audioFile: "audio-f6926261-6c04-4bd2-b297-6c742e96c58a.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "They only write about institutions.", isCorrect: false },
      { text: "They ask largely irrelevant questions.", isCorrect: false },
      {
        text: "They tend to focus on only one aspect of political systems.",
        isCorrect: true,
      },
      {
        text: "Being university-based forces them to specialize.",
        isCorrect: true,
      },
      {
        text: "They follow the example of 19th century writers.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM013",
    title: "Poet Laureate",
    questionText:
      "According to the text, which of the following countries has a Poet Laureate?",
    audioTranscribedText:
      "Speaker 1 recalls thinking England was the only country with a poet laureate, though others exist. The discussion mentions Wales, Ireland, Scotland, Canada, and St Lucia as places that have or had poet laureates. The USA is also referenced. France is mentioned as not having one, and Germany is uncertain.",
    audioFile: "audio-93915563-320d-452a-803e-9878e5185110.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "France", isCorrect: false },
      { text: "Saint Lucia", isCorrect: true },
      { text: "Germany", isCorrect: false },
      { text: "Ireland", isCorrect: true },
      { text: "the Caribbean", isCorrect: false },
      { text: "the USA", isCorrect: true },
    ],
  },
  {
    questionId: "MCM014",
    title: "Technological Advances",
    questionText:
      "Which of the following technological advances have had an effect on the economics and distribution of music?",
    audioTranscribedText:
      "Technological change has affected music production, sound, and distribution. Electronic recording systems changed how music is produced and distributed. Modern access includes downloading music and internet-based platforms. Earlier technologies like the valve trumpet and pianolas are mentioned but not central to distribution economics.",
    audioFile: "audio-02ba2b31-f5cd-455e-bc4d-d2c99afee417.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "the introduction of the valve trumpet", isCorrect: false },
      { text: "the ability to download music", isCorrect: true },
      { text: "Electronic Recording Systems", isCorrect: true },
      { text: "the popularity of pianolas", isCorrect: false },
      { text: "Piano Sales", isCorrect: false },
      { text: "the Internet", isCorrect: false },
    ],
  },
  {
    questionId: "MCM015",
    title: "Woodblock Printing",
    questionText:
      "Which of these countries still use woodblock printing on fabrics?",
    audioTranscribedText:
      "Woodblock printing on fabrics has ancient origins and is still practiced in some regions today. It continues in India, Mexico, and Peru. It was also historically used in Egypt, China, and Japan, but only some regions continue the tradition.",
    audioFile: "audio-1969457c-e4ed-46aa-a4be-4464f02594dd.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Egypt", isCorrect: false },
      { text: "India", isCorrect: true },
      { text: "China", isCorrect: false },
      { text: "Japan", isCorrect: false },
      { text: "Peru", isCorrect: true },
      { text: "Mexico", isCorrect: true },
    ],
  },
  {
    questionId: "MCM016",
    title: "Good Translation",
    questionText:
      "Which of these tips about doing a good translation does the speaker mention?",
    audioTranscribedText:
      "The speaker advises translators to be selective about assignments, avoid topics they are unfamiliar with, and check uncertain meanings carefully. They suggest consulting a dictionary or a native speaker when unsure to avoid serious errors, especially in sensitive fields like medical or legal translation.",
    audioFile: "audio-c58eebcd-39c6-443b-8a7e-5053182d94b4.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Ask a native speaker if you are not sure of the meaning of something.",
        isCorrect: true,
      },
      {
        text: "Don't translate technical texts unless you are familiar with the subject.",
        isCorrect: true,
      },
      {
        text: "Always translate from a second language into your native language.",
        isCorrect: false,
      },
      {
        text: "Ask what your translation will be used for.",
        isCorrect: false,
      },
      {
        text: "Take care to choose the right meaning of a word if you use a dictionary.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM017",
    title: "Rousseau's Beliefs",
    questionText:
      "Which of the following statements is true of Rousseau's beliefs in The Social Contract?",
    audioTranscribedText:
      "Rousseau's early work idealized a state of nature, but later he argued that humans form societies to survive better together. In society, law and morality emerge. He also believed societies form to cope with dangers and challenges in life. His ideas influenced later thinkers and educational theory.",
    audioFile: "audio-8199d608-dd68-43da-89c4-a4da0720e487.mp3",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Children's emotions should be educated before their intellect.",
        isCorrect: false,
      },
      {
        text: 'People were far happier in a "state of nature" before civilization.',
        isCorrect: false,
      },
      {
        text: "By forming societies, law and morality come into force.",
        isCorrect: true,
      },
      {
        text: "Men form societies to better cope with the dangers in life.",
        isCorrect: true,
      },
      {
        text: "Society has a corrupting influence on people.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM018",
    title: "Use of Technology",
    questionText: "The purpose of this talk is to",
    audioTranscribedText:
      "The speaker discusses automated essay grading systems, comparing human and computer grading of essays. A large study shows that computer-generated grades closely match human graders. The talk highlights research findings and their implications for education.",
    audioFile: "audio-8b80da20-79a1-4cc2-8a06-460f71ca24a4.mp3",
    difficulty: "HARD" as const,
    options: [
      {
        text: "suggest directions for future research",
        isCorrect: false,
      },
      {
        text: "criticize the use of technology in grading writing.",
        isCorrect: false,
      },
      {
        text: "explain how humans grade writing.",
        isCorrect: false,
      },
      {
        text: "present different methods for grading writing.",
        isCorrect: true,
      },
      {
        text: "describe the findings of a research project.",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM019",
    title: "Time Famine",
    questionText:
      "According to the speaker, which services are the time-saving services?",
    audioTranscribedText:
      "Researchers describe 'time famine' as a lack of time that affects well-being. They suggest that spending money on services that save time improves life satisfaction. Examples include paying others to do everyday tasks like cleaning, mowing the lawn, or delivering groceries.",
    audioFile: "audio-aa3193ca-f875-4b22-9a57-39389c332c8b.mp3",
    difficulty: "HARD" as const,
    options: [
      { text: "Hiring someone to walk the dog.", isCorrect: true },
      { text: "Purchasing more supplies and goods.", isCorrect: false },
      {
        text: "Hiring a babysitter to take care of the baby.",
        isCorrect: true,
      },
      { text: "Repairing the computer.", isCorrect: false },
      { text: "Making a to-do list and completing it.", isCorrect: false },
    ],
  },
  {
    questionId: "MCM020",
    title: "Domesticated Creatures",
    questionText: "What can be inferred from this article?",
    audioTranscribedText:
      "Dogs, unlike wolves, seek help from humans when faced with unsolvable problems, similar to human infants. This behavior is called referential communication. Wolves raised by humans do not show the same behavior, suggesting domestication explains the difference.",
    audioFile: "audio-73c732d7-3129-415f-b2f6-f427981bae7c.mp3",
    difficulty: "HARD" as const,
    options: [
      { text: "Babies seek help when they are in trouble.", isCorrect: true },
      {
        text: "Dogs seek help from humans when they encounter problems, and so do wolves.",
        isCorrect: false,
      },
      {
        text: "Wolves raised by humans will seek help, while wild wolves will not.",
        isCorrect: false,
      },
      {
        text: "There is a scientific basis for dogs to turn to humans for help.",
        isCorrect: true,
      },
      {
        text: "Dogs also seek help from other dogs when they feel depressed.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM021",
    title: "Recycled Water",
    questionText:
      "Why aren't people willing to actually use recycled water more according to the audio?",
    audioTranscribedText:
      "Experiments show that information campaigns have limited effect on people's willingness to use recycled water. Even when people are informed, disgust remains a strong emotional barrier because recycled water is associated with wastewater, and emotional reactions are hard to overcome with logic alone.",
    audioFile: "audio-ed5096bc-d342-4a2c-9505-8910606b44de.mp3",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Because circulating water used to be waste water, which makes people feel sick.",
        isCorrect: true,
      },
      {
        text: "Because people don't know enough about circulating water.",
        isCorrect: false,
      },
      {
        text: "Because it is difficult for people to overcome the disgust caused by circulating water.",
        isCorrect: true,
      },
      {
        text: "Because people don't have a full understanding of waste water.",
        isCorrect: false,
      },
      {
        text: "Because the publicity of recycled water is not in place.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM022",
    title: "Thermostats",
    questionText: "What can be inferred from this passage?",
    audioTranscribedText:
      "Studies show office temperatures were originally set based on outdated standards, optimized for an average male body type. This leads to discomfort for women and can affect productivity, with evidence suggesting women perform better at slightly warmer temperatures.",
    audioFile: "audio-cb5d3c15-1aec-4e57-af86-030c260a214f.mp3",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Rising temperatures made women less productive.",
        isCorrect: false,
      },
      {
        text: "Rising office temperatures can boost men's productivity dramatically.",
        isCorrect: false,
      },
      {
        text: "For women, the standardized thermostat in the office can be uncomfortable.",
        isCorrect: true,
      },
      {
        text: "When the temperature rose to the mid 70s, men's body temperature would increase.",
        isCorrect: false,
      },
      {
        text: "Office thermostats were set according to standards established more than 50 years ago.",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM023",
    title: "Plastic Pollution",
    questionText:
      "According to the speaker, which of the statements below are true?",
    audioTranscribedText:
      "Plastic waste accumulates in ocean gyres, forming large garbage patches. Scientists found marine organisms living on floating debris. This plastic can transport invasive species across oceans, creating unintended ecological consequences.",
    audioFile: "audio-97bfe2be-bcfa-4b38-a629-1638288d34bb.mp3",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Plastic can provide space for invasive species, which allows them to invade.",
        isCorrect: true,
      },
      { text: "Only plants were found on the debris.", isCorrect: false },
      {
        text: "Scientists gathered plastic items on their own",
        isCorrect: false,
      },
      {
        text: "Ocean circulation will gather plastic in the sea.",
        isCorrect: true,
      },
      {
        text: "Scientists collected the plastic attaching at the bottom of the ship.",
        isCorrect: false,
      },
    ],
  },
  {
    questionId: "MCM024",
    title: "Galapagos Islands",
    questionText: "According to the audio, the Galapagos Islands ____",
    audioTranscribedText:
      "The Galapagos Islands are known for unique wildlife and strict protection. However, scientists discovered many invasive species underwater that were previously unknown, surprising researchers who believed the surrounding waters were mostly native species.",
    audioFile: "audio-07925c72-9741-437b-9f93-505c2dd6da95.mp3",
    difficulty: "HARD" as const,
    options: [
      {
        text: "are truly a primitive place as people thought.",
        isCorrect: false,
      },
      {
        text: "have no exotic species on land.",
        isCorrect: false,
      },
      {
        text: "are more inhabitable for human beings.",
        isCorrect: false,
      },
      {
        text: "are a place where many invasive species underwater were found.",
        isCorrect: true,
      },
      {
        text: "surprised scientists because of its underwater invaders.",
        isCorrect: true,
      },
    ],
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Multiple Choice Multiple Answer questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion = await withRetry("find existing question", () =>
        prisma.listeningMCMPassage.findUnique({
          where: { questionId: question.questionId },
        }),
      );

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

      const { options } = question;
      const createdPassage = await withRetry("create passage", () =>
        prisma.listeningMCMPassage.create({
          data: {
            questionId: question.questionId,
            title: question.title,
            questionText: question.questionText,
            audioTranscribedText: question.audioTranscribedText,
            difficulty: question.difficulty,
            audioUrl,
          },
        }),
      );

      for (const option of options) {
        await withRetry("create option", () =>
          prisma.listeningMCMOption.create({
            data: {
              text: option.text,
              isCorrect: option.isCorrect,
              passageId: createdPassage.id,
            },
          }),
        );
      }

      console.log(
        `✅ Created question: ${createdPassage.questionId} - ${createdPassage.title} with ${options.length} options`,
      );
    }

    console.log(
      "✅ All Multiple Choice Multiple Answer questions have been processed successfully!",
    );

    const totalQuestions = await prisma.listeningMCMPassage.count();
    const totalOptions = await prisma.listeningMCMOption.count();
    console.log(
      `📊 Total Multiple Choice Multiple Answer questions in database: ${totalQuestions}`,
    );
    console.log(`📊 Total options in database: ${totalOptions}`);
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
