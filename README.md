# Acepte - PTE Practice Platform

A comprehensive online platform for PTE (Pearson Test of English) exam preparation, offering practice tests and mock exams across all four language skills.

## 🎯 About

Acepte is a full-stack web application designed to help students prepare for the PTE Academic exam. The platform provides structured practice sessions, mock tests, and performance tracking across all PTE question types.

## ✨ Features

### 📝 Practice Modules
- **Speaking**: Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture, Answer Short Question, Summarize Group Discussion, Respond to a Situation
- **Writing**: Summarize Written Text, Write Essay
- **Reading**: Fill in the Blanks (Dropdown & Drag-and-Drop), Multiple Choice (Single & Multiple), Re-order Paragraphs
- **Listening**: Summarize Spoken Text, Multiple Choice, Fill in the Blanks, Highlight Correct Summary, Select Missing Word, Highlight Incorrect Words, Write From Dictation

### 🔧 Core Functionality
- **User Authentication**: Secure login/registration system
- **Question Filtering**: Filter by difficulty (Easy/Medium/Hard), bookmark status, and completion status
- **Progress Tracking**: Track answered questions and bookmark important ones
- **Mock Tests**: Full-length practice exams simulating real PTE conditions
- **Performance Analytics**: Dashboard with detailed performance insights

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Intuitive Navigation**: Easy-to-use interface with clear practice module organization
- **Real-time Feedback**: Immediate scoring and feedback on practice attempts
- **Audio Integration**: Built-in audio player for listening and speaking modules

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Better Auth
- **AI Integration**: Google AI for automated scoring
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (protected)/        # Protected user dashboard & practice
│   ├── (unprotected)/      # Public pages
│   └── api/                # API routes
├── components/             # Reusable UI components
│   ├── Practice/          # Practice-specific components
│   ├── ui/                # Base UI components
│   └── Navbar.tsx         # Main navigation
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
└── scripts/               # Database seeding scripts
```

## 🚀 Setup Guide

Follow these steps to set up the project:

1. **Install dependencies**
    ```bash
    pnpm install
    ```

2. **Configure environment variables**
    - Copy `.env.example` to `.env`
    - Add your credentials for the following variables in `.env`:
      - `DATABASE_URL` - PostgreSQL database connection string
      - `BETTER_AUTH_SECRET` - Secret key for authentication
      - `NEXT_PUBLIC_API_URL` - Your API base URL
      - `GOOGLE_AI_API_KEY` - Google AI API key for scoring

3. **Run database migrations**
    ```bash
    pnpm prisma migrate deploy
    ```

4. **Seed the database with practice questions**
    ```bash
    # Create dummy user for testing
    pnpx tsx src/scripts/registerUsers.tsx
    
    # Add sample questions (optional)
    pnpx tsx src/scripts/addWritingQuestions/addWriteEssayQuestions.tsx
    ```

5. **Start the development server**
    ```bash
    pnpm run dev
    ```

6. **Access the application**
    - Open [http://localhost:3000](http://localhost:3000)
    - Login with the dummy user credentials
    - Start practicing!

## 📊 Database Schema

The platform uses Prisma ORM with PostgreSQL, featuring:
- **Users**: Authentication and profile management
- **Questions**: Practice questions across all PTE modules
- **Answers**: User responses and attempts
- **Bookmarks**: Saved questions for later review
- **Scores**: Detailed scoring and performance tracking

## 🔄 API Structure

RESTful API endpoints organized by practice modules:
- `/api/v1/practice/writing/writeEssay` - Essay writing questions
- `/api/v1/practice/listening/*` - All listening module endpoints
- `/api/v1/practice/reading/*` - All reading module endpoints
- `/api/v1/practice/speaking/*` - All speaking module endpoints

## 🎓 Target Users

- **PTE Test Takers**: Students preparing for PTE Academic exam
- **English Language Learners**: Anyone looking to improve English proficiency
- **Educational Institutions**: Schools and coaching centers for student practice

## 🚧 Development Status

This project is currently in active development, focusing on:
- Core practice functionality implementation
- Question database expansion
- Performance optimization
- Mobile responsiveness improvements

## 📝 License

This project is proprietary software developed for PTE exam preparation.

---

**Ready to ace your PTE exam?** Start practicing with Acepte today! 🎯