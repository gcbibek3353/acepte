const users = [
    {email : "testUser1@gmail.com" , password : "test_user1password" },
    {email : "testUser2@gmail.com" , password : "test_user2password" },
    {email : "testUser3@gmail.com" , password : "test_user3password" },
    {email : "testUser4@gmail.com" , password : "test_user4password" },
    {email : "testUser5@gmail.com" , password : "test_user5password" },
    {email : "testUser6@gmail.com" , password : "test_user6password" },
    {email : "testUser7@gmail.com" , password : "test_user7password" },
    {email : "testUser8@gmail.com" , password : "test_user8password" },
    {email : "testUser9@gmail.com" , password : "test_user9password" },
    {email : "testUser10@gmail.com" , password : "test_user10password" },
]

// NOTE : this approach is not going to work because authClient is a client side library and this script is running on the server side
const registerUsers = async () => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        try {
            const { data, error } = await authClient.signUp.email({
                 email: "random@gmail.com", // user email address
                 password: "random@gmail.com", // user password -> min 8 characters by default
                 name: "Random", // user display name
                 callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
               }, {
                 onRequest: (ctx) => {
                   console.log("signing UP...");
           
                   //show loading
                 },
                 onSuccess: (ctx) => {
                   console.log("signed UP");
           
                   //redirect to the dashboard or sign in page
                 },
                 onError: (ctx) => {
                   console.log("Error while signing UP");
                   // display the error message
                   alert(ctx.error.message);
                 },
               });
        } catch (error) {
            console.error(`Network error registering user ${user.email}:`, error);
        }
    }
};