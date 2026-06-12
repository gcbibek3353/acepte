import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "highlightIncorrect");
const S3_SUBDIR = "listening-highlight-incorrect";

const questions = [
  {
    questionId: "HIW001",
    title: "Chocolate Eaters",
    audioFile: "audio-0e399def-36ed-431d-974c-9247eae14f90.mp3",
    passage:
      "Researchers at the University of California claim to have discovered that people who eat chocolate regularly tend to be lighter than those who frequently rarely eat it. The findings may seem shockingly surprising in that chocolate has a great many calories and, in general, the more calories people consume, the more likely they are to put on weight. The recent studies emphasize that it is more the regularity with which people eat chocolate that is probably significant rather than the amount they consume. Whether they eat a little or a lot seems to make no difference, whereas eating it regularly frequently appears to reduce weight more than only having it occasionally.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "rarely", position: 18 },
      { word: "surprising", position: 27 },
      { word: "consume", position: 42 },
      { word: "emphasize", position: 55 },
      { word: "significant", position: 68 },
      { word: "frequently", position: 91 },
    ],
  },
  {
    questionId: "HIW002",
    title: "Pharmaceutical Companies",
    audioFile: "audio-c554cddb-4039-4793-b391-136f29b71edc.mp3",
    passage:
      "Pharmaceutical companies sometimes have to pull new drugs off the market because they harm our livers. The drugs may have been tested on liver cells from rats, or on human cells that are nearly dead. But these kinds of tests do a poor job of mimicking real livers. Now researchers at MIT have developed a better method. They've created a colony of human liver cells that act like the real thing. The article was published in the journal Nature Biotechnology. The cell colonies are only 500 millionths of a meter in diameter. Researchers arrange the cells on a plate in much the same way as copper wires are placed on computer chips. These micro livers mimic the actions of real livers, including producing enzymes necessary to break down drugs and other toxins. The tiny organs last for six weeks, so they can evaluate the effects of drugs over a longer time period than current tests. A start-up company has licensed the technology and is preparing it for market. The little livers could be cheaper and more accurate than drug tests now used.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "segmenting", position: 38 },
      { word: "research", position: 63 },
      { word: "Biologists", position: 78 },
      { word: "creating", position: 109 },
      { word: "calculate", position: 136 },
      { word: "leaving", position: 156 },
    ],
  },
  {
    questionId: "HIW003",
    title: "Written Assessment",
    audioFile: "audio-e316c9e7-c298-435a-8e99-add7438ba0fa.mp3",
    passage:
      "We're going to have a short written assessment which will happen every fortnight. You will all be taken up into small groups, so feel free to ask any questions as I go along. And we'll also ask you to participate. So if you'd all like to open your books to page one.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "long", position: 6 },
      { word: "sorted", position: 15 },
      { word: "together", position: 30 },
      { word: "communicate", position: 37 },
    ],
  },
  {
    questionId: "HIW004",
    title: "Dramatic Changes",
    audioFile: "audio-743491a5-685e-4f26-bc2b-3a2faee1f6b8.mp3",
    passage:
      "Dramatic changes in human life support systems took place in the modern world over the last 500 years. Human communities during this time period reached unprecedented sizes and growth rates. Global migrations introduced exotic plants, animals, developments, technologies and cultural beliefs throughout the world. The Industrial Revolution and its aftermath transformed economies on an unparalleled scale and intensity. Urban spaces exploded in number and size during the period and large-scale social systems emerged that were tied together by networks of economic exchange, transport and communication.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "commodities", position: 18 },
      { word: "nature", position: 33 },
      { word: "cultures", position: 45 },
      { word: "city", position: 56 },
      { word: "development", position: 76 },
    ],
  },
  {
    questionId: "HIW005",
    title: "Poverty",
    audioFile: "audio-13d1c1a1-6cad-4f3a-9c4e-2f5d79434459.mp3",
    passage:
      "For some people, this proposition may seem far fetched, but ending poverty is both morally necessary and actually feasible. All of us must play a role in making it happen. All human beings want, and have a right to live in dignity, to determine our own destinies, and to be respected by other people. Despite the universality of these rights, our capacities to fulfill them vary enormously, and no dividing line is more profound in influencing the quality of our lives than the gulf between poverty and prosperity.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "proposal", position: 5 },
      { word: "mutually", position: 14 },
      { word: "life", position: 34 },
      { word: "ruling", position: 62 },
      { word: "rich", position: 80 },
    ],
  },
  {
    questionId: "HIW006",
    title: "About Glass and How It's Made",
    audioFile: "audio-32a03d86-9b95-475f-bfe0-33e17ffd3b66.mp3",
    passage:
      "At the Smithsonian American Art Museum, you can see a large heart-shaped sculpture made of blown glass. The deep red colored heart is topped with a burning flame also made of glass. It is called the Sacred Heart of Healing and was made by the artist Tim Tate. How did he make this interesting glass form? Today we answer this question as we explore the art of making glass. Throughout history, people from cultures around the world have been making glass. People first found and used glass made by nature. For example, lightning can create tubes of glass when it strikes sand that has the right combination of minerals. Glass pieces produced by lightning are called fulgurites. Obsidian is a kind of black glass formed when the heat of a volcano melts the silica material in sand. Ancient cultures broke off pieces of obsidian to make knives and weapons such as arrows.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "rose", position: 18 },
      { word: "fire", position: 27 },
      { word: "bulding", position: 64 },
      { word: "water", position: 93 },
      { word: "white", position: 128 },
    ],
  },
  {
    questionId: "HIW007",
    title: "Mystery of Time",
    audioFile: "audio-265f670e-fb35-47de-8556-fbe0f23d6980.mp3",
    passage:
      "If you can read a clock, you can know the time of day. But no one knows what time itself is. We cannot see it. We cannot touch it. We cannot hear it. We know it only by the way we mark its passing. For all our success in measuring the smallest parts of time, time remains one of the great mysteries of the universe. One way to think about time is to imagine a world without time. There could be no movement because time and movement cannot be separated. A world without time could exist only as long as there were no changes. For time and change are linked. We know that time has passed when something changes.",
    difficulty: "EASY" as const,
    incorrectWords: [
      { word: "night", position: 12 },
      { word: "feel", position: 22 },
      { word: "invention", position: 49 },
      { word: "wave", position: 73 },
      { word: "divided", position: 81 },
    ],
  },
  {
    questionId: "HIW008",
    title: "Einstein",
    audioFile: "audio-b938a7c2-c799-4f0e-80fc-8355e597c4fa.mp3",
    passage:
      "For thousands of years, philosophers and astronomers and thinkers of all sorts have imagined that the universe, the space around us, was rather like this floor in front of us. It was fixed and unchangeable, and things happen on it, just as people walk around. So the stars, the comets, and the planets, and the other heavenly bodies moved around and traced down their paths on this completely unchanging stage of space. In the 20th century, as the result of Einstein's work, that view of the universe was completely transformed. We began to understand that there was no absolutely fixed stage of space at all on which all celestial motions were played out. But in some sense, on the larger scale in the universe, the space itself was in this state of a continuous dynamic change. That was a prediction made by Einstein, but it wasn't Einstein who had the honor of making the discovery that the universe was really like that.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "university", position: 15 },
      { word: "comments", position: 49 },
      { word: "parts", position: 68 },
      { word: "phase", position: 102 },
      { word: "notions", position: 116 },
      { word: "dynasty", position: 146 },
    ],
  },
  {
    questionId: "HIW009",
    title: "Quantum Mechanics",
    audioFile: "audio-26f757ac-513a-41ea-8403-8b0c3a5478f9.mp3",
    passage:
      "You know that the incredible thing about quantum mechanics, among many incredible things, is that it really works. It is the theory of the universe. It describes what's going on here on Earth, and it describes what happens in the universe that Andre studies. And so when we think about how those building blocks that Leon was just describing fit together to make the world around us, we use quantum mechanics to describe atoms, nuclei, molecules, and light. It is the theory of the world. And so it's not surprising that we see it in many everyday occurrences and many everyday applications. An example might be the lasers that you see in a compact disc player or the supermarket scanner.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "science", position: 22 },
      { word: "discussing", position: 57 },
      { word: "happenings", position: 90 },
      { word: "machine", position: 113 },
    ],
  },
  {
    questionId: "HIW010",
    title: "Sacred Calling",
    audioFile: "audio-73f0da43-b9ee-4256-9911-9c7ea65985f1.mp3",
    passage:
      "Now, a professor is also a member of a profession, presumably one that regards its discipline as a vocation in the full sense of the word—from vocare, 'to call'. Despite some modern uses that reduce it to the mere practicalities of employment practice rather than theory, the product of training rather than education, vocation is more than this. A calling is both active and passive. It implies a sense of purpose. It carries with it a duty to be vocal.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "discretion", position: 14 },
      { word: "motivation", position: 36 },
      { word: "intention", position: 64 },
      { word: "guilty", position: 73 },
    ],
  },
  {
    questionId: "HIW011",
    title: "Understanding Color",
    audioFile: "audio-9cc3f2c7-9d39-4b6f-9476-a36f5944f7bf.mp3",
    passage:
      "Colour theory is the study of colour and its position in art. Humans have been thinking about colours for thousands of years but modern colour theory really arose in the 1800s, when it began to move from science into pure art. A knowledge of colour theory does require some understanding of simple scientific principles about colour, but much of modern colour theory is about the way people see, think about and interact with colours—from those used on walls to those chosen for a company logo. Colour theory is not only something you see applied to art; you can also see it in graphic design, photography, fashion, animation and even video games.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "place", position: 10 },
      { word: "basic", position: 43 },
      { word: "perceive", position: 62 },
      { word: "selected", position: 82 },
      { word: "paintings", position: 99 },
    ],
  },
  {
    questionId: "HIW012",
    title: "Height",
    audioFile: "audio-04705144-d080-471c-9e82-5d7b31389d95.mp3",
    passage:
      "Height is correlated with a lot of things. Up to a certain height, taller people make more money than the vertically challenged. And the taller presidential candidate almost always wins. Now a study finds that your height as an adult has a profound effect on your perception of your health. Short people judge their health to be worse than average or tall people judge theirs. The research was published in the journal Clinical Endocrinology. Data for the study came from the 2003 Health Survey for England. More than 14,000 participants filled out questionnaires and had their heights measured. The study only looked at how good the subject thought his or her health was, not their actual health. Questions focused on five areas: mobility, self-care, normal activities, pain or discomfort, and anxiety or depression. Men shorter than about 5'4\" and women shorter than 5' reported the worst impressions.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "professional", position: 22 },
      { word: "medium", position: 57 },
      { word: "Medical", position: 73 },
      { word: "answers", position: 99 },
    ],
  },
  {
    questionId: "HIW013",
    title: "Baby Smile",
    audioFile: "audio-1846f4e9-9f8a-400c-8a30-1b27d648a380.mp3",
    passage:
      "Try to get a baby to smile? It can seem close to impossible - and then suddenly there it is, that elusive, teasingly joyous grin. Well, it turns out those smiles aren't spontaneous - they're strategic. Researchers have found that when babies smile, it's for a reason. They want whoever they're interacting with - typically a parent - to smile back. And they time it just so, a smile here and a smile there. The researchers call it sophisticated timing. The study is in the journal PLoS ONE. The researchers enlisted real mothers and infants and quantified their interactions, which fell into four categories. One: babies wanted to maximize the amount of time smiling at their mothers. Two: they wanted to maximize the time the mothers smiled at them. Three: they wanted to experience simultaneous smiling, and four: no smiling at all.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "seemingly", position: 21 },
      { word: "shaded", position: 72 },
      { word: "magnify", position: 104 },
      { word: "extend", position: 118 },
    ],
  },

  {
    questionId: "HIW014",
    title: "Snack Sample",
    audioFile: "audio-9c12402c-6bd6-4543-9e15-c5a6d39b0170.mp3",
    passage:
      "If you've spent any time hitting up the giant wholesalers or other markets this holiday season, you've probably figured out that you can make a full meal out of those tasty little samples they often dish out. Which seems like a good thing, for you and for your wallet. But a new study shows that these tempting little treats really do entice you to buy what you try, and maybe some other stuff like it. Researchers tracked the sales in half a dozen stores that provided samples of snacks in four categories: healthy, salty, frozen, or branded by a large coffee-shop chain. They found that noshing while shopping convinces consumers to buy the featured product more often than does simply seeing the product displayed at the end of the aisle. They also found that repeating the sample offering multiple times translates into sustained interest in the product, and that stores that have a smaller assortment of products for sale benefit more than the warehouse-sized emporia.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "yummy", position: 26 },
      { word: "food", position: 76 },
      { word: "registered", position: 94 },
      { word: "subsisted", position: 121 },
    ],
  },

  {
    questionId: "HIW015",
    title: "Black Mamba",
    audioFile: "audio-f18b8cab-6aa6-4d3e-b996-f56ecdcf72e0.mp3",
    passage:
      "Black mamba is one of the world's most venomous snakes - its bite can kill a human in just half an hour. But along with deadly neurotoxins, the black mamba's venom has a special ingredient: a painkiller as potent as morphine. So says a study in the journal Nature. Researchers isolated proteins from mamba venom called mambalgins and injected them into mice. Then they tested how long it took those mice to yank their paws out of water heated to a painful but not damaging 115 degrees Fahrenheit. Turns out mice treated with mambalgins could take the heat for just as long as mice dosed with morphine, indicating the two drugs had similar pain-relieving effects. Morphine works by binding opioid receptors, but mambalgins target a completely different pain pathway. Which is a good thing, because they don't slow down breathing like opiates. And the body doesn't build up tolerance to mambalgins as fast as it does to morphine, meaning mambalgins could keep the pain away for longer.",
    difficulty: "MEDIUM" as const,
    incorrectWords: [
      { word: "terminated", position: 39 },
      { word: "hodgepodges", position: 88 },
      { word: "respiration", position: 128 },
    ],
  },

  {
    questionId: "HIW016",
    title: "Frog",
    audioFile: "audio-0384b367-a424-49db-a2dc-1200cb60cfd7.mp3",
    passage:
      "Scientists discover new species all the time - on the order of 15,000 a year. One of the latest additions to the tree of life is a new type of leopard frog. Which might sound unremarkable, except for where it was found: New York City. But how does a frog go unnoticed in the Big Apple? Well, even experts have a hard time telling this new species from its northern and southern cousins on looks alone. But the new guy has a different croak, which raised ecologists' suspicions. So they tracked down four leopard frog populations with the unique call, including one within view of the Statue of Liberty, and took DNA samples. As they suspected, the odd croakers weren't southern or northern leopard frogs, or even a mix. They had a genetic ancestry of their own, earning them new species status. Those results appear in the journal Molecular Phylogenetics and Evolution.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "Researchers", position: 0 },
      { word: "emission", position: 17 },
      { word: "several", position: 62 },
      { word: "genic", position: 123 },
    ],
  },

  {
    questionId: "HIW017",
    title: "Happy New Year",
    audioFile: "audio-a841b5e8-ad7e-4e2c-ac98-e0569c729a4c.mp3",
    passage:
      "Happy New Year! And if you've been away from work for a few days, you deserve some time off. After all, you've traveled far. Even if you just stayed at home. According to NASA, just by being on the planet Earth in the last year, you've zipped about 584 million miles around the sun at an average speed of about 67,000 miles per hour. Hey, I wasn't speeding - in my inertial reference frame. Of course, the trip was not a perfect circle. As Kepler showed, the Earth's orbit is an ellipse, with the sun at one of the two focal points. He also figured out the planet goes faster when it's at perihelion, nearer the sun, than when it's at aphelion, its furthest distance. Which would explain why summer seems to zip by, except that the seasons are a function of the tilt of the Earth's axis, not its different distances from the sun.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "initial", position: 63 },
      { word: "eclipse", position: 81 },
      { word: "local", position: 90 },
      { word: "rotation", position: 131 },
    ],
  },

  {
    questionId: "HIW018",
    title: "Auditory Sensitivity",
    audioFile: "audio-7cccb7fb-13c3-49e3-b6c4-e2bc18bf5c49.mp3",
    passage:
      "Have you ever wanted to turn down the volume at a deafening concert or noisy bar? Envy the whale: a new study finds that toothed whales can reduce their own auditory sensitivity when they expect a loud sound. The work is presented at this week's Acoustics 2012 meeting. Whales and dolphins rely on their responsive hearing to interpret returning echolocation clicks. Previous research suggested that these marine mammals could dull their hearing before uttering outgoing echolocation clicks, which are very loud. Could they use the same coping mechanism for external noises? To find out, researchers trained a false killer whale that a loud noise would always follow a brief warning signal. Then they attached suction-cup sensors to the outside of the whale's head and played the signal. The sensors measured brainwaves that indicated the whale did reduce its hearing sensitivity in expectation of a clamour. The researchers hope to test other species as well.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "mental", position: 23 },
      { word: "installation", position: 49 },
      { word: "communication", position: 73 },
      { word: "people", position: 81 },
    ],
  },

  {
    questionId: "HIW019",
    title: "Howler Monkey",
    audioFile: "audio-fecf8250-4d5c-4674-a312-3a7e9c9f17ce.mp3",
    passage:
      "Howler monkeys. From their Central and South American rainforest home, they produce some of the loudest animal calls in the world. They're about the size of an adult cocker spaniel, but they can sound as large as a tiger. Biologists have long suspected that the monkeys' howls played a role in attracting mates. The sounds are like the auditory version of peacock feathers or deer antlers that say, hey, check me out. And now we know that the quality of the howl depends on a bone near their throats called the hyoid. The bigger the hyoid, the deeper the howl. Males with deeper calls sound more attractive to females. Which means that males with smaller hyoids had to come up with another strategy.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "mature", position: 22 },
      { word: "regulated", position: 39 },
      { word: "auditive", position: 59 },
      { word: "standard", position: 80 },
    ],
  },

  {
    questionId: "HIW020",
    title: "Climate Change Estimates",
    audioFile: "audio-882e85a9-6fdf-4298-8351-93c609a47e87.mp3",
    passage:
      "Lost in the coverage of the so-called climategate email controversy is a key point about the IPCC's track record of climate change estimates. James McCarthy is on the faculty of the Harvard Medical School Center for Health and the Global Environment. He spoke February 21st at the annual meeting of the American Association for the Advancement of Science in San Diego. If you were to go back and map the IPCC projection for sea level rise and temperature in 1990, look at it in 1995, look at it in 2000, in retrospect you would find that they were conservative. So we talk about errors. If you were to do two ledgers, here are IPCC overestimates, here are IPCC underestimates, over the 20 or so years that these assessments have been running, the underestimate ledger would be much larger than the overestimate, even with glitches and clearly erroneous editing or sloppy editing that led to these erroneous statements that got us in trouble recently.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "findings", position: 3 },
      { word: "temperate", position: 8 },
      { word: "wrong", position: 110 },
      { word: "writings", position: 122 },
    ],
  },

  {
    questionId: "HIW021",
    title: "Elephants and Mice",
    audioFile: "audio-8dc8f7fc-ad94-4d71-a6bf-e03f4045567b.mp3",
    passage:
      "We all know that elephants aren't really scared of mice. But a new study shows that they're really not crazy about something even smaller: ants. In fact, elephants dislike ants so much that they avoid acacia trees that harbor the tiny, six-legged nectar-suckers. On the savanna, acacia trees growing in regions that get a lot of elephant traffic tend to get eaten. But researchers noticed that one species of acacia was not much bothered by elephants, and that the untouched acacia was a favorite ant habitat. So the scientists stripped the ant-covered acacia of their bodyguard bugs, and sure enough, the elephants chowed down. In addition, when the insects were placed on previously ant-free acacias, the elephants took a pass. The research is published in the journal Current Biology.",
    difficulty: "HARD" as const,
    incorrectWords: [
      { word: "noted", position: 53 },
      { word: "gathered", position: 64 },
      { word: "noticed", position: 70 },
      { word: "study", position: 125 },
    ],
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Highlight Incorrect Words questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.listeningHighlightIncorrectWordsPassage.findUnique({
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

      const { incorrectWords } = question;
      const createdPassage =
        await prisma.listeningHighlightIncorrectWordsPassage.create({
          data: {
            questionId: question.questionId,
            title: question.title,
            passage: question.passage,
            difficulty: question.difficulty,
            audioUrl,
          },
        });

      for (const incorrectWord of incorrectWords) {
        await prisma.listeningIncorrectWord.create({
          data: {
            word: incorrectWord.word,
            position: incorrectWord.position,
            passageId: createdPassage.id,
          },
        });
      }

      console.log(
        `✅ Created question: ${createdPassage.questionId} - ${createdPassage.title} with ${incorrectWords.length} incorrect words`,
      );
    }

    console.log(
      "✅ All Highlight Incorrect Words questions have been processed successfully!",
    );

    const totalQuestions =
      await prisma.listeningHighlightIncorrectWordsPassage.count();
    const totalIncorrectWords = await prisma.listeningIncorrectWord.count();
    console.log(
      `📊 Total Highlight Incorrect Words questions in database: ${totalQuestions}`,
    );
    console.log(`📊 Total incorrect words in database: ${totalIncorrectWords}`);
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
