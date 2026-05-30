import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "FIBDD001",
    title: "Climate Change and Environmental Impact",
    difficulty: "MEDIUM" as const,
    content: `Climate change is one of the most pressing issues of our time. The Earth's temperature has been {1} steadily over the past century, primarily due to human activities. Scientists have {2} that greenhouse gases, particularly carbon dioxide, are the main culprits. These gases {3} heat in the atmosphere, causing global temperatures to rise.

The effects of climate change are {4} visible around the world. Ice caps are melting, sea levels are {5}, and extreme weather events are becoming more frequent. Many species are struggling to {6} to these rapid changes in their environment.

To combat climate change, we must {7} our carbon emissions significantly. This requires a shift towards renewable energy sources and more sustainable practices in agriculture and industry.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["decreasing", "remaining", "rising", "fluctuating"],
        explanation:
          "'Rising' is correct because the passage describes a consistent upward trend in Earth's temperature over the past century. 'Decreasing' and 'remaining' directly contradict scientific consensus. 'Fluctuating' implies irregular change, not the steady increase described.",
      },
      {
        position: 2,
        correctIndex: 1,
        options: ["denied", "confirmed", "questioned", "ignored"],
        explanation:
          "'Confirmed' is correct because the sentence states greenhouse gases 'are the main culprits' — a definitive conclusion. Scientists have confirmed this through decades of research. 'Denied' and 'ignored' contradict the established scientific position.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["trap", "release", "absorb", "reflect"],
        explanation:
          "'Trap' is correct because it describes the greenhouse effect accurately — gases like CO₂ trap outgoing infrared radiation, preventing heat from escaping the atmosphere. 'Release' means the opposite; 'absorb' and 'reflect' don't capture the retention mechanism.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["barely", "rarely", "hardly", "increasingly"],
        explanation:
          "'Increasingly' is correct because it matches the idea that effects are becoming more visible — consistent with the examples that follow (melting ice caps, rising sea levels). 'Barely', 'rarely', and 'hardly' all suggest the effects are minimal, contradicting the passage's argument.",
      },
      {
        position: 5,
        correctIndex: 1,
        options: ["dropping", "rising", "stable", "frozen"],
        explanation:
          "'Rising' is correct because it is a well-documented consequence of global warming — melting ice and thermal expansion of water cause sea levels to increase. 'Dropping' is the opposite; 'stable' and 'frozen' contradict the warming context.",
      },
      {
        position: 6,
        correctIndex: 2,
        options: ["resist", "ignore", "adapt", "escape"],
        explanation:
          "'Adapt' is correct because the sentence discusses species responding to environmental changes. In ecology, 'adapting to changes' is the standard phrase. 'Resist' implies fighting against change; 'escape' implies leaving; 'ignore' is illogical for species facing habitat shifts.",
      },
      {
        position: 7,
        correctIndex: 0,
        options: ["reduce", "increase", "maintain", "measure"],
        explanation:
          "'Reduce' is correct because the passage argues for action against climate change, and the logical response to high carbon emissions is to lower them. 'Increase' is the opposite of what is needed; 'maintain' means keeping current levels; 'measure' is a monitoring action, not a solution.",
      },
    ],
  },
  {
    questionId: "FIBDD002",
    title: "The Benefits of Regular Exercise",
    difficulty: "EASY" as const,
    content: `Regular exercise is {1} for maintaining good health. It helps to {2} your cardiovascular system and builds muscle strength. When you exercise regularly, your heart becomes more {3} at pumping blood throughout your body.

Exercise also has mental health benefits. It can {4} stress levels and improve your mood by releasing endorphins. Many people find that they sleep {5} after a good workout.

To get the most benefits, experts {6} at least 30 minutes of moderate exercise most days of the week.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["harmful", "essential", "optional", "difficult"],
        explanation:
          "'Essential' is correct because the sentence presents exercise as necessary for good health — consistent with the positive framing of the entire passage. 'Harmful' directly contradicts the passage's argument; 'optional' and 'difficult' undermine the recommendation being made.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["weaken", "damage", "strengthen", "ignore"],
        explanation:
          "'Strengthen' is correct because exercise improves cardiovascular fitness — the heart and blood vessels become more efficient. 'Weaken' and 'damage' are the opposite of the passage's positive message about exercise.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["efficient", "slow", "weak", "irregular"],
        explanation:
          "'Efficient' is correct because regular exercise trains the heart to pump more blood per beat (increased stroke volume), making it more efficient. 'Slow', 'weak', and 'irregular' all describe negative cardiac conditions, contradicting the benefit being described.",
      },
      {
        position: 4,
        correctIndex: 1,
        options: ["increase", "reduce", "maintain", "ignore"],
        explanation:
          "'Reduce' is correct because exercise is well-documented to lower stress through endorphin release and physiological relaxation. The sentence pairs 'reduce stress' with 'improve mood' — both are positive outcomes. 'Increase' is the opposite effect.",
      },
      {
        position: 5,
        correctIndex: 3,
        options: ["worse", "less", "poorly", "better"],
        explanation:
          "'Better' is correct because improved sleep quality is a recognised benefit of regular exercise. 'Worse', 'less', and 'poorly' all suggest exercise harms sleep, which contradicts the passage's positive framing.",
      },
      {
        position: 6,
        correctIndex: 2,
        options: ["discourage", "forbid", "recommend", "prohibit"],
        explanation:
          "'Recommend' is correct because health experts advise (not mandate or forbid) a minimum amount of exercise. 'Discourage', 'forbid', and 'prohibit' are all negative words that contradict the passage's guidance.",
      },
    ],
  },
  {
    questionId: "FIBDD003",
    title: "The History of the Internet",
    difficulty: "HARD" as const,
    content: `The Internet has {1} from a simple military project to a global network that connects billions of people. In the 1960s, the U.S. Department of Defense {2} ARPANET, which was designed to allow computers at different universities to communicate.

The {3} breakthrough came in 1989 when Tim Berners-Lee invented the World Wide Web. This made the Internet much more {4} to ordinary users by introducing web browsers and hyperlinks. The first web browser was {5} in 1990, marking the beginning of the modern Internet era.

Today, the Internet has {6} almost every aspect of our lives, from how we work and learn to how we shop and socialize. Its {7} continues to accelerate, with new technologies like artificial intelligence and the Internet of Things creating even more possibilities.`,
    blanks: [
      {
        position: 1,
        correctIndex: 3,
        options: ["shrunk", "disappeared", "remained", "evolved"],
        explanation:
          "'Evolved' is correct because the sentence describes a transformation from a small military project into a massive global network — a process of development over time. 'Shrunk' and 'disappeared' are the opposite direction; 'remained' suggests no change.",
      },
      {
        position: 2,
        correctIndex: 1,
        options: ["destroyed", "created", "abandoned", "criticized"],
        explanation:
          "'Created' is correct because the Department of Defense developed and launched ARPANET. 'Destroyed' is the opposite; 'abandoned' would mean they gave it up; 'criticized' is an opinion, not a creation action.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["minor", "last", "major", "temporary"],
        explanation:
          "'Major' is correct because the invention of the World Wide Web in 1989 is widely regarded as the most transformative moment in Internet history — it made the Internet accessible to non-technical users. 'Minor' and 'temporary' understate its significance.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["accessible", "complex", "expensive", "dangerous"],
        explanation:
          "'Accessible' is correct because the WWW, with its graphical browsers and hyperlinks, allowed ordinary people to use the Internet without technical expertise. 'Complex' and 'expensive' are the opposite of democratising access.",
      },
      {
        position: 5,
        correctIndex: 3,
        options: ["banned", "forgotten", "criticized", "released"],
        explanation:
          "'Released' is correct because the first web browser (WorldWideWeb/Nexus) was publicly made available in 1990. 'Banned' and 'criticized' describe negative receptions; 'forgotten' contradicts the fact that it marked the beginning of the modern Internet era.",
      },
      {
        position: 6,
        correctIndex: 1,
        options: ["avoided", "transformed", "ignored", "complicated"],
        explanation:
          "'Transformed' is correct because the Internet has fundamentally changed how people work, shop, learn, and socialise. The examples that follow (work, learn, shop, socialize) all illustrate profound transformation. 'Avoided' and 'ignored' contradict the pervasive presence described.",
      },
      {
        position: 7,
        correctIndex: 2,
        options: ["decline", "stagnation", "growth", "confusion"],
        explanation:
          "'Growth' is correct because the sentence says its development 'continues to accelerate' with AI and IoT — this is expansion, not decline or stagnation. 'Decline' and 'stagnation' directly contradict the accelerating pace described.",
      },
    ],
  },
  {
    questionId: "FIBDD004",
    title: "The Importance of Sleep",
    difficulty: "EASY" as const,
    content: `Sleep is {1} important for our physical and mental well-being. During sleep, our bodies {2} and restore themselves. The brain also {3} information from the day and forms memories.

Most adults {4} between 7-9 hours of sleep per night for optimal health. However, many people do not get enough sleep due to busy {5} or sleep disorders.

Lack of sleep can {6} to various health problems, including weakened immunity, weight gain, and difficulty concentrating.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["slightly", "extremely", "barely", "moderately"],
        explanation:
          "'Extremely' is correct because the passage emphasises the critical role of sleep throughout, listing serious health consequences of not getting enough. 'Slightly', 'barely', and 'moderately' all downplay its importance, contradicting the passage's tone.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["deteriorate", "weaken", "repair", "damage"],
        explanation:
          "'Repair' is correct because sleep is the body's recovery period — tissues are rebuilt, the immune system is strengthened, and cellular damage is fixed. 'Deteriorate', 'weaken', and 'damage' all describe harm, which is the opposite of sleep's restorative function.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["processes", "deletes", "ignores", "confuses"],
        explanation:
          "'Processes' is correct because during sleep the brain consolidates experiences into long-term memories through memory consolidation. 'Deletes' and 'ignores' suggest the opposite; 'confuses' implies impairment rather than organisation.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["avoid", "reject", "fear", "require"],
        explanation:
          "'Require' is correct because 7-9 hours is described as the amount adults need for optimal health — it is a physiological requirement. 'Avoid', 'reject', and 'fear' are all negative responses to sleep that contradict the passage's message.",
      },
      {
        position: 5,
        correctIndex: 1,
        options: ["hobbies", "lifestyles", "dreams", "thoughts"],
        explanation:
          "'Lifestyles' is correct because the sentence explains why people don't sleep enough — busy schedules and daily habits (lifestyles) interfere. 'Hobbies' is too narrow; 'dreams' is what happens during sleep; 'thoughts' is not a scheduling issue.",
      },
      {
        position: 6,
        correctIndex: 2,
        options: ["help", "contribute", "lead", "prevent"],
        explanation:
          "'Lead' is correct because 'lead to' is the standard collocation for introducing consequences or results. 'Lack of sleep can lead to health problems' is idiomatic English. 'Contribute to' is also possible but 'lead to' is stronger and more direct here.",
      },
    ],
  },
  {
    questionId: "FIBDD005",
    title: "Renewable Energy Sources",
    difficulty: "MEDIUM" as const,
    content: `Renewable energy sources are becoming increasingly {1} as alternatives to fossil fuels. Solar power {2} energy from sunlight using photovoltaic panels, while wind turbines {3} the kinetic energy of moving air.

Hydroelectric power plants {4} the flow of water to generate electricity, and geothermal systems tap into the Earth's natural heat. These renewable sources are {5} because they do not produce harmful emissions and are naturally replenished.

The {6} to renewable energy is essential for reducing our carbon footprint and {7} climate change.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["rare", "expensive", "popular", "dangerous"],
        explanation:
          "'Popular' is correct because 'increasingly popular' is a natural collocation meaning growing in use and acceptance. The context shows renewables are gaining ground as alternatives to fossil fuels. 'Rare' and 'dangerous' are negative descriptors that contradict the passage's favourable framing.",
      },
      {
        position: 2,
        correctIndex: 1,
        options: ["wastes", "harnesses", "destroys", "blocks"],
        explanation:
          "'Harnesses' is correct because solar panels capture and convert sunlight into electricity — this is described as 'harnessing' energy. 'Wastes' and 'destroys' imply the opposite; 'blocks' means preventing passage, which is the reverse of capturing energy.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["capture", "lose", "waste", "destroy"],
        explanation:
          "'Capture' is correct because wind turbines convert the kinetic energy of wind into electrical energy — a capturing or converting process. 'Lose', 'waste', and 'destroy' all imply energy is being dissipated rather than utilised.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["stop", "pollute", "waste", "utilize"],
        explanation:
          "'Utilize' is correct because hydroelectric plants make use of water flow to generate electricity. 'Stop' and 'waste' are counter-productive; 'pollute' contradicts the passage's claim that renewables don't produce harmful emissions.",
      },
      {
        position: 5,
        correctIndex: 1,
        options: ["harmful", "sustainable", "temporary", "expensive"],
        explanation:
          "'Sustainable' is correct because the sentence immediately explains why — they don't produce emissions and are naturally replenished. These are the two defining qualities of sustainability. 'Temporary' contradicts 'naturally replenished'; 'harmful' contradicts 'no harmful emissions'.",
      },
      {
        position: 6,
        correctIndex: 2,
        options: ["resistance", "opposition", "transition", "rejection"],
        explanation:
          "'Transition' is correct because the sentence describes a shift from fossil fuels to renewables — a transition. 'Resistance' and 'opposition' mean refusing to change; 'rejection' means refusing to adopt. All three contradict the passage's call for action.",
      },
      {
        position: 7,
        correctIndex: 0,
        options: ["combating", "increasing", "ignoring", "encouraging"],
        explanation:
          "'Combating' is correct because reducing the carbon footprint is part of fighting climate change. The phrase 'combating climate change' is a standard collocation. 'Increasing' climate change is the opposite outcome; 'ignoring' and 'encouraging' contradict the environmental motivation.",
      },
    ],
  },
  {
    questionId: "FIBDD006",
    title: "The Digital Revolution",
    difficulty: "HARD" as const,
    content: `The digital revolution has {1} the way we live, work, and communicate. Computers have become {2} smaller and more powerful, while the Internet has created a global network of information sharing.

Smartphones have {3} multiple devices into a single portable unit, allowing us to access information, communicate, and navigate from anywhere. Social media platforms have {4} how we interact with others, creating virtual communities that span the globe.

However, this digital transformation has also {5} new challenges. Privacy concerns, cybersecurity threats, and digital addiction are {6} issues in our connected world. As technology continues to advance, society must {7} ways to maximize benefits while minimizing risks.`,
    blanks: [
      {
        position: 1,
        correctIndex: 3,
        options: ["maintained", "prevented", "complicated", "revolutionized"],
        explanation:
          "'Revolutionized' is correct because the title itself is 'The Digital Revolution' — the passage describes fundamental changes to life, work, and communication. 'Maintained' and 'prevented' suggest the opposite; 'complicated' has a negative connotation that doesn't match the mixed but broadly transformative framing.",
      },
      {
        position: 2,
        correctIndex: 1,
        options: ["remained", "progressively", "suddenly", "rarely"],
        explanation:
          "'Progressively' is correct because Moore's Law describes computers becoming steadily (progressively) smaller and more powerful over decades. 'Suddenly' implies an abrupt change inconsistent with technological evolution; 'rarely' contradicts the well-documented trend.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["separated", "divided", "consolidated", "scattered"],
        explanation:
          "'Consolidated' is correct because smartphones merged the functions of phones, cameras, GPS devices, music players, and computers into one device. 'Separated', 'divided', and 'scattered' all mean the opposite — breaking things apart rather than combining them.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["transformed", "destroyed", "prevented", "complicated"],
        explanation:
          "'Transformed' is correct because social media has fundamentally changed how people communicate and build communities. The examples that follow (virtual communities, global connections) illustrate transformation. 'Destroyed' and 'prevented' are too negative for the balanced framing.",
      },
      {
        position: 5,
        correctIndex: 1,
        options: ["solved", "created", "avoided", "prevented"],
        explanation:
          "'Created' is correct because the sentence introduces the challenges of digital transformation — the digital revolution brought these problems into existence. 'Solved' would mean eliminating them; 'avoided' and 'prevented' mean they didn't occur, contradicting the examples that follow.",
      },
      {
        position: 6,
        correctIndex: 3,
        options: ["minor", "irrelevant", "outdated", "significant"],
        explanation:
          "'Significant' is correct because the passage treats privacy, cybersecurity, and digital addiction as serious contemporary issues worth addressing. 'Minor' and 'irrelevant' downplay them; 'outdated' suggests they are no longer current, which contradicts the present-tense framing.",
      },
      {
        position: 7,
        correctIndex: 2,
        options: ["abandon", "ignore", "find", "reject"],
        explanation:
          "'Find' is correct because 'find ways to' is a natural English collocation meaning to discover solutions or strategies. The sentence calls for society to identify approaches that balance benefits and risks. 'Abandon', 'ignore', and 'reject' all suggest giving up on technology entirely.",
      },
    ],
  },

  {
    questionId: "FIBDD007",
    title: "Wind Moving",
    difficulty: "EASY" as const,
    content: `Wind is air moving around. Some winds can move {1} fast as a racing car, over 100 miles an {2}. Winds can travel around the world. Wind can make you feel cold because you lose heat from your body {3} when it is windy. Weather forecasters need to {4} the speed and direction of the wind. The strength of wind is measured using the Beaufort scale from wind force when there is no wind, to wind force 12 which can damage houses and buildings and is called hurricane force.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["under", "as", "beyond", "since"],
        explanation:
          "'As' is correct because the fixed expression is 'as fast as'. The other options do not form a grammatically correct comparison.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["place", "side", "road", "hour"],
        explanation:
          "'Hour' is correct because speed is measured in miles an hour. The other words do not fit the context of measuring speed.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["nearer", "higher", "faster", "deeper"],
        explanation:
          "'Faster' is correct because heat is lost more quickly when it is windy. The other options do not describe the rate of heat loss.",
      },
      {
        position: 4,
        correctIndex: 1,
        options: ["build", "know", "catch", "borrow"],
        explanation:
          "'Know' is correct because weather forecasters need to know wind speed and direction. The other options do not make sense in this context.",
      },
    ],
  },
  {
    questionId: "FIBDD008",
    title: "Solar Eclipse",
    difficulty: "EASY" as const,
    content: `A total solar eclipse is a rare and spectacular phenomenon that occurs when the moon {1} the sun’s light completely, creating a brief period of darkness in the middle of the day. On 8 April 2024, people in North America will have a chance to {2} this amazing event, as the path of totality - the area {3} the eclipse is visible - will stretch from Mexico to Canada, crossing 13 US states. To enjoy the full experience of the eclipse, viewers need to know where and when to look, as well as how to protect their eyes from the sun’s harmful rays. The eclipse will {4} for about 3 hours, but the totality will only be for about 4 minutes, depending on the location. During this time, the temperature will drop, the sky will darken, and stars and planets will appear. There will also be other phenomena to observe, such as strange shadows, diamond rings, and the sun’s corona. A total solar eclipse is a once-in-a-lifetime opportunity that should not be {5} by anyone who loves astronomy and nature.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["difuses", "blocks", "transfers", "investigates"],
        explanation:
          "'Blocks' is correct because a solar eclipse occurs when the moon blocks the Sun's light from reaching Earth.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["highlight", "drive", "witness", "derive"],
        explanation:
          "'Witness' is correct because people witness or observe an event. The other options do not fit the meaning.",
      },
      {
        position: 3,
        correctIndex: 3,
        options: ["on", "that", "what", "where"],
        explanation:
          "'Where' correctly refers to the area in which the eclipse is visible.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["pause", "end", "reoccur", "last"],
        explanation:
          "'Last' is correct because it refers to the duration of the eclipse.",
      },
      {
        position: 5,
        correctIndex: 2,
        options: ["anticipated", "viewed", "missed", "celebrated"],
        explanation:
          "'Missed' is correct because a rare opportunity should not be missed.",
      },
    ],
  },
  {
    questionId: "FIBDD009",
    title: "Fieldwork",
    difficulty: "EASY" as const,
    content: `The main purpose of fieldwork is to {1} students a chance to {2} what they have learned in the classroom to real-life situations. By doing so, they gain experience that cannot be {3} from books alone.`,
    blanks: [
      {
        position: 1,
        correctIndex: 3,
        options: ["resemble", "stove", "rave", "offer"],
        explanation:
          "'Offer' is correct because fieldwork provides students with an opportunity.",
      },
      {
        position: 2,
        correctIndex: 0,
        options: ["apply", "compare", "align", "discount"],
        explanation:
          "'Apply' is correct because students apply classroom knowledge to real-world situations.",
      },
      {
        position: 3,
        correctIndex: 3,
        options: ["originated", "prepared", "opened", "obtained"],
        explanation:
          "'Obtained' is correct because practical experience cannot be obtained solely from books.",
      },
    ],
  },
  {
    questionId: "FIBDD010",
    title: "Apartment Renting",
    difficulty: "EASY" as const,
    content: `My name is Tonia. My roommate and I are looking for a nice apartment near my college’s campus. We are very quiet and study a lot. I study history, and my roommate studies French. We are very interested {1} renting your apartment. We can {2} the rent on time because we do a part-time work, too. Some of our friends live in the same building and have recommended your place to us. They mentioned that you are a kind and responsible landlord, and we hope to {3} the same positive experience. I would like to make an appointment to view the apartment in person. {4} application form is ready, and we are prepared to proceed with the process quickly. We look forward to hearing from you soon. Best regards, Tonia.`,
    blanks: [
      {
        position: 1,
        correctIndex: 0,
        options: ["in", "about", "at", "for"],
        explanation: "'Interested in' is the correct English collocation.",
      },
      {
        position: 2,
        correctIndex: 0,
        options: ["pay", "afford", "get", "bring"],
        explanation: "'Pay the rent' is the correct expression.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["have", "form", "meet", "decide"],
        explanation:
          "'Have the same positive experience' is the natural phrase.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["your", "we", "their", "our"],
        explanation:
          "'Our application form' correctly refers to the applicants.",
      },
    ],
  },
  {
    questionId: "FIBDD011",
    title: "Illness",
    difficulty: "EASY" as const,
    content: `He spent a {1} night, struggling with his health. It was {2} for him to continue with his duties as usual. Despite his determination and eagerness to teach, he was not permitted to {3} class due to his health condition. He was {4} to attend and fulfill his responsibilities, but his illness prevented him from doing so.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["meaningful", "restful", "painful", "helpful"],
        explanation:
          "'Painful' is correct because he was struggling with his health.",
      },
      {
        position: 2,
        correctIndex: 1,
        options: ["enjoyable", "difficult", "natural", "easy"],
        explanation: "'Difficult' logically follows from his poor health.",
      },
      {
        position: 3,
        correctIndex: 3,
        options: ["manoeurve", "cancel", "deny", "attend"],
        explanation: "'Attend class' is the correct expression.",
      },
      {
        position: 4,
        correctIndex: 1,
        options: ["exhausted", "happy", "forced", "anxious"],
        explanation:
          "'Happy' best matches his eagerness and willingness to teach.",
      },
    ],
  },
  {
    questionId: "FIBDD012",
    title: "Challenges",
    difficulty: "EASY" as const,
    content: `I feel {1} about the opportunity to take on new challenges and contribute to the team. {2} I was working at my previous job, I gained valuable experience that I believe will be beneficial in this role.

I am eager to take a {3} at your esteemed company and I am confident that my skills and experience make me a strong candidate. Please let me {4} if there are any additional steps I need to take or information I need to provide. I am looking {5} to your response.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["problem", "safe", "worry", "angry"],
        explanation:
          "'Safe' is the best available option indicating a positive feeling, although 'excited' would be more natural.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["However", "If", "Why", "While"],
        explanation:
          "'While' correctly introduces a time period during which experience was gained.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["acqusition", "nomination", "position", "hardwork"],
        explanation: "'Position' is the correct word for a job role.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["know", "show", "provide", "advice"],
        explanation: "'Let me know' is a standard professional expression.",
      },
      {
        position: 5,
        correctIndex: 0,
        options: ["forward", "backward", "never", "ever"],
        explanation: "'Looking forward to' is the correct idiom.",
      },
    ],
  },
  {
    questionId: "FIBDD013",
    title: "Mercury",
    difficulty: "EASY" as const,
    content: `Mercury is not found in many common products that we buy because it can be very dangerous. The most common products that {1} mercury are batteries, powerful outdoor lights, disinfectants, and thermometers, which are used to {2} our body's temperature. It can also be found in barometers, which are used to measure air pressure and show {3} in weather, and thermostats, which {4} the temperature of buildings. Mercury can also be found in printer and photocopy toners.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["make", "contain", "create", "release"],
        explanation:
          "'Contain' is correct because these products have mercury inside them.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["regulate", "reduce", "control", "measure"],
        explanation:
          "'Measure' is correct because thermometers measure temperature.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["moods", "feelings", "changes", "emotions"],
        explanation: "'Changes' correctly refers to variations in weather.",
      },
      {
        position: 4,
        correctIndex: 1,
        options: ["mine", "regulate", "hide", "created"],
        explanation:
          "'Regulate' is correct because thermostats control temperature.",
      },
    ],
  },
  {
    questionId: "FIBDD014",
    title: "Astro-Botany",
    difficulty: "EASY" as const,
    content: `In an intriguing development in astro-botany, researchers are exploring the potential of watermeal, the world's smallest flowering plant, in hypergravity conditions. This research {1} to assess its suitability as a sustainable food {2} and oxygen producer for astronauts. Conducted in environments mimicking space conditions, the study explores how watermeal grows and thrives under increased gravity. The plant's small size and rapid growth rate make it an {3} candidate for space cultivation. If {4}, watermeal could become a vital component of life-support systems in long-duration space missions, providing astronauts with a renewable source of food and oxygen. This research not only contributes to the advancement of space exploration but also opens up new possibilities in understanding plant biology {5} extreme conditions.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["reform", "aims", "restore", "refuses"],
        explanation:
          "'Aims' is correct because research aims to achieve a particular objective.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["force", "attack", "separate", "source"],
        explanation:
          "'Source' is correct because watermeal could serve as a food source for astronauts.",
      },
      {
        position: 3,
        correctIndex: 1,
        options: ["unrealistic", "ideal", "horrible", "evil"],
        explanation:
          "'Ideal' is correct because the passage describes characteristics that make watermeal well-suited for space cultivation.",
      },
      {
        position: 4,
        correctIndex: 2,
        options: ["low", "lost", "successful", "gone"],
        explanation:
          "'Successful' is correct because the sentence refers to the research achieving positive results.",
      },
      {
        position: 5,
        correctIndex: 1,
        options: ["without", "under", "above", "beneath"],
        explanation:
          "'Under' is correct because scientists study how plants behave under extreme conditions.",
      },
    ],
  },
  {
    questionId: "FIBDD015",
    title: "Landscape of Technology",
    difficulty: "EASY" as const,
    content: `In the ever-evolving landscape of technology, data has become the lifeblood of the digital age. With the proliferation of smartphones and the Internet of Things (IoT), we are generating {1} amounts of data every day. This data has the potential to revolutionize industries, inform decision-making, and improve our quality of life. However, it also raises concerns about privacy and {2}. The concept of data privacy is more important than ever. In the quest to collect and analyze data, companies and governments must strike a {3} between innovation and safeguarding individuals' personal information. Data breaches and the misuse of data have become all too common, eroding public trust and highlighting the need for robust {4} measures.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["exclusively", "massive", "less", "below"],
        explanation:
          "'Massive' is correct because modern technology generates enormous amounts of data daily.",
      },
      {
        position: 2,
        correctIndex: 1,
        options: ["public", "security", "media", "transparency"],
        explanation:
          "'Security' is correct because privacy and security are commonly discussed together in data protection.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["contract", "employment", "balance", "build"],
        explanation:
          "'Balance' is correct because governments and companies must balance innovation with privacy protection.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["safeguarding", "breech", "breach", "detachment"],
        explanation:
          "'Safeguarding' is correct because measures are needed to protect data and prevent misuse.",
      },
    ],
  },
  {
    questionId: "FIBDD016",
    title: "Inquisitive And Eager",
    difficulty: "EASY" as const,
    content: `Children are naturally inquisitive and eager to learn about the world around them. It is essential to create educational environments that {1} their innate curiosity and encourage a love for learning. Educators and schools should strive to {2} a curriculum that not only imparts knowledge but also fosters critical thinking, problem-solving, and creativity. In addition to traditional classroom learning, hands-on experiences and interactive activities can {3} children's understanding of complex concepts. Furthermore, it is crucial to acknowledge that every child is unique, with their own learning pace and style. Educators must {4} the diversity of learners and provide personalized support to help each child reach their full potential.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["break", "stimulate", "disregard", "deny"],
        explanation:
          "'Stimulate' is correct because educational environments should encourage and inspire curiosity.",
      },
      {
        position: 2,
        correctIndex: 0,
        options: ["implement", "leave", "supress", "abolish"],
        explanation:
          "'Implement' is correct because schools implement a curriculum.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["stop", "restrict", "enhance", "stagnate"],
        explanation:
          "'Enhance' is correct because practical activities improve children's understanding.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["recognize", "cancel", "lower", "take"],
        explanation:
          "'Recognize' is correct because educators should acknowledge and respect learner diversity.",
      },
    ],
  },
  {
    questionId: "FIBDD017",
    title: "Sleepwalking",
    difficulty: "MEDIUM" as const,
    content: `Sleepwalking is a disorder that occurs during sleep, in which a person may get up and walk around. It usually happens at {1} times of the night, especially during the deeper stages of sleep. People who sleepwalk are not aware of their actions and often do not remember {2} they have done when they wake up. Sleepwalking is more common in children than in adults, and many children grow out of it over time. Sleepwalking is not the only type of unusual sleep behavior. {3} include sleep talking, nightmares, and night terrors.`,
    blanks: [
      {
        position: 1,
        correctIndex: 0,
        options: ["certain", "random", "specific", "exact"],
        explanation:
          "'Certain' is correct because the phrase 'at certain times of the night' is a common expression referring to particular periods.",
      },
      {
        position: 2,
        correctIndex: 0,
        options: ["what", "where", "when", "how"],
        explanation:
          "'What' is correct because people often do not remember what they did while sleepwalking.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["Others", "Another", "The other", "Other"],
        explanation:
          "'Others' is correct because it refers to other types of unusual sleep behaviors.",
      },
    ],
  },

  {
    questionId: "FIBDD018",
    title: "Communication Skills",
    difficulty: "MEDIUM" as const,
    content: `In terms of your own communication skills, it is important to give just as much of your attention to a message you are receiving as to one you are giving. Listening, {1}, as well as being a method for gathering information, {2} your interest in what the other person is concerned with. This in itself can have a positive effect on your relationship with them and, if you are their manager, their motivation. Asking questions for {3} of the detail of the message can also convey that you have understood the message and that you want to respond to it {4}.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["as a result", "for example", "now that", "in addition"],
        explanation:
          "'For example' is correct because it introduces listening as an example of a communication skill.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["conveying", "to convey", "can convey", "convey"],
        explanation:
          "'Can convey' is grammatically correct and indicates that listening can demonstrate interest.",
      },
      {
        position: 3,
        correctIndex: 3,
        options: [
          "classification",
          "identification",
          "association",
          "clarification",
        ],
        explanation:
          "'Clarification' is correct because asking questions helps clarify details of a message.",
      },
      {
        position: 4,
        correctIndex: 1,
        options: [
          "prefessionally",
          "appropriately",
          "ocassionally",
          "proportionately",
        ],
        explanation:
          "'Appropriately' is correct because it refers to responding in a suitable and relevant manner.",
      },
    ],
  },
  {
    questionId: "FIBDD019",
    title: "Housing",
    difficulty: "MEDIUM" as const,
    content: `Housing is a key component of individual and family. In addition to being a place where family and friends can gather, housing is important for a sense of security and {1}. One {2} aspect of security is the wealth in the homes of owner-occupiers. The wealth of households {3} as the wealth (or equity) in the homes of owner occupiers increases through paying off outstanding housing loans, or as property values rise. In 2003-04, the primary residence was, on average, the most valuable asset of owner-occupier households, with the net value of owned homes {4} an average of 55% of the net worth of those households.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["paucity", "prowess", "privacy", "poverty"],
        explanation:
          "'Privacy' naturally pairs with security as a benefit provided by housing.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["considerate", "temporal", "significant", "consistent"],
        explanation:
          "'Significant' correctly describes an important aspect of security.",
      },
      {
        position: 3,
        correctIndex: 3,
        options: ["stablizes", "falls", "appers", "increases"],
        explanation:
          "'Increases' is correct because household wealth grows as equity and property values rise.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: [
          "accounting for",
          "resulting in",
          "depending on",
          "belonging to",
        ],
        explanation:
          "'Accounting for' correctly indicates that owned homes represented 55% of household net worth.",
      },
    ],
  },
  {
    questionId: "FIBDD020",
    title: "Insects",
    difficulty: "MEDIUM" as const,
    content: `Insects have been an important part of the human diet for thousands of years. So why has insect eating died out in the developed world? Stuart Hine, an entomologist at the Natural History Museum in London says it's a cultural {1}; insects are seen as 'dirty' and as carriers of disease. Despite this, a decade ago, insect eating seemed to be making a {2} with the publication of a number of insect recipe books. Edible, a London-based company, supplies products such as chocolate-covered ants and toasted leafcutter ants. Perhaps as we become {3} of the sentience of higher animals, insects will become the protein of choice in centuries to come.`,
    blanks: [
      {
        position: 1,
        correctIndex: 3,
        options: ["element", "instance", "item", "thing"],
        explanation:
          "'Thing' fits the expression 'it's a cultural thing', meaning a matter of culture.",
      },
      {
        position: 2,
        correctIndex: 0,
        options: ["comeback", "reaction", "repetition", "reproduction"],
        explanation:
          "'Comeback' is correct because insect eating appeared to be returning in popularity.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["aware", "cautious", "observant", "sensitive"],
        explanation:
          "'Aware' is correct because it refers to understanding the sentience of animals.",
      },
    ],
  },
  {
    questionId: "FIBDD021",
    title: "Workforce Plan",
    difficulty: "MEDIUM" as const,
    content: `The purpose of the workforce plan is to enable a business to achieve its overall objective by successfully putting its corporate strategies into action. So it is these overall business objectives and strategies that are the {1} for assessing the number and type of staff or workers that will be needed in the future. Where growth is the objective, the business {2} to increase sales by targeting new markets and launching new products. The workforce plan will need to set out {3} the people required to make this happen will be recruited, retained, developed and relocated. If cost minimization is the goal and if workforce efficiency is one of the strategies, plans will need to be in place to {4} productivity, cut wage bills or redesign the organisational structure.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["day one", "square one", "starting point", "take-off"],
        explanation:
          "'Starting point' is correct because business objectives provide the basis for workforce planning.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["had planned", "has planned", "may be planning", "planned"],
        explanation:
          "'May be planning' correctly expresses a possible business strategy for growth.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["how", "that", "what", "which"],
        explanation:
          "'How' is correct because it introduces the method by which people will be recruited and managed.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["boost", "innovate", "release", "renew"],
        explanation:
          "'Boost' is correct because increasing productivity is a common workforce objective.",
      },
    ],
  },
  {
    questionId: "FIBDD022",
    title: "Total Product",
    difficulty: "MEDIUM" as const,
    content: `One of the most important recent advances in business thinking is the recognition that people, in their purchase decision-making, respond to more than simply the tangible product or service being offered. The tangible product - a pair of shoes, a refrigerator, a haircut, or a meal - is simply a small part of the total consumption {1}. Buyers respond to a total product. It includes the services, warranty, packaging, advertising, financing, pleasantries, images and other features that {2} the product. One of the most significant features of the total product is the place where it is bought or {3}. In some cases, the place, more specifically the atmosphere of the place, is more {4} than the product itself in the purchase decision. In some cases, the atmosphere is the primary product.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["baggage", "package", "packet", "whole"],
        explanation:
          "'Package' is correct because the phrase 'total consumption package' refers to the complete offering.",
      },
      {
        position: 2,
        correctIndex: 0,
        options: ["accompany", "associate", "combine", "contain"],
        explanation:
          "'Accompany' is correct because these features come along with the product.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["consumed", "entertained", "packaged", "sold"],
        explanation:
          "'Consumed' is correct because products are bought or consumed by customers.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["influence", "influenced", "influencing", "influential"],
        explanation:
          "'Influential' is correct because it describes the atmosphere's impact on purchasing decisions.",
      },
    ],
  },

  {
    questionId: "FIBDD023",
    title: "Major Sporting Events",
    difficulty: "MEDIUM" as const,
    content: `Future sporting mega-events and other forms of festival capitalism will continue to attract diverse forms of oppression, criticism, and compliance. If critical forces are to enhance their impacts, it is important that they engage fully with a wide cross-section of critics at the {1} and national levels while also seeking to avoid {2} spaces for the location of public protests. More significantly, such opposition groups might also note the potential of other approaches toward resisting or transgressing festival capitalism. Spectacular neo-tribal activities, situationist performances and {3} with radical community-based organisations all provide ways in which public attention might be diverted and captured. At the same time, these practises also seek to evade, or to mock, or to challenge symbolically, some of the key issues {4} the hosting of sporting mega-events raises concerning political economy, security, and social justice.`,
    blanks: [
      {
        position: 1,
        correctIndex: 0,
        options: ["community", "disunity", "isolation", "solitude"],
        explanation:
          "'Community' is correct because the phrase 'community and national levels' is commonly used to describe local and broader societal engagement.",
      },
      {
        position: 2,
        correctIndex: 2,
        options: ["perimeter", "periodical", "peripheral", "perishable"],
        explanation:
          "'Peripheral' is correct because it refers to marginal or outlying spaces often designated for protests.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["engaging", "funding", "participating", "playing"],
        explanation:
          "'Engaging' is correct because organizations engage with community groups to build alliances and resistance movements.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["arounding", "including", "involving", "surrounding"],
        explanation:
          "'Surrounding' is correct because it refers to issues associated with or related to hosting mega-events.",
      },
    ],
  },

  {
    questionId: "FIBDD024",
    title: "Light Energy",
    difficulty: "MEDIUM" as const,
    content: `Light is usually described as a form of energy, and it is indeed a kind of electromagnetic energy, not much different from radio waves, television signals, heat, and X-rays. All of these are made up of waves that {1}, bend, interfere with one another, and react with obstacles in their path, rather like waves in water. A physicist might tell you that light, along with all its electromagnetic relatives, is really a form of matter, little different from more {2} matter such as houses, and, like them, it is made up of individual particles. Light particles, called photons, travel in streams, similar to the way in which water pours through a hose. To most people, this might sound paradoxical or illogical, as many things to do with physics seem to these days. How can light be both energy and matter, wave and particle? The reason it can be is, in fact, not at all {3}: all energy is a form of matter. Almost everybody recognizes - even if they do not understand - Einstein’s famous equation, E =mc2, which spells it out: E refers to energy and m to the mass of matter. Furthermore, all matter has some of the characteristics of waves and some of the particles, but the waves of such solid-seeming things as houses are not {4} and can generally be ignored because ordinary matter acts as if it were made up of particles.`,
    blanks: [
      {
        position: 1,
        correctIndex: 3,
        options: ["occur", "curve", "implicit", "spread"],
        explanation:
          "'Spread' is correct because waves naturally spread, bend, and interfere with one another.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["valuable", "abstract", "invisible", "substantial"],
        explanation:
          "'Substantial' is correct because houses are examples of tangible, physical matter.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["abrupt", "implicit", "complicated", "apparent"],
        explanation:
          "'Complicated' is correct because the author argues the explanation is actually not very complicated.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["discernible", "consecutive", "accurate", "responsible"],
        explanation:
          "'Discernible' is correct because the wave properties of everyday objects cannot usually be detected.",
      },
    ],
  },

  {
    questionId: "FIBDD025",
    title: "Understanding Bias",
    difficulty: "MEDIUM" as const,
    content: `A word on bias: Some consider bias to be a problem. However, we might argue here that bias is a normal part of life and human interaction. We are all biased by our upbringing, our experiences, and our perspectives. While any attempt to be {1} in your analysis is a good thing, it can be just as useful to {2} your biases in your research and arm the reader or consumer of your material accordingly. In a way, this is a form of respect to your readership; you acknowledge their critical thinking role in {3} your material and also acknowledge that {4} out all bias - no matter how professional or scientific one’s research approach might be - is ultimately impossible.`,
    blanks: [
      {
        position: 1,
        correctIndex: 1,
        options: ["optimistic", "objective", "subjective", "pessimistic"],
        explanation:
          "'Objective' is correct because objectivity is generally the goal in analysis and research.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["achieve", "assume", "acquire", "acknowledge"],
        explanation:
          "'Acknowledge' is correct because recognizing one's biases helps readers evaluate the work fairly.",
      },
      {
        position: 3,
        correctIndex: 0,
        options: ["consuming", "conducting", "confirming", "contacting"],
        explanation:
          "'Consuming' is correct because readers consume or interpret the material being presented.",
      },
      {
        position: 4,
        correctIndex: 2,
        options: ["building", "phasing", "ruling", "pushing"],
        explanation:
          "'Ruling' is correct because the phrase 'ruling out all bias' means eliminating bias completely.",
      },
    ],
  },

  {
    questionId: "FIBDD026",
    title: "Long Informative Messages",
    difficulty: "MEDIUM" as const,
    content: `The situational context of a message is key to its success. Some messages will be {1} for internal employees with a specific call to action to use the text provided to {2} a marketing effort. Others work as a means of communicating with customers and would-be customers to {3} apparent negative comments from competitors. Others may bring an array of products and services together conceptually for greater understanding for the targeted audience. Still others will {4} lengthy product feature details in a casual, friendly and unassuming manner.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["varied", "marketed", "targeted", "parted"],
        explanation:
          "'Targeted' is correct because messages are often directed at a specific audience.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["exceed", "export", "extract", "expand"],
        explanation:
          "'Expand' is correct because the text is used to broaden or support a marketing effort.",
      },
      {
        position: 3,
        correctIndex: 1,
        options: ["rebel", "rebut", "review", "reboot"],
        explanation:
          "'Rebut' is correct because it means to refute or counter negative comments.",
      },
      {
        position: 4,
        correctIndex: 0,
        options: ["deliver", "delegate", "delay", "delight"],
        explanation:
          "'Deliver' is correct because information or product details are delivered to the audience.",
      },
    ],
  },

  {
    questionId: "FIBDD027",
    title: "Goat Towers",
    difficulty: "MEDIUM" as const,
    content: `Goat towers date back over a century, but many more recent ones {1} their inspiration back to one in particular: Torre das Cabras (Tower of the Goats), a winding turret built in Portugal during the late 1800s. This particular tower {2} a jagged stone facade wrapped in a wooden ramp and topped with a round peaked roof. While not quite as aesthetically lofty as a faux Roman temple, Egyptian pyramid, or Gothic abbey, it was in many ways a product of its era, at home in a period filled with architectural follies designed to {3} up landscapes. Situated on a broad winery estate, the goat tower is one of various “artistic daydreams with no {4} explanation,” according to a 13th-generation member of the family that owns the land.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["hold", "push", "trace", "write"],
        explanation:
          "'Trace' is correct because inspiration can be traced back to an original source.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["manifests", "provides", "attempts", "features"],
        explanation:
          "'Features' is correct because it describes the tower's physical characteristics.",
      },
      {
        position: 3,
        correctIndex: 2,
        options: ["grow", "sign", "liven", "end"],
        explanation:
          "'Liven' is correct because architectural follies were intended to make landscapes more visually interesting.",
      },
      {
        position: 4,
        correctIndex: 3,
        options: ["difficult", "advanced", "aesthetic", "functional"],
        explanation:
          "'Functional' is correct because the tower lacked a practical purpose.",
      },
    ],
  },

  {
    questionId: "FIBDD028",
    title: "Skill of Presentation",
    difficulty: "MEDIUM" as const,
    content: `{1} to give a good and clear presentation to a public audience is a skill that you and your future employer will value greatly. {2} employers invariably ask for your experience in using these key skills during interviews. You need to be able to {3} what makes a good and poor presentation and offer evidence for your knowledge. So, when you are asked to give a talk or produce a poster as part of your studies, recognize the importance of developing the skills of delivery as well as conveying the content. Posters and oral presentations are forms of presentation that enable you to develop your confidence in different ways. Posters check your ability to present information {4}, and present it in an attractive and message-focused way, while oral presentations allow for more information and a more in-depth delivery.`,
    blanks: [
      {
        position: 1,
        correctIndex: 2,
        options: ["Be able", "To able", "Being able", "Able"],
        explanation:
          "'Being able' correctly functions as the subject of the sentence.",
      },
      {
        position: 2,
        correctIndex: 3,
        options: ["Primitive", "Practice", "Perspective", "Prospective"],
        explanation: "'Prospective' employers are potential future employers.",
      },
      {
        position: 3,
        correctIndex: 1,
        options: ["estimate", "articulate", "except", "expect"],
        explanation:
          "'Articulate' means to clearly express or explain an idea.",
      },
      {
        position: 4,
        correctIndex: 2,
        options: ["attentively", "adversely", "succinctly", "faithfully"],
        explanation:
          "'Succinctly' is correct because posters require concise presentation of information.",
      },
    ],
  },
];

const createFibDropdownQuestions = async () => {
  try {
    console.log(
      "Starting to add Fill in the Blanks (Dropdown) questions to the database...",
    );

    for (const questionData of questions) {
      const existingPassage = await prisma.fillBlanksDropdownPassage.findUnique(
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
            await prisma.fillBlanksDropdownBlank.update({
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

      for (const blank of questionData.blanks) {
        if (
          blank.correctIndex < 0 ||
          blank.correctIndex >= blank.options.length
        ) {
          console.log(
            `⚠️ Question ${questionData.questionId} has invalid correct index for blank ${blank.position}, skipping...`,
          );
          continue;
        }
        if (blank.options.length < 2) {
          console.log(
            `⚠️ Question ${questionData.questionId} blank ${blank.position} has less than 2 options, skipping...`,
          );
          continue;
        }
      }

      const result = await prisma.$transaction(async (tx) => {
        const passage = await tx.fillBlanksDropdownPassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            content: questionData.content,
            difficulty: questionData.difficulty,
          },
        });

        const blanks = await Promise.all(
          questionData.blanks.map((blank) =>
            tx.fillBlanksDropdownBlank.create({
              data: {
                position: blank.position,
                passageId: passage.id,
                correctIndex: blank.correctIndex,
                options: blank.options,
                explanation: blank.explanation,
              },
            }),
          ),
        );

        return { passage, blanks };
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
      console.log(`   Blanks: ${result.blanks.length}`);

      const correctAnswers = questionData.blanks
        .map(
          (blank) =>
            `{${blank.position}}: "${blank.options[blank.correctIndex]}" (option ${blank.correctIndex})`,
        )
        .join(", ");
      console.log(`   Correct answers: ${correctAnswers}`);
    }

    console.log(
      "✅ All Fill in the Blanks (Dropdown) questions have been processed successfully!",
    );

    const totalPassages = await prisma.fillBlanksDropdownPassage.count();
    const totalBlanks = await prisma.fillBlanksDropdownBlank.count();

    const easyQuestions = await prisma.fillBlanksDropdownPassage.count({
      where: { difficulty: "EASY" },
    });
    const mediumQuestions = await prisma.fillBlanksDropdownPassage.count({
      where: { difficulty: "MEDIUM" },
    });
    const hardQuestions = await prisma.fillBlanksDropdownPassage.count({
      where: { difficulty: "HARD" },
    });

    console.log(`📊 Summary:`);
    console.log(`   - Total passages: ${totalPassages}`);
    console.log(`   - Total blanks: ${totalBlanks}`);
    console.log(
      `   - Average blanks per passage: ${(totalBlanks / totalPassages).toFixed(1)}`,
    );
    console.log(`   - Easy: ${easyQuestions}`);
    console.log(`   - Medium: ${mediumQuestions}`);
    console.log(`   - Hard: ${hardQuestions}`);
  } catch (error) {
    console.error(
      "❌ Error creating Fill in the Blanks (Dropdown) questions:",
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
};

createFibDropdownQuestions();
