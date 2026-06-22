import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";


import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const AUDIO_DIR = path.resolve(__dirname, "groupDiscussion");
const S3_SUBDIR = "speaking-group-discussion";

const questions = [
  {
    questionId: "GD001",
    title: "Complaint in Library",
    audioFile: "audio-506f98a7-2a34-4861-9b6d-a79f5c6d82d7.mp3",
    audioTranscribedText:
      "Participant 1: The library should be a quiet place for studying, but recently many students have been talking loudly and disturbing others. Participant 2: I understand the problem, but it is difficult to monitor such a large library with limited staff. You could try studying on the first floor or in the computer area. Participant 3: Unfortunately, the computer area is also noisy because students watch videos without headphones and chat loudly. Participant 1: Maybe the library should clearly separate talking areas and silent study zones. Participant 2: Talking is already allowed in the computer area, and students can contact security if there is noise in silent areas. Participant 1: The library should promote these rules more effectively. Participant 2: That is a good suggestion, and students should submit detailed feedback. Participant 3: I have also noticed students bringing drinks into the library and spilling them. Participant 2: Drinks are not allowed because they can damage books and facilities.",
    topic:
      "Library noise issues, rule enforcement, and suggestions for improving the study environment",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD002",
    title: "University Bookshop",
    audioFile: "audio-ca4cb74b-e600-44fc-a03f-cf837ddd1a13.mp3",
    audioTranscribedText:
      "Participant 1: I was sad to hear the university bookstore has closed because I enjoyed visiting it after classes. Participant 2: I agree, it was a pleasant place to browse books in my free time. Participant 3: Although e-books are convenient, physical books are still better for deep reading, and the staff were always friendly. Participant 1: E-books are portable but can strain your eyes after long use. Participant 2: I prefer physical books because I can highlight and make notes, and the staff always helped me find resources. Participant 3: The bookstore staff once kept my lost wallet safe until I returned. Participant 1: The store should have sold stationery, technology accessories, and daily necessities instead of only books. Participant 2: Selling student essentials might have attracted more customers and prevented its closure. Participant 3: A wider range of products could have made it a one-stop shop for students.",
    topic:
      "The closure of the university bookshop and ideas for adapting to students' changing needs",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD003",
    title: "Free Online Courses",
    audioFile: "audio-0f4a3842-60e3-4fb8-8a19-d0b9db4d689b.mp3",
    audioTranscribedText:
      "Participant 1: Free online courses improve accessibility, but surprisingly few learners complete them. Participant 2: Some people hesitate because they think free courses are too good to be true. Participant 3: Many learners are simply too busy, so universities should make courses more flexible or self-paced. Participant 1: Even motivated students can lose interest because independent study requires discipline and there is no financial penalty for dropping out. Participant 2: We should encourage accountability through peer groups or milestone rewards. Participant 3: Courses should be designed around learners' real-life responsibilities with supportive and flexible pathways.",
    topic:
      "The benefits, challenges, and future improvements of free online education",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD004",
    title: "Presentation Skills",
    audioFile: "audio-473cfe04-a946-4add-a8b8-141e30f76a74.mp3",
    audioTranscribedText:
      "Participant 1: I feel nervous about my upcoming presentation and worry that I might forget what to say. Participant 2: You should avoid reading directly from a script and instead practice in front of a mirror to improve body language and confidence. Participant 3: Looking at people's foreheads instead of their eyes and using color-coded notes can also reduce anxiety. Participant 1: Those tips sound useful even for formal situations. Participant 2: Strong presentation skills are valuable for interviews and professional settings. Participant 3: We should organize practice sessions and give each other feedback. Participant 2: Recording presentations can also reveal areas for improvement. Participant 1: Practicing together tomorrow would make me feel much more prepared.",
    topic:
      "Strategies for improving presentation skills and building speaking confidence",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD005",
    title: "Different Ways to University",
    audioFile: "audio-018f8c08-7aa1-4096-a37a-832340b7e97d.mp3",
    audioTranscribedText:
      "Participant 1: I dislike taking the train because it is unreliable and often makes me late for class. Participant 2: I enjoy taking the early bus because I can study during the journey, although traffic can occasionally delay it. Participant 3: I prefer running to campus and recommend cycling instead of buying a car because it saves money and provides exercise. Participant 1: I might switch to the bus but worry about missing a seat. Participant 2: The first morning bus is usually quiet and leaves enough time before classes. Participant 3: Cycling is also a good backup except on rainy days. Participant 1: I will try the bus first and consider buying a used bicycle later.",
    topic: "Comparing transportation options for commuting to university",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD006",
    title: "Housing Decisions",
    audioFile: "audio-637179fa-d5ce-4c3b-bd0c-9c5287b354c2.mp3",
    audioTranscribedText:
      "Participant 1: I enjoy living in the dormitory because I can cook with others, make friends, and experience different cultures. Participant 2: I prefer university housing because it is close to classes and provides useful study groups. Participant 3: I recently rented a private apartment because I wanted more privacy and less noise. Participant 1: Shared cooking has allowed me to exchange recipes and cultures with roommates. Participant 3: In the dormitory, people often took my food and there was little personal space. Participant 2: Dorm study sessions helped improve my academic performance. Participant 3: Although my apartment is farther from campus, the peace and privacy make it worthwhile.",
    topic:
      "Comparing dormitory living with private accommodation for university students",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD007",
    title: "Project Meeting Place",
    audioFile: "audio-81944b74-4557-4868-9c94-52fbb248a872.mp3",
    audioTranscribedText:
      "Participant 1: I suggest meeting in the university library because we can easily access books and study rooms. Participant 2: The library is usually crowded and noisy, so it may not be ideal for discussion. Participant 3: We could borrow books from the library and then continue our meeting in a coffee shop. Participant 1: Honey Cup might be a good choice because it has plenty of seating. Participant 2: I need to go home briefly to receive a package but can join later. Participant 3: Just let us know when you leave home so we know when to expect you. Participant 2: Honey Cup is usually quieter than other cafés nearby. Participant 3: We will meet at the library first and then move to the coffee shop to work on the project.",
    topic: "Choosing an effective meeting place for a university group project",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD008",
    title: "Volunteering Experience",
    audioFile: "audio-0bf779d4-34c4-490f-b8dc-8c1138262203.mp3",
    audioTranscribedText:
      "Speaker 1: Works as an orientation leader, enjoys helping new students, but finds it stressful during busy events. Gains leadership and communication skills. \nSpeaker 2: Volunteers at a library, enjoys organizing and giving back to the community, but finds shelving books and standing tiring. Learns problem-solving and analytical skills. \nSpeaker 3: Volunteers at an animal shelter, enjoys helping animals but finds the work emotionally and physically tiring. Develops multitasking and teamwork skills. \nAll agree volunteering builds useful life skills and is rewarding despite challenges.",
    topic: "Different student volunteering experiences and skills gained",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD009",
    title: "Keeping Small Pets in Dormitory",
    audioFile: "audio-b4bb997a-90d9-49c3-b7db-6ee6c0f6c5a4.mp3",
    audioTranscribedText:
      "Speaker 1 supports allowing small pets in dorms, saying they reduce stress and are quiet. Speaker 2 opposes due to hygiene issues, smell, and allergies. Speaker 3 suggests a compromise with strict rules, hygiene checks, and pet supervisors. They discuss supervision problems and agree on structured rules for approval.",
    topic: "Whether small pets should be allowed in university dormitories",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD010",
    title: "Evening Self-study",
    audioFile: "audio-3e0c0b4b-775d-450a-8f01-1b0be018b67e.mp3",
    audioTranscribedText:
      "Speaker 1 supports canceling evening self-study to improve focus and flexibility. Speaker 2 agrees, saying it helps group work and reduces stress. Speaker 3 is initially concerned about discipline but suggests a trial period. All agree on testing the idea with workshops and optional study groups.",
    topic: "Debate on canceling compulsory evening self-study sessions",
    difficulty: "MEDIUM" as const,
  },
  {
    questionId: "GD011",
    title: "Textbook Alternatives",
    audioFile: "audio-d768b02b-cf6f-45af-96fd-fbad69cc8c42.mp3",
    audioTranscribedText:
      "Students discuss replacing expensive textbooks with open-source alternatives. They highlight affordability, accessibility, and flexibility, while concerns include quality, copyright issues, and lack of supplementary materials. They suggest university review and pilot programs.",
    topic: "Using open-source textbooks instead of traditional ones",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD012",
    title: "Alumni Engagement",
    audioFile: "audio-351e9f9b-446c-4c67-9a81-f65c3cb04aba.mp3",
    audioTranscribedText:
      "A student, professor, and alumni officer discuss improving alumni engagement. Ideas include mentorship programs, internships, guest talks, and online platforms. Challenges include maintaining long-term interest. They suggest pilot mentorship programs and stronger university-alumni connections.",
    topic: "Strengthening university alumni networks and student support",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD013",
    title: "Collaborative Degree Programs",
    audioFile: "audio-b95f59d0-2185-4ff3-81b5-5f25ac447f5a.mp3",
    audioTranscribedText:
      "Students and a professor discuss interdisciplinary degrees. They highlight benefits like innovation, employability, and broader skills. Challenges include curriculum design, workload, and accreditation. They suggest starting with minors, certificates, and industry collaboration.",
    topic: "Interdisciplinary and collaborative university degree programs",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD014",
    title: "Transportation Equity Plan",
    audioFile: "audio-25c119c7-03c3-43e4-9f52-845486e4668c.mp3",
    audioTranscribedText:
      "Students and staff discuss free public transportation for students. Benefits include affordability, sustainability, and equal access. Challenges include cost and implementation. Suggestions include subsidies, partial discounts, or opt-in systems.",
    topic: "Free or discounted public transport for university students",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD015",
    title: "Essential Communication Skills",
    audioFile: "audio-5f03cc7f-6a63-4a67-99af-4230d2e01aed.mp3",
    audioTranscribedText:
      "Students and a professor debate making communication skills mandatory. They agree it improves confidence, employability, and presentation ability. Concerns include student anxiety and curriculum load. They suggest starting as an elective or first-year course.",
    topic: "Making communication and public speaking mandatory in university",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD016",
    title: "Learning Beyond Lectures",
    audioFile: "audio-58b02374-8405-4389-8def-f70f87d17885.mp3",
    audioTranscribedText:
      "Students discuss attending extracurricular workshops and seminars. They highlight benefits like career skills, networking, and certificates. Issues include time constraints and lack of awareness. Suggestions include better promotion and partial course credit.",
    topic: "Value of extracurricular academic workshops and seminars",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD017",
    title: "Real-World Learning",
    audioFile: "audio-f5047d16-5366-44fa-a592-b74248bbaa30.mp3",
    audioTranscribedText:
      "Students and a professor discuss making assignments more industry-based. They support real-world projects, case studies, and collaborations. Concerns include feasibility and grading difficulty. Suggestions include pilot projects and public data-based tasks.",
    topic: "Using real-world industry problems in university assignments",
    difficulty: "HARD" as const,
  },
  {
    questionId: "GD018",
    title: "Campus Accessibility",
    audioFile: "audio-fe322ca1-129c-43e6-81d6-977fbaf45d96.mp3",
    audioTranscribedText:
      "Students and admin discuss improving campus accessibility for disabled students. Topics include physical infrastructure, learning support, and faculty training. Solutions include universal design, awareness campaigns, and student inclusion in planning.",
    topic: "Improving accessibility and inclusion on university campuses",
    difficulty: "HARD" as const,
  },
];

const createGroupDiscussionQuestions = async () => {
  try {
    console.log(
      "Starting to add Group Discussion questions to the database...",
    );

    for (const questionData of questions) {
      const existingQuestion =
        await prisma.speakingGroupDiscussionQuestion.findUnique({
          where: { questionId: questionData.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${questionData.questionId} already exists, skipping...`,
        );
        continue;
      }

      console.log(
        `⬆️  Uploading audio for ${questionData.questionId}: ${questionData.audioFile}`,
      );
      const audioUrl = await uploadAudioToS3(
        AUDIO_DIR,
        questionData.audioFile,
        S3_SUBDIR,
      );
      console.log(`   → ${audioUrl}`);

      await prisma.speakingGroupDiscussionQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl,
          audioTranscribedText: questionData.audioTranscribedText,
          topic: questionData.topic,
          difficulty: questionData.difficulty,
        },
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
    }

    console.log(
      "✅ All Group Discussion questions have been processed successfully!",
    );

    const totalQuestions = await prisma.speakingGroupDiscussionQuestion.count();
    console.log(
      `📊 Total Group Discussion questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating Group Discussion questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createGroupDiscussionQuestions();
