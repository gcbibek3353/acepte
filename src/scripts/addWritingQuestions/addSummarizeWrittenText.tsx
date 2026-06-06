import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "SWT001",
    textTitle: "Climate Change and Global Warming",
    passage:
      "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate change is a natural phenomenon, scientific evidence shows that human activities have been the main driver of climate change since the 1800s, primarily due to the burning of fossil fuels like coal, oil, and gas. These activities produce greenhouse gas emissions that act like a blanket wrapped around the Earth, trapping the sun's heat and raising temperatures. The main greenhouse gases that are causing climate change include carbon dioxide and methane. These come from using gasoline for driving a car or coal for heating a building, for example. Clearing land and cutting down forests can also release carbon dioxide. Energy, industry, transport, buildings, agriculture and land use are among the main sources of greenhouse gas emissions.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 50,
    max_word_limit: 70,
  },
  {
    questionId: "SWT002",
    textTitle: "The Benefits of Reading Books",
    passage:
      "Reading books provides numerous benefits for both mental and emotional well-being. Regular reading can improve brain connectivity, increase vocabulary and comprehension skills, and enhance analytical thinking abilities. Studies have shown that people who read regularly have better memory retention and are less likely to develop cognitive decline as they age. Reading also reduces stress levels significantly - just six minutes of reading can slow down the heart rate and ease tension in muscles. Furthermore, reading before bed can help improve sleep quality by creating a bedtime routine that signals to the brain that it's time to wind down. Fiction reading, in particular, can increase empathy by allowing readers to experience different perspectives and emotions through characters' experiences.",
    difficulty: "EASY" as const,
    min_word_limit: 40,
    max_word_limit: 60,
  },
  {
    questionId: "SWT003",
    textTitle: "Artificial Intelligence in Healthcare",
    passage:
      "Artificial Intelligence (AI) is revolutionizing healthcare by providing innovative solutions for diagnosis, treatment, and patient care. Machine learning algorithms can analyze medical images such as X-rays, MRIs, and CT scans with remarkable accuracy, often detecting diseases like cancer in their early stages when they are most treatable. AI-powered diagnostic tools can process vast amounts of medical data quickly, helping doctors make more informed decisions. Additionally, AI is being used to develop personalized treatment plans based on individual patient data, genetic information, and medical history. Robot-assisted surgeries are becoming more precise and less invasive, leading to faster recovery times and reduced complications. However, the implementation of AI in healthcare also raises concerns about data privacy, the need for human oversight, and ensuring that these technologies are accessible to all patients regardless of their socioeconomic status.",
    difficulty: "HARD" as const,
    min_word_limit: 60,
    max_word_limit: 80,
  },
  {
    questionId: "SWT004",
    textTitle: "The Impact of Social Media on Communication",
    passage:
      "Social media platforms have fundamentally changed how people communicate and interact with each other. These platforms allow instant communication across vast distances, enabling people to maintain relationships with friends and family worldwide. Social media has also democratized information sharing, allowing individuals to share news, opinions, and experiences with large audiences. However, this shift has also led to some negative consequences. Face-to-face communication skills may be declining as people become more comfortable with digital interactions. The spread of misinformation has become a significant concern, as false information can rapidly circulate through social networks. Additionally, social media can contribute to feelings of isolation and depression, particularly among young people who may compare themselves to others' curated online personas.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 50,
    max_word_limit: 70,
  },
  {
    questionId: "SWT005",
    textTitle: "Renewable Energy Sources",
    passage:
      "Renewable energy sources are becoming increasingly important as the world seeks to reduce its dependence on fossil fuels and combat climate change. Solar power harnesses energy from the sun using photovoltaic cells, while wind power uses turbines to convert wind movement into electricity. Hydroelectric power generates electricity from flowing water, and geothermal energy utilizes heat from the Earth's core. These renewable sources offer several advantages: they produce little to no greenhouse gas emissions during operation, they are virtually inexhaustible, and they can provide energy independence for countries. However, renewable energy also faces challenges including initial high installation costs, weather dependency for solar and wind power, and the need for advanced storage technologies to ensure consistent power supply when natural conditions are not optimal.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 50,
    max_word_limit: 70,
  },
  {
    questionId: "SWT006",
    textTitle: "The Importance of Biodiversity",
    passage:
      "Biodiversity refers to the variety of life on Earth, including the diversity of species, ecosystems, and genetic variation within species. This biological diversity is crucial for maintaining healthy ecosystems that provide essential services such as clean air and water, food production, and climate regulation. Each species plays a unique role in its ecosystem, and the loss of even one species can have cascading effects on the entire system. Unfortunately, human activities such as deforestation, pollution, and urbanization are causing species to become extinct at an alarming rate. Scientists estimate that the current rate of extinction is 100 to 1,000 times higher than the natural background rate. Protecting biodiversity requires conservation efforts including establishing protected areas, sustainable resource management, and international cooperation to address global environmental challenges.",
    difficulty: "HARD" as const,
    min_word_limit: 60,
    max_word_limit: 80,
  },
  {
    questionId: "SWT007",
    textTitle: "Online Learning vs Traditional Education",
    passage:
      "The rise of online learning has created new opportunities and challenges in education. Online courses offer flexibility, allowing students to learn at their own pace and from any location with internet access. This accessibility has made education available to people who might not otherwise have the opportunity to attend traditional schools due to geographical, financial, or time constraints. Online learning also allows for personalized learning experiences through adaptive technologies. However, traditional classroom education provides benefits that online learning struggles to replicate, such as face-to-face interaction with teachers and peers, hands-on laboratory experiences, and the social aspects of campus life. Many educators believe that a hybrid approach, combining online and in-person elements, may offer the best of both worlds.",
    difficulty: "EASY" as const,
    min_word_limit: 40,
    max_word_limit: 60,
  },
  {
    questionId: "SWT008",
    textTitle: "Urban Agriculture and Food Security",
    passage:
      "Urban agriculture is emerging as a viable solution to address food security challenges in growing cities worldwide. As urban populations continue to expand, traditional rural farming may not be sufficient to meet the increasing demand for fresh produce. Urban farming techniques include rooftop gardens, vertical farming systems, and community gardens that can be established in unused urban spaces. These methods can reduce the carbon footprint associated with transporting food from rural areas to cities, provide fresh produce in food deserts, and create local employment opportunities. Additionally, urban agriculture can help cities become more resilient to climate change and supply chain disruptions. However, urban farming faces obstacles such as limited space, soil contamination concerns, higher initial costs, and the need for specialized knowledge and technology to optimize yields in urban environments.",
    difficulty: "HARD" as const,
    min_word_limit: 60,
    max_word_limit: 80,
  },
  {
    questionId: "SWT009",
    textTitle: "Origin of Species",
    passage:
      "In 1837, Darwin recorded his earliest evolutionary ideas in a notebook titled 'Species Change' after observing evidence during his five-year voyage on the HMS Beagle. Recognizing the controversial nature of his theory, he delayed publication and spent two decades collecting supporting evidence. In 1859, he published 'On the Origin of Species', which quickly attracted widespread attention and debate. The book remains one of the most influential scientific works ever written and continues to hold value today. Darwin himself believed his research was only the beginning of future scientific discoveries.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT010",
    textTitle: "Vehicles in China",
    passage:
      "Despite the rapid growth of new energy vehicle sales, gasoline-powered vehicles remain more popular in China. According to an automotive report, most consumers continue to search for information about conventional vehicles. Although electric vehicle sales are increasing, they still represent a small proportion of the total vehicles on the road. Traditional brands such as Volkswagen, Honda, and Toyota attract the most consumer interest, while newer electric vehicle startups receive comparatively less attention despite their strong market valuations.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT011",
    textTitle: "United Nations Volunteers",
    passage:
      "The United Nations Volunteers program enables qualified individuals from around the world to contribute to peace and sustainable development. Thousands of volunteers work in numerous countries supporting communities, responding to disasters, and promoting social progress. Volunteers come from diverse professional backgrounds and collaborate with governments, United Nations agencies, and civil society organizations. Although volunteering is not considered a long-term career, participants receive financial support, insurance coverage, travel benefits, and valuable personal and professional experiences.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT012",
    textTitle: "Biomimicry",
    passage:
      "Biomimicry is a scientific approach that studies nature's designs and processes to solve human challenges. By observing how plants, animals, and microorganisms function, researchers develop innovative technologies and sustainable solutions. Examples include designing solar cells inspired by leaves and learning efficient systems from natural ecosystems. Since nature has undergone billions of years of development, biomimicry offers valuable lessons for long-term survival and sustainability. This approach encourages humans to imitate successful natural strategies to create a more resilient future.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT013",
    textTitle: "Deflationary Spiral",
    passage:
      "A deflationary spiral occurs when declining demand causes prices to fall, encouraging consumers to delay purchases in anticipation of even lower prices. As sales decrease, inventories accumulate and manufacturers reduce production. This often leads to job losses, reducing household income and further weakening consumer spending. The cycle can continue throughout the economy, creating prolonged economic stagnation. If left unchecked, a deflationary spiral may contribute to a recession or even a severe economic depression.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT014",
    textTitle: "Sea Creatures and Noise Pollution",
    passage:
      "Marine animals rely heavily on sound for communication, navigation, hunting, and survival. However, increasing noise from commercial shipping and other human activities has significantly raised background sound levels in the oceans. Scientists believe this noise can interfere with the natural behaviors of whales, dolphins, fish, and other marine species. Excessive underwater noise may disrupt breeding, migration, and feeding patterns, creating widespread ecological consequences and threatening the health of marine ecosystems around the world.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT015",
    textTitle: "Life Expectancies",
    passage:
      "Human life expectancy has increased steadily for more than a century, and many people born in developed countries may live close to or beyond one hundred years. This trend creates challenges for retirement planning, as individuals may need financial resources for several decades after leaving the workforce. Researchers suggest adopting a multistage life that includes continuous learning, career changes, and personal development. Maintaining skills, relationships, and adaptability will become increasingly important in societies with longer lifespans.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT016",
    textTitle: "Standards of Living",
    passage:
      "A country's standard of living is often associated with its national income and the availability of consumer goods such as cars, computers, and household appliances. Because there is no universal international index, national income figures are commonly used for comparisons. However, such comparisons can be misleading because exchange rates may not accurately reflect actual purchasing power. As a result, converting incomes into a common currency may produce distorted conclusions about the true living standards of different populations.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT017",
    textTitle: "Development of the Police Force",
    passage:
      "Modern policing in Britain developed gradually during the nineteenth century. Earlier systems relied on local nobles, unpaid constables, and individuals known as thief-takers who recovered stolen property for rewards. As urban populations expanded and crime increased, paid night-watchmen were introduced. Public resistance initially delayed the establishment of a formal police force because it was viewed as a foreign and oppressive concept. In 1829, Robert Peel created a professional police organization whose officers became known as 'Bobbies' or 'Peelers'.",
    difficulty: "EASY" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT018",
    textTitle: "Triangulation",
    passage:
      "Triangulation is a research approach that examines the same question using multiple methods to determine whether they produce consistent conclusions. The concept is borrowed from geometry, where distance is estimated from different observation points. While triangulation is popular in social science research, it faces significant challenges. One major difficulty arises when different methods generate conflicting findings, making it unclear how researchers should interpret the results. Consequently, triangulation does not always guarantee stronger or more reliable conclusions.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT019",
    textTitle: "Voting in the UK",
    passage:
      "Voting allows citizens to influence decisions that affect local communities, national policies, and global issues. Although many people fought to secure voting rights, participation in elections has declined in some countries. In the United Kingdom, voter turnout dropped significantly in one general election, prompting concerns about democratic engagement. Researchers suggest that low participation results from multiple factors, including lack of information, distrust of politicians, and inconvenience. Encouraging active participation remains essential for maintaining a healthy and accountable democracy.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT020",
    textTitle: "Beauty Contests",
    passage:
      "Critics argue that beauty contests place excessive emphasis on physical appearance and send harmful messages about self-worth. They believe such competitions reinforce unrealistic beauty standards, particularly regarding body size and weight. While supporters may view these events as harmless entertainment, opponents contend that they undermine efforts to promote equality and dignity for women. In societies where many young people struggle with body image concerns, beauty contests may contribute to unhealthy perceptions about attractiveness and personal value.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT021",
    textTitle: "Compulsory Voting in Australia",
    passage:
      "Some critics argue that compulsory voting forces citizens to participate in elections without ensuring they are well informed. They believe that people who lack interest in politics may cast random votes or simply attend polling stations to avoid penalties. Supporters of voluntary voting contend that election outcomes should reflect the decisions of engaged and informed citizens. The debate highlights concerns about voter knowledge, democratic participation, and the effectiveness of compulsory electoral systems.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT022",
    textTitle: "Energy Demand",
    passage:
      "Growing populations and rising consumption are increasing global demand for energy and other natural resources. Expanding use of vehicles, electronics, construction materials, and consumer goods requires large quantities of non-renewable resources and generates significant environmental impacts. Forests continue to face pressure from timber and paper production, while fossil fuels remain essential for transportation and manufacturing. Protecting ecosystems and using resources sustainably are crucial for ensuring future human welfare and environmental stability.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT023",
    textTitle: "Pre-service Teachers",
    passage:
      "Teacher education programs increasingly integrate technology with subject-specific teaching methods. Research has shown that many pre-service teachers know how to operate technology but struggle to apply it effectively in classroom instruction. To address this challenge, instructors develop practical examples and collaborative projects that demonstrate successful technology integration. Providing continuous access to these models helps future teachers design meaningful learning experiences and incorporate technology confidently into their professional practice.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT024",
    textTitle: "Electric Cars",
    passage:
      "Electric vehicles offer advantages such as quiet operation and reduced local pollution, but they face challenges including limited driving range, long charging times, and high battery costs. Although concerns about climate change have renewed interest in electric transportation, many consumers still expect convenience and flexibility. Hybrid vehicles have emerged as a promising compromise by combining the environmental benefits of electric power with the practicality and range associated with conventional fuel-powered vehicles.",
    difficulty: "MEDIUM" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT025",
    textTitle: "Psychology",
    passage:
      "Psychology is the scientific study of mind and behavior and has evolved significantly over the past century. Early psychological thought was influenced by philosophy, but researchers later developed distinct scientific approaches. Structuralism focused on analyzing mental processes into basic components, while functionalism emphasized understanding the purpose of behavior and mental activity. These competing perspectives contributed to the development of modern psychology and its diverse areas of research and application.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT026",
    textTitle: "Pink and Brown Noise",
    passage:
      "Different types of background noise can help people sleep by masking sudden changes in sound that might otherwise disturb rest. White noise contains a broad range of frequencies, while pink noise emphasizes lower and mid-range sounds. Brown noise focuses even more heavily on deep frequencies and minimizes higher tones. Many people find these sounds relaxing because they resemble natural phenomena such as rainfall, ocean waves, rivers, or distant thunder.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT027",
    textTitle: "The Larynx",
    passage:
      "The larynx is an important organ located in the neck that contains the vocal cords responsible for speech and sound production. These flexible muscles vibrate as air passes through them, allowing people to create a wide variety of sounds. Inflammation of the larynx can cause laryngitis and affect the voice. Interestingly, whispering often occurs without vocal cord vibration, demonstrating the versatility of human speech mechanisms.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT028",
    textTitle: "Buffets",
    passage:
      "Buffets are popular among restaurant owners because they reduce labor costs and increase operational efficiency. Customers serve themselves, allowing businesses to employ fewer waitstaff and kitchen workers. Food is prepared in large batches rather than cooked individually to order, making production more predictable and economical. As restaurant profit margins became increasingly competitive, buffet services emerged as an effective strategy for balancing costs, risks, and customer demand.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT029",
    textTitle: "Astronaut Requirements",
    passage:
      "Becoming an astronaut requires extensive education, professional experience, and exceptional physical fitness. Candidates must possess advanced qualifications in science, technology, engineering, or mathematics and demonstrate strong leadership, communication, and teamwork abilities. In addition to academic and professional achievements, applicants must pass rigorous medical examinations and meet specific physical standards. These demanding requirements ensure astronauts can safely perform complex tasks and withstand the challenges of space travel.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT030",
    textTitle: "Manatees",
    passage:
      "Manatees are large aquatic herbivores that spend much of their time feeding on underwater vegetation. Although generally solitary, they occasionally gather in groups during certain seasons or life stages. Female manatees reproduce slowly, giving birth to a single calf after a lengthy gestation period and caring for it for up to two years. Their low reproductive rate makes population growth relatively slow and increases the importance of conservation efforts.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT031",
    textTitle: "Audiovisuals' Impact",
    passage:
      "Films and other audiovisual media have influenced societies politically, socially, and culturally throughout history. They can entertain audiences while also educating, inspiring, and shaping public opinion. Advances in technology and affordable translation services allow filmmakers to reach global audiences more effectively than ever before. Because movies often reflect cultural values and social issues, they encourage viewers to examine beliefs, challenge assumptions, and sometimes embrace meaningful change.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
  {
    questionId: "SWT032",
    textTitle: "Muscle's Benefits",
    passage:
      "Maintaining healthy muscle mass provides numerous long-term health benefits. Muscles help regulate blood sugar levels, support healthy aging, and reduce the risk of physical limitations later in life. Greater muscle mass also increases metabolism, enabling the body to burn more calories at rest. As people age, preserving strength and muscle becomes increasingly important for maintaining independence, mobility, and overall quality of life.",
    difficulty: "HARD" as const,
    min_word_limit: 25,
    max_word_limit: 50,
  },
];

const createSummarizeWrittenTextQuestions = async () => {
  try {
    console.log(
      "Starting to add Summarize Written Text questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.summarizeWrittenTextQuestion.findUnique({
          where: { questionId: question.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${question.questionId} already exists, skipping...`,
        );
        continue;
      }

      const createdQuestion = await prisma.summarizeWrittenTextQuestion.create({
        data: question,
      });

      console.log(
        `✅ Created question: ${createdQuestion.questionId} - ${createdQuestion.textTitle}`,
      );
    }

    console.log(
      "✅ All Summarize Written Text questions have been processed successfully!",
    );

    // Display summary
    const totalQuestions = await prisma.summarizeWrittenTextQuestion.count();
    console.log(
      `📊 Total Summarize Written Text questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the function
createSummarizeWrittenTextQuestions();
