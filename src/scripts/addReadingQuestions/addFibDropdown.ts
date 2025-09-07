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
                options: ["decreasing", "remaining", "rising", "fluctuating"]
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["denied", "confirmed", "questioned", "ignored"]
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["trap", "release", "absorb", "reflect"]
            },
            {
                position: 4,
                correctIndex: 3,
                options: ["barely", "rarely", "hardly", "increasingly"]
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["dropping", "rising", "stable", "frozen"]
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["resist", "ignore", "adapt", "escape"]
            },
            {
                position: 7,
                correctIndex: 0,
                options: ["reduce", "increase", "maintain", "measure"]
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
                options: ["harmful", "essential", "optional", "difficult"]
            },
            {
                position: 2,
                correctIndex: 2,
                options: ["weaken", "damage", "strengthen", "ignore"]
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["efficient", "slow", "weak", "irregular"]
            },
            {
                position: 4,
                correctIndex: 1,
                options: ["increase", "reduce", "maintain", "ignore"]
            },
            {
                position: 5,
                correctIndex: 3,
                options: ["worse", "less", "poorly", "better"]
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["discourage", "forbid", "recommend", "prohibit"]
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
                options: ["shrunk", "disappeared", "remained", "evolved"]
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["destroyed", "created", "abandoned", "criticized"]
            },
            {
                position: 3,
                correctIndex: 2,
                options: ["minor", "last", "major", "temporary"]
            },
            {
                position: 4,
                correctIndex: 0,
                options: ["accessible", "complex", "expensive", "dangerous"]
            },
            {
                position: 5,
                correctIndex: 3,
                options: ["banned", "forgotten", "criticized", "released"]
            },
            {
                position: 6,
                correctIndex: 1,
                options: ["avoided", "transformed", "ignored", "complicated"]
            },
            {
                position: 7,
                correctIndex: 2,
                options: ["decline", "stagnation", "growth", "confusion"]
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
                options: ["slightly", "extremely", "barely", "moderately"]
            },
            {
                position: 2,
                correctIndex: 2,
                options: ["deteriorate", "weaken", "repair", "damage"]
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["processes", "deletes", "ignores", "confuses"]
            },
            {
                position: 4,
                correctIndex: 3,
                options: ["avoid", "reject", "fear", "require"]
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["hobbies", "lifestyles", "dreams", "thoughts"]
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["help", "contribute", "lead", "prevent"]
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
                options: ["rare", "expensive", "popular", "dangerous"]
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["wastes", "harnesses", "destroys", "blocks"]
            },
            {
                position: 3,
                correctIndex: 0,
                options: ["capture", "lose", "waste", "destroy"]
            },
            {
                position: 4,
                correctIndex: 3,
                options: ["stop", "pollute", "waste", "utilize"]
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["harmful", "sustainable", "temporary", "expensive"]
            },
            {
                position: 6,
                correctIndex: 2,
                options: ["resistance", "opposition", "transition", "rejection"]
            },
            {
                position: 7,
                correctIndex: 0,
                options: ["combating", "increasing", "ignoring", "encouraging"]
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
                options: ["maintained", "prevented", "complicated", "revolutionized"]
            },
            {
                position: 2,
                correctIndex: 1,
                options: ["remained", "progressively", "suddenly", "rarely"]
            },
            {
                position: 3,
                correctIndex: 2,
                options: ["separated", "divided", "consolidated", "scattered"]
            },
            {
                position: 4,
                correctIndex: 0,
                options: ["transformed", "destroyed", "prevented", "complicated"]
            },
            {
                position: 5,
                correctIndex: 1,
                options: ["solved", "created", "avoided", "prevented"]
            },
            {
                position: 6,
                correctIndex: 3,
                options: ["minor", "irrelevant", "outdated", "significant"]
            },
            {
                position: 7,
                correctIndex: 2,
                options: ["abandon", "ignore", "find", "reject"]
            }
        ]
    }
]

const createFibDropdownQuestions = async () => {
    try {
        console.log("Starting to add Fill in the Blanks (Dropdown) questions to the database...")

        for (const questionData of questions) {
            // Check if passage already exists
            const existingPassage = await prisma.fillBlanksDropdownPassage.findUnique({
                where: { questionId: questionData.questionId }
            })

            if (existingPassage) {
                console.log(`Question ${questionData.questionId} already exists, skipping...`)
                continue
            }

            // Validate blanks
            if (questionData.blanks.length === 0) {
                console.log(`⚠️ Question ${questionData.questionId} has no blanks, skipping...`)
                continue
            }

            // Validate each blank
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

            // Create passage and blanks in a transaction
            const result = await prisma.$transaction(async (tx) => {
                // Create the passage
                const passage = await tx.fillBlanksDropdownPassage.create({
                    data: {
                        questionId: questionData.questionId,
                        title: questionData.title,
                        content: questionData.content,
                        difficulty: questionData.difficulty
                    }
                })

                // Create the blanks
                const blanks = await Promise.all(
                    questionData.blanks.map(blank =>
                        tx.fillBlanksDropdownBlank.create({
                            data: {
                                position: blank.position,
                                passageId: passage.id,
                                correctIndex: blank.correctIndex,
                                options: blank.options
                            }
                        })
                    )
                )

                return { passage, blanks }
            })

            console.log(`✅ Created question: ${questionData.questionId} - ${questionData.title}`)
            console.log(`   Blanks: ${result.blanks.length}`)

            // Show correct answers for reference
            const correctAnswers = questionData.blanks.map(blank =>
                `{${blank.position}}: "${blank.options[blank.correctIndex]}" (option ${blank.correctIndex})`
            ).join(', ')
            console.log(`   Correct answers: ${correctAnswers}`)
        }

        console.log("✅ All Fill in the Blanks (Dropdown) questions have been processed successfully!")

        // Display summary
        const totalPassages = await prisma.fillBlanksDropdownPassage.count()
        const totalBlanks = await prisma.fillBlanksDropdownBlank.count()

        const easyQuestions = await prisma.fillBlanksDropdownPassage.count({
            where: { difficulty: 'EASY' }
        })
        const mediumQuestions = await prisma.fillBlanksDropdownPassage.count({
            where: { difficulty: 'MEDIUM' }
        })
        const hardQuestions = await prisma.fillBlanksDropdownPassage.count({
            where: { difficulty: 'HARD' }
        })

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

// Execute the function
createFibDropdownQuestions()