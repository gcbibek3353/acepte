import prisma from "@/lib/prisma";

const questions = [
  {
    questionId: "REORDER001",
    title: "The History of Photography",
    difficulty: "MEDIUM" as const,
    paragraphs: [
      {
        text: "Photography, derived from the Greek words 'photos' (light) and 'graphos' (drawing), literally means 'drawing with light.' This revolutionary technology has transformed how we capture, preserve, and share visual memories throughout history.",
        correctOrder: 1,
      },
      {
        text: "The first permanent photograph was created by Nicéphore Niépce in 1826 using a process called heliography. This breakthrough required an exposure time of several hours and produced a rather unclear image, but it marked the beginning of photographic history.",
        correctOrder: 2,
      },
      {
        text: "Louis Daguerre improved upon Niépce's work and developed the daguerreotype process in 1839, which reduced exposure times to just a few minutes and produced much sharper images. This made photography more practical for portrait work.",
        correctOrder: 3,
      },
      {
        text: "The invention of flexible film by George Eastman in 1888, along with his Kodak camera, made photography accessible to ordinary people. His slogan 'You press the button, we do the rest' revolutionized amateur photography.",
        correctOrder: 4,
      },
      {
        text: "Today, digital photography and smartphone cameras have made taking photos instantaneous and virtually free, allowing billions of images to be captured and shared globally every day through social media platforms.",
        correctOrder: 5,
      },
    ],
  },
  {
    questionId: "REORDER002",
    title: "The Process of Coffee Production",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Coffee production begins with planting coffee seeds, typically in nurseries where they are carefully tended until they develop into small seedlings ready for transplanting to coffee farms.",
        correctOrder: 1,
      },
      {
        text: "Once planted in the field, coffee trees take approximately 3-5 years to mature and begin producing coffee cherries. These trees require specific climate conditions, altitude, and soil quality to thrive.",
        correctOrder: 2,
      },
      {
        text: "When the coffee cherries ripen, they are harvested either by hand-picking (selective harvesting) or strip-picking (mechanical harvesting). Hand-picking ensures only ripe cherries are collected, resulting in higher quality.",
        correctOrder: 3,
      },
      {
        text: "After harvesting, the coffee cherries undergo processing to extract the beans. This can be done through either the dry method (sun-drying) or wet method (pulping and fermentation), each affecting the final flavor.",
        correctOrder: 4,
      },
      {
        text: "The processed coffee beans are then sorted, graded, and packaged for export to roasters worldwide, where they will be roasted to various degrees before being ground and brewed into the coffee we drink.",
        correctOrder: 5,
      },
    ],
  },
  {
    questionId: "REORDER003",
    title: "The Formation of Mountains",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Mountain formation, known as orogeny, is a geological process that occurs over millions of years through the interaction of tectonic plates beneath the Earth's surface.",
        correctOrder: 1,
      },
      {
        text: "When two continental plates collide, neither can sink beneath the other due to their similar density, causing the land to buckle and fold upward, creating fold mountains like the Himalayas.",
        correctOrder: 2,
      },
      {
        text: "Volcanic mountains form when molten rock (magma) from the Earth's mantle breaks through the crust, either at plate boundaries or hotspots, building up layers of solidified lava over time.",
        correctOrder: 3,
      },
      {
        text: "Fault-block mountains are created when large blocks of rock are uplifted along fault lines due to tensional forces, creating steep-sided mountain ranges with relatively flat tops.",
        correctOrder: 4,
      },
      {
        text: "Erosion and weathering continuously shape these mountains after their formation, carving valleys, peaks, and other distinctive features that we observe in mountain ranges today.",
        correctOrder: 5,
      },
    ],
  },
  {
    questionId: "REORDER004",
    title: "The Water Cycle",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "The water cycle is a continuous process that circulates water throughout the Earth's atmosphere, land, and oceans, powered primarily by energy from the sun.",
        correctOrder: 1,
      },
      {
        text: "Evaporation occurs when solar energy heats water in oceans, rivers, and lakes, transforming it from liquid into water vapor that rises into the atmosphere.",
        correctOrder: 2,
      },
      {
        text: "As water vapor rises higher into the atmosphere, it cools and condenses around tiny particles to form clouds and other forms of atmospheric moisture.",
        correctOrder: 3,
      },
      {
        text: "When water droplets in clouds become too heavy, they fall back to Earth as precipitation in the form of rain, snow, sleet, or hail, depending on atmospheric conditions.",
        correctOrder: 4,
      },
      {
        text: "The precipitated water then flows into rivers, lakes, and groundwater systems, eventually returning to the oceans where the cycle begins again, maintaining Earth's water balance.",
        correctOrder: 5,
      },
    ],
  },
  {
    questionId: "REORDER005",
    title: "The Evolution of the Internet",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "The Internet's origins trace back to the 1960s with ARPANET, a project funded by the U.S. Department of Defense to create a robust communication network that could survive nuclear attacks.",
        correctOrder: 1,
      },
      {
        text: "In the 1970s and 1980s, the development of TCP/IP protocols standardized how different computer networks could communicate with each other, laying the foundation for the modern Internet.",
        correctOrder: 2,
      },
      {
        text: "Tim Berners-Lee invented the World Wide Web in 1989 at CERN, creating the first web browser and web server, which made the Internet accessible to ordinary users through hyperlinked documents.",
        correctOrder: 3,
      },
      {
        text: "The 1990s saw explosive growth as commercial Internet service providers emerged, web browsers became user-friendly, and businesses began establishing their online presence.",
        correctOrder: 4,
      },
      {
        text: "Today's Internet encompasses social media, cloud computing, mobile connectivity, and the Internet of Things, fundamentally transforming how we communicate, work, learn, and entertain ourselves globally.",
        correctOrder: 5,
      },
    ],
  },
  {
    questionId: "REORDER006",
    title: "Photosynthesis Process",
    difficulty: "MEDIUM" as const,
    paragraphs: [
      {
        text: "Photosynthesis is the fundamental process by which plants convert light energy, usually from the sun, into chemical energy stored in glucose molecules.",
        correctOrder: 1,
      },
      {
        text: "Chlorophyll, the green pigment in plant leaves, absorbs light energy from the sun while the roots absorb water from the soil and leaves take in carbon dioxide from the air.",
        correctOrder: 2,
      },
      {
        text: "During the light-dependent reactions, chlorophyll uses absorbed light energy to split water molecules, releasing oxygen as a byproduct and generating energy-carrying molecules.",
        correctOrder: 3,
      },
      {
        text: "In the light-independent reactions (Calvin cycle), the energy-carrying molecules help convert carbon dioxide into glucose through a series of chemical reactions.",
        correctOrder: 4,
      },
      {
        text: "The glucose produced serves as food for the plant and the foundation of most food chains, while the oxygen released is essential for the survival of most life forms on Earth.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER007",
    title: "William Smith",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "William Smith, born in 1769, was interested in rocks and fossils.",
        correctOrder: 1,
      },
      {
        text: "He entered the workforce and intensively studied canals.",
        correctOrder: 2,
      },
      {
        text: "This work allowed him to travel across the country surveying canals.",
        correctOrder: 3,
      },
      {
        text: "By the time he retired, he had a large collection of distinct fossils from different layers.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER008",
    title: "Sun Energy",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Sun energy is a powerful natural source of energy.",
        correctOrder: 1,
      },
      {
        text: "It is the energy that drives Earth’s climate and weather.",
        correctOrder: 2,
      },
      {
        text: "At the same time, it provides energy to flowers and grass.",
        correctOrder: 3,
      },
      {
        text: "Therefore, sun energy plays an important role in sustaining life on Earth.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER009",
    title: "Bitcoin",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Bitcoin is an online money.",
        correctOrder: 1,
      },
      {
        text: "That's to say you need to download a mobile phone app to use such money.",
        correctOrder: 2,
      },
      {
        text: "With above done it generates a Bitcoin address.",
        correctOrder: 3,
      },
      {
        text: "This address can only be used once.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER010",
    title: "Exercise and Health",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "A group of researchers set out to investigate the relationship between exercise and mental health.",
        correctOrder: 1,
      },
      {
        text: "Participants were divided into two groups: one engaged in regular exercise, while the other remained sedentary.",
        correctOrder: 2,
      },
      {
        text: "Initially, there was no significant difference in mental health scores between the two groups.",
        correctOrder: 3,
      },
      {
        text: "Over time, the exercise group reported a notable improvement in mental well-being, suggesting a positive correlation between physical activity and mental health.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER011",
    title: "Technology and Language",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Technology has significantly impacted how languages are used and learned.",
        correctOrder: 1,
      },
      {
        text: "One example is that online platforms have made language learning more accessible to a wider audience.",
        correctOrder: 2,
      },
      {
        text: "Another example is that social media has also introduced new linguistic phenomena, such as internet slang and emojis.",
        correctOrder: 3,
      },
      {
        text: "However, this digital evolution sometimes leads to the erosion of language norms and traditional forms of communication.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER012",
    title: "Invention of Airplane",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "The invention of the airplane revolutionized long-distance travel.",
        correctOrder: 1,
      },
      {
        text: "Initially, these aircraft were basic and could only carry a few passengers.",
        correctOrder: 2,
      },
      {
        text: "Over time, advancements in technology and engineering allowed for larger and more efficient designs.",
        correctOrder: 3,
      },
      {
        text: "Consequently, today's airplanes can travel farther and faster, making global travel more accessible than ever before.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER013",
    title: "Safest Transportation",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Air travel is one of the safest modes of transportation, thanks to rigorous safety standards and technological advancements.",
        correctOrder: 1,
      },
      {
        text: "Initially, air travel faced skepticism due to high-profile accidents.",
        correctOrder: 2,
      },
      {
        text: "However, continual improvements in aircraft design, navigation technology, and pilot training have drastically reduced accidents.",
        correctOrder: 3,
      },
      {
        text: "As a result, flying is now statistically safer than driving.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER014",
    title: "Airplanes",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Airplanes play a critical role in global cargo transportation.",
        correctOrder: 1,
      },
      {
        text: "They provide the fastest way to ship goods over long distances.",
        correctOrder: 2,
      },
      {
        text: "This is especially important for time-sensitive products like perishable foods and medical supplies.",
        correctOrder: 3,
      },
      {
        text: "Therefore, the efficiency and speed of air cargo are vital in our increasingly interconnected global economy.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER015",
    title: "Beef",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Beef is a rich source of essential nutrients, including protein, iron, and B vitamins.",
        correctOrder: 1,
      },
      {
        text: "These nutrients are important for muscle growth and overall health.",
        correctOrder: 2,
      },
      {
        text: "However, excessive consumption of red meat has been linked to various health issues, such as heart disease and certain cancers.",
        correctOrder: 3,
      },
      {
        text: "Therefore, health experts often recommend moderation in beef consumption.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER016",
    title: "Livestock",
    difficulty: "EASY" as const,
    paragraphs: [
      {
        text: "Livestock play a crucial role in agriculture.",
        correctOrder: 1,
      },
      {
        text: "They not only provide meat and dairy products but also contribute to crop production through manure, which enriches soil fertility.",
        correctOrder: 2,
      },
      {
        text: "However, intensive livestock farming raises concerns about environmental sustainability and animal welfare.",
        correctOrder: 3,
      },
      {
        text: "Thus, there is a growing emphasis on sustainable farming practices.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER017",
    title: "Ripple",
    difficulty: "MEDIUM" as const,
    paragraphs: [
      {
        text: "A ring of ripples is generated when a stone is thrown into water.",
        correctOrder: 1,
      },
      {
        text: "Several rings of ripples are generated when several stones are thrown into water.",
        correctOrder: 2,
      },
      {
        text: "But just one ring of ripples is generated when ten stones are thrown into water within one second.",
        correctOrder: 3,
      },
      {
        text: "It is about 'frequency'.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER018",
    title: "Teaching and Learning",
    difficulty: "MEDIUM" as const,
    paragraphs: [
      {
        text: "Traditional concept of teachers is that teaching is a necessary step for learning.",
        correctOrder: 1,
      },
      {
        text: "It is incorrectly assumed that teaching is more important than learning.",
        correctOrder: 2,
      },
      {
        text: "However, we believe every ounce of teaching can lead to learning.",
        correctOrder: 3,
      },
      {
        text: "We know children can learn eating and sleeping without being taught.",
        correctOrder: 4,
      },
    ],
  },
  {
    questionId: "REORDER019",
    title: "Pronunciation",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Grammar is very important and is often paid attention to.",
        correctOrder: 1,
      },
      {
        text: "People also focus on vocabulary.",
        correctOrder: 2,
      },
      {
        text: "However, pronunciation is less known and people don't know how it is taught.",
        correctOrder: 3,
      },
      {
        text: "About what pronunciation is.",
        correctOrder: 4,
      },
      {
        text: "About how pronunciation is taught.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER020",
    title: "Egyptian Temple",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "We know infinitely more about the wealthy people of Egypt than we do about the ordinary people, as almost all the monuments were made for the rich and influential.",
        correctOrder: 1,
      },
      {
        text: "Houses in which ordinary Egyptians lived have not been preserved, and when most people died they were buried in simple graves with few funerary goods.",
        correctOrder: 2,
      },
      {
        text: "Most of our traditional sources of information about the Old Kingdom are those concerned with death and the rituals surrounding death: these include pyramids, tombs and graves, but also statues, reliefs and paintings.",
        correctOrder: 3,
      },
      {
        text: "Even papyri come mainly from Pyramid temples.",
        correctOrder: 4,
      },
      {
        text: "But this does not mean that death was the Egyptians' only preoccupation.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER021",
    title: "Loan",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "There are many kinds of loans available, but people should be careful not to over-borrow.",
        correctOrder: 1,
      },
      {
        text: "If loans are not managed properly, they can create long-term financial pressure and limit future financial freedom.",
        correctOrder: 2,
      },
      {
        text: "In their early life, many people are constantly repaying loans and spending most of their income every month.",
        correctOrder: 3,
      },
      {
        text: "Some people have student loans that require them to spend a large portion of their earnings during their twenties and thirties.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER022",
    title: "The Sceptical Chymist",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "With the Insights of the science of Newton's generation and beyond, the tide would turn in favour of the view that the universe is indeed made from basic building blocks.",
        correctOrder: 1,
      },
      {
        text: "Newton's contemporary, Robert Boyle, was perhaps the first to question the Aristotelian view of matter, which had dominated for nearly 2000 years.",
        correctOrder: 2,
      },
      {
        text: "In his book, The Sceptical Chymist, Boyle challenged the idea that matter was made up of the four elements of fire, earth air and water.",
        correctOrder: 3,
      },
      {
        text: "These might be good descriptions of the states of matter but not of the constituents.",
        correctOrder: 4,
      },
      {
        text: "Instead he Argument for a new list of chemical elements.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER023",
    title: "Ken Wilber",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "In our quest for answers to these perennial questions, we have turned first and foremost to the great wisdom traditions of the world.",
        correctOrder: 1,
      },
      {
        text: "Yet in modern times, these great traditions and the very notion of spirituality itself have come under fierce attack by some of our most respected intellectual institutions.",
        correctOrder: 2,
      },
      {
        text: "Can religion and spirituality continue to play a meaningful role in our increasingly complex, scientifically enlightened world?",
        correctOrder: 3,
      },
      {
        text: "These issues will be explored in this dialogue on Integral Spirituality with one of today's leading integral philosophers, Ken Wilber.",
        correctOrder: 4,
      },
    ],
  },

  {
    questionId: "REORDER024",
    title: "Causation in Criminology",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Most people assume that, If an event or condition 'causes' some effect, then the effect invariably follows the event or condition.",
        correctOrder: 1,
      },
      {
        text: "This picture of causation is unhelpful when dealing with crime.",
        correctOrder: 2,
      },
      {
        text: "The factors or conditions which criminologists regard as causing criminal behavior do not invariably result in it.",
        correctOrder: 3,
      },
      {
        text: "Instead, to a greater or lesser extent, they increase the risk of criminal behavior.",
        correctOrder: 4,
      },
      {
        text: "The more risk factors an individual has the greater the risk of their involvement in crime.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER025",
    title: "Oral Literature",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Oral literature refers to the genres of literature found in societies without writing, passed down by word of mouth.",
        correctOrder: 1,
      },
      {
        text: "Stories and poetry have long been used to transmit messages across generations.",
        correctOrder: 2,
      },
      {
        text: "Music was conveyed orally until the 11th century, when written notation and physical instruments began to emerge.",
        correctOrder: 3,
      },
      {
        text: "Teaching music was difficult in the absence of written notation and standardized instruments.",
        correctOrder: 4,
      },
      {
        text: "Today, music education is much easier thanks to notation systems and digital tools.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER026",
    title: "Coober Pedy",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "While Aboriginal people have long inhabited the area, miners first moved to Coober Pedy in 1916 after the discovery of opal in the surrounding rocks.",
        correctOrder: 1,
      },
      {
        text: "As a result of the intense heat, a number of miners living in town have chosen to live underground.",
        correctOrder: 2,
      },
      {
        text: "This has continued with much of the modern town being built underground.",
        correctOrder: 3,
      },
      {
        text: "Among the local public buildings found underground are three churches, a bookstore, an art gallery, a bar, and hotels.",
        correctOrder: 4,
      },
      {
        text: "Opals can be seen embedded in the walls of some of these hotel rooms.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER027",
    title: "Space Exploration",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Space exploration has led to numerous scientific discoveries and technological advancements.",
        correctOrder: 1,
      },
      {
        text: "Recent missions to Mars have provided valuable data about the planet's environment and potential for past life.",
        correctOrder: 2,
      },
      {
        text: "The development of reusable rockets is making space travel more cost-effective.",
        correctOrder: 3,
      },
      {
        text: "However, space exploration also raises questions about the ethics of colonizing other planets.",
        correctOrder: 4,
      },
      {
        text: "The future of space exploration may redefine humanity's place in the universe.",
        correctOrder: 5,
      },
    ],
  },

  {
    questionId: "REORDER028",
    title: "Frida Kahlo",
    difficulty: "HARD" as const,
    paragraphs: [
      {
        text: "Frida Kahlo, a Mexican painter, is known for her unique style and self-portraits that express her life and physical struggles.",
        correctOrder: 1,
      },
      {
        text: "Despite enduring severe injury and chronic pain, her artwork displayed resilience and strength.",
        correctOrder: 2,
      },
      {
        text: "As such, Frida Kahlo's work has become a powerful symbol of personal expression and overcoming adversity.",
        correctOrder: 3,
      },
      {
        text: "Specifically, her influence extends beyond the art world, inspiring individuals to embrace their challenges and channel them into creative expression.",
        correctOrder: 4,
      },
    ],
  },
];

const createReorderQuestions = async () => {
  try {
    console.log(
      "Starting to add Reorder Paragraph questions to the database...",
    );

    for (const questionData of questions) {
      // Check if passage already exists
      const existingPassage = await prisma.reorderParagraphPassage.findUnique({
        where: { questionId: questionData.questionId },
      });

      if (existingPassage) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      // Create passage with paragraphs in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the passage
        const passage = await tx.reorderParagraphPassage.create({
          data: {
            questionId: questionData.questionId,
            title: questionData.title,
            difficulty: questionData.difficulty,
          },
        });

        // Create the paragraphs
        const paragraphs = await Promise.all(
          questionData.paragraphs.map((paragraph) =>
            tx.reorderParagraphItem.create({
              data: {
                passageId: passage.id,
                text: paragraph.text,
                correctOrder: paragraph.correctOrder,
              },
            }),
          ),
        );

        return { passage, paragraphs };
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title} (${result.paragraphs.length} paragraphs)`,
      );
    }

    console.log(
      "✅ All Reorder Paragraph questions have been processed successfully!",
    );

    // Display summary
    const totalPassages = await prisma.reorderParagraphPassage.count();
    const totalParagraphs = await prisma.reorderParagraphItem.count();

    console.log(`📊 Summary:`);
    console.log(`   - Total passages: ${totalPassages}`);
    console.log(`   - Total paragraphs: ${totalParagraphs}`);
    console.log(
      `   - Average paragraphs per passage: ${(totalParagraphs / totalPassages).toFixed(1)}`,
    );
  } catch (error) {
    console.error("❌ Error creating Reorder Paragraph questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the function
createReorderQuestions();
