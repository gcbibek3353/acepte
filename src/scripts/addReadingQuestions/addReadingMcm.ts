import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "MCM001",
    title: "Climate Change Effects",
    content: `Climate change is one of the most pressing issues of our time, with far-reaching consequences for both the environment and human society. Rising global temperatures have led to melting ice caps and glaciers, causing sea levels to rise and threatening coastal communities worldwide. The increased frequency and intensity of extreme weather events, such as hurricanes, droughts, and heatwaves, have disrupted agricultural systems and food production.

Furthermore, climate change has significant impacts on biodiversity. Many species are struggling to adapt to changing environmental conditions, leading to habitat loss and increased extinction rates. Ocean acidification, caused by increased carbon dioxide absorption, threatens marine ecosystems and coral reefs.

The economic implications are equally concerning. Climate-related disasters cost billions of dollars annually in damage to infrastructure, reduced agricultural productivity, and increased healthcare costs. Developing countries are particularly vulnerable, as they often lack the resources to adapt to and mitigate the effects of climate change.

However, there are also opportunities for positive change. The transition to renewable energy sources creates new job opportunities and reduces dependence on fossil fuels. Innovation in green technologies and sustainable practices can drive economic growth while addressing environmental concerns.`,
    prompt:
      "According to the passage, which of the following are effects of climate change? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Rising sea levels due to melting ice caps", isCorrect: true },
      { text: "Decreased ocean acidification", isCorrect: false },
      { text: "Lower agricultural productivity", isCorrect: true },
      { text: "Reduced healthcare costs", isCorrect: false },
      {
        text: "Creation of new job opportunities in renewable energy",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM002",
    title: "Digital Technology in Education",
    content: `The integration of digital technology in education has transformed the learning landscape in unprecedented ways. Online learning platforms have made education more accessible, allowing students from remote areas to access quality educational resources. Interactive multimedia content, including videos, simulations, and virtual reality experiences, has made learning more engaging and effective for many students.

Digital tools have also enabled personalized learning experiences. Adaptive learning software can adjust to individual student needs, providing customized content and pacing. This approach helps address different learning styles and abilities within the same classroom.

However, the digital divide remains a significant challenge. Not all students have equal access to technology and high-speed internet, creating disparities in educational opportunities. Additionally, excessive screen time and reduced face-to-face interaction can impact social development and communication skills.

Teachers have had to adapt their teaching methods and acquire new technological skills. While some educators embrace these changes, others struggle with the transition, requiring extensive professional development and support.

The COVID-19 pandemic accelerated the adoption of digital learning tools, highlighting both their potential and limitations. Emergency remote learning revealed the importance of reliable technology infrastructure and the need for digital literacy among both students and teachers.`,
    prompt:
      "Based on the passage, which statements about digital technology in education are correct? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Digital technology has made education more accessible to remote students",
        isCorrect: true,
      },
      {
        text: "All students have equal access to digital learning tools",
        isCorrect: false,
      },
      {
        text: "Personalized learning is facilitated by adaptive software",
        isCorrect: true,
      },
      {
        text: "The COVID-19 pandemic slowed down digital learning adoption",
        isCorrect: false,
      },
      {
        text: "Some teachers require professional development to adapt to new technologies",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM003",
    title: "Urban Development and Sustainability",
    content: `Modern cities face numerous challenges as urban populations continue to grow rapidly. Urban planning must balance economic development with environmental sustainability and quality of life for residents. Green building practices and sustainable architecture have become increasingly important in reducing the environmental footprint of urban areas.

Public transportation systems play a crucial role in sustainable urban development. Well-designed mass transit networks reduce traffic congestion, air pollution, and carbon emissions. Cities like Copenhagen and Amsterdam have successfully integrated cycling infrastructure, making bicycles a viable transportation option for daily commuting.

Urban green spaces, including parks, gardens, and green rooftops, provide multiple benefits. They improve air quality, reduce urban heat island effects, support biodiversity, and offer recreational opportunities for residents. These spaces also contribute to mental health and community well-being.

Smart city technologies, such as IoT sensors and data analytics, help optimize resource use and improve city services. These technologies can monitor air quality, manage traffic flow, and optimize energy consumption in buildings.

However, rapid urbanization also brings challenges such as housing shortages, increased waste generation, and strain on infrastructure. Affordable housing remains a critical issue in many major cities, often leading to gentrification and displacement of low-income communities.`,
    prompt:
      "According to the passage, which factors contribute to sustainable urban development? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Increased private car usage", isCorrect: false },
      { text: "Well-designed public transportation systems", isCorrect: true },
      { text: "Urban green spaces and parks", isCorrect: true },
      {
        text: "Smart city technologies for resource optimization",
        isCorrect: true,
      },
      { text: "Rapid gentrification of neighborhoods", isCorrect: false },
    ],
  },
  {
    questionId: "MCM004",
    title: "Artificial Intelligence in Healthcare",
    content: `Artificial Intelligence (AI) is revolutionizing healthcare by improving diagnostic accuracy, treatment outcomes, and operational efficiency. Machine learning algorithms can analyze medical images with remarkable precision, often detecting diseases like cancer earlier than traditional methods. AI-powered diagnostic tools can process vast amounts of patient data to identify patterns and predict health risks.

Robot-assisted surgery has enhanced surgical precision and reduced recovery times for patients. These systems allow surgeons to perform minimally invasive procedures with greater accuracy and control. AI also supports drug discovery by analyzing molecular structures and predicting potential therapeutic compounds, significantly reducing development time and costs.

Electronic health records (EHRs) enhanced with AI capabilities can provide real-time clinical decision support. These systems can alert healthcare providers to potential drug interactions, suggest treatment protocols, and identify patients at risk of deterioration.

However, AI in healthcare also presents challenges. Privacy and security concerns arise from handling sensitive patient data. The "black box" nature of some AI algorithms makes it difficult for healthcare professionals to understand how decisions are made, raising questions about accountability and trust.

Additionally, there are concerns about job displacement as AI systems become more sophisticated. While AI can augment healthcare professionals' capabilities, it cannot replace the human touch and empathy that are essential in patient care. Ensuring equitable access to AI-enhanced healthcare services remains a significant challenge.`,
    prompt:
      "Based on the passage, which are benefits of AI in healthcare? (Select all that apply)",
    difficulty: "EASY" as const,
    options: [
      {
        text: "Improved diagnostic accuracy for disease detection",
        isCorrect: true,
      },
      { text: "Accelerated drug discovery and development", isCorrect: true },
      {
        text: "Complete replacement of healthcare professionals",
        isCorrect: false,
      },
      {
        text: "Elimination of all privacy concerns in healthcare",
        isCorrect: false,
      },
      { text: "Reduced surgical recovery times for patients", isCorrect: true },
    ],
  },
  {
    questionId: "MCM005",
    title: "Renewable Energy Transition",
    content: `The global transition to renewable energy sources represents one of the most significant shifts in energy policy and technology in modern history. Solar and wind power have become increasingly cost-competitive with fossil fuels, making them attractive options for both developed and developing countries. Advances in battery storage technology have addressed the intermittency challenges associated with renewable sources.

Government policies and incentives have played a crucial role in accelerating renewable energy adoption. Feed-in tariffs, tax credits, and renewable energy certificates have made clean energy investments more financially viable. Many countries have set ambitious targets for renewable energy capacity and carbon neutrality.

The renewable energy sector has created millions of new jobs worldwide, from manufacturing and installation to maintenance and research. This job creation has provided economic benefits to regions that were previously dependent on fossil fuel industries.

However, the transition faces several challenges. Grid infrastructure must be upgraded to accommodate distributed renewable energy sources and manage variability in supply. Energy storage solutions, while improving, still require further development to provide reliable baseload power.

Environmental concerns also exist. Large-scale solar and wind installations can impact local ecosystems and wildlife. The manufacturing of solar panels and wind turbines requires energy-intensive processes and raw materials, though the lifecycle environmental benefits still outweigh these concerns.

The geopolitical implications of the energy transition are significant. Countries with abundant renewable resources may gain strategic advantages, while traditional oil and gas exporters face economic challenges as demand for fossil fuels declines.`,
    prompt:
      "According to the passage, which factors have contributed to the growth of renewable energy? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "Government policies and financial incentives", isCorrect: true },
      { text: "Advances in battery storage technology", isCorrect: true },
      { text: "Elimination of all environmental concerns", isCorrect: false },
      {
        text: "Complete independence from grid infrastructure upgrades",
        isCorrect: false,
      },
      {
        text: "Ambitious government targets for carbon neutrality",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM006",
    title: "Job Opening",
    content: `Job description: driving a company car as required, between branches in Canada and occasionally in the United States.

This position requires a responsible person with:
• A valid Canadian driver's licence
• A valid passport and ability to cross into the United States for training
• Driving experience such as delivery driver, Uber, taxi, etc.
• Availability to work in locations out of town
• No speeding tickets or fines

We provide:
• Paid training starting immediately
• Food expenses for out-of-province trips
• Hotel expenses covered
• Full-time hours (approximately 8–10 hours per day)
• Company car and gas costs covered
• Weekly pay every Friday ($17.00/hour)
• 4% vacation pay included
• Possibility of permanent hire with benefits based on performance
• Travel to the United States for paid training.`,
    prompt: "What does this employer offer? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "The possibility of part-time work", isCorrect: false },
      { text: "Fuel for the work vehicle", isCorrect: true },
      { text: "A free course in Canada", isCorrect: false },
      { text: "Paid meals when traveling", isCorrect: true },
      { text: "Four weeks of holiday per year", isCorrect: false },
    ],
  },

  {
    questionId: "MCM007",
    title: "Disciplined Inquiry",
    content: `The steps in the scientific method guide researchers in planning, conducting, and interpreting research studies. However, the disciplined inquiry approach has several limitations. It cannot answer questions about what should be done when personal values, philosophy, and ethics are involved. Research studies can never fully capture the richness of individuals and environments because many variables remain unexamined.

Research technologies also have limits. Measuring instruments contain errors, and researchers often use proxy variables rather than directly measuring the behavior they seek to understand. Educational research depends on participants who voluntarily provide data. Researchers must also consider ethical responsibilities and protect participants from harm while informing them about the nature of the study.`,
    prompt:
      "Which of the following are disadvantages of the disciplined inquiry approach? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "The full richness of individuals and research sites cannot be captured",
        isCorrect: true,
      },
      {
        text: "Some questions are influenced by values and ethics and cannot be answered through research alone",
        isCorrect: true,
      },
      {
        text: "Participants are not informed about planned research",
        isCorrect: false,
      },
      {
        text: "Research depends on participants' willingness to provide data",
        isCorrect: true,
      },
      {
        text: "All variables and aspects of a context are always examined",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM008",
    title: "Migration",
    content: `Recent IMF reports suggest contrasting demographic challenges in Asia and Africa. Asia faces declining birth rates and an aging population, creating concerns that it may grow old before becoming rich. Africa, meanwhile, continues to experience high birth rates and a slower demographic transition.

A theoretical solution proposed is large-scale migration of younger people from Africa to Asia. Such migration could help address labor shortages and aging populations in Asia while reducing demographic pressures in Africa, although practical challenges make such a solution difficult to implement.`,
    prompt:
      "Which of the following might help Asia improve its economic outlook? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Speeding up its sluggish demographic transition",
        isCorrect: false,
      },
      {
        text: "Receiving immigrants from regions with high birth rates such as Africa",
        isCorrect: true,
      },
      {
        text: "Sending immigrants elsewhere because Asian birth rates are too high",
        isCorrect: false,
      },
      { text: "Mass Asian emigration to Africa", isCorrect: false },
      { text: "Having more babies", isCorrect: true },
    ],
  },

  {
    questionId: "MCM009",
    title: "Personalized Medicine",
    content: `Personalized medicine refers to the detection, treatment, and prevention of diseases based on a person's unique genetic makeup. Advances in genome sequencing allow physicians to identify disease risks and select treatments tailored to individual patients.

The completion of the human genome project and the mapping of genetic variation have provided insights into why certain individuals are more susceptible to specific diseases. Researchers are increasingly able to identify hereditary factors associated with conditions such as diabetes, heart disease, cancer, high blood pressure, asthma, and mental illness.`,
    prompt:
      "Which of the following can be inferred from the passage? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "People should avoid genome screenings", isCorrect: false },
      { text: "Physicians are gaining testing skills", isCorrect: false },
      {
        text: "Personalized medicine is likely to improve healthcare",
        isCorrect: true,
      },
      {
        text: "There are still many discoveries to be made through genetic research",
        isCorrect: false,
      },
      {
        text: "General medical approaches may become less important in the future",
        isCorrect: true,
      },
      { text: "Some diseases are hereditary", isCorrect: true },
    ],
  },

  {
    questionId: "MCM010",
    title: "Attention",
    content: `Attention is a limited resource. The more attention devoted to one aspect of the environment, the less is available for others. Researchers studied this phenomenon using pigeons exposed to both tones and lights. The birds were rewarded only when they selected the correct combination of stimuli.

The pigeons successfully divided their attention between both stimuli. However, when only one stimulus varied, performance improved for that stimulus while worsening for the other, demonstrating that attention must be distributed among competing sources of information.`,
    prompt: "What did the pigeon experiment indicate? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Pigeons can divide attention among multiple stimuli",
        isCorrect: true,
      },
      {
        text: "Pigeons focus better than most other animals",
        isCorrect: false,
      },
      {
        text: "Pigeons performed best only with yellow lights and high-frequency tones",
        isCorrect: false,
      },
      {
        text: "Greater attention to one stimulus reduces attention available for another",
        isCorrect: true,
      },
      {
        text: "Performance depended on the type of reward offered",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM011",
    title: "Human Remains Discovery",
    content: `Scientists discovered the remains of a previously unknown human species on Flores Island in Indonesia. The species, named Homo floresiensis, lived as recently as 13,000 years ago. One nearly complete female skeleton and fragments from several other individuals were found.

Members of this species stood only about one meter tall and possessed brains approximately the size of a grapefruit. Stone tools and evidence of food preparation were also found alongside the remains, suggesting a surprisingly sophisticated lifestyle despite their small size.`,
    prompt:
      "How did the newly discovered species differ from modern humans? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "They made stone tools", isCorrect: false },
      { text: "They lived 13,000 years ago", isCorrect: false },
      { text: "They were significantly shorter", isCorrect: true },
      { text: "Females were larger than males", isCorrect: false },
      { text: "They had smaller brains", isCorrect: true },
    ],
  },

  {
    questionId: "MCM012",
    title: "Coffee and Heart Health",
    content: `Coffee has traditionally been viewed with caution by heart patients. While some health organizations have warned that it may increase the risk of heart failure, newer research paints a more complex picture.

A meta-analysis involving more than 140,000 European adults found that moderate coffee consumption—about 16 ounces per day—was associated with a reduced risk of heart failure. However, consuming more than 40 ounces daily increased the risk. Researchers also observed a lower incidence of type 2 diabetes among coffee drinkers.`,
    prompt:
      "What are the findings of the report on coffee consumption? (Select all that apply)",
    difficulty: "EASY" as const,
    options: [
      { text: "Coffee is always bad for heart health", isCorrect: false },
      {
        text: "Coffee is always beneficial for heart health",
        isCorrect: false,
      },
      {
        text: "Coffee can be beneficial in moderation but harmful in excess",
        isCorrect: true,
      },
      {
        text: "Coffee increases the risk of type 2 diabetes",
        isCorrect: false,
      },
      { text: "Coffee may lower the risk of type 2 diabetes", isCorrect: true },
    ],
  },

  {
    questionId: "MCM013",
    title: "Underground Railway Lines",
    content: `The underground railway system contains both sub-surface and deep-level lines. Sub-surface lines were constructed using the cut-and-cover method and run relatively close to the surface. Deep-level lines are built using tunneling shields and run much deeper underground.

Most railway lines emerge onto the surface outside the central area. However, there are notable exceptions. The Victoria line remains underground for almost its entire length, while the Waterloo & City line is entirely confined to central areas and never emerges onto the surface.`,
    prompt:
      "According to the passage, which lines are exceptions to having surface sections? (Select all that apply)",
    difficulty: "EASY" as const,
    options: [
      { text: "Victoria line", isCorrect: true },
      { text: "Waterloo & City line", isCorrect: true },
      { text: "Central area", isCorrect: false },
      { text: "Non-central section", isCorrect: false },
    ],
  },

  {
    questionId: "MCM014",
    title: "Falling Behind",
    content: `Economist Robert Frank argues that rising income inequality has made it increasingly difficult for middle-class families to maintain what they consider a middle-class lifestyle. While some dissatisfaction stems from comparisons with wealthier neighbors, Frank believes the issue extends beyond luxury spending.

Research cited in his work suggests that additional income earned by two-earner households is often absorbed by rising housing costs as families seek homes in safer neighborhoods with better schools. As a result, necessities such as quality education have become harder for middle-class families to afford.`,
    prompt:
      "Which issues support Frank's thesis in Falling Behind? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Financial gains from two-income households are often absorbed by housing costs",
        isCorrect: true,
      },
      {
        text: "Global inequality has weakened middle-class values",
        isCorrect: false,
      },
      {
        text: "Middle-class dissatisfaction involves spending on luxury goods",
        isCorrect: true,
      },
      {
        text: "Luxury items become less valuable as people become wealthier",
        isCorrect: false,
      },
      {
        text: "Middle-class families are mainly concerned with relative wealth",
        isCorrect: false,
      },
      {
        text: "Essential items such as education are becoming harder to afford",
        isCorrect: true,
      },
      {
        text: "Jealousy about wealth is a recent phenomenon",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM015",
    title: "Fungal Spores",
    content: `Researchers studying the soil fungus Glomus etunicatum discovered that its spores contain multiple genetically distinct nuclei rather than thousands of identical copies as previously believed. Each spore may contain at least twelve different genomic types.

This unusual characteristic may help the fungus adapt to different plant hosts by activating the genome best suited for a particular partnership. The finding challenges long-held assumptions about how these fungi reproduce and maintain genetic diversity.`,
    prompt: "What is the main purpose of the passage? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "To describe a surprising feature of a fungus", isCorrect: true },
      {
        text: "To explain health benefits of Glomus etunicatum",
        isCorrect: false,
      },
      {
        text: "To identify the exact number of PLS1 variants",
        isCorrect: true,
      },
      {
        text: "To discuss a possible advantage of this biological feature",
        isCorrect: false,
      },
      { text: "To encourage cultivation of the fungus", isCorrect: false },
    ],
  },

  {
    questionId: "MCM016",
    title: "Australian Languages",
    content: `Australia once had more than 250 Aboriginal languages. Today, fewer than 150 remain in daily use, and only a small number continue to be passed on to children. Most surviving languages are highly endangered and are spoken mainly in remote regions.

Although bilingual education and language revival programs have achieved some success, many languages have disappeared over the past two centuries. Linguists remain uncertain about the relationships among many Australian languages, and Tasmanian languages appear unrelated to mainland Australian languages.`,
    prompt:
      "Which of the following statements about Australian languages are true? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Most Australian Aboriginal languages are endangered",
        isCorrect: true,
      },
      {
        text: "Language preservation efforts have been most successful in Tasmania",
        isCorrect: false,
      },
      {
        text: "Many languages have become extinct over the last two centuries",
        isCorrect: true,
      },
      {
        text: "Most languages are still being passed on to children",
        isCorrect: false,
      },
      {
        text: "All languages belong to one clearly defined language family",
        isCorrect: false,
      },
      {
        text: "Bilingual education has succeeded in some communities",
        isCorrect: false,
      },
      {
        text: "Tasmanian languages are clearly related to mainland languages",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM017",
    title: "Taste Sensitivity",
    content: `Researchers at the University of California, Riverside studied how diet affects taste preferences in fruit flies. Flies were fed different diets while maintaining the same overall calorie intake. Scientists then measured changes in food choice and taste sensitivity over a week.

The study found that diet influences dopamine and insulin signaling in the brain, which affects sensory responses and ultimately influences future food choices. Fruit flies rely on their gustatory system to detect important nutrients such as sugars and amino acids.`,
    prompt:
      "Which statements about the study are true? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "The flies were tested every two days", isCorrect: false },
      {
        text: "An unbalanced intake of nutrients is essential",
        isCorrect: false,
      },
      {
        text: "Diet has little effect on future food preferences",
        isCorrect: false,
      },
      {
        text: "Fruit flies detect nutrients through their taste system",
        isCorrect: true,
      },
      {
        text: "The three diets contained the same total calories",
        isCorrect: false,
      },
      {
        text: "Dopamine signaling in the brain is influenced by diet",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM018",
    title: "Smartphone-Based Treatments",
    content: `Digital interventions delivered through computers and smartphones have shown promise in reducing symptoms of depression. While it remains uncertain whether they are as effective as traditional face-to-face psychotherapy, they provide an important alternative for addressing growing mental health needs.

These interventions typically involve software programs, websites, or apps that guide users through structured lessons and activities. Teletherapy differs from digital interventions because it relies on videoconferencing or telephone communication to facilitate direct psychotherapy sessions.`,
    prompt:
      "Which of the following statements are true? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "Videoconferencing can be used in teletherapy", isCorrect: true },
      {
        text: "Digital interventions involve no interaction with content",
        isCorrect: false,
      },
      {
        text: "Digital treatments are the only solution to pandemic-related mental health needs",
        isCorrect: false,
      },
      {
        text: "Digital therapy is proven to be equally effective as face-to-face therapy",
        isCorrect: false,
      },
      {
        text: "Teletherapy is different from digital interventions",
        isCorrect: true,
      },
    ],
  },
  {
    questionId: "MCM019",
    title: "Institution's Curriculum",
    content: `It is possible to study the curriculum of an educational institution from a number of different perspectives. One perspective focuses on curriculum planning, including identifying learners' needs and purposes, establishing goals and objectives, selecting and organizing content, and developing learning materials and assessment tools.

Another perspective examines the curriculum in action within the classroom, observing the teaching and learning process and how the planners' intentions are implemented.

A third perspective focuses on assessment and evaluation, investigating what students have learned, what they failed to learn, and whether they learned anything beyond what was originally planned.`,
    prompt:
      "Which of these ways of looking at an institution's curriculum are outlined in the text? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      { text: "Analysing the content of tests", isCorrect: false },
      {
        text: "Assessing the effectiveness of teacher preparation for lessons",
        isCorrect: false,
      },
      {
        text: "Considering what is taken into account when preparing the curriculum",
        isCorrect: true,
      },
      {
        text: "Reviewing actual learning compared to curriculum goals",
        isCorrect: true,
      },
      {
        text: "Comparing this curriculum with other choices that could have been made",
        isCorrect: false,
      },
      { text: "Observing what happens during lessons", isCorrect: true },
      { text: "Evaluating the materials used", isCorrect: false },
    ],
  },

  {
    questionId: "MCM020",
    title: "The Neue National Gallery",
    content: `The Neue National Gallery in Berlin was designed by Mies van der Rohe and completed in 1968. Unlike traditional museums with separate exhibition rooms, it features an open-plan and flexible design. The gallery is known for its unusual natural lighting and is often considered a work of art itself.

The upper level is mainly used for special exhibits, while the lower level houses themed shows, shops, a café, and the permanent collection. The podium roof plaza serves as an open-air gallery for public sculpture. Visitors can also access a sculpture garden on request, and special exhibits are supported by trained staff who answer questions and explain the artworks.`,
    prompt:
      "What does the passage say can be found at the Neue National Gallery? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      {
        text: "Helpful guides to give information about the art",
        isCorrect: true,
      },
      { text: "Overhead lighting to showcase artwork", isCorrect: false },
      {
        text: "Substantial pillars in the corners of the building",
        isCorrect: false,
      },
      { text: "Artwork on top of the building", isCorrect: true },
      {
        text: "Several separate gallery rooms on each floor",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM021",
    title: "Wildebeests",
    content: `Differences in feeding preferences lead to different migratory habits among grazing animals. When rainfall creates new feeding areas, species migrate in a specific order. Zebras, which are less selective feeders, arrive first. Wildebeests follow later, and Thomson's gazelles arrive last.

The grazing behavior of zebras changes the vegetation, making it more suitable for wildebeests and other species. Wildebeests are more selective than larger herbivores and benefit from areas that have already been grazed.`,
    prompt:
      "According to the passage, which of the following is true of wildebeests? (Select all that apply)",
    difficulty: "HARD" as const,
    options: [
      {
        text: "They are relatively choosier than larger herbivores",
        isCorrect: true,
      },
      {
        text: "They are able to digest large food particles if the food is of a high quality",
        isCorrect: false,
      },
      { text: "They eat more stem matter than zebras do", isCorrect: false },
      {
        text: "They are likely to choose low-quality food during periods of low rainfall",
        isCorrect: false,
      },
      {
        text: "They tend to choose feeding areas in which the vegetation has been worn down",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM022",
    title: "Barbecue",
    content: `Research published in the Journal of Agricultural and Food Chemistry found that marinating pork chops in beer before grilling can reduce the formation of polycyclic aromatic hydrocarbons (PAHs), compounds that may increase cancer risk.

Researchers tested regular pilsner, nonalcoholic pilsner, and dark ale marinades. Dark ale reduced PAH levels by about half compared to unmarinated meat. Scientists believe antioxidants in dark beer help slow the formation of these compounds during grilling.`,
    prompt:
      "Which of the following may cut your risk of cancer? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Polycyclic Aromatic Hydrocarbons (PAHs) found in smoked and grilled meat",
        isCorrect: false,
      },
      { text: "Marinating your steak in dark ale", isCorrect: true },
      { text: "Drinking beer with your steak", isCorrect: false },
      {
        text: "Marinating your steak in nonalcoholic pilsner",
        isCorrect: true,
      },
      { text: "Not eating smoked or grilled meats", isCorrect: false },
    ],
  },

  {
    questionId: "MCM023",
    title: "Low Coastal Cities",
    content: `A global study found that one in ten people worldwide lives less than ten metres above sea level near the coast. These low coastal zones are particularly vulnerable to flooding and stronger storms intensified by climate change.

Researchers emphasize that rising sea levels and growing populations in these areas increase the risks associated with climate-related disasters.`,
    prompt:
      "According to the passage, why are low coastal cities so dangerous? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "They can help damage natural environments that would otherwise reduce the impact of climate change",
        isCorrect: true,
      },
      {
        text: "IPCC forecasts could be on the conservative side",
        isCorrect: false,
      },
      {
        text: "Their high levels of fossil fuel consumption",
        isCorrect: false,
      },
      {
        text: "They are often located in mangroves which are unhealthy",
        isCorrect: false,
      },
      {
        text: "They attract large populations to areas vulnerable to climate change impacts",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM024",
    title: "Handwritten Exams",
    content: `Cambridge University is considering replacing handwritten exams with computer-based exams after complaints from examiners about increasingly illegible handwriting.

Many students now rely on laptops and rarely write by hand for extended periods. Some students even experience physical difficulty writing for several hours, and in extreme cases examiners have been unable to read exam scripts without assistance from students.`,
    prompt:
      "Why is Cambridge considering eliminating handwritten exams? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Students often cannot read the professors' handwriting",
        isCorrect: false,
      },
      { text: "The exams are too long and difficult", isCorrect: false },
      {
        text: "The examiners often cannot read the students' writing",
        isCorrect: true,
      },
      {
        text: "The art of handwriting is no longer a common course at Cambridge",
        isCorrect: false,
      },
      {
        text: "Students aren't used to writing by hand anymore",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM025",
    title: "Medical Research Fund",
    content: `Australia proposed creating a large medical research fund financed largely through Medicare co-payments. The government predicted the fund would grow significantly and become a major source of research funding.

However, comparisons with existing international organizations suggest that claims about it becoming the world's largest fund may be overstated. The annual medical research spending of the United States alone exceeds the total value of the proposed Australian fund.`,
    prompt:
      "Which of the following is true regarding the proposed medical research fund in Australia? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "It is the biggest medical research endowment fund in the world within six years",
        isCorrect: false,
      },
      {
        text: "It is worth over 18 billion dollars and employs over 700 scientists",
        isCorrect: false,
      },
      {
        text: "It is smaller than the yearly budget the US government spends on medical research",
        isCorrect: true,
      },
      { text: "Its size has been exaggerated by Mr. Hockey", isCorrect: true },
      {
        text: "It is expected to stay at 20 billion in 2020",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM026",
    title: "Snow",
    content: `Snow forms when temperatures are low and moisture exists in the atmosphere as tiny ice crystals. These crystals collide and stick together in clouds, forming snowflakes. When enough crystals combine, the snowflakes become heavy enough to fall to the ground.

Snow can fall when air temperatures are below 2°C; it does not need to be below freezing. In fact, the heaviest snowfall often occurs between 0°C and 2°C. If temperatures rise above 2°C, snowflakes melt and may fall as sleet or rain.

The type of snow depends on temperature conditions. Snow falling through dry, cool air forms small, powdery flakes known as dry snow. Slightly warmer temperatures create wet snow, whose flakes partially melt and stick together more easily.`,
    prompt:
      "Which of the following statements about snow match the information in the passage? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Subzero temperatures are required for snow to fall.",
        isCorrect: false,
      },
      {
        text: "Falling snow melts because of warm air around it.",
        isCorrect: false,
      },
      { text: "Snow is formed from ice.", isCorrect: true },
      {
        text: "Dry snow falls in colder temperatures than wet snow.",
        isCorrect: true,
      },
      {
        text: "Sleet develops at less than two degrees centigrade.",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM027",
    title: "Water",
    content: `Water for public supply can come from underground aquifers, reservoirs, lakes, streams, and rivers. Ensuring water safety is essential because contaminated water causes millions of deaths each year. The primary goal of water treatment is to eliminate harmful microorganisms.

Both underground and surface water sources can be polluted. Contamination may come from heavy metals, pesticides, industrial waste, sewage, farm runoff, and road runoff. Water is often stored in reservoirs before treatment, where natural processes such as sunlight help reduce bacteria and suspended solids.`,
    prompt:
      "Which of the following statements are true according to the information in the passage? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Water in reservoirs is chemically treated to remove harmful bacteria.",
        isCorrect: false,
      },
      {
        text: "There are insufficient sources of freshwater for human consumption.",
        isCorrect: false,
      },
      {
        text: "There are numerous means by which water can become impure.",
        isCorrect: true,
      },
      {
        text: "Industrial pollution can affect both underground and river water.",
        isCorrect: true,
      },
      {
        text: "Rain is a safer source of water for human consumption than aquifers.",
        isCorrect: false,
      },
    ],
  },

  {
    questionId: "MCM028",
    title: "Xhosa Bride",
    content: `In Xhosa culture, a bride is expected to show reluctance and sadness during her wedding because she is leaving her family to live among her husband's relatives. Many customs regulate her behavior after marriage.

She must avoid using the names of certain senior male relatives and some female relatives such as her mother-in-law, aunts, and elder sisters-in-law. She is expected to perform much of the domestic work and wear a handkerchief low over her forehead when around her husband's relatives.

Over time, these restrictions become less strict as family relationships develop and rituals mark her integration into her new family.`,
    prompt:
      "According to the text, which of the following behaviors are expected of a new Xhosa bride? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "She is not allowed to enter her new home by the front entrance.",
        isCorrect: false,
      },
      {
        text: "At her wedding, she is meant to appear unwilling.",
        isCorrect: true,
      },
      {
        text: "She must avoid using the names of some of her husband's female relatives.",
        isCorrect: true,
      },
      {
        text: "She is not allowed to drink milk from her father's cows.",
        isCorrect: false,
      },
      {
        text: "She cannot use the name of any of her husband's male relatives.",
        isCorrect: false,
      },
      {
        text: "She is not allowed to touch plates in the family home.",
        isCorrect: false,
      },
      {
        text: "She must wear a headscarf when meeting her husband's relatives.",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM029",
    title: "Furniture",
    content: `People view furniture in different ways: as purely functional, as a combination of function and aesthetics, or as a form of art. Historically, furniture designers often worked for wealthy patrons and were less concerned with practicality, space, or cost.

Modern furniture design places greater emphasis on practicality, efficient use of space, durability, and affordability. Designers aim to create interiors that support efficient living while minimizing maintenance requirements and unnecessary features.`,
    prompt:
      "According to the text, how does modern furniture design differ from that of the past? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Furniture should be as decorative as possible.",
        isCorrect: false,
      },
      {
        text: "Making the best use of available space is important.",
        isCorrect: true,
      },
      {
        text: "Practicality and economy are the most important considerations.",
        isCorrect: true,
      },
      {
        text: "Designers are primarily concerned with aesthetic appeal.",
        isCorrect: false,
      },
      {
        text: "Modern furniture should need little looking after.",
        isCorrect: true,
      },
      { text: "Designers are only employed by the wealthy.", isCorrect: false },
    ],
  },

  {
    questionId: "MCM030",
    title: "Luke Howard",
    content: `Luke Howard revolutionized meteorology by creating a system for classifying clouds. Before his work, clouds were simply described according to their appearance. In 1802–1803, Howard introduced categories such as cumulus, stratus, cirrus, and nimbus, using Latin names so the system could be understood internationally.

His classification system was eventually adopted as an international standard. Howard also contributed to weather science through his writings and by recognizing that cities could influence weather conditions, an idea that later became known as urban climatology.`,
    prompt:
      "Which of the following achievements can be attributed to Luke Howard? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "His classification system became used all over the world.",
        isCorrect: true,
      },
      {
        text: "He was the first to notice the different shapes and colors of clouds.",
        isCorrect: false,
      },
      { text: "He was the first to use the word 'smog'.", isCorrect: false },
      { text: "He wrote a book about barometers.", isCorrect: false },
      {
        text: "He was the first to identify and classify different cloud forms.",
        isCorrect: true,
      },
      {
        text: "He realized that cities could have an effect on the weather.",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM031",
    title: "Hobbies and Pastimes",
    content: `Hobbies and pastimes are activities pursued during leisure time for enjoyment, relaxation, and personal interest rather than financial gain. Common hobbies include collecting, making things, sports, music, and reading.

Many people find hobbies beneficial because they provide relaxation and help take their minds off problems. However, some people feel pressured to present their hobbies in a more exciting way when applying for jobs, even though hobbies are intended to be enjoyable rather than stressful.`,
    prompt:
      "Which of the following statements are true about hobbies and pastimes, according to the text? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "They are not pursued for economic profit.", isCorrect: true },
      {
        text: "Your leisure time activities reveal your true character.",
        isCorrect: false,
      },
      {
        text: "Most people's hobbies are simple and undemanding.",
        isCorrect: true,
      },
      {
        text: "Many people do extreme sports because it's cool.",
        isCorrect: false,
      },
      { text: "They are often used as therapy.", isCorrect: false },
    ],
  },

  {
    questionId: "MCM032",
    title: "Wind Turbines",
    content: `The use of wind energy for electricity generation has grown rapidly since 1980. By 1994, nearly 20,000 wind turbines were operating worldwide. Many of these turbines were grouped together in clusters known as wind farms, which collectively generated significant amounts of electricity.

Countries such as Denmark and regions like California used wind farms to contribute to their electricity supply, demonstrating the large-scale potential of wind power generation.`,
    prompt:
      "Based on the information in the paragraph, which of the following best explains the term wind farms? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "Collections of wind turbines producing electric power",
        isCorrect: true,
      },
      { text: "Research centers exploring the uses of wind", isCorrect: false },
      { text: "Farms using windmills to pump water", isCorrect: false },
      {
        text: "Types of power plants common in Denmark and California",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM033",
    title: "Europe",
    content: `During the eleventh century, Europe experienced major social, technological, and economic changes that resulted in two distinct regional societies.

In northern Europe, social status was largely determined by ownership, control, or labor on land. In southern Europe, particularly around the Mediterranean, commerce and industry played a greater role, and social standing depended more on participation in public and civic life. By the twelfth century, these differences were widely recognized.`,
    prompt:
      "Which of the following was a deciding factor in a person's place in society in northern and southern Europe respectively at the end of the eleventh century? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      { text: "Role in public life in the community.", isCorrect: true },
      {
        text: "Participation in social and technological changes.",
        isCorrect: false,
      },
      {
        text: "Relationship to land through ownership or labor.",
        isCorrect: true,
      },
      { text: "Ownership of a commercial enterprise.", isCorrect: false },
    ],
  },

  {
    questionId: "MCM034",
    title: "Atmosphere",
    content: `Human activities have significantly increased atmospheric carbon dioxide concentrations. Scientific predictions suggest that continued increases could lead to substantial rises in global temperatures.

The effects of climate change are expected to vary across different regions. Temperature increases will likely be greater near the poles than at the equator. While scientists agree that global changes may affect ocean currents, flooding, and weather patterns, the exact local consequences remain difficult to predict.`,
    prompt:
      "According to the paragraph, what can be said about the effects of global changes? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "The local plants and animals will be permanently damaged.",
        isCorrect: false,
      },
      { text: "Seawater levels will fall around the world.", isCorrect: false },
      {
        text: "The effects may occur more conspicuously in certain areas than others.",
        isCorrect: true,
      },
      {
        text: "The effects will not occur in some regions of the world.",
        isCorrect: false,
      },
      {
        text: "It is hard to know exactly what form the local effects will take.",
        isCorrect: true,
      },
    ],
  },

  {
    questionId: "MCM035",
    title: "X-ray Crystallography",
    content: `X-ray crystallography is a technique used to determine crystal structures through X-ray diffraction. When X-rays strike a crystal lattice, they scatter according to the arrangement of atoms within the crystal. This diffraction pattern allows scientists to analyze atomic structures.

Developed in the early twentieth century and greatly enhanced by computer technology in the 1960s, X-ray crystallography has become one of the most accurate methods for determining the structures of organic, inorganic, organometallic, and biological compounds.`,
    prompt:
      "Which of the following factors are consistent with the theory of X-ray crystallography? (Select all that apply)",
    difficulty: "MEDIUM" as const,
    options: [
      {
        text: "X-rays are scattered according to the atomic structure of the crystal lattice.",
        isCorrect: true,
      },
      {
        text: "X-ray crystallization causes a reduction in the interatomic distances of wavelengths.",
        isCorrect: false,
      },
      {
        text: "The process can be used to determine the chemical structure of biological compounds.",
        isCorrect: true,
      },
      {
        text: "X-rays will not diffract from crystalline substances.",
        isCorrect: false,
      },
      {
        text: "The analysis of chemical compounds was only possible after the development of computer technology.",
        isCorrect: false,
      },
    ],
  },
];

const createMcmQuestions = async () => {
  try {
    console.log(
      "Starting to add Multiple Choice Multiple Answer questions to the database...",
    );

    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage =
        await prisma.multipleChoiceMultiplePassage.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingPassage) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      // Create passage and options in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the passage
        const passage = await tx.multipleChoiceMultiplePassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            content: questionData.content,
            questionText: questionData.prompt,
            difficulty: questionData.difficulty,
          },
        });

        // Create the options (passageId is the relation key)
        const options = await Promise.all(
          questionData.options.map((option) =>
            tx.multipleChoiceMultipleOption.create({
              data: {
                passageId: passage.id,
                text: option.text,
                isCorrect: option.isCorrect,
              },
            }),
          ),
        );

        return { passage, options };
      });

      const correctAnswers = result.options.filter(
        (option) => option.isCorrect,
      ).length;
      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title} (${correctAnswers} correct answers)`,
      );
    }

    console.log(
      "✅ All Multiple Choice Multiple Answer questions have been processed successfully!",
    );

    // Display summary
    const totalPassages = await prisma.multipleChoiceMultiplePassage.count();
    const totalOptions = await prisma.multipleChoiceMultipleOption.count();

    console.log(`📊 Summary:`);
    console.log(`   - Total passages: ${totalPassages}`);
    console.log(`   - Total options: ${totalOptions}`);
  } catch (error) {
    console.error(
      "❌ Error creating Multiple Choice Multiple Answer questions:",
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the function
createMcmQuestions();
