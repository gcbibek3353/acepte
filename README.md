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


temporary text for reference

Mock Test Frontend — Implementation Plan
Existing Assets Available for Reuse
Timer.tsx — countdown with color transitions, callback on expire ✓
AudioRecorder.tsx — full prep/record/playback cycle ✓
All practice question components (MCM, MCS, FillBlanks, DragDrop, etc.) ✓
@hello-pangea/dnd — already installed for reorder ✓
React Query v5 (@tanstack/react-query) ✓
Pages
User Pages
Route	File	Description
/mocktest	(protected)/mocktest/page.tsx	List published tests — already exists as placeholder, needs implementation
/mocktest/[testId]	(protected)/mocktest/[testId]/page.tsx	Test overview + instructions + Start button
/mocktest/[testId]/exam	(protected)/mocktest/[testId]/exam/page.tsx	Main exam interface — the big one
/mocktest/[testId]/result/[attemptId]	(protected)/mocktest/[testId]/result/[attemptId]/page.tsx	Final scores + per-question breakdown
/mocktest/attempts	(protected)/mocktest/attempts/page.tsx	User's past attempts with scores
Admin Pages
Route	File	Description
/admin_dashboard/mocktest	(admin)/admin_dashboard/mocktest/page.tsx	List all tests (DRAFT/PUBLISHED/ARCHIVED)
/admin_dashboard/mocktest/create	(admin)/admin_dashboard/mocktest/create/page.tsx	Create new test
/admin_dashboard/mocktest/[testId]	(admin)/admin_dashboard/mocktest/[testId]/page.tsx	Edit test — add sections, add/reorder questions
Components to Build
1. Shared Mock Test Components
src/components/MockTest/

Component	Purpose
TestCard.tsx	Card shown in listing — title, duration, section pills, attempt count, Start/Continue button
SectionPill.tsx	Color-coded badge (Speaking=blue, Writing=violet, Reading=emerald, Listening=amber) matching CLAUDE.md tokens
AttemptHistoryRow.tsx	Row in past attempts table — test name, date, overall score, skill scores
2. Exam Interface Components
src/components/MockTest/Exam/

Component	Purpose
ExamShell.tsx	Root container — manages active section, overall timer, keyboard shortcuts (no accidental navigation)
ExamHeader.tsx	Top bar: test title, global time remaining (uses existing Timer.tsx), current section label
SectionTransition.tsx	Modal shown between sections — "Reading section starts now. 30 minutes. Click to begin."
QuestionNavigator.tsx	Side panel grid of numbered question bubbles — grey (not visited), white (visited/answered), blue (current)
QuestionRenderer.tsx	Polymorphic switch — maps MockTestQuestionType → correct practice component, passes onAnswer callback
SectionTimer.tsx	Section-level countdown (only shown for Reading) — auto-calls completeSection on expire
ExamProgressBar.tsx	Linear bar showing answered/total within current section
3. Results Components
src/components/MockTest/Results/

Component	Purpose
ScoreCard.tsx	Hero card with overall score + four skill score chips
SkillBreakdown.tsx	Four-column grid with per-skill score + progress bar
ResponseReview.tsx	Per-question row: question type, your answer, correct answer, score (for objective questions)
PendingEvalBanner.tsx	Banner shown when speaking/writing responses are still awaiting AI evaluation
4. Admin Components
src/components/MockTest/Admin/

Component	Purpose
MockTestForm.tsx	Create/Edit form: title, description, totalTime
SectionCard.tsx	Collapsible section with timeLimit, question list, "Add Question" button
QuestionPickerModal.tsx	Modal to search and select a question by type — fetches from existing practice endpoints, shows title preview
QuestionRow.tsx	Row in section: question title, type badge, drag handle for reorder, remove button
StatusToggle.tsx	DRAFT → PUBLISHED → ARCHIVED toggle with publish validation feedback
Exam State Machine (what ExamShell.tsx manages)

Load attempt state
       ↓
currentSection = first non-completed section
       ↓
POST /section/[section]/start
       ↓
Render questions sequentially
 ↳ User answers → POST /response (debounced for text, immediate for MCQ)
 ↳ QuestionNavigator tracks answered count
       ↓
User clicks "Next Section" or SectionTimer expires
       ↓
POST /section/[section]/complete
       ↓
SectionTransition modal for next section
       ↓
Repeat until last section
       ↓
POST /attempt/[attemptId]/complete
       ↓
Redirect to /result/[attemptId]
QuestionRenderer.tsx — The Key Component
This is the most important component. It maps each MockTestQuestionType to the correct existing component:

Question Type	Component to reuse
READ_ALOUD	Practice/Speaking/Read_Aloud.tsx
REPEAT_SENTENCE	Practice/Speaking/RepeatSentence.tsx
DESCRIBE_IMAGE	Practice/Speaking/DescribeImage.tsx
RETELL_LECTURE	Practice/Speaking/RetellLecture.tsx
ANSWER_SHORT_QUESTION	Practice/Speaking/AnswerShortQuestion.tsx
WRITE_ESSAY	Practice/Writing/writeEssay/WriteEssayAnswer.tsx
SUMMARIZE_WRITTEN_TEXT	Practice/Writing/summarizeWrittenText/summarizeTextArea.tsx
READING_MCM	Practice/Reading/MCM.tsx
READING_MCS	Practice/Reading/MCS.tsx
REORDER_PARAGRAPHS	Practice/Reading/DragAndDrop.tsx
READING_FILL_BLANKS_DRAG_DROP	Practice/Reading/FibDragDrop.tsx
READING_FILL_BLANKS_DROPDOWN	Practice/Reading/FibDropDown.tsx
SUMMARIZE_SPOKEN_TEXT	Practice/Listening/SummarizeSpokenText.tsx
LISTENING_MCM	Practice/Listening/MCM.tsx
LISTENING_MCS	Practice/Listening/MCS.tsx
...all others	corresponding Practice/Listening/ component
Each component gets an onAnswer(answerData) callback prop. When the user answers, ExamShell calls POST /response with the data.

Data Fetching Strategy
Page/Component	Strategy
/mocktest listing	SSR fetch (server component) + pass as initialData to React Query
Test overview /mocktest/[testId]	SSR fetch
Exam state (resume)	Client fetch via React Query on mount — GET /attempt/[attemptId]
Submit response	useMutation — optimistic update to mark question answered in navigator
Results page	SSR fetch (attempt is completed, data is stable)
Admin listing	Client fetch via React Query
Build Order
Admin pages first (create test → add sections → add questions → publish)
Test listing + overview (user sees test, reads instructions)
ExamShell + QuestionRenderer (the core exam experience)
Results page
Attempt history page
