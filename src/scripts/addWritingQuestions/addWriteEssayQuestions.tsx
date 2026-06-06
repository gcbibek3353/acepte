import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "WE001",
    essayTitle: "University Class Attendance",
    essay_description:
      "Some people believe that university students should be required to attend classes. Others believe that going to classes should be optional for students. Which point of view do you agree with? Use specific reasons and examples to support your answer.",
    difficulty: "MEDIUM" as const,
    // min_word_limit: 200,
    // max_word_limit: 300
  },
  {
    questionId: "WE002",
    essayTitle: "Technology in Education",
    essay_description:
      "Do you agree or disagree with the following statement? Technology has made children less creative than they were in the past. Use specific reasons and examples to support your answer.",
    difficulty: "HARD" as const,
    // min_word_limit: 250,
    // max_word_limit: 350
  },
  {
    questionId: "WE003",
    essayTitle: "Work From Home",
    essay_description:
      "Some people prefer to work from home, while others prefer to work in an office. Which do you think is better? Use specific reasons and examples to support your opinion.",
    difficulty: "EASY" as const,
    // min_word_limit: 150,
    // max_word_limit: 250
  },
  {
    questionId: "WE004",
    essayTitle: "Social Media Impact",
    essay_description:
      "Do you agree or disagree with the following statement? Social media has had a positive impact on society. Use specific reasons and examples to support your answer.",
    difficulty: "MEDIUM" as const,
    // min_word_limit: 200,
    // max_word_limit: 300
  },
  {
    questionId: "WE005",
    essayTitle: "Environmental Protection",
    essay_description:
      "Some people think that environmental problems are too big for individuals to solve. Others believe that individuals can make a significant difference. Which view do you agree with? Use specific reasons and examples to support your answer.",
    difficulty: "HARD" as const,
    // min_word_limit: 250,
    // max_word_limit: 350
  },
  {
    questionId: "WE006",
    essayTitle: "Public Transportation",
    essay_description:
      "Do you agree or disagree with the following statement? Governments should invest more money in public transportation than in building new roads. Use specific reasons and examples to support your answer.",
    difficulty: "MEDIUM" as const,
    // min_word_limit: 200,
    // max_word_limit: 300
  },
  {
    questionId: "WE007",
    essayTitle: "Learning Foreign Languages",
    essay_description:
      "Some people believe that children should learn a foreign language from elementary school. Others think that learning a foreign language should start in high school. Which point of view do you agree with? Use specific reasons and examples to support your answer.",
    difficulty: "EASY" as const,
    // min_word_limit: 150,
    // max_word_limit: 250
  },
  {
    questionId: "WE008",
    essayTitle: "Artificial Intelligence in Jobs",
    essay_description:
      "Do you agree or disagree with the following statement? Artificial intelligence will replace most human jobs in the future. Use specific reasons and examples to support your answer.",
    difficulty: "HARD" as const,
    // min_word_limit: 250,
    // max_word_limit: 350
  },
  {
    questionId: "WE009",
    essayTitle: "Complaint",
    essay_description:
      "When people need to complain about a product or service, some prefer to complain in writing while others prefer to complain in person. Which way do you prefer and why?",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "WE010",
    essayTitle: "Going to University",
    essay_description:
      "In a perfect world, every young person should go to university. Do you agree or disagree with this statement? Give reasons to support your opinion.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "WE011",
    essayTitle: "Happiness and Success",
    essay_description:
      "Happiness affects personal economic success. Do you agree or disagree? Give reasons and examples to support your opinion.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE012",
    essayTitle: "Active Listening",
    essay_description:
      "A good listener is better than a good talker in social situations. Do you agree or disagree?",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "WE013",
    essayTitle: "Geographic Influence",
    essay_description:
      "The geography of a country has a powerful influence on the character of the people who live there. To what extent do you agree or disagree? Give reasons and examples.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE014",
    essayTitle: "Wealthy Nations",
    essay_description:
      "Wealthy nations should be required to share their wealth with poorer countries. To what extent do you agree or disagree?",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "WE015",
    essayTitle: "Age Restrictions",
    essay_description:
      "Do you think young people should be restricted from certain activities, such as driving or smoking, until they reach the age of 25? What are your views?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE016",
    essayTitle: "Advertising",
    essay_description:
      "Some people believe that advertising is harmful because it encourages people to buy things they do not need or cannot afford, while others think that advertising is beneficial because it can improve people’s lives. What is your opinion? Support your answer with examples.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "WE017",
    essayTitle: "Moral Obligation",
    essay_description:
      "Do you believe that humans have a moral obligation to combat climate change?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE018",
    essayTitle: "Declining Empathy",
    essay_description:
      "Do you agree that human empathy is declining in the digital age?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE019",
    essayTitle: "International Travel",
    essay_description:
      "International travel is cheaper and more convenient than ever. Do the advantages of this outweigh the disadvantages?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE020",
    essayTitle: "Research",
    essay_description:
      "It is no longer necessary to use animals for food, clothing or medical research. To what extent do you agree or disagree?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE021",
    essayTitle: "Global Peace",
    essay_description:
      "To what extent do you believe that cultural exchange programs can promote global peace and understanding?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE022",
    essayTitle: "Space Laws",
    essay_description:
      "How do you feel about the importance of having legal space laws and regulatory governance?",
    difficulty: "HARD" as const,
  },

  {
    questionId: "WE023",
    essayTitle: "Ocean Vs Space Exploration",
    essay_description:
      "What are your thoughts on the significance of ocean exploration relative to space exploration?",
    difficulty: "HARD" as const,
  },
];

const createQuestions = async () => {
  try {
    console.log("Starting to add questions to the database...");

    for (const question of questions) {
      const existingQuestion = await prisma.writeEssayQuestion.findUnique({
        where: { questionId: question.questionId },
      });

      if (existingQuestion) {
        console.log(
          `Question ${question.questionId} already exists, skipping...`,
        );
        continue;
      }

      const createdQuestion = await prisma.writeEssayQuestion.create({
        data: question,
      });

      console.log(
        `✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.essayTitle}`,
      );
    }

    console.log("✅ All questions have been processed successfully!");

    // Display summary
    const totalQuestions = await prisma.writeEssayQuestion.count();
    console.log(`📊 Total questions in database: ${totalQuestions}`);
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the function
createQuestions();
