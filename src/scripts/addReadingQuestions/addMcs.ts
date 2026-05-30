import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "MCS001",
    title: "The Benefits of Regular Exercise",
    difficulty: "EASY" as const,
    content: `Regular exercise is one of the most important things you can do for your health. It has both immediate and long-term health benefits. Most importantly, regular activity can improve your quality of life. A minimum of 30 minutes a day can allow you to enjoy these benefits.

Physical activity can help you control your weight by using excess calories that would otherwise be stored as fat. Most foods you eat contain calories, and everything you do uses calories, including sleeping, breathing, and digesting food. Any physical activity in addition to what you normally do will burn those extra calories.

Exercise also helps prevent heart disease and stroke by strengthening your heart muscle, lowering your blood pressure, raising your high-density lipoprotein (HDL) levels and lowering low-density lipoprotein (LDL) levels, and improving blood flow.

Regular physical activity can also help prevent type 2 diabetes and metabolic syndrome. Studies show that physically active people have a lower risk of developing type 2 diabetes than people who are not physically active.`,
    questionText:
      "According to the passage, what is the minimum daily exercise time recommended to gain health benefits?",
    options: [
      "15 minutes a day",
      "30 minutes a day",
      "45 minutes a day",
      "60 minutes a day",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS002",
    title: "The History of the Internet",
    difficulty: "MEDIUM" as const,
    content: `The Internet began in the 1960s as a project of the Advanced Research Projects Agency (ARPA), a branch of the U.S. Department of Defense. The original network, called ARPANET, was designed to allow researchers at different universities and government agencies to share computer resources and communicate with each other.

In 1971, Ray Tomlinson sent the first email message over ARPANET, choosing the @ symbol to separate the user name from the computer name. By 1973, international connections were established, linking networks in the United Kingdom and Norway.

The term "Internet" was first used in 1974, and the network continued to grow throughout the 1970s and 1980s. However, it wasn't until 1989 that Tim Berners-Lee invented the World Wide Web at CERN in Switzerland. The Web made the Internet much more user-friendly by allowing people to access information through web browsers and hyperlinks.

The first web browser, called WorldWideWeb (later renamed Nexus), was created by Berners-Lee in 1990. The Internet became available to the general public in 1991, and by 1993, there were over 500 web servers worldwide.`,
    questionText: "Who invented the World Wide Web?",
    options: [
      "Ray Tomlinson",
      "Tim Berners-Lee",
      "The U.S. Department of Defense",
      "ARPA researchers",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS003",
    title: "Climate Change and Global Warming",
    difficulty: "HARD" as const,
    content: `Climate change refers to long-term changes in temperature and weather patterns. While climate variations occur naturally, since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas.

Burning fossil fuels generates greenhouse gas emissions that act like a blanket wrapped around Earth, trapping the sun's heat and raising temperatures. The main greenhouse gases that are causing climate change include carbon dioxide and methane. These come from using gasoline for driving a car or coal for heating a building, for example. Clearing land and cutting down forests can also release carbon dioxide.

The consequences of climate change now include, among others, intense droughts, water scarcity, severe fires, rising sea levels, flooding, melting polar ice, catastrophic storms, and declining biodiversity. Climate change can affect our health, ability to grow food, housing, safety, and work. Some of us are already more vulnerable to climate impacts, such as people living in small island nations and other developing countries.

Scientists agree that limiting global warming to no more than 1.5°C would help us avoid the most catastrophic climate impacts and maintain a livable climate. Yet based on current national climate plans, global warming is projected to reach around 3°C by the end of the century.`,
    questionText:
      "According to the passage, what temperature limit do scientists believe would help avoid the most catastrophic climate impacts?",
    options: [
      "1.0°C above current levels",
      "1.5°C above pre-industrial levels",
      "2.0°C above pre-industrial levels",
      "3.0°C above current levels",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS004",
    title: "The Process of Photosynthesis",
    difficulty: "MEDIUM" as const,
    content: `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process is essential for life on Earth as it produces the oxygen that most living organisms need to survive.

The process occurs in two main stages. The first stage, called the light-dependent reactions, takes place in the chloroplasts of plant cells. During this stage, chlorophyll absorbs light energy, which is used to split water molecules. This process releases oxygen as a byproduct and produces energy-carrying molecules.

The second stage, known as the Calvin cycle or light-independent reactions, uses the energy from the first stage to convert carbon dioxide from the air into glucose, a type of sugar. This glucose serves as food for the plant and can be stored as starch for later use.

Photosynthesis is not only crucial for plants but also forms the foundation of most food chains on Earth. The oxygen produced during photosynthesis is released into the atmosphere, where it can be used by animals and other organisms for respiration.`,
    questionText:
      "Where do the light-dependent reactions of photosynthesis take place?",
    options: [
      "In the roots of plants",
      "In the chloroplasts of plant cells",
      "In the stem of plants",
      "In the atmosphere around plants",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS005",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    content: `The water cycle is the continuous movement of water on, above, and below the surface of Earth. This cycle is powered by energy from the sun and is essential for all life on our planet.

The cycle begins with evaporation, where the sun heats up water in rivers, lakes, and oceans, turning it into water vapor that rises into the atmosphere. Plants also contribute to this process through transpiration, where they release water vapor through their leaves.

As water vapor rises higher into the atmosphere, it cools down and condenses around tiny particles to form clouds. This process is called condensation. When the water droplets in clouds become too heavy, they fall back to Earth as precipitation in the form of rain, snow, sleet, or hail.

Once the water reaches the ground, it follows different paths. Some water flows over the surface as runoff into streams and rivers, eventually reaching the oceans. Other water soaks into the ground to become groundwater, which can feed into underground streams or be absorbed by plant roots. The cycle then repeats continuously.`,
    questionText: "What powers the water cycle?",
    options: [
      "Wind from the atmosphere",
      "Energy from the sun",
      "Heat from the Earth's core",
      "Gravity from the moon",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS006",
    title: "Artificial Intelligence in Modern Society",
    difficulty: "HARD" as const,
    content: `Artificial Intelligence (AI) has become increasingly prevalent in modern society, transforming various aspects of our daily lives. From virtual assistants like Siri and Alexa to recommendation algorithms on streaming platforms, AI technologies are now embedded in countless applications that we interact with regularly.

Machine learning, a subset of AI, enables systems to automatically learn and improve from experience without being explicitly programmed for every task. This capability has revolutionized fields such as healthcare, where AI can analyze medical images to detect diseases with remarkable accuracy, sometimes even surpassing human specialists.

However, the rapid advancement of AI also raises important ethical considerations. Issues such as algorithmic bias, job displacement, and privacy concerns have sparked debates among policymakers, technologists, and society at large. For instance, AI systems trained on biased data can perpetuate or even amplify existing societal inequalities.

Despite these challenges, the potential benefits of AI are substantial. In transportation, autonomous vehicles promise to reduce traffic accidents caused by human error. In climate science, AI models help predict weather patterns and analyze climate change data more effectively than ever before. The key lies in developing AI systems that are transparent, accountable, and aligned with human values.`,
    questionText:
      "According to the passage, what is one way that AI systems can perpetuate societal problems?",
    options: [
      "By replacing human workers in all industries",
      "By consuming too much electrical energy",
      "By being trained on biased data that amplifies inequalities",
      "By making decisions too quickly for humans to understand",
    ],
    correctOptionIndex: 2,
  },

  {
    questionId: "MCS007",
    title: "Glaciers",
    difficulty: "EASY" as const,
    content: `During most of their lives, surge glaciers behave like normal glaciers, traveling perhaps only a couple of inches per day. However, at intervals of 10 to 100 years, these glaciers move forward up to 100 times faster than usual. The surge often progresses along a glacier like a great wave, proceeding from one section to another. Subglacial streams of meltwater pressure under the glacier might lift it off its bed, overcoming the friction between ice and rock, thus freeing the glacier, which rapidly slides downhill. Surging glaciers also might be influenced by the climate, volcanic heat, or earthquakes. However, many of these glaciers exist in the same area as normal glaciers, often almost side by side.`,
    questionText:
      "The word 'intervals' in the passage is closest in meaning to:",
    options: ["periods", "records", "speeds", "distances"],
    correctOptionIndex: 0,
  },
  {
    questionId: "MCS008",
    title: "Fish",
    difficulty: "EASY" as const,
    content: `There were three big fish living in a beautiful lake by the city. They were very close friends. All three of them were very different from one another. The first fish believed in fate. He thought things could not be changed and what has to happen will happen, no matter what. The second fish was intelligent and believed he could solve any problem with his intelligence. The third fish was wise and thought carefully before acting.

One day, while they were happily swimming, the wise fish overheard fishermen planning to return the next day to catch the fish in the lake. Alarmed, he informed his friends and suggested leaving through a canal leading to another lake. The intelligent fish decided to stay, believing he could manage the situation. The fish who believed in fate also stayed, convinced that destiny would determine the outcome.

The wise fish chose not to take any chances and left through the canal. When the fishermen returned, they caught many fish, including the two friends. The intelligent fish pretended to be dead and escaped when the fishermen threw him back into the water. The fish who believed in fate, however, was caught and killed.`,
    questionText: "Why did the wise fish leave the lake?",
    options: [
      "He had a fight with his friends.",
      "He overheard the fishermen talking about catching them.",
      "He was tired of living in the lake.",
      "He was asked to leave by the head fish.",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS009",
    title: "Internet Scams",
    difficulty: "EASY" as const,
    content: `Internet scams have existed almost as long as the Internet itself, yet many people still fall victim to them. According to a report from the FBI's Internet Crime Complaint Center, consumers were victims of nearly 290,000 online frauds in 2012, losing more than $525 million. This represented an increase of 8 percent compared to the previous year.

The highest number of complaints came from California. The most common Internet crime involved scammers pretending to be car dealers and advertising vehicles they did not actually own. Victims paid for the cars online without seeing them first and never received the vehicles. The second most common scam involved fraudulent emails claiming to be from FBI Director Robert Mueller, promising large sums of money if recipients paid fees for paperwork.

The report advises people to be cautious, especially because government agencies do not send unsolicited emails requesting payments.`,
    questionText:
      "What was the most common type of internet fraud in 2012 and where was it most commonly reported?",
    options: [
      "A scam impersonating the FBI director in Florida.",
      "A scam impersonating the FBI director in California.",
      "Selling fictitious cars online in Florida.",
      "Selling fictitious cars online in California.",
    ],
    correctOptionIndex: 3,
  },
  {
    questionId: "MCS010",
    title: "Less Water",
    difficulty: "EASY" as const,
    content: `A study conducted by researchers at the University of California, Davis found that grape growers in coastal California can reduce irrigation during drought periods without affecting crop quality or yields. The researchers examined crop evapotranspiration, which measures the amount of water lost from the vineyard system to the atmosphere.

The experiment tested irrigation levels that replaced 25%, 50%, and 100% of the water lost through evapotranspiration. Results showed that vineyards could maintain grape flavor, color, sugar content, and yield while using only half the normal amount of irrigation water.`,
    questionText:
      "According to the research, how much irrigation water is most beneficial for maintaining grape flavor and yield?",
    options: ["30%", "50%", "100%", "25%"],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS011",
    title: "Hegra",
    difficulty: "EASY" as const,
    content: `They rise from the desert sands as monumental rock formations shaped over thousands of years by wind and time. Human hands have also contributed to this remarkable landscape by carving more than 110 rock tombs into the massive red stones. Many tombs feature ornate decorations, including symbolic steps leading to heaven, decorative cornices, and figures believed to represent Medusa to discourage tomb robbers.

The striking contrast between the red rocks and the blue desert sky creates a breathtaking scene. This is Hegra, the site of an ancient city built by the Nabataeans in Saudi Arabia. Visitors are often amazed by the beauty and historical significance of this extraordinary destination.`,
    questionText: "Where is this passage most likely to appear?",
    options: ["A textbook", "A travel book", "An encyclopedia", "A dictionary"],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS012",
    title: "Be Healthy",
    difficulty: "EASY" as const,
    content: `Many people believe that staying healthy requires strict diets and countless hours at the gym. However, maintaining good health can be much simpler. By making small improvements to daily habits, supporting both the body and mind, and setting realistic goals, individuals can move toward a healthier and happier lifestyle.

Healthy choices related to eating, sleeping, relaxation, and physical activity can gradually become habits. Over time, these positive changes contribute significantly to overall well-being and quality of life.`,
    questionText: "The main purpose of the author is to:",
    options: [
      "argue how easy it is to live a different lifestyle",
      "show the disadvantages of changing lifestyles",
      "encourage people to live a healthy lifestyle",
      "demonstrate how difficult it is to be healthy",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS013",
    title: "Washing Hands",
    difficulty: "EASY" as const,
    content: `Washing hands is one of the most effective ways to stay healthy and prevent the spread of respiratory and diarrheal diseases. Germs can spread when people touch their eyes, nose, or mouth with unwashed hands, or when they prepare food without proper hygiene.

Germs can also spread after coughing, sneezing, or blowing one's nose and then touching other people or shared objects. Washing hands with soap and water is the best method for removing germs in most situations. When soap and water are unavailable, an alcohol-based hand sanitizer containing at least 60% alcohol can be used.`,
    questionText: "The author considers handwashing important because:",
    options: [
      "it helps avert infectious diseases",
      "people do not prefer to shake hands with others",
      "there is a shortage of necessities",
      "it boosts the sales of alcohol-based hand sanitizers",
    ],
    correctOptionIndex: 0,
  },
  {
    questionId: "MCS014",
    title: "Mars Global Surveyor",
    difficulty: "EASY" as const,
    content: `Mars Global Surveyor was one of NASA's robotic spacecraft designed to search for evidence that Mars once contained water. For nearly a decade, it captured detailed images of the planet. Unfortunately, the spacecraft stopped functioning after developing a motor problem.

After a brief signal indicated it had entered emergency standby mode, communication was lost. NASA engineers worked to re-establish contact and planned to use another spacecraft to photograph the Surveyor and determine its orientation relative to the Sun and Earth. Despite the challenges, scientists remained hopeful that the mission could be recovered.`,
    questionText: "What was the main task of Mars Global Surveyor?",
    options: [
      "to take pictures of the red planet",
      "to work out the problems of its motor",
      "to find out if there was water on Mars",
      "to find the causes of the failure in the device",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS015",
    title: "Potatoes",
    difficulty: "EASY" as const,
    content: `Potatoes originally grew wild in Peru, South America. From there, they spread to other parts of the Americas and later to Europe. Historians debate whether Sir Francis Drake or Sir Walter Raleigh deserves credit for introducing potatoes to England in the late sixteenth century.

Initially, potatoes were grown only in the gardens of wealthy people and considered a luxury food. Over time, however, they became a staple food throughout Europe and America. In Ireland, potatoes once provided nearly eighty percent of the population's food supply.`,
    questionText: "What is the writer's conclusion about potatoes?",
    options: [
      "Potatoes are the primary source of food in many parts of the world.",
      "The potato is a root vegetable native to Ireland.",
      "Most families can't afford to buy potatoes.",
      "People who increased their consumption of potatoes gained more weight over time.",
    ],
    correctOptionIndex: 0,
  },
  {
    questionId: "MCS016",
    title: "Physical Exercises",
    difficulty: "EASY" as const,
    content: `Physical exercise is essential for maintaining good health. People who perform physical labor often get enough exercise through their daily work, but individuals with sedentary lifestyles may need additional activity.

Although gyms can help improve strength and fitness, strenuous exercise should not be undertaken without proper guidance, especially by those with health concerns. Walking is considered one of the best forms of exercise because it can be enjoyed by people of varying fitness levels and allows them to spend time outdoors.

The author recommends regular walking, fresh air, and moderation. Excessive exercise may harm the heart, and vigorous exercise after middle age should only be performed under the supervision of a physician.`,
    questionText: "What is the writer's conclusion about exercise?",
    options: [
      "Regular walking is only helpful if you are physically weak.",
      "Exercising at home is much better than exercising outdoors.",
      "Vigorous exercise may be performed safely after midlife with the guidance of a doctor.",
      "People with desk-bound jobs get sufficient physical exercise.",
    ],
    correctOptionIndex: 2,
  },

  {
    questionId: "MCS017",
    title: "Sports Readiness",
    difficulty: "MEDIUM" as const,
    content: `Children of all ages need physical activity. For many children, participating in organized sports such as soccer, basketball, or tennis lessons is an enjoyable way to stay active and healthy. However, to gain the greatest benefit from a sport, children need to possess certain basic skills, and some of these skills develop only as they grow older.

If children are introduced to a sport before they have reached the appropriate age or skill level, they may become frustrated. This frustration can reduce their confidence and discourage them from participating altogether. Therefore, understanding a child's readiness for a sport is important for creating a positive and rewarding experience.`,
    questionText: "Which question does the passage answer?",
    options: [
      "Is the child interested in playing sports at all?",
      "Is the child at the right age or skill level for the sport?",
      "Does the child prefer team sports or private lessons?",
      "Does the child find the sport fun or too difficult?",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS018",
    title: "Knowledge",
    difficulty: "MEDIUM" as const,
    content: `Knowledge rarely exists in isolation. New ideas are often built upon the work, observations, and arguments of previous thinkers, researchers, and writers. In academic writing, these earlier works are referred to as sources.

Sources do not create a scholar's argument; rather, they provide the information, evidence, and perspectives that help shape and support it. Scholars may interpret information from sources, agree or disagree with their ideas, develop them further, or analyze language and concepts presented in them. In this way, sources serve as foundations that inspire and strengthen original arguments.`,
    questionText: "What advice does the author give regarding sources?",
    options: [
      "Scholars should be careful to select reliable sources.",
      "Scholars should use a wide variety of sources.",
      "Sources should determine a scholarly argument.",
      "Sources should serve as inspiration to scholars.",
    ],
    correctOptionIndex: 3,
  },
  {
    questionId: "MCS019",
    title: "Persistence",
    difficulty: "MEDIUM" as const,
    content: `Researchers have found that encouraging persistence in babies and providing stimulating learning experiences can improve cognitive development. Mothers who teach simple tasks and motivate their children to continue trying when challenges arise appear to support stronger intellectual growth.

In one study, researchers observed 65 low-income mothers living in urban areas and their infants. The mothers taught their six-month-old babies simple activities such as pulling a toy car with a string, turning pages in a book, and transferring a block from one hand to another. When the children reached fourteen months of age, researchers evaluated their persistence, memory, language, and problem-solving abilities.

The findings suggested that early teaching not only encourages persistence but also contributes directly to improved cognitive development.`,
    questionText: "What kind of mothers did the study investigate?",
    options: [
      "Mothers from a wide range of backgrounds.",
      "Mothers from rural areas.",
      "Poorer mothers living in a city.",
      "Mothers from wealthy families.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS020",
    title: "Human Development Index",
    difficulty: "MEDIUM" as const,
    content: `Determining the quality of life in a country is a complex task because many factors contribute to people's well-being. Economists often use per capita gross domestic product (GDP) as a measure of living standards, but GDP focuses mainly on economic output and wealth.

To provide a more comprehensive assessment, the United Nations developed the Human Development Index (HDI). This index evaluates countries using several categories, including health and longevity, education and knowledge, and purchasing power. By considering multiple dimensions of human well-being, the HDI offers a broader understanding of living conditions around the world.

The contrast between countries such as Niger and Norway demonstrates how factors beyond income alone can significantly affect quality of life.`,
    questionText:
      "Why is the UN Human Development Index considered a less crude indicator of quality of life than per capita GDP?",
    options: [
      "It's more official because it's determined by an international organization.",
      "Health is more important than purchasing power.",
      "It includes more than just economic factors, including health and education.",
      "It more accurately depicts the situation in countries like Niger and Norway.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS021",
    title: "Gliese 581",
    difficulty: "MEDIUM" as const,
    content: `Astronomers have discovered hundreds of exoplanets, which are planets located outside our solar system. Some of these worlds possess Earth-like characteristics and may exist in a habitable zone, where temperatures could allow liquid water to exist on the surface.

In 2007, Swiss scientists discovered Gliese 581, an exoplanet estimated to be about 50 percent larger than Earth. It is located approximately 20.5 light-years away and orbits a red dwarf star. The discovery was made using the HARPS spectroscopic instrument connected to a telescope at the European Southern Observatory in Chile.

Because Gliese 581 lies outside our solar system and may occupy a suitable position around its star, it became one of the earliest Earth-like exoplanets to attract scientific attention.`,
    questionText: "What information is not true about Gliese 581?",
    options: [
      "It is half the size larger than Earth.",
      "It is probably in a habitable zone.",
      "It has its own sun.",
      "It is in our solar system.",
    ],
    correctOptionIndex: 3,
  },
  {
    questionId: "MCS022",
    title: "Khmer Empire",
    difficulty: "MEDIUM" as const,
    content: `The ancient city of Angkor, located in present-day Cambodia, served as the center of the Khmer Empire from the ninth to the fifteenth century. The civilization built an impressive system of reservoirs and canals that collected water from annual flooding of the Mekong River.

This water management system supplied irrigation to rice fields throughout the year. Farmers relied heavily on a stable water supply because rice was their essential crop and primary food source. Without reliable irrigation, agricultural production would have declined significantly.

Many researchers believe that problems with water availability may have contributed to the eventual decline of the Khmer Empire.`,
    questionText:
      "According to the passage, which statement is accurate about the inhabitants of the Khmer Empire?",
    options: [
      "They built reservoirs and canals mainly to flood the area.",
      "They lost their food source because of excessive rainfall and flooding.",
      "They depended upon rice as their essential source of food.",
      "They supplemented their diets with meat patties and fish from the lake.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS023",
    title: "Supplements",
    difficulty: "MEDIUM" as const,
    content: `Millions of people use dietary supplements believing they improve health. However, research by Consumer Reports raised concerns about the safety of certain vitamins, probiotics, and weight-loss products.

One major criticism is that supplements are not regulated as strictly as prescription medicines. As a result, consumers may not fully understand the ingredients they contain or how those ingredients affect the body. Researchers warned that some supplements have been linked to serious health issues, including liver damage, kidney failure, heart problems, and even deaths associated with particular ingredients.

Experts advise people to consult healthcare professionals before using supplements and to treat them with the same caution as medications.`,
    questionText:
      "What is NOT a criticism leveled at dietary supplements in the article?",
    options: [
      "They can cause damage to one's organs.",
      "They boost one's health in the dark.",
      "Ingredients in some supplements may have led to deaths.",
      "Consumers are often unaware of their ingredients.",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS024",
    title: "Birth Rates",
    difficulty: "MEDIUM" as const,
    content: `China's rapid economic growth has been partly supported by a large working-age population and relatively fewer dependents. Family planning policies introduced to limit population growth helped create this demographic advantage.

However, these same policies have also contributed to declining birth rates. As the population ages, there may be fewer working-age adults available to support growing numbers of elderly citizens. Researchers predict that the ratio of older people to working-age individuals will increase dramatically in the coming decades.

This demographic shift may create significant economic and social challenges as the burden of supporting an aging population falls on a smaller workforce.`,
    questionText: "What is the main point of the article?",
    options: [
      "Chinese couples need to have more female babies.",
      "Chinese family planning policies have been a complete success.",
      "In the future, low birth rates in China may mean too few working-age people to support the elderly.",
      "All countries in the world face exactly the same birth-rate problems as China.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS025",
    title: "Social Networks",
    difficulty: "MEDIUM" as const,
    content: `Social networks have a significant influence on people's lives. Research suggests that friends and family can affect behaviors, emotions, health outcomes, and even life expectancy. Positive interactions with friends may trigger the release of endorphins, which contribute to overall well-being.

In traditional societies, most social connections were based on family relationships. In modern post-industrial societies, however, people often live among strangers and develop friendships outside their family circles. As a result, social networks generally consist of both relatives and friends.

Unlike family relationships, friendships often require regular attention and interaction to remain strong, making them more vulnerable to weakening over time.`,
    questionText:
      "According to the passage, why are friendship networks more fragile?",
    options: [
      "They trigger the release of endorphins.",
      "They are more likely to help us when needed.",
      "They tend to fall apart if they are not maintained regularly.",
      "We live among strangers.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS026",
    title: "Entrepreneurs",
    difficulty: "MEDIUM" as const,
    content: `Entrepreneurs are often celebrated for creating new businesses and driving innovation. However, some economists argue that entrepreneurship is not always beneficial. William Baumol proposed that the overall number of entrepreneurs in an economy may remain relatively constant, while the outcomes they produce depend on the incentives available to them.

According to this view, economic systems shape whether entrepreneurial efforts are productive or unproductive. Incentives influence how entrepreneurs apply their creativity, resources, and energy. Therefore, the structure of rewards within a society can have a major impact on the kinds of ventures that emerge.`,
    questionText: "The term 'incentivized' most nearly means:",
    options: ["celebrated", "motivated", "controlled", "punishment"],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS027",
    title: "Piaget's Theory",
    difficulty: "HARD" as const,
    content: `Swiss psychologist Jean Piaget made a lasting contribution to the study of cognitive development in children. Beginning in the 1920s and continuing until his death in 1980, Piaget observed how children of similar ages often made the same reasoning errors when completing tests and solving problems.

By analyzing these recurring patterns, he proposed that children progress through a series of developmental stages. According to his theory, cognitive abilities evolve gradually, moving from simple forms of thinking in infancy to increasingly abstract reasoning in adulthood. Although later researchers suggested that development may be more flexible and influenced by environmental factors, Piaget's work provided a foundational framework for understanding how children learn and think.

His observations and research formed the basis of his influential theory of cognitive development, which remains important in psychology and education today.`,
    questionText: "Why does the author discuss Piaget's studies of children?",
    options: [
      "To compare his theories with those of modern therapists.",
      "To highlight flaws in his research methods.",
      "To explain how he developed his theories.",
      "To show how Piaget's theories are applied today.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS028",
    title: "Philip Yea",
    difficulty: "HARD" as const,
    content: `Philip Yea, head of one of Europe's largest private-equity firms, does not fit the stereotypical image often associated with leaders in his industry. Private equity is frequently portrayed as a world dominated by ruthless financiers focused solely on profit and acquisitions. However, Yea is described as approachable, engaging, and personable.

The article notes that private-equity firms often purchase companies entirely, using financial leverage and strategic investments to improve performance. While critics and supporters disagree about the effects of these acquisitions, Yea himself appears far removed from the cold and calculating image often attributed to the industry.

His personality and leadership style challenge common assumptions about the people who succeed in private equity.`,
    questionText:
      "What does the phrase 'lock, stock and barrel' most nearly mean in the passage?",
    options: [
      "Of different types",
      "Successfully",
      "Completely",
      "In the retail sector",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS029",
    title: "Multinational Companies",
    difficulty: "HARD" as const,
    content: `Living and working in a foreign country can be challenging, even for experienced professionals. While practical concerns such as relocation and education are often addressed by multinational companies, cultural differences can be much harder to navigate.

Cross-cultural expert Chris Crosby argues that employees must learn to recognize both obvious and subtle cultural differences. While people can usually adapt to visible differences such as food or clothing, implicit differences in communication styles, business practices, and expectations are often more difficult to understand. He emphasizes the importance of understanding one's own culture before attempting to adapt to another.

According to Crosby, successful international work depends on building strong relationships, adapting personal communication styles, and maintaining clear ethical and professional standards.`,
    questionText: "Which statement would Mr. Crosby most likely agree with?",
    options: [
      "Global relocation specialists play the most important role in multinational companies.",
      "Experienced international businesspeople naturally understand all cultural differences.",
      "Most people can easily identify both explicit and implicit cultural differences.",
      "Global relocation specialists should be responsible for cultural adaptation.",
      "Employees should focus on building relationships and following ethical business practices.",
    ],
    correctOptionIndex: 4,
  },
  {
    questionId: "MCS030",
    title: "Global Warming",
    difficulty: "HARD" as const,
    content: `Human activities have significantly increased the concentration of carbon dioxide and other greenhouse gases in the atmosphere, contributing to global warming. Evidence of this warming trend can be observed across the planet, including shrinking Arctic sea ice, rising sea levels, more intense wildfires, and changes in animal migration patterns.

Scientists stress the importance of understanding the speed and extent of these environmental changes so that societies can prepare for and adapt to future challenges. The passage highlights climate change as one of the most serious threats facing humanity and emphasizes the urgency of addressing the issue.`,
    questionText:
      "What is the author's primary purpose in writing this passage?",
    options: [
      "To call for action to combat global warming.",
      "To provide solutions for climate change.",
      "To describe facts about climate change.",
      "To describe facts about global warming.",
    ],
    correctOptionIndex: 0,
  },
  {
    questionId: "MCS031",
    title: "Fermentation",
    difficulty: "HARD" as const,
    content: `The term 'ferment' originates from a Latin word meaning 'to boil' or 'to rise,' reflecting the bubbling activity often observed during fermentation. In biological terms, fermentation refers to the process by which microorganisms convert nutrients into energy.

Some fermented products, such as sauerkraut and alcoholic beverages, are produced by anaerobic microorganisms that function without oxygen. Other fermented foods and drinks, including kombucha, vinegar, and miso, rely on aerobic microorganisms that require oxygen to carry out their metabolic processes.

The passage explains that fermentation can involve different types of microorganisms depending on the product being created.`,
    questionText: "What is the primary purpose of the passage?",
    options: [
      "To introduce two kinds of microorganisms responsible for fermentation.",
      "To encourage people to protect microorganisms.",
      "To explain the origins and meanings of the word 'ferment'.",
      "To demonstrate two different types of fermentation.",
    ],
    correctOptionIndex: 0,
  },
  {
    questionId: "MCS032",
    title: "Lost Antiquities",
    difficulty: "HARD" as const,
    content: `Over five years, internet pioneer James H. Clark spent approximately $35 million acquiring dozens of Cambodian and Southeast Asian antiquities. Investigators later informed him that the artifacts had been stolen and that he had unknowingly purchased illegally obtained items from a dishonest dealer.

After learning the truth, Clark expressed little interest in retaining ownership of the artifacts, questioning why anyone would want to possess stolen property. His comments suggest a willingness to cooperate with authorities and rectify the situation despite the significant financial investment he had made.`,
    questionText: "What can be inferred from the passage?",
    options: [
      "Mr. Clark personally stole the antiquities.",
      "Mr. Clark will never collect antiquities again.",
      "Mr. Clark will surrender the antiquities to authorities.",
      "Mr. Clark will donate the collections to charity.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS033",
    title: "Statue of Liberty",
    difficulty: "HARD" as const,
    content: `The idea for the Statue of Liberty is widely attributed to Edouard de Laboulaye, president of the French Anti-Slavery Society. An advocate for democracy and abolition, Laboulaye believed that a monument celebrating American independence could symbolize shared values between France and the United States.

He reportedly suggested that the project should be undertaken through cooperation between both nations. Some historians also believe that he hoped the monument would inspire democratic reforms in France. Sculptor Frederic Bartholdi later developed the design and continued refining it after returning to France.

The passage focuses on Laboulaye's intentions and the collaborative spirit behind the original proposal.`,
    questionText:
      "Which statement best summarizes the author's view presented in the passage?",
    options: [
      "The Statue of Liberty was not built through cooperation and was solely a French gift.",
      "Laboulaye did not originally intend the monument to be funded only by France.",
      "The Statue of Liberty was fully completed in 1870 by Bartholdi.",
      "The idea for the Statue of Liberty originated in America.",
    ],
    correctOptionIndex: 1,
  },
  {
    questionId: "MCS034",
    title: "Taj Arabia",
    difficulty: "HARD" as const,
    content: `Dubai announced plans to construct Taj Arabia, a modern structure inspired by India's Taj Mahal. Unlike the original marble monument, Taj Arabia would be a twenty-story glass building integrated into a large hotel complex featuring shopping facilities, banquet halls, and entertainment venues.

The project was designed to attract tourists and visitors attending major international events. While preserving visual elements associated with the famous monument, the development would combine historical inspiration with contemporary architecture and commercial functionality.

The passage highlights how modern engineering can reinterpret iconic historical designs for new purposes.`,
    questionText: "Which statement best summarizes the author's opinion?",
    options: [
      "Modern architecture can successfully combine historic inspiration with contemporary design.",
      "Taj Arabia will surpass the original Taj Mahal because of technological advances.",
      "The project is too risky to generate sufficient financial returns.",
      "Dubai may cancel the project if construction challenges arise.",
    ],
    correctOptionIndex: 0,
  },
  {
    questionId: "MCS035",
    title: "Adolf Hitler's Journey",
    difficulty: "HARD" as const,
    content: `Adolf Hitler grew up in a middle-class family under the authority of a strict and often domineering father. Their frequent conflicts influenced his personality and outlook on life. As a teenager, Hitler left school and developed interests that often conflicted with his father's expectations.

Although he hoped to become an artist, his applications to the Vienna Academy were unsuccessful. During this period, he adopted a bohemian lifestyle and began developing political ideas that would later shape his career. Eventually, despite having little previous interest in military service, he joined the German army when war broke out.

The passage suggests that many of Hitler's later attitudes and behaviors were influenced by his difficult relationship with his father during childhood.`,
    questionText: "Which statement best summarizes the author's opinion?",
    options: [
      "Hitler only became rebellious after his father's death.",
      "Hitler inherited arrogance and frustration from his ancestors.",
      "His father's harsh attitude contributed to the development of his rebellious nature.",
      "His rebelliousness would have been expressed solely through painting if he had not joined the military.",
    ],
    correctOptionIndex: 2,
  },
  {
    questionId: "MCS036",
    title: "Tanks",
    difficulty: "HARD" as const,
    content: `Tanks first appeared during World War I and quickly became important military vehicles due to their armor, firepower, and ability to operate across difficult terrain. The earliest British prototype, known as 'Little Willie,' was developed in 1915 and later contributed to the creation of modern tanks.

Other nations soon recognized the value of these vehicles. France adopted and produced tanks, while Germany developed its own versions after observing those used by opposing forces. Although early tanks were often unreliable and limited in capability, their military potential encouraged continued development and improvement.

Over time, advances in engineering transformed tanks into more effective and dependable machines.`,
    questionText: "Which statement best summarizes the author's opinion?",
    options: [
      "Tanks are the most valuable objects captured during warfare.",
      "Although early tank designs were imperfect, they were widely copied and improved by other countries.",
      "Tanks were originally small vehicles later redesigned for difficult landscapes.",
      "Captured enemy tanks were mainly used to build exact replicas.",
    ],
    correctOptionIndex: 1,
  },
];

const createMcsQuestions = async () => {
  try {
    console.log(
      "Starting to add Multiple Choice Single Answer questions to the database...",
    );

    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage =
        await prisma.multipleChoiceSinglePassage.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingPassage) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      // Validate that we have exactly 4 options
      if (questionData.options.length !== 4) {
        console.log(
          `⚠️ Question ${questionData.questionId} does not have exactly 4 options, skipping...`,
        );
        continue;
      }

      // Validate correct option index
      if (
        questionData.correctOptionIndex < 0 ||
        questionData.correctOptionIndex >= questionData.options.length
      ) {
        console.log(
          `⚠️ Question ${questionData.questionId} has invalid correct option index, skipping...`,
        );
        continue;
      }

      // Create the passage
      const passage = await prisma.multipleChoiceSinglePassage.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          content: questionData.content,
          questionText: questionData.questionText,
          options: questionData.options,
          correctOptionIndex: questionData.correctOptionIndex,
          difficulty: questionData.difficulty,
        },
      });

      const correctOption =
        questionData.options[questionData.correctOptionIndex];
      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
      console.log(
        `   Correct answer: "${correctOption}" (Option ${String.fromCharCode(65 + questionData.correctOptionIndex)})`,
      );
    }

    console.log(
      "✅ All Multiple Choice Single Answer questions have been processed successfully!",
    );

    // Display summary
    const totalPassages = await prisma.multipleChoiceSinglePassage.count();
    const easyQuestions = await prisma.multipleChoiceSinglePassage.count({
      where: { difficulty: "EASY" },
    });
    const mediumQuestions = await prisma.multipleChoiceSinglePassage.count({
      where: { difficulty: "MEDIUM" },
    });
    const hardQuestions = await prisma.multipleChoiceSinglePassage.count({
      where: { difficulty: "HARD" },
    });

    console.log(`📊 Summary:`);
    console.log(`   - Total passages: ${totalPassages}`);
    console.log(`   - Easy: ${easyQuestions}`);
    console.log(`   - Medium: ${mediumQuestions}`);
    console.log(`   - Hard: ${hardQuestions}`);
  } catch (error) {
    console.error(
      "❌ Error creating Multiple Choice Single Answer questions:",
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the function
createMcsQuestions();
