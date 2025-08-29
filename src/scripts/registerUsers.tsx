import { auth } from "../lib/auth" // You'll need to create this first

const users = [
    { email: "testUser1@gmail.com", password: "test_user1password", name: "Test User 1" },
    { email: "testUser2@gmail.com", password: "test_user2password", name: "Test User 2" },
    { email: "testUser3@gmail.com", password: "test_user3password", name: "Test User 3" },
    { email: "testUser4@gmail.com", password: "test_user4password", name: "Test User 4" },
    { email: "testUser5@gmail.com", password: "test_user5password", name: "Test User 5" },
    { email: "testUser6@gmail.com", password: "test_user6password", name: "Test User 6" },
    { email: "testUser7@gmail.com", password: "test_user7password", name: "Test User 7" },
    { email: "testUser8@gmail.com", password: "test_user8password", name: "Test User 8" },
    { email: "testUser9@gmail.com", password: "test_user9password", name: "Test User 9" },
    { email: "testUser10@gmail.com", password: "test_user10password", name: "Test User 10" },
]

async function seedUsers() {
    console.log("Starting to seed users...")
    
    for (const user of users) {
        try {
            await auth.api.signUpEmail({
                body: {
                    email: user.email,
                    password: user.password,
                    name: user.name
                }
            })
            console.log(`✅ Created user: ${user.email}`)
        } catch (error) {
            console.error(`❌ Error creating user ${user.email}:`, error)
        }
    }
    
    console.log("User seeding completed!")
}

// Run the seeding function
seedUsers().catch(console.error)