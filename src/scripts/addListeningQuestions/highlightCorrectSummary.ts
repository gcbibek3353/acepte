import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "highlightCorrectSummary");
const S3_SUBDIR = "listening-highlight-correct-summary";

const questions = [
  {
    questionId: "HCS001",
    title: "Sodium Regulation in the Human Body",
    audioFile: "audio-111ab582-3c4a-4d59-8430-5831703d9b68.mp3",
    passage:
      "Sodium is an essential nutrient that plays a key role in regulating fluid balance, transmitting nerve signals, and enabling muscle contractions. In the human body, the majority of sodium is located in the bloodstream and in the fluids surrounding cells. Keeping sodium levels within a healthy range is vital, since both too much and too little can lead to serious health issues. The kidneys serve as the main regulators of sodium concentration. When blood sodium rises, they promote its elimination in urine; when levels drop, they conserve sodium by limiting its excretion. This regulation relies on intricate processes of filtration and reabsorption, guided by hormonal control, most notably aldosterone, which directs the kidneys to retain sodium. Proper sodium regulation helps sustain normal blood pressure, prevents dehydration, and supports the smooth operation of many essential bodily functions.",
    questionText:
      "Listen to the recording and select the most accurate summary of the main points discussed.",
    options: [
      "Sodium is harmful to the human body and should be eliminated entirely, as the kidney cannot regulate it effectively.",
      "Sodium levels never change in the body, so no regulation is needed.",
      "Sodium is stored only in the bones, and its balance is controlled by the lungs rather than the kidneys.",
      "Sodium is an essential mineral, and the kidney uses filtration, reabsorption, and hormones to maintain body sodium balance.",
    ],
    correctOptionIndex: 3,
    difficulty: "MEDIUM" as const,
  },
  [
    {
      questionId: "HCS002",
      title: "Mountains",
      audioFile: "audio-b23d06dd-5f59-4be5-8905-0e834783d08f.mp3",
      passage:
        "Earth’s gravity, rock strength, and tectonic activity limit how tall mountains can grow. Although in theory a very large conical mountain could form, the weight of such structures causes the crust to sink and deform. Over time, erosion, glaciers, wind, and fractures further reduce mountain height, making extremely tall mountains unsustainable.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Geologists are trying to build a mountain between New York and Chicago reaching over 45km, but natural forces may weaken it.",
        "Mountain height is limited by Earth's mantle, tectonic collisions, and erosion, so mountains cannot grow indefinitely.",
        "Mount Everest will continue growing because it is unaffected by Earth's internal heat.",
        "Earth's crust movement can cause mountains to collapse due to earthquakes.",
      ],
      correctOptionIndex: 1,
      difficulty: "MEDIUM" as const,
    },
    {
      questionId: "HCS003",
      title: "DNA Model",
      audioFile: "audio-e7013a47-e870-436c-a441-501a60e89be3.mp3",
      passage:
        "A DNA model uses a Möbius weight energy function to describe both structural topology and sequence-dependent torsional behavior. It represents DNA as a ribbon-like structure where energy calculations include curvature, twisting, and electronic interactions, helping identify structural transitions and deformations.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "The model uses Möbius functions to unify DNA’s topological and torsional properties.",
        "DNA is treated as a flat ribbon used only for visualization.",
        "DNA is modeled purely as a bending rod without torsional effects.",
        "The model ignores mechanical properties and focuses only on base-pair electronics.",
      ],
      correctOptionIndex: 0,
      difficulty: "HARD" as const,
    },
    {
      questionId: "HCS004",
      title: "20 Hours Rule",
      audioFile: "audio-6e530b9c-1045-4385-aa37-5f868de4afe5.mp3",
      passage:
        "With about 20 hours of focused, deliberate practice, a person can become reasonably skilled at a new ability if the practice is done effectively and with intention. The key is not just time spent, but how efficiently that time is used.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Anyone can become an expert in 20 hours of practice.",
        "Improvement requires 20 hours within exactly one month.",
        "About 20 hours of effective practice can make someone reasonably skilled.",
        "20 hours of practice guarantees mastery in any skill.",
      ],
      correctOptionIndex: 2,
      difficulty: "EASY" as const,
    },
    {
      questionId: "HCS005",
      title: "Romance in Relationships",
      audioFile: "audio-2d172b89-b4c8-4fab-ae97-b21990b793a3.mp3",
      passage:
        "Romance is only one part of a relationship. More important foundations include healthy communication, equality, and trust, which ensure stability and emotional safety in partnerships.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Romance is the most important part of a relationship.",
        "Romance is part of relationships, but communication, equality, and trust are more essential.",
        "Romance only exists in movies.",
        "Relationships fail without constant passion.",
      ],
      correctOptionIndex: 1,
      difficulty: "EASY" as const,
    },
    {
      questionId: "HCS006",
      title: "Garage Houses",
      audioFile: "audio-2504799d-cb92-4540-9832-07534ad6ec61.mp3",
      passage:
        "A housing project in London proposes converting unused garages into small homes for homeless people, including shared kitchen and laundry facilities. The initiative also aims to provide residents with building skills and support reintegration into society.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Garages are being converted into housing with shared facilities and training support for homeless people.",
        "Each person is given a fully equipped private house including a garage and kitchen.",
        "The project builds garages for workers in expensive neighborhoods.",
        "The project relocates homeless people to suburban housing.",
      ],
      correctOptionIndex: 0,
      difficulty: "EASY" as const,
    },
    {
      questionId: "HCS007",
      title: "Agriculture Development",
      audioFile: "audio-12a0553d-a112-42fb-8492-b01c08a91b3f.mp3",
      passage:
        "Agricultural development in India depends on investment in research, irrigation, and value chains for high-value crops. These improvements increase productivity, rural employment, and help reduce poverty.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Focus on industrial development instead of agriculture.",
        "Provide only subsidies to farmers.",
        "Invest in R&D, irrigation, and agricultural value chains.",
        "Encourage water-intensive farming in dry regions.",
      ],
      correctOptionIndex: 2,
      difficulty: "EASY" as const,
    },
    {
      questionId: "HCS008",
      title: "Environmental Law",
      audioFile: "audio-1ec21cf1-0e43-42c6-9cb3-b0f2f7cfe6e1.mp3",
      passage:
        "Environmental regulation has evolved from early local laws to industrial-era statutory controls. Industrialization increased pollution, leading to the need for stronger enforcement and formal environmental legislation.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Environmental laws have always been effective globally.",
        "Industrial self-regulation solved pollution problems.",
        "Early weak enforcement and industrial pollution led to stronger domestic environmental laws.",
        "Only global laws are needed for environmental protection.",
      ],
      correctOptionIndex: 2,
      difficulty: "EASY" as const,
    },
    {
      questionId: "HCS009",
      title: "The City of Rome",
      audioFile: "audio-35a50d1e-5e30-4ea4-9f7c-bcc09bbdf026.mp3",
      passage:
        "Rome developed organically over time, resulting in narrow, irregular streets. In contrast, Roman military camps were designed in structured grid layouts, which influenced organized planning elsewhere.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Rome was originally built using a strict grid system.",
        "Roman cities and military camps were both unplanned.",
        "Rome grew organically, while Roman military camps were highly structured and planned.",
        "Rome is a modern planned city.",
      ],
      correctOptionIndex: 2,
      difficulty: "EASY" as const,
    },
    {
      questionId: "HCS010",
      title: "Genealogy",
      audioFile: "audio-10ebedc0-7f15-4591-9c7d-fed103cae286.mp3",
      passage:
        "Genealogy is the study of family history. It was historically used by elites to trace inheritance and lineage, but became more widely practiced by the general population in the 20th century.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Genealogy was always popular among all social classes.",
        "Genealogy started in modern times.",
        "Genealogy was only about property ownership in North Africa.",
        "Genealogy was once elite-focused but later became common among ordinary people.",
      ],
      correctOptionIndex: 3,
      difficulty: "MEDIUM" as const,
    },
    {
      questionId: "HCS011",
      title: "Early Humans and Fire",
      audioFile: "audio-11572148-7486-42ef-96d2-a0f43949a02a.mp3",
      passage:
        "Evidence suggests early humans used fire much earlier than previously thought. However, researchers still debate whether fire was mainly used for cooking or other purposes.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Fire use was fully understood and confirmed as cooking.",
        "Fire use began exactly 300,000 years ago.",
        "Humans used fire earlier than believed, but its purpose is still debated.",
        "Fire was not used by early humans.",
      ],
      correctOptionIndex: 2,
      difficulty: "MEDIUM" as const,
    },
    {
      questionId: "HCS012",
      title: "Human Hand Anatomy",
      audioFile: "audio-65061a54-8811-4ca2-97a6-6bbe0188ff20.mp3",
      passage:
        "The human hand is highly flexible due to a complex structure of bones, muscles, ligaments, and nerves. This allows both precise movements and strong force generation.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Human hands define human society.",
        "The thumb is the most complex part of the hand.",
        "Hand anatomy is mainly important for sports performance.",
        "The hand’s flexibility comes from its complex internal structure.",
      ],
      correctOptionIndex: 3,
      difficulty: "MEDIUM" as const,
    },
    {
      questionId: "HCS013",
      title: "Great White Sharks",
      audioFile: "audio-ef9bdbc7-9944-4629-9e06-cb2c65d2469f.mp3",
      passage:
        "Research shows two genetically distinct populations of great white sharks in Australian waters. Although they travel widely, they return to their original regions to breed.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Sharks rarely travel far from home.",
        "Sharks are being rapidly eliminated due to tagging research.",
        "Sharks are being classified into endangered groups.",
        "Sharks travel widely but maintain distinct populations due to returning to breed in home areas.",
      ],
      correctOptionIndex: 3,
      difficulty: "MEDIUM" as const,
    },
    {
      questionId: "HCS014",
      title: "Business Schools Grading",
      audioFile: "audio-5914cd11-6dad-4de4-a968-31c0a9116e13.mp3",
      passage:
        "Some business schools are raising student grades retrospectively to improve job prospects, but this practice is criticized for misrepresenting actual student ability.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Schools are adjusting grades, which can sometimes negatively affect students.",
        "Business education standards are declining rapidly.",
        "Employers support grade corrections in schools.",
        "Grades are inaccurate and employers demand standardized changes.",
      ],
      correctOptionIndex: 0,
      difficulty: "MEDIUM" as const,
    },
    {
      questionId: "HCS015",
      title: "Procrastination",
      audioFile:
        "https://cdn-alfastorage.alfapte.com/question-files/audio-24274083-3074-453b-a135-1b7b6cac5e0d.mp3",
      passage:
        "To understand the roots of procrastination helps us weaken it. We can become aware of these dynamics and observe what we are feeling. Approach motives and avoidance motives influence our behavior, but sometimes it is not clear when we are procrastinating. Activities like checking email or doing low-priority tasks may or may not be procrastination. By developing greater awareness of our tendencies and motivations, we can better overcome them. Cultivating an observer’s stance allows us to examine what we are experiencing, thinking, and feeling, so we can consciously choose our actions and motivations.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "By cultivating an observer’s stance, we could have a greater awareness of our tendencies and motivations, and we’re more likely to overcome avoidance motives.",
        "To gain awareness of what we’re feeling, we need to cultivate an observer’s stance so that we can clean the fridge in our dorm room the night before the final exam, and therefore, we’re more likely to overcome procrastination.",
        "To overcome procrastination, we should gain awareness of our approach motives or avoidance motives when doing things, which means that we need to cultivate an observer’s stance to examine ourselves.",
        "To overcome procrastination, we should ask ourselves whether we have checked our email and whether we are doing the task on the low-important item on our list.",
      ],
      correctOptionIndex: 2,
      difficulty: "MEDIUM" as const,
    },

    {
      questionId: "HCS016",
      title: "Overwork In Japan",
      audioFile:
        "https://cdn-alfastorage.alfapte.com/question-files/audio-5075bee8-7907-414d-a518-f7e31c8d5200.mp3",
      passage:
        "Japanese corporate culture emphasizes the success of the company over the individual. As a result, many employees feel guilty about taking paid leave and often work long hours. However, long working hours do not necessarily lead to high productivity. Japan has one of the lowest productivity levels among G7 countries. The issue of karoshi, or death by overwork, has been widely reported, with cases involving stress-related illness and suicide. A notable case involved the advertising firm Dentsu, where an employee’s death led to public outcry, legal action, and company reforms such as restricting office hours by automatically turning off lights at night.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "63% of Japanese feel guilty to take a paid vacation, so they often choose not to take the vacation, and instead work overtime. An employee in the firm Dentsu unfortunately died when overworking, before the company’s CEO resigned because of guilt about her death.",
        "The advertising firm Dentsu has been reported to force its employees to work overtime without any pay, which resulted in the death of one of its staff. The company’s CEO then came up with new policies to turn off the lights in the office at 10 pm every night.",
        "Japanese companies emphasize the importance of the success of a team as a whole, so many employees in Japan work overtime. This, however, decreases their productivity and even results in many deaths caused by overwork each year.",
        "Although long hours don’t necessarily mean high productivity, Japanese companies still encourage their employees to work overtime. Thus, people often get higher pay in Japan, and governments provide great welfare to make sure they can work in a healthy condition.",
      ],
      correctOptionIndex: 2,
      difficulty: "MEDIUM" as const,
    },

    {
      questionId: "HCS017",
      title: "Saving Money",
      audioFile:
        "https://cdn-alfastorage.alfapte.com/question-files/audio-831421de-aaac-41de-9ec2-207aceb6a3d7.mp3",
      passage:
        "People often regret frequent small purchases such as eating out or ride-sharing, which gradually reduce their ability to save money. A study shows that simply knowing expenses is not enough to change behavior; instead, changing the environment is more effective. For example, unlinking credit cards from apps or setting strict spending limits can reduce unnecessary spending. Humans tend to track repeated actions rather than exact totals, so limiting frequency helps control habits and improve savings.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Our brains are very good at counting up the number of times we’ve done something. So each time we save some money, our brain will retain the memory, and thus we’ll be more motivated to save more money.",
        "To save money, a crucial step is to change our environment. The environmental changes can make it harder for us to make a purchase, and thus help us to save money.",
        "In cities like New York, the bike-sharing expense is almost as high as house rent. Therefore, the best way to save money in big cities is to walk to the office or travel on foot.",
        "Eating out is the number one purchase people say they regret. It is very hard to save money from it, because it’s a frequent purchase that we make almost everyday.",
      ],
      correctOptionIndex: 0,
      difficulty: "MEDIUM" as const,
    },

    {
      questionId: "HCS018",
      title: "Ecosystem Advantage",
      audioFile:
        "https://cdn-alfastorage.alfapte.com/question-files/audio-6f74247a-4ab9-494f-ad13-38b6b7da7fe3.mp3",
      passage:
        "Modern large companies are increasingly organizing themselves into loosely connected networks or ecosystems. This idea is not entirely new, as similar structures existed in historical contexts such as the textile industry in 14th-century Tuscany and the management of common land in medieval Britain. Research suggests that companies are returning to these models to handle complex integrated solutions by collaborating across networks of partners.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "Worldwide, large companies are now following the example of Tuscany and medieval Britain in providing complex integrated solutions. Professor Williamson who wrote a paper on Tuscany agrees that this gives companies an advantage not provided by any other method of production.",
        "Worldwide, large companies are changing into networks which is a practice that was popular in Tuscany. The reason for the popularity was the unavailability of solutions within Tuscany. Prof. Williamson in his book explains the reasons behind the popularity of this practice in Tuscany.",
        "Worldwide, large companies in an attempt to beat the competition are devising new methods of production. For inspiration, they are now looking to medieval times in Britain and Tuscany. Professor Williamson’s paper on history notes this trend and advises countries to strongly follow the model for success.",
        "Worldwide, large companies are organizing themselves as networks of partners which is similar to the practice followed in Tuscany textile industry and the management of common land in medieval Britain. This structure helps companies provide solutions that require integration of various components as described by Prof. Williamson in his paper.",
      ],
      correctOptionIndex: 3,
      difficulty: "MEDIUM" as const,
    },

    {
      questionId: "HCS019",
      title: "Sharks",
      audioFile:
        "https://cdn-alfastorage.alfapte.com/question-files/audio-58334d4f-a6a3-456a-8acb-7cc4ea20bbf4.mp3",
      passage:
        "Research on great white sharks in Australian waters has revealed that there are two genetically distinct populations separated by Bass Strait. Although sharks travel between regions, they return to their home areas to breed, preventing interbreeding. This suggests that local environments play a stronger role in shaping shark populations than previously thought.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "There are fewer Great White sharks in Australian waters than was once believed. This is because tagging has shown that sharks travel considerable distances, and a shark recorded east of Bass Strait one week is often recorded west of Bass Strait the next. However, sharks always return to their place of origin to breed.",
        "There is a greater variety in the Great White shark populations in Australian waters than was previously thought to be the case. This means that some types of shark are actually more endangered than was believed. Scientists are therefore developing conservation programs which will help to protect these threatened species.",
        "An investigation of Great White sharks in Australian waters has come up with some unexpected conclusions, as it found that the genetic make-up of sharks in one area was quite distinct from those found elsewhere. This made scientists realize that sharks do not swim as far away from their home areas as used to be thought.",
        "A recent research study has shown that Australian Great White shark populations have remained surprisingly distinct as, despite traveling long distances, these sharks do not breed away from their original areas. This means that local shark habitats may have a greater effect on sharks than has been believed up till now.",
      ],
      correctOptionIndex: 3,
      difficulty: "MEDIUM" as const,
    },

    {
      questionId: "HCS020",
      title: "Smile of Mothers and Their Babies",
      audioFile:
        "https://cdn-alfastorage.alfapte.com/question-files/audio-8880bc38-71dc-481f-9faa-b90edbc8e336.mp3",
      passage:
        "Research shows that baby smiles are not random but strategic. Babies time their smiles to encourage responses from their mothers. Studies of mother-infant interactions show that mothers often aim for simultaneous smiling, while babies mainly aim to get their mothers to smile at them. This reveals different goals in their social interaction, with babies focusing on receiving smiles and mothers focusing on shared interaction.",
      questionText:
        "Listen to the recording and select the most accurate summary of the main points discussed.",
      options: [
        "It depends on whom the babies interact with. Research showed that 70% of mothers prefer to smile simultaneously while 80% of babies want their mother to smile at them. So the mother wants the interaction but babies want the smile. Therefore, although babies are not able to feed themselves, talk or even turn over, they know exactly what they want.",
        "So, babies want the interaction, while mothers just want to be smiled at. So your baby may not be able to feed itself, talk or even turn over yet. But when it comes to smiles, babies seem to know exactly what they're up to.",
        "Researchers have found that when babies smile, it's not for a reason. They want whoever they’re interacting with— typically a parent—to smile back.",
        "The researchers enlisted real mothers and infants and quantified their interactions, which fell into four categories. One: babies did not wanted to maximize the amount of time smiling at their mothers. Two: they did not wanted to maximize the time the mothers smiled at them.",
      ],
      correctOptionIndex: 0,
      difficulty: "MEDIUM" as const,
    },
  ],
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Highlight Correct Summary questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.listeningHighlightSummaryPassage.findUnique({
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

      const createdQuestion =
        await prisma.listeningHighlightSummaryPassage.create({
          data: {
            questionId: question.questionId,
            title: question.title,
            passage: question.passage,
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
      "✅ All Highlight Correct Summary questions have been processed successfully!",
    );

    const totalQuestions =
      await prisma.listeningHighlightSummaryPassage.count();
    console.log(
      `📊 Total Highlight Correct Summary questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();
