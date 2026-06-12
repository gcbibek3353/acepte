import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "FIBDD001",
    title: "The Process of Photosynthesis",
    difficulty: "MEDIUM" as const,
    content: `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process occurs in the {1} of plant cells, where {2} absorbs light energy. During photosynthesis, plants take in {3} from the air and {4} from the soil through their roots. The light energy is used to split water molecules, releasing {5} as a byproduct. The process also produces {6}, which serves as food for the plant and can be stored as starch for later use.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 1,
        explanation:
          "'Chloroplasts' is correct because photosynthesis is a light-dependent process that takes place specifically in the chloroplasts — the organelles that contain chlorophyll. Mitochondria handle respiration, not photosynthesis, and roots/leaves refer to structural parts of the plant, not cellular locations.",
      },
      {
        position: 2,
        correctOptionIndex: 6,
        explanation:
          "'Chlorophyll' is correct because it is the green pigment inside chloroplasts that captures light energy and initiates the photosynthesis reaction. Without chlorophyll, plants cannot absorb the sunlight needed to drive the process.",
      },
      {
        position: 3,
        correctOptionIndex: 2,
        explanation:
          "'Carbon dioxide' is correct because it is one of the two raw materials for photosynthesis (along with water). Plants absorb CO₂ from the air through tiny pores called stomata. Nitrogen and sunlight are not absorbed through the same mechanism.",
      },
      {
        position: 4,
        correctOptionIndex: 3,
        explanation:
          "'Water' is correct because it is the second raw material absorbed through the roots. The light energy splits water molecules (photolysis), releasing hydrogen (used to make glucose) and oxygen (released as a byproduct).",
      },
      {
        position: 5,
        correctOptionIndex: 5,
        explanation:
          "'Oxygen' is correct because it is a byproduct of splitting water molecules during the light-dependent reactions. This released oxygen is what supports aerobic life on Earth. Hydrogen is retained to help build glucose.",
      },
      {
        position: 6,
        correctOptionIndex: 9,
        explanation:
          "'Glucose' is correct because it is the sugar produced during the Calvin cycle (light-independent reactions) using CO₂ and the hydrogen from water. It serves as the plant's primary energy store and building block.",
      },
    ],
    options: [
      "hydrogen",
      "chloroplasts",
      "carbon dioxide",
      "water",
      "mitochondria",
      "oxygen",
      "chlorophyll",
      "nitrogen",
      "sunlight",
      "glucose",
      "roots",
      "leaves",
    ],
  },
  {
    questionId: "FIBDD002",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    content: `The water cycle is the continuous movement of water on Earth. It begins with {1}, where the sun heats water in oceans and rivers, turning it into water vapor. This water vapor rises into the atmosphere and cools down, forming {2} through condensation. When the water droplets in clouds become too heavy, they fall back to Earth as {3}. Some water flows over the surface as {4}, while other water soaks into the ground to become {5}.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 2,
        explanation:
          "'Evaporation' is correct because it is the first stage of the water cycle — the sun's heat converts liquid water into water vapor. Condensation and precipitation happen later in the cycle, not at the start.",
      },
      {
        position: 2,
        correctOptionIndex: 7,
        explanation:
          "'Clouds' is correct because water vapor rises, cools, and condenses around tiny particles to form visible clouds. This is the condensation stage. Ice and snow refer to precipitation forms, not the condensed vapor stage.",
      },
      {
        position: 3,
        correctOptionIndex: 0,
        explanation:
          "'Precipitation' is correct because it is the collective term for all forms of water falling from clouds — rain, snow, hail, or sleet. The sentence describes the general process, so the broad scientific term fits best.",
      },
      {
        position: 4,
        correctOptionIndex: 9,
        explanation:
          "'Runoff' is correct because it refers to water that flows across the land surface without soaking in. This is contrasted directly with groundwater in the next clause, making 'runoff' the precise term for surface-flowing water.",
      },
      {
        position: 5,
        correctOptionIndex: 4,
        explanation:
          "'Groundwater' is correct because it specifically describes water that has percolated through the soil and accumulated underground. This is the standard scientific term for subsurface water stores.",
      },
    ],
    options: [
      "precipitation",
      "condensation",
      "evaporation",
      "storms",
      "groundwater",
      "ice",
      "snow",
      "clouds",
      "rivers",
      "runoff",
      "oceans",
    ],
  },
  {
    questionId: "FIBDD003",
    title: "The Human Digestive System",
    difficulty: "HARD" as const,
    content: `The human digestive system breaks down food into nutrients that the body can absorb. Digestion begins in the {1}, where saliva contains enzymes that start breaking down carbohydrates. Food then travels through the {2} to reach the {3}, where gastric acid and digestive enzymes continue the breakdown process. The partially digested food moves to the {4}, where most nutrient absorption occurs with help from the {5} and {6}. Finally, waste products are eliminated through the {7}.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 3,
        explanation:
          "'Mouth' is correct because digestion begins there — salivary amylase in saliva starts breaking down starch before the food even reaches the stomach. The stomach handles acid-based digestion, not the initial carbohydrate breakdown.",
      },
      {
        position: 2,
        correctOptionIndex: 8,
        explanation:
          "'Esophagus' is correct because it is the muscular tube connecting the mouth to the stomach. Food travels through it via peristalsis after being swallowed. The throat is informal and technically broader; the esophagus is the precise anatomical term.",
      },
      {
        position: 3,
        correctOptionIndex: 1,
        explanation:
          "'Stomach' is correct because it secretes gastric acid (HCl) and pepsin to break down proteins. The sentence specifically mentions gastric acid, which is exclusive to the stomach.",
      },
      {
        position: 4,
        correctOptionIndex: 11,
        explanation:
          "'Small intestine' is correct because it is the primary site of nutrient absorption. Its walls contain villi and microvilli that dramatically increase the surface area for absorbing digested nutrients into the bloodstream.",
      },
      {
        position: 5,
        correctOptionIndex: 6,
        explanation:
          "'Liver' is correct because it produces bile, which is stored in the gallbladder and released into the small intestine to emulsify fats — a key step in fat digestion and absorption.",
      },
      {
        position: 6,
        correctOptionIndex: 0,
        explanation:
          "'Pancreas' is correct because it secretes digestive enzymes (lipase, amylase, protease) directly into the small intestine. Along with the liver, it provides the enzymes needed for full digestion of all macronutrients.",
      },
      {
        position: 7,
        correctOptionIndex: 9,
        explanation:
          "'Large intestine' is correct because it is where water is reabsorbed from undigested material and waste is compacted before elimination. The small intestine handles absorption; the large intestine handles waste processing.",
      },
    ],
    options: [
      "pancreas",
      "stomach",
      "kidney",
      "mouth",
      "heart",
      "lungs",
      "liver",
      "throat",
      "esophagus",
      "large intestine",
      "gallbladder",
      "small intestine",
      "appendix",
      "spleen",
    ],
  },
  {
    questionId: "FIBDD004",
    title: "Climate Change and Global Warming",
    difficulty: "MEDIUM" as const,
    content: `Climate change refers to long-term shifts in global temperatures and weather patterns. The primary cause is the increase in {1} in the atmosphere, mainly from burning {2}. These gases trap heat from the sun, causing the {3} effect. As global temperatures rise, we see melting {4}, rising {5}, and more frequent extreme weather events like {6} and floods.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 8,
        explanation:
          "'Greenhouse gases' is correct because the sentence is discussing the atmospheric cause of climate change. Carbon dioxide, methane, and nitrous oxide are all greenhouse gases that trap heat. 'Ozone layer' refers to a protective layer, not the gases driving warming.",
      },
      {
        position: 2,
        correctOptionIndex: 2,
        explanation:
          "'Fossil fuels' is correct because burning coal, oil, and natural gas releases CO₂ stored over millions of years into the atmosphere. Solar energy and wind are renewables that don't produce emissions.",
      },
      {
        position: 3,
        correctOptionIndex: 5,
        explanation:
          "'Greenhouse' is correct because the passage describes the mechanism where gases trap solar heat — this is precisely the greenhouse effect. The ozone layer is a separate phenomenon involving UV protection.",
      },
      {
        position: 4,
        correctOptionIndex: 0,
        explanation:
          "'Ice caps' is correct because polar ice and glaciers are directly melting due to rising temperatures. This is one of the most visually documented effects of global warming, and the term pairs naturally with 'melting'.",
      },
      {
        position: 5,
        correctOptionIndex: 10,
        explanation:
          "'Sea levels' is correct because melting ice and thermal expansion of warming oceans both cause sea levels to rise. This is a direct consequence of global warming and one of the most significant long-term threats.",
      },
      {
        position: 6,
        correctOptionIndex: 4,
        explanation:
          "'Droughts' is correct because it pairs logically with 'floods' — both are extreme weather events intensified by climate change. Hurricanes are also a valid effect, but 'droughts' creates a better contrast with floods in this context.",
      },
    ],
    options: [
      "ice caps",
      "ozone layer",
      "fossil fuels",
      "solar energy",
      "droughts",
      "greenhouse",
      "wind patterns",
      "hurricanes",
      "greenhouse gases",
      "mountains",
      "sea levels",
      "deserts",
    ],
  },
  {
    questionId: "FIBDD005",
    title: "The Basics of Computer Programming",
    difficulty: "EASY" as const,
    content: `Computer programming involves writing instructions for computers to follow. These instructions are written in a {1} that the computer can understand. A program is a set of {2} that tells the computer what to do step by step. Programmers use {3} to write code, and the code must be free of {4} to work properly. Before running a program, it often needs to be {5} into machine language that the computer's processor can execute.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 7,
        explanation:
          "'Programming language' is correct because it is the formal system (e.g., Python, Java, C++) used to write instructions that a computer can interpret. 'Software' and 'hardware' describe categories of computing, not the medium used to write instructions.",
      },
      {
        position: 2,
        correctOptionIndex: 3,
        explanation:
          "'Instructions' is correct because a computer program is fundamentally a sequence of commands telling the processor what operations to perform. 'Algorithms' describe the logic behind a solution, but 'instructions' is the precise term for what a program contains.",
      },
      {
        position: 3,
        correctOptionIndex: 0,
        explanation:
          "'Algorithms' is correct here because programmers use algorithms — step-by-step logical procedures — to structure their code solutions. The sentence describes the tool programmers apply, not the hardware they use.",
      },
      {
        position: 4,
        correctOptionIndex: 9,
        explanation:
          "'Errors' is correct because code with bugs, syntax mistakes, or logic flaws will not run correctly. In programming, removing errors (debugging) is essential before a program can function as intended.",
      },
      {
        position: 5,
        correctOptionIndex: 5,
        explanation:
          "'Compiled' is correct because many programming languages (C, Java, Go) require a compiler to translate high-level source code into machine language (binary) that the CPU can directly execute.",
      },
    ],
    options: [
      "algorithms",
      "hardware",
      "software",
      "instructions",
      "internet",
      "compiled",
      "database",
      "programming language",
      "graphics",
      "errors",
      "keyboard",
    ],
  },
  {
    questionId: "FIBDD006",
    title: "The Formation of Fossil Fuels",
    difficulty: "HARD" as const,
    content: `Fossil fuels formed millions of years ago from the remains of ancient {1} and plants. These organisms died and were buried under layers of {2} and rock. Over time, heat and {3} transformed the organic material into different types of fossil fuels. {4} formed from ancient marine organisms, while {5} developed from plant material in swamps and forests. {6} formed from both plant and animal remains under specific conditions. The extraction of these fuels from deep underground requires specialized {7} techniques.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 6,
        explanation:
          "'Animals' is correct because fossil fuels — particularly oil — formed from the decomposed remains of ancient marine animals and microorganisms alongside plant matter. The sentence structure 'ancient ___ and plants' requires an animal term.",
      },
      {
        position: 2,
        correctOptionIndex: 11,
        explanation:
          "'Sediment' is correct because organisms were buried under layers of sand, silt, and mud (sediment) over geological time. This burial cuts off oxygen, preventing decay and allowing gradual transformation under heat and pressure.",
      },
      {
        position: 3,
        correctOptionIndex: 2,
        explanation:
          "'Pressure' is correct because both heat AND pressure (from overlying rock and sediment) are the physical forces that chemically transform organic matter into coal, oil, or gas. Neither alone is sufficient — both are required.",
      },
      {
        position: 4,
        correctOptionIndex: 8,
        explanation:
          "'Oil' is correct because petroleum forms primarily from the remains of microscopic marine organisms (plankton, algae) buried under ocean sediments. Coal forms from land plants, not marine organisms.",
      },
      {
        position: 5,
        correctOptionIndex: 0,
        explanation:
          "'Coal' is correct because it forms from the compression of ancient plant material — particularly from vast swamp forests of the Carboniferous period. The swamp and forest context in the sentence directly points to coal formation.",
      },
      {
        position: 6,
        correctOptionIndex: 4,
        explanation:
          "'Natural gas' is correct because it can form from both plant and animal organic matter under high heat and pressure at greater depths. It often occurs alongside oil deposits and forms under a wider range of conditions.",
      },
      {
        position: 7,
        correctOptionIndex: 12,
        explanation:
          "'Drilling' is correct because extracting oil, gas, and even some coal requires drilling deep wells or boreholes into the Earth's crust. 'Mining' applies more to surface or shallow coal extraction, while 'drilling' is the term for deep subsurface extraction.",
      },
    ],
    options: [
      "coal",
      "water",
      "pressure",
      "air",
      "natural gas",
      "minerals",
      "animals",
      "crystals",
      "oil",
      "volcanic ash",
      "limestone",
      "sediment",
      "drilling",
      "mining",
    ],
  },
  {
    questionId: "FIBDD007",
    title: "Sleepwalking",
    difficulty: "MEDIUM" as const,
    content: `Sleepwalking is a disorder that occurs during sleep, in which a person may get up and walk around. It usually happens at {1} times of the night, especially during the deeper stages of sleep. People who sleepwalk are not aware of their actions and often do not remember {2} they have done when they wake up. Sleepwalking is more common in children than in adults, and many children grow out of it over time. Sleepwalking is not the only type of unusual sleep behavior. {3} include sleep talking, nightmares, and night terrors.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 0,
        explanation:
          "'Certain' is correct because the phrase 'certain times of the night' is a common expression meaning particular or specific periods during the night.",
      },
      {
        position: 2,
        correctOptionIndex: 4,
        explanation:
          "'What' is correct because it refers to the actions performed during sleepwalking that the person cannot remember afterward.",
      },
      {
        position: 3,
        correctOptionIndex: 8,
        explanation:
          "'Others' is correct because it refers to other types of unusual sleep behaviors besides sleepwalking.",
      },
    ],
    options: [
      "certain",
      "random",
      "specific",
      "exact",
      "what",
      "where",
      "when",
      "how",
      "Others",
      "Another",
      "The other",
      "Other",
    ],
  },

  {
    questionId: "FIBDD008",
    title: "Communication Skills",
    difficulty: "MEDIUM" as const,
    content: `In terms of your own communication skills, it is important to give just as much of your attention to a message you are receiving as to one you are giving. Listening, {1}, as well as being a method for gathering information, {2} your interest in what the other person is concerned with. This in itself can have a positive effect on your relationship with them and, if you are their manager, their motivation. Asking questions for {3} of the detail of the message can also convey that you have understood the message and that you want to respond to it {4}.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 1,
        explanation:
          "'For example' is correct because the sentence is giving listening as an example of an important communication skill.",
      },
      {
        position: 2,
        correctOptionIndex: 6,
        explanation:
          "'Can convey' is correct because the sentence requires a modal verb structure to describe the possible effect of listening.",
      },
      {
        position: 3,
        correctOptionIndex: 11,
        explanation:
          "'Clarification' is correct because asking questions helps clarify details and improve understanding of the message.",
      },
      {
        position: 4,
        correctOptionIndex: 13,
        explanation:
          "'Appropriately' is correct because it describes responding in a suitable or proper manner.",
      },
    ],
    options: [
      "as a result",
      "for example",
      "now that",
      "in addition",
      "conveying",
      "to convey",
      "can convey",
      "convey",
      "classification",
      "identification",
      "association",
      "clarification",
      "prefessionally",
      "appropriately",
      "ocassionally",
      "proportionately",
    ],
  },

  {
    questionId: "FIBDD009",
    title: "Housing",
    difficulty: "MEDIUM" as const,
    content: `Housing is a key component of individual and family. In addition to being a place where family and friends can gather, housing is important for a sense of security and {1}. One {2} aspect of security is the wealth in the homes of owner-occupiers. The wealth of households {3} as the wealth (or equity) in the homes of owner occupiers increases through paying off outstanding housing loans, or as property values rise. In 2003-04, the primary residence was, on average, the most valuable asset of owner-occupier households, with the net value of owned homes {4} an average of 55% of the net worth of those households.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 2,
        explanation:
          "'Privacy' is correct because housing provides both security and personal privacy for individuals and families.",
      },
      {
        position: 2,
        correctOptionIndex: 6,
        explanation:
          "'Significant' is correct because the sentence refers to an important aspect of financial security.",
      },
      {
        position: 3,
        correctOptionIndex: 11,
        explanation:
          "'Increases' is correct because household wealth grows as property values rise and loans are repaid.",
      },
      {
        position: 4,
        correctOptionIndex: 12,
        explanation:
          "'Accounting for' is correct because it explains the proportion of household net worth represented by owned homes.",
      },
    ],
    options: [
      "paucity",
      "prowess",
      "privacy",
      "poverty",
      "considerate",
      "temporal",
      "significant",
      "consistent",
      "stablizes",
      "falls",
      "appers",
      "increases",
      "accounting for",
      "resulting in",
      "depending on",
      "belonging to",
    ],
  },

  {
    questionId: "FIBDD010",
    title: "Insects",
    difficulty: "MEDIUM" as const,
    content: `Insects have been an important part of the human diet for thousands of years. So why has insect eating died out in the developed world? Stuart Hine, an entomologist at the Natural History Museum in London says it's a cultural {1} insects are seen as 'dirty' and as carriers of disease. Despite this, a decade ago, insect eating seemed to be making a {2} with the publication of a number of insect recipe books. Edible, a London-based company, supplies products such as chocolate-covered ants and toasted leafcutter ants. Perhaps as we become {3} of the sentience of higher animals, insects will become the protein of choice in centuries to come.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 3,
        explanation:
          "'Thing' is correct because the phrase 'it's a cultural thing' is a natural expression referring to cultural attitudes and habits.",
      },
      {
        position: 2,
        correctOptionIndex: 4,
        explanation:
          "'Comeback' is correct because the passage describes insect eating becoming popular again.",
      },
      {
        position: 3,
        correctOptionIndex: 8,
        explanation:
          "'Aware' is correct because the phrase 'become aware of' means gaining understanding or consciousness about something.",
      },
    ],
    options: [
      "element",
      "instance",
      "item",
      "thing",
      "comeback",
      "reaction",
      "repetition",
      "reproduction",
      "aware",
      "cautious",
      "observant",
      "sensitive",
    ],
  },

  {
    questionId: "FIBDD011",
    title: "Workforce Plan",
    difficulty: "MEDIUM" as const,
    content: `The purpose of the workforce plan is to enable a business to achieve its overall objective by successfully putting its corporate strategies into action. So it is these overall business objectives and strategies that are the {1} for assessing the number and type of staff of workers that will be needed in the future. Where growth is the objective, the business {2} to increase sales by targeting new markets and launching new products. The workforce plan will need to set out {3} the people required to make this happen will be recruited, retained, developed and relocated. If cost minimization is the goal and if workforce efficiency is one of the strategies, plans will need to be in place to {4} productivity cut wages bills or delays the organisational structure.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 2,
        explanation:
          "'Starting point' is correct because business objectives form the basis for workforce planning decisions.",
      },
      {
        position: 2,
        correctOptionIndex: 6,
        explanation:
          "'May be planning' is correct because it indicates a possible or ongoing business strategy for future growth.",
      },
      {
        position: 3,
        correctOptionIndex: 8,
        explanation:
          "'How' is correct because the sentence explains the method by which staffing requirements will be achieved.",
      },
      {
        position: 4,
        correctOptionIndex: 12,
        explanation:
          "'Boost' is correct because improving productivity is a common strategy in workforce efficiency planning.",
      },
    ],
    options: [
      "day one",
      "square one",
      "starting point",
      "take-off",
      "had planned",
      "has planned",
      "may be planning",
      "planned",
      "how",
      "that",
      "what",
      "which",
      "boost",
      "innovate",
      "release",
      "renew",
    ],
  },

  {
    questionId: "FIBDD012",
    title: "Technology Advances",
    difficulty: "HARD" as const,
    content: `As the world charges into the future each day, bringing new, astonishing technological advances, our society runs the risk of becoming not only Washington Irvine's headless horseman but the {1} horseman as well - eating up the technological miles with little or no reflection as to why we're moving so fast or even where we're going. But both the head and the heart - urgent reflection and deeply felt {2} about the meaning of these galloping changes are {3} in all sorts of venues, not least in the endeavours that are {4} known as the humanities.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 0,
        explanation:
          "'Heartless' is correct because the phrase contrasts emotional emptiness with the metaphor of the headless horseman.",
      },
      {
        position: 2,
        correctOptionIndex: 5,
        explanation:
          "'Connection' is correct because the sentence refers to emotional and intellectual engagement with technological change.",
      },
      {
        position: 3,
        correctOptionIndex: 8,
        explanation:
          "'Available' is correct because the sentence states that opportunities for reflection exist in many places.",
      },
      {
        position: 4,
        correctOptionIndex: 15,
        explanation:
          "'Collectively' is correct because the humanities are collectively known as a group of disciplines.",
      },
    ],
    options: [
      "heartless",
      "lessened",
      "skilful",
      "troubled",
      "acquittal",
      "connection",
      "contemplation",
      "feelings",
      "available",
      "ignored",
      "interrupted",
      "present",
      "collected",
      "collectedly",
      "collection",
      "collectively",
    ],
  },

  {
    questionId: "FIBDD013",
    title: "The Development of Human History",
    difficulty: "MEDIUM" as const,
    content: `By 164,000 years ago, modern humans were collecting and cooking shellfish, and by 90,000 years ago, modern humans had begun making special fishing tools. Then, {1} just the past 12,000 years, our species, Homo sapiens, made the transition to producing food and changing our surroundings. Humans found they {2} the growth and breeding of certain plants and animals. This discovery {3} farming and herding animals, activities that transformed Earth's natural landscapes first locally, then globally. {4} humans invested more time in producing food as they settled down. Villages became towns and towns became cities. With more food available, the human population began to increase dramatically. Our species has been so successful {5} it has inadvertently created a turning point in the history of life on Earth.`,
    blanks: [
      {
        position: 1,
        correctOptionIndex: 3,
        explanation:
          "'Within' is correct because the phrase 'within the past 12,000 years' refers to a time period extending back from the present.",
      },
      {
        position: 2,
        correctOptionIndex: 5,
        explanation:
          "'Could control' is correct because humans discovered the ability to manage plant and animal growth.",
      },
      {
        position: 3,
        correctOptionIndex: 9,
        explanation:
          "'Led to' is correct because the discovery directly resulted in the development of farming and herding.",
      },
      {
        position: 4,
        correctOptionIndex: 12,
        explanation:
          "'As' is correct because it indicates that humans settled down while simultaneously investing more time in food production.",
      },
      {
        position: 5,
        correctOptionIndex: 17,
        explanation:
          "'That' is correct because the phrase 'so successful that' is the grammatically correct result clause.",
      },
    ],
    options: [
      "before",
      "by",
      "since",
      "within",
      "controlled",
      "could control",
      "were controlling",
      "would control",
      "carried on",
      "led to",
      "made",
      "resulted from",
      "As",
      "If",
      "So",
      "With",
      "but",
      "that",
      "though",
      "which",
    ],
  },
  {
  questionId: "FIBDD014",
  title: "Science",
  difficulty: "MEDIUM" as const,
  content: `Science is the objective testing of phenomena using logic, reasoning, and method. It is a process whereby knowledge is suggested, proved, and corrected, allowing humans {1} more about natural or technological systems. Following scientific methodology, many {2} human theories about the environment have been proven to be incorrect. A {3} aspect of science is the ability to measure and compare different variables. Every field of science includes some form of measuring and comparing so that conclusions can be drawn. No scientific result can be relied upon to be entirely accurate, and many conclusions are {4} simply from human observation and perception.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 3,
      explanation: "'To learn' is correct because the phrase 'allowing humans to learn more' is grammatically correct after the verb 'allowing'."
    },
    {
      position: 2,
      correctOptionIndex: 6,
      explanation: "'Traditional' is correct because the sentence refers to older or commonly accepted theories that were later proven incorrect."
    },
    {
      position: 3,
      correctOptionIndex: 9,
      explanation: "'Key' is correct because it describes an important or essential aspect of science."
    },
    {
      position: 4,
      correctOptionIndex: 13,
      explanation: "'Drawn' is correct because conclusions are commonly said to be 'drawn' from observations and evidence."
    }
  ],
  options: ["learn", "learned", "learning", "to learn", "acceptable", "obscure", "traditional", "verified", "banal", "key", "radical", "visionary", "captured", "drawn", "foregone", "jump"]
},

{
  questionId: "FIBDD015",
  title: "Coping with Stress",
  difficulty: "MEDIUM" as const,
  content: `It has been found that women tend to use more emotional strategies - changing the way they think about a situation - to try to cope with stress, while men tend to focus more on changing the situation they see as a {1}. Coping with stress can be difficult. It takes time and effort to find new strategies, and it can be very hard to {2} the effects of past experience - but a wide range of successful therapies for the treatment of stress is now {3} to people. On top of this, the problems of being {4} at work and stress-related illnesses are now far better understood.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 1,
      explanation: "'Problem' is correct because stress is viewed as a problem that people try to change or solve."
    },
    {
      position: 2,
      correctOptionIndex: 7,
      explanation: "'Overcome' is correct because the sentence discusses dealing successfully with the effects of past experiences."
    },
    {
      position: 3,
      correctOptionIndex: 11,
      explanation: "'Open' is correct because therapies are now available or accessible to people."
    },
    {
      position: 4,
      correctOptionIndex: 13,
      explanation: "'Overloaded' is correct because excessive workload is commonly linked to stress-related illnesses."
    }
  ],
  options: ["method", "problem", "reason", "solution", "choose", "conceal", "follow", "overcome", "apparent", "appropriate", "obvious", "open", "exposed", "overloaded", "recognized", "treated"]
},

{
  questionId: "FIBDD016",
  title: "Total Product",
  difficulty: "MEDIUM" as const,
  content: `One of the most important recent advances in business thinking is the recognition that people, in their purchase decision-making, respond to more than simply the tangible product or service being offered. The tangible product - a pair of shoes, a refrigerator, a haircut, or a meal - is simply a small part of the total consumption {1}. Buyers respond to a total product. It includes the services, warranty, packaging, advertising, financing, pleasantries, images and other features that {2} the product. One of the most significant features of the total product is the place where it is bought or {3}. In some cases, the place, more specifically the atmosphere of the place, is more {4} than the product itself in the purchase decision. In some cases, the atmosphere is the primary product.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 1,
      explanation: "'Package' is correct because the phrase 'total consumption package' refers to the complete buying experience."
    },
    {
      position: 2,
      correctOptionIndex: 4,
      explanation: "'Accompany' is correct because the listed services and features go together with the product."
    },
    {
      position: 3,
      correctOptionIndex: 8,
      explanation: "'Consumed' is correct because products or services are bought or consumed by customers."
    },
    {
      position: 4,
      correctOptionIndex: 15,
      explanation: "'Influential' is correct because the atmosphere can strongly affect purchasing decisions."
    }
  ],
  options: ["baggage", "package", "packet", "whole", "accompany", "associate", "combine", "contain", "consumed", "entertained", "packaged", "sold", "influence", "influenced", "influencing", "influential"]
},

{
  questionId: "FIBDD017",
  title: "Wind Moving",
  difficulty: "EASY" as const,
  content: `Wind is air moving around. Some winds can move {1} fast as a racing car, over 100 miles an {2}. Winds can travel around the world. Wind can make you feel cold because you lose heat from your body {3} when it is windy. Weather forecasters need to {4} the speed and direction of the wind. The strength of wind is measured using the Beaufort scale from wind force when there is no wind, to wind force 12 which can damage houses and buildings and is called hurricane force.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 1,
      explanation: "'As' is correct because the phrase 'as fast as' is the standard comparative structure."
    },
    {
      position: 2,
      correctOptionIndex: 7,
      explanation: "'Hour' is correct because wind speed is commonly measured in miles per hour."
    },
    {
      position: 3,
      correctOptionIndex: 10,
      explanation: "'Faster' is correct because wind increases the rate at which the body loses heat."
    },
    {
      position: 4,
      correctOptionIndex: 13,
      explanation: "'Know' is correct because weather forecasters must know wind speed and direction to predict weather."
    }
  ],
  options: ["under", "as", "beyond", "since", "place", "side", "road", "hour", "nearer", "higher", "faster", "deeper", "build", "know", "catch", "borrow"]
},

{
  questionId: "FIBDD018",
  title: "Solar Eclipse",
  difficulty: "EASY" as const,
  content: `A total solar eclipse is a rare and spectacular phenomenon that occurs when the moon {1} the sun’s light completely, creating a brief period of darkness in the middle of the day. On 8 April 2024, people in North America will have a chance to {2} this amazing event, as the path of totality - the area {3} the eclipse is visible - will stretch from Mexico to Canada, crossing 13 US states. To enjoy the full experience of the eclipse, viewers need to know where and when to look, as well as how to protect their eyes from the sun’s harmful rays. The eclipse will {4} for about 3 hours, but the totality will only be for about 4 minutes, depending on the location. During this time, the temperature will drop, the sky will darken, and stars and planets will appear. There will also be other phenomena to observe, such as strange shadows, diamond rings, and the sun’s corona. A total solar eclipse is a once-in-a-lifetime opportunity that should not be {5} by anyone who loves astronomy and nature.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 1,
      explanation: "'Blocks' is correct because a solar eclipse happens when the moon blocks the sun’s light."
    },
    {
      position: 2,
      correctOptionIndex: 6,
      explanation: "'Witness' is correct because people witness or observe events like eclipses."
    },
    {
      position: 3,
      correctOptionIndex: 11,
      explanation: "'Where' is correct because it refers to the area in which the eclipse can be seen."
    },
    {
      position: 4,
      correctOptionIndex: 15,
      explanation: "'Last' is correct because the sentence refers to the duration of the eclipse."
    },
    {
      position: 5,
      correctOptionIndex: 18,
      explanation: "'Missed' is correct because the eclipse is described as an opportunity that should not be missed."
    }
  ],
  options: ["difuses", "blocks", "transfers", "investigates", "highlight", "drive", "witness", "derive", "on", "that", "what", "where", "pause", "end", "reoccur", "last", "anticipated", "viewed", "missed", "celebrated"]
},

{
  questionId: "FIBDD019",
  title: "Fieldwork",
  difficulty: "EASY" as const,
  content: `The main purpose of fieldwork is to {1} students a chance to {2} what they have learned in the classroom to real-life situations. By doing so, they gain experience that cannot be {3} from books alone.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 3,
      explanation: "'Offer' is correct because fieldwork provides students with opportunities for practical learning."
    },
    {
      position: 2,
      correctOptionIndex: 4,
      explanation: "'Apply' is correct because students use classroom knowledge in real-life situations."
    },
    {
      position: 3,
      correctOptionIndex: 11,
      explanation: "'Obtained' is correct because practical experience cannot be gained only through reading books."
    }
  ],
  options: ["resemble", "stove", "rave", "offer", "apply", "compare", "align", "discount", "originated", "prepared", "opened", "obtained"]
},

{
  questionId: "FIBDD020",
  title: "Apartment Renting",
  difficulty: "EASY" as const,
  content: `My name is Tonia. My roommate and I are looking for a nice apartment near my college’s campus. We are very quiet and study a lot. I study history, and my roommate studies French. We are very interested {1} renting your apartment. We can {2} the rent on time because we do part-time work, too. Some of our friends live in the same building and have recommended your place to us. They mentioned that you are a kind and responsible landlord, and we hope to {3} the same positive experience. I would like to make an appointment to view the apartment in person. {4} application form is ready, and we are prepared to proceed with the process quickly. We look forward to hearing from you soon. Best regards, Tonia.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 0,
      explanation: "'In' is correct because the phrase 'interested in' is the proper collocation."
    },
    {
      position: 2,
      correctOptionIndex: 4,
      explanation: "'Pay' is correct because rent is something tenants pay regularly."
    },
    {
      position: 3,
      correctOptionIndex: 8,
      explanation: "'Have' is correct because the phrase 'have the same positive experience' is grammatically correct."
    },
    {
      position: 4,
      correctOptionIndex: 15,
      explanation: "'Our' is correct because the speaker refers to their own application form."
    }
  ],
  options: ["in", "about", "at", "for", "pay", "afford", "get", "bring", "have", "form", "meet", "decide", "your", "we", "their", "our"]
},

{
  questionId: "FIBDD021",
  title: "Illness",
  difficulty: "EASY" as const,
  content: `He spent a {1} night, struggling with his health. It was {2} for him to continue with his duties as usual. Despite his determination and eagerness to teach, he was not permitted to {3} class due to his health condition. He was {4} to attend and fulfill his responsibilities, but his illness prevented him from doing so.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 2,
      explanation: "'Painful' is correct because the passage describes suffering due to illness."
    },
    {
      position: 2,
      correctOptionIndex: 5,
      explanation: "'Difficult' is correct because illness made it hard for him to continue his duties."
    },
    {
      position: 3,
      correctOptionIndex: 11,
      explanation: "'Attend' is correct because teachers attend or conduct classes."
    },
    {
      position: 4,
      correctOptionIndex: 13,
      explanation: "'Happy' is correct because the sentence highlights his willingness and eagerness despite illness."
    }
  ],
  options: ["meaningful", "restful", "painful", "helpful", "enjoyable", "difficult", "natural", "easy", "manoeurve", "cancel", "deny", "attend", "exhausted", "happy", "forced", "anxious"]
},

{
  questionId: "FIBDD022",
  title: "Challenges",
  difficulty: "EASY" as const,
  content: `I feel {1} about the opportunity to take on new challenges and contribute to the team. {2} I was working at my previous job, I gained valuable experience that I believe will be beneficial in this role. I am eager to take a {3} at your esteemed company and I am confident that my skills and experience make me a strong candidate. Please let me {4} if there are any additional steps I need to take or information I need to provide. I am looking {5} to your response.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 1,
      explanation: "'Safe' is the provided correct answer, although the sentence sounds slightly unnatural in context."
    },
    {
      position: 2,
      correctOptionIndex: 7,
      explanation: "'While' is correct because it introduces a time period during previous employment."
    },
    {
      position: 3,
      correctOptionIndex: 10,
      explanation: "'Position' is correct because people apply for or take positions at companies."
    },
    {
      position: 4,
      correctOptionIndex: 12,
      explanation: "'Know' is correct because the phrase 'let me know' is a standard expression."
    },
    {
      position: 5,
      correctOptionIndex: 16,
      explanation: "'Forward' is correct because the phrase 'looking forward to' is a common expression."
    }
  ],
  options: ["problem", "safe", "worry", "angry", "However", "If", "Why", "While", "acqusition", "nomination", "position", "hardwork", "know", "show", "provide", "advice", "forward", "backward", "never", "ever"]
},

{
  questionId: "FIBDD023",
  title: "Mercury",
  difficulty: "EASY" as const,
  content: `Mercury is not found in many common products that we buy because it can be very dangerous. The most common products that {1} mercury are batteries, powerful outdoor lights, disinfectants, and thermometers, which are used to {2} our body's temperature. It can also be found in barometers, which are used to measure air pressure and show {3} in weather, and thermostats, which {4} the temperature of buildings. Mercury can also be found in printer and photocopy toners.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 1,
      explanation: "'Contain' is correct because products may contain mercury as a chemical substance."
    },
    {
      position: 2,
      correctOptionIndex: 7,
      explanation: "'Measure' is correct because thermometers are used to measure temperature."
    },
    {
      position: 3,
      correctOptionIndex: 10,
      explanation: "'Changes' is correct because barometers help indicate weather changes."
    },
    {
      position: 4,
      correctOptionIndex: 13,
      explanation: "'Regulate' is correct because thermostats control building temperature."
    }
  ],
  options: ["make", "contain", "create", "release", "regulate", "reduce", "control", "measure", "moods", "feelings", "changes", "emotions", "mine", "regulate", "hide", "created"]
},

{
  questionId: "FIBDD024",
  title: "Major Sporting Events",
  difficulty: "HARD" as const,
  content: `Future sporting mega-events and other forms of festival capitalism will continue to attract diverse forms of oppression, criticism, and compliance. If critical forces are to enhance their impacts, it is important that they engage fully with a wide cross-section of critics at the {1} and national levels while also seeking to avoid {2} spaces for the location of public protests. More significantly, such opposition groups might also note the potential of other approaches toward resisting or transgressing festival capitalism. Spectacular neo-tribal activities, situationist performances and {3} with radical community-based organisations all provide ways in which public attention might be diverted and captured. At the same time, these practises also seek to evade, or to mock, or to challenge symbolically, some of the key issues {4} the hosting of sporting mega-events raises concerning political economy, security, and social justice.`,
  blanks: [
    {
      position: 1,
      correctOptionIndex: 0,
      explanation: "'Community' is correct because the sentence contrasts community and national levels of engagement."
    },
    {
      position: 2,
      correctOptionIndex: 6,
      explanation: "'Peripheral' is correct because peripheral spaces refer to areas away from central public attention."
    },
    {
      position: 3,
      correctOptionIndex: 8,
      explanation: "'Engaging' is correct because opposition groups engage with community-based organisations."
    },
    {
      position: 4,
      correctOptionIndex: 15,
      explanation: "'Surrounding' is correct because the phrase 'issues surrounding' is a standard collocation."
    }
  ],
  options: ["community", "disunity", "isolation", "solitude", "perimeter", "periodical", "peripheral", "perishable", "engaging", "funding", "participating", "playing", "arounding", "including", "involving", "surrounding"]
}
];

const createFibDragDropQuestions = async () => {
  try {
    console.log(
      "Starting to add Fill in the Blanks (Drag and Drop) questions to the database...",
    );

    for (const questionData of questions) {
      const existingPassage = await prisma.fillBlanksDragDropPassage.findUnique(
        {
          where: { questionId: questionData.questionId },
          include: { blanks: true },
        },
      );

      if (existingPassage) {
        // Update existing blanks with explanations
        for (const blankData of questionData.blanks) {
          const existingBlank = existingPassage.blanks.find(
            (b) => b.position === blankData.position,
          );
          if (existingBlank) {
            await prisma.fillBlanksDragDropBlank.update({
              where: { id: existingBlank.id },
              data: { explanation: blankData.explanation },
            });
          }
        }
        console.log(`✅ Updated explanations for ${questionData.questionId}`);
        continue;
      }

      if (questionData.blanks.length === 0) {
        console.log(
          `⚠️ Question ${questionData.questionId} has no blanks, skipping...`,
        );
        continue;
      }

      const result = await prisma.$transaction(
        async (tx) => {
          const passage = await tx.fillBlanksDragDropPassage.create({
            data: {
              questionId: questionData.questionId,
              title: questionData.title,
              content: questionData.content,
              difficulty: questionData.difficulty,
              options: questionData.options,
            },
          });

          const blanks = await Promise.all(
            questionData.blanks.map(async (blankData) => {
              if (blankData.correctOptionIndex >= questionData.options.length) {
                throw new Error(
                  `Invalid correctOptionIndex ${blankData.correctOptionIndex} for question ${questionData.questionId}.`,
                );
              }

              return tx.fillBlanksDragDropBlank.create({
                data: {
                  position: blankData.position,
                  passageId: passage.id,
                  correctOptionIndex: blankData.correctOptionIndex,
                  explanation: blankData.explanation,
                },
              });
            }),
          );

          return { passage, blanks };
        },
        { timeout: 60000, maxWait: 60000 },
      );

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
      console.log(
        `   Blanks: ${result.blanks.length}, Total options: ${questionData.options.length}`,
      );

      const correctAnswers = questionData.blanks
        .map(
          (blank) =>
            `{${blank.position}}: "${questionData.options[blank.correctOptionIndex]}"`,
        )
        .join(", ");
      console.log(`   Correct answers: ${correctAnswers}`);
    }

    console.log(
      "✅ All Fill in the Blanks (Drag and Drop) questions have been processed successfully!",
    );

    const totalPassages = await prisma.fillBlanksDragDropPassage.count();
    const totalBlanks = await prisma.fillBlanksDragDropBlank.count();

    console.log(`📊 Summary:`);
    console.log(`   - Total passages: ${totalPassages}`);
    console.log(`   - Total blanks: ${totalBlanks}`);
    console.log(
      `   - Average blanks per passage: ${(totalBlanks / totalPassages).toFixed(1)}`,
    );
  } catch (error) {
    console.error(
      "❌ Error creating Fill in the Blanks (Drag and Drop) questions:",
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
};

createFibDragDropQuestions();
