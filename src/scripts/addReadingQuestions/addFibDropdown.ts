import prisma from "@/lib/prisma"

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
                explanation: "'Rising' is correct because the passage describes a consistent upward trend in Earth's temperature over the past century. 'Decreasing' and 'remaining' directly contradict scientific consensus. 'Fluctuating' implies irregular change, not the steady increase described."
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["denied", "confirmed", "questioned", "ignored"],
                explanation: "'Confirmed' is correct because the sentence states greenhouse gases 'are the main culprits' — a definitive conclusion. Scientists have confirmed this through decades of research. 'Denied' and 'ignored' contradict the established scientific position."
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["trap", "release", "absorb", "reflect"],
                explanation: "'Trap' is correct because it describes the greenhouse effect accurately — gases like CO₂ trap outgoing infrared radiation, preventing heat from escaping the atmosphere. 'Release' means the opposite; 'absorb' and 'reflect' don't capture the retention mechanism."
            },
            {
                position: 4,
                correctIndex: 3,
                options: ["barely", "rarely", "hardly", "increasingly"],
                explanation: "'Increasingly' is correct because it matches the idea that effects are becoming more visible — consistent with the examples that follow (melting ice caps, rising sea levels). 'Barely', 'rarely', and 'hardly' all suggest the effects are minimal, contradicting the passage's argument."
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["dropping", "rising", "stable", "frozen"],
                explanation: "'Rising' is correct because it is a well-documented consequence of global warming — melting ice and thermal expansion of water cause sea levels to increase. 'Dropping' is the opposite; 'stable' and 'frozen' contradict the warming context."
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["resist", "ignore", "adapt", "escape"],
                explanation: "'Adapt' is correct because the sentence discusses species responding to environmental changes. In ecology, 'adapting to changes' is the standard phrase. 'Resist' implies fighting against change; 'escape' implies leaving; 'ignore' is illogical for species facing habitat shifts."
            },
            {
                position: 7,
                correctIndex: 0,
                options: ["reduce", "increase", "maintain", "measure"],
                explanation: "'Reduce' is correct because the passage argues for action against climate change, and the logical response to high carbon emissions is to lower them. 'Increase' is the opposite of what is needed; 'maintain' means keeping current levels; 'measure' is a monitoring action, not a solution."
            }
        ]
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
                explanation: "'Essential' is correct because the sentence presents exercise as necessary for good health — consistent with the positive framing of the entire passage. 'Harmful' directly contradicts the passage's argument; 'optional' and 'difficult' undermine the recommendation being made."
            },
            {
                position: 2,
                correctIndex: 2,
                options: ["weaken", "damage", "strengthen", "ignore"],
                explanation: "'Strengthen' is correct because exercise improves cardiovascular fitness — the heart and blood vessels become more efficient. 'Weaken' and 'damage' are the opposite of the passage's positive message about exercise."
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["efficient", "slow", "weak", "irregular"],
                explanation: "'Efficient' is correct because regular exercise trains the heart to pump more blood per beat (increased stroke volume), making it more efficient. 'Slow', 'weak', and 'irregular' all describe negative cardiac conditions, contradicting the benefit being described."
            },
            {
                position: 4,
                correctIndex: 1,
                options: ["increase", "reduce", "maintain", "ignore"],
                explanation: "'Reduce' is correct because exercise is well-documented to lower stress through endorphin release and physiological relaxation. The sentence pairs 'reduce stress' with 'improve mood' — both are positive outcomes. 'Increase' is the opposite effect."
            },
            {
                position: 5,
                correctIndex: 3,
                options: ["worse", "less", "poorly", "better"],
                explanation: "'Better' is correct because improved sleep quality is a recognised benefit of regular exercise. 'Worse', 'less', and 'poorly' all suggest exercise harms sleep, which contradicts the passage's positive framing."
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["discourage", "forbid", "recommend", "prohibit"],
                explanation: "'Recommend' is correct because health experts advise (not mandate or forbid) a minimum amount of exercise. 'Discourage', 'forbid', and 'prohibit' are all negative words that contradict the passage's guidance."
            }
        ]
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
                explanation: "'Evolved' is correct because the sentence describes a transformation from a small military project into a massive global network — a process of development over time. 'Shrunk' and 'disappeared' are the opposite direction; 'remained' suggests no change."
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["destroyed", "created", "abandoned", "criticized"],
                explanation: "'Created' is correct because the Department of Defense developed and launched ARPANET. 'Destroyed' is the opposite; 'abandoned' would mean they gave it up; 'criticized' is an opinion, not a creation action."
            },
            {
                position: 3,
                correctIndex: 2,
                options: ["minor", "last", "major", "temporary"],
                explanation: "'Major' is correct because the invention of the World Wide Web in 1989 is widely regarded as the most transformative moment in Internet history — it made the Internet accessible to non-technical users. 'Minor' and 'temporary' understate its significance."
            },
            {
                position: 4,
                correctIndex: 0,
                options: ["accessible", "complex", "expensive", "dangerous"],
                explanation: "'Accessible' is correct because the WWW, with its graphical browsers and hyperlinks, allowed ordinary people to use the Internet without technical expertise. 'Complex' and 'expensive' are the opposite of democratising access."
            },
            {
                position: 5,
                correctIndex: 3,
                options: ["banned", "forgotten", "criticized", "released"],
                explanation: "'Released' is correct because the first web browser (WorldWideWeb/Nexus) was publicly made available in 1990. 'Banned' and 'criticized' describe negative receptions; 'forgotten' contradicts the fact that it marked the beginning of the modern Internet era."
            },
            {
                position: 6,
                correctIndex: 1,
                options: ["avoided", "transformed", "ignored", "complicated"],
                explanation: "'Transformed' is correct because the Internet has fundamentally changed how people work, shop, learn, and socialise. The examples that follow (work, learn, shop, socialize) all illustrate profound transformation. 'Avoided' and 'ignored' contradict the pervasive presence described."
            },
            {
                position: 7,
                correctIndex: 2,
                options: ["decline", "stagnation", "growth", "confusion"],
                explanation: "'Growth' is correct because the sentence says its development 'continues to accelerate' with AI and IoT — this is expansion, not decline or stagnation. 'Decline' and 'stagnation' directly contradict the accelerating pace described."
            }
        ]
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
                explanation: "'Extremely' is correct because the passage emphasises the critical role of sleep throughout, listing serious health consequences of not getting enough. 'Slightly', 'barely', and 'moderately' all downplay its importance, contradicting the passage's tone."
            },
            {
                position: 2,
                correctIndex: 2,
                options: ["deteriorate", "weaken", "repair", "damage"],
                explanation: "'Repair' is correct because sleep is the body's recovery period — tissues are rebuilt, the immune system is strengthened, and cellular damage is fixed. 'Deteriorate', 'weaken', and 'damage' all describe harm, which is the opposite of sleep's restorative function."
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["processes", "deletes", "ignores", "confuses"],
                explanation: "'Processes' is correct because during sleep the brain consolidates experiences into long-term memories through memory consolidation. 'Deletes' and 'ignores' suggest the opposite; 'confuses' implies impairment rather than organisation."
            },
            {
                position: 4,
                correctIndex: 3,
                options: ["avoid", "reject", "fear", "require"],
                explanation: "'Require' is correct because 7-9 hours is described as the amount adults need for optimal health — it is a physiological requirement. 'Avoid', 'reject', and 'fear' are all negative responses to sleep that contradict the passage's message."
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["hobbies", "lifestyles", "dreams", "thoughts"],
                explanation: "'Lifestyles' is correct because the sentence explains why people don't sleep enough — busy schedules and daily habits (lifestyles) interfere. 'Hobbies' is too narrow; 'dreams' is what happens during sleep; 'thoughts' is not a scheduling issue."
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["help", "contribute", "lead", "prevent"],
                explanation: "'Lead' is correct because 'lead to' is the standard collocation for introducing consequences or results. 'Lack of sleep can lead to health problems' is idiomatic English. 'Contribute to' is also possible but 'lead to' is stronger and more direct here."
            }
        ]
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
                explanation: "'Popular' is correct because 'increasingly popular' is a natural collocation meaning growing in use and acceptance. The context shows renewables are gaining ground as alternatives to fossil fuels. 'Rare' and 'dangerous' are negative descriptors that contradict the passage's favourable framing."
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["wastes", "harnesses", "destroys", "blocks"],
                explanation: "'Harnesses' is correct because solar panels capture and convert sunlight into electricity — this is described as 'harnessing' energy. 'Wastes' and 'destroys' imply the opposite; 'blocks' means preventing passage, which is the reverse of capturing energy."
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["capture", "lose", "waste", "destroy"],
                explanation: "'Capture' is correct because wind turbines convert the kinetic energy of wind into electrical energy — a capturing or converting process. 'Lose', 'waste', and 'destroy' all imply energy is being dissipated rather than utilised."
            },
            {
                position: 4,
                correctIndex: 3,
                options: ["stop", "pollute", "waste", "utilize"],
                explanation: "'Utilize' is correct because hydroelectric plants make use of water flow to generate electricity. 'Stop' and 'waste' are counter-productive; 'pollute' contradicts the passage's claim that renewables don't produce harmful emissions."
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["harmful", "sustainable", "temporary", "expensive"],
                explanation: "'Sustainable' is correct because the sentence immediately explains why — they don't produce emissions and are naturally replenished. These are the two defining qualities of sustainability. 'Temporary' contradicts 'naturally replenished'; 'harmful' contradicts 'no harmful emissions'."
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["resistance", "opposition", "transition", "rejection"],
                explanation: "'Transition' is correct because the sentence describes a shift from fossil fuels to renewables — a transition. 'Resistance' and 'opposition' mean refusing to change; 'rejection' means refusing to adopt. All three contradict the passage's call for action."
            },
            {
                position: 7,
                correctIndex: 0,
                options: ["combating", "increasing", "ignoring", "encouraging"],
                explanation: "'Combating' is correct because reducing the carbon footprint is part of fighting climate change. The phrase 'combating climate change' is a standard collocation. 'Increasing' climate change is the opposite outcome; 'ignoring' and 'encouraging' contradict the environmental motivation."
            }
        ]
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
                explanation: "'Revolutionized' is correct because the title itself is 'The Digital Revolution' — the passage describes fundamental changes to life, work, and communication. 'Maintained' and 'prevented' suggest the opposite; 'complicated' has a negative connotation that doesn't match the mixed but broadly transformative framing."
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["remained", "progressively", "suddenly", "rarely"],
                explanation: "'Progressively' is correct because Moore's Law describes computers becoming steadily (progressively) smaller and more powerful over decades. 'Suddenly' implies an abrupt change inconsistent with technological evolution; 'rarely' contradicts the well-documented trend."
            },
            {
                position: 3,
                correctIndex: 2,
                options: ["separated", "divided", "consolidated", "scattered"],
                explanation: "'Consolidated' is correct because smartphones merged the functions of phones, cameras, GPS devices, music players, and computers into one device. 'Separated', 'divided', and 'scattered' all mean the opposite — breaking things apart rather than combining them."
            },
            {
                position: 4,
                correctIndex: 0,
                options: ["transformed", "destroyed", "prevented", "complicated"],
                explanation: "'Transformed' is correct because social media has fundamentally changed how people communicate and build communities. The examples that follow (virtual communities, global connections) illustrate transformation. 'Destroyed' and 'prevented' are too negative for the balanced framing."
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["solved", "created", "avoided", "prevented"],
                explanation: "'Created' is correct because the sentence introduces the challenges of digital transformation — the digital revolution brought these problems into existence. 'Solved' would mean eliminating them; 'avoided' and 'prevented' mean they didn't occur, contradicting the examples that follow."
            },
            {
                position: 6,
                correctIndex: 3,
                options: ["minor", "irrelevant", "outdated", "significant"],
                explanation: "'Significant' is correct because the passage treats privacy, cybersecurity, and digital addiction as serious contemporary issues worth addressing. 'Minor' and 'irrelevant' downplay them; 'outdated' suggests they are no longer current, which contradicts the present-tense framing."
            },
            {
                position: 7,
                correctIndex: 2,
                options: ["abandon", "ignore", "find", "reject"],
                explanation: "'Find' is correct because 'find ways to' is a natural English collocation meaning to discover solutions or strategies. The sentence calls for society to identify approaches that balance benefits and risks. 'Abandon', 'ignore', and 'reject' all suggest giving up on technology entirely."
            }
        ]
    }
]

const createFibDropdownQuestions = async () => {
    try {
        console.log("Starting to add Fill in the Blanks (Dropdown) questions to the database...")

        for (const questionData of questions) {
            const existingPassage = await prisma.fillBlanksDropdownPassage.findUnique({
                where: { questionId: questionData.questionId },
                include: { blanks: true }
            })

            if (existingPassage) {
                // Update existing blanks with explanations
                for (const blankData of questionData.blanks) {
                    const existingBlank = existingPassage.blanks.find(b => b.position === blankData.position)
                    if (existingBlank) {
                        await prisma.fillBlanksDropdownBlank.update({
                            where: { id: existingBlank.id },
                            data: { explanation: blankData.explanation }
                        })
                    }
                }
                console.log(`✅ Updated explanations for ${questionData.questionId}`)
                continue
            }

            if (questionData.blanks.length === 0) {
                console.log(`⚠️ Question ${questionData.questionId} has no blanks, skipping...`)
                continue
            }

            for (const blank of questionData.blanks) {
                if (blank.correctIndex < 0 || blank.correctIndex >= blank.options.length) {
                    console.log(`⚠️ Question ${questionData.questionId} has invalid correct index for blank ${blank.position}, skipping...`)
                    continue
                }
                if (blank.options.length < 2) {
                    console.log(`⚠️ Question ${questionData.questionId} blank ${blank.position} has less than 2 options, skipping...`)
                    continue
                }
            }

            const result = await prisma.$transaction(async (tx) => {
                const passage = await tx.fillBlanksDropdownPassage.create({
                    data: {
                        questionId: questionData.questionId,
                        title: questionData.title,
                        content: questionData.content,
                        difficulty: questionData.difficulty
                    }
                })

                const blanks = await Promise.all(
                    questionData.blanks.map(blank =>
                        tx.fillBlanksDropdownBlank.create({
                            data: {
                                position: blank.position,
                                passageId: passage.id,
                                correctIndex: blank.correctIndex,
                                options: blank.options,
                                explanation: blank.explanation
                            }
                        })
                    )
                )

                return { passage, blanks }
            })

            console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
            console.log(`   Blanks: ${result.blanks.length}`)

            const correctAnswers = questionData.blanks.map(blank =>
                `{${blank.position}}: "${blank.options[blank.correctIndex]}" (option ${blank.correctIndex})`
            ).join(', ')
            console.log(`   Correct answers: ${correctAnswers}`)
        }

        console.log("✅ All Fill in the Blanks (Dropdown) questions have been processed successfully!")

        const totalPassages = await prisma.fillBlanksDropdownPassage.count()
        const totalBlanks = await prisma.fillBlanksDropdownBlank.count()

        const easyQuestions = await prisma.fillBlanksDropdownPassage.count({ where: { difficulty: 'EASY' } })
        const mediumQuestions = await prisma.fillBlanksDropdownPassage.count({ where: { difficulty: 'MEDIUM' } })
        const hardQuestions = await prisma.fillBlanksDropdownPassage.count({ where: { difficulty: 'HARD' } })

        console.log(`📊 Summary:`)
        console.log(`   - Total passages: ${totalPassages}`)
        console.log(`   - Total blanks: ${totalBlanks}`)
        console.log(`   - Average blanks per passage: ${(totalBlanks / totalPassages).toFixed(1)}`)
        console.log(`   - Easy: ${easyQuestions}`)
        console.log(`   - Medium: ${mediumQuestions}`)
        console.log(`   - Hard: ${hardQuestions}`)

    } catch (error) {
        console.error("❌ Error creating Fill in the Blanks (Dropdown) questions:", error)
    } finally {
        await prisma.$disconnect()
    }
}

createFibDropdownQuestions()
