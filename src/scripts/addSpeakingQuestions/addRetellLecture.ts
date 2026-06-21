import "dotenv/config";
import path from "path";
import prisma from "@/lib/prisma";
import { uploadAudioToS3 } from "./uploadAudio";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.resolve(__dirname, "retellLecture");
const AUDIO_S3_SUBDIR = "speaking-retell-lecture";

const questions = [
  {
    questionId: "RL001",
    title: "Part Time Job",
    audioFile: "audio-1a46de9d-2a58-490e-b898-8748c4e24dd8.mp3",
    audioTranscribedText:
      "Many university students today choose to work part-time while completing their studies, and this has become a common trend in many countries around the world. There are several advantages to taking up part-time employment while studying. Firstly, having a job allows students to gain valuable work experience, which can significantly enhance their resumes and prepare them for full-time careers after graduation. It helps them develop essential professional skills such as communication, teamwork, time management, and problem-solving. In addition, part-time work provides students with a source of income that can be used to pay for tuition fees, accommodation, or everyday expenses. This financial independence often boosts their confidence and teaches them how to handle money responsibly. Furthermore, working in a real-world environment exposes students to different people and situations, allowing them to build social networks and a better understanding of workplace culture. However, the lecturer also points out some disadvantages. Balancing work and study can be quite challenging. When students work long hours, they may feel tired and find it difficult to concentrate on their studies. This can lead to stress, lack of sleep, and a decline in academic performance. In some cases, students might even lose interest in their studies if their job becomes too demanding or time-consuming. Overall, while a part-time job can provide valuable experience and financial support, it is essential for students to plan their schedules carefully. Maintaining a healthy balance between work and education is the key to making the most of both opportunities without letting one negatively affect the other.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL002",
    title: "Gas Giants",
    audioFile: "audio-75e3eb39-4a1d-456d-b67f-a1a671d73bbe.mp3",
    audioTranscribedText:
      "So there are two theories for how the gas giants formed. One is the same theory I showed you just now core accretion, right. And the other is called disk instability and one of our colleagues at DTM has done a lot of work on that and so it's unclear exactly how they formed but you're right what we're trying to do the reason we're trying to get the higher and higher pressure in the lab is because we are trying to understand more about the pressure inside the gas giants. It's thought that the gas giants also have a metallic core, but maybe the metallic core not made of iron. Hydrogen, for example becomes metallic at a certain pressure. So it's very possible that the insides of these planets could have metallic cores, could have hydrogen cores, could have rocky portions we're not sure. But the higher pressure we can get in the lab, the closer we can get understanding the interiors of the gas giants and the exoplanet that are so big.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL003",
    title: "Television",
    audioFile: "audio-3db1f3a1-5a39-47f6-b376-d64f16e8160a.mp3",
    audioTranscribedText:
      "Television, the most pervasive and persuasive of modern technologies marked by rapid change and growth, is moving into a new era of extraordinary sophistication and versatility. It is an electronic revolution made possible by the marriage of television and computer technologies. The word television, derived from Greek and Latin roots, literally means sight from a distance. Through sophisticated electronics, television converts images into electronic impulses that can be transmitted and reconstructed on a receiver. Television is more than an electronic system; it is also a means of expression and communication. The field can be divided into broadcast television, which reaches mass audiences, and nonbroadcast television, which serves individuals or specific groups through controlled transmission. Traditionally, television has been dominated by major broadcast networks and has shaped public perception as a source of entertainment where viewers play a passive role.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL004",
    title: "Shy Fish",
    audioFile: "audio-f290ac28-023b-4d7d-8685-736b3bc7260a.mp3",
    audioTranscribedText:
      "But a new study of fish called sticklebacks shows that shy individuals actually prefer to follow fish that are similarly timid. Researchers had trios of sticklebacks with known personalities play follow the leader. The fish were placed in a tank with plastic plants at one end and hidden food at the other. Some groups had bold and shy leaders while another shy fish followed, and in others a bold fish was the follower. Researchers found that shy fish were more likely to emerge when another equally shy fish was already out. Bold followers did not seem to care which leader they followed. However, bold fish led more expeditions because they initiated more trips regardless of who followed them. The researchers concluded that sticklebacks often prefer leaders with personalities similar to their own, although bold individuals may still dominate through greater initiative.",
    imageFile: "image-c6fb85b24cacee1809a96cd0c829b760.jpeg",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL005",
    title: "Practice",
    audioFile: "audio-8b59ee38-c1ce-4039-8193-34e92eca82e1.mp3",
    audioTranscribedText:
      "Deliberate practice takes time and people also need to find and solve problems and mistakes during it. To become a high-performing solo violinist requires hundreds of hours of solitary practice. The same applies to subjects like geometry. During practice, people should identify weaknesses, focus on them, and continue deliberate improvement. Even talented individuals generally spend around ten years reaching an internationally recognized level. Therefore, there is no reason for average people to feel ashamed of practicing consistently.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL006",
    title: "Dissociation of Personalities",
    audioFile: "audio-f27900c8-ebb7-4348-abdf-e2da0ea94b03.mp3",
    audioTranscribedText:
      "Morton Prince was an American physician and psychologist whose book 'Dissociation of a Personality' became a bestseller. It describes the story of Miss Christine Beauchamp, who suffered from Multiple Personality Disorder. She exhibited three personalities known as B1, B2, and B3, each with different memories and awareness. B2 knew about B1, B3 knew both B1 and B2, while B1 knew nothing of the others. The strongest personality dominated most of the time and eventually became the primary identity. This case and theory later contributed valuable insights to crime investigation.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL007",
    title: "Advanced Machine",
    audioFile: "audio-3ed28d30-2c13-4306-a0a9-334e6e609de7.mp3",
    audioTranscribedText:
      "Biotech engineering has undergone three phases. In the first phase, simple machines were designed to help people understand the human body. Engineers realized that studying ourselves could lead to innovation. In the second phase, more complicated devices such as sutures were developed to treat wounds and study physiology. In the third phase, advanced technologies like ECG and X-ray enabled doctors to observe the body's interior without invasive procedures. These devices have greatly benefited medicine by improving diagnosis and understanding of diseases.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL008",
    title: "Happiness and Social Relations",
    audioFile: "audio-a795a9e7-05eb-43f4-9e9e-ab165b0dafb5.mp3",
    audioTranscribedText:
      "Happiness is closely connected to the frequency and quality of social relationships. Strong relationships with friends and family often increase happiness, although researchers are uncertain whether social interaction causes happiness or whether happy people naturally become more social. Evidence suggests that satisfaction with social relationships and happiness reinforce one another. Happy individuals typically spend more time with friends and family and engage in more frequent interactions.",
    difficulty: "MEDIUM" as const,
  },

  {
    questionId: "RL009",
    title: "Amelia Earhart",
    audioFile: "audio-fdbb6ce7-d96a-4356-8c87-dcc9474c959d.mp3",
    audioTranscribedText:
      "Today, I am excited to share the inspiring story of Amelia Earhart, a trailblazing aviator whose courage and determination broke barriers in the sky. She became the first female aviator to fly solo across the Atlantic Ocean and set numerous aviation records while promoting opportunities for women. Her famous 1932 transatlantic flight challenged social norms and demonstrated exceptional skill and bravery. Although her attempt to circumnavigate the globe ended in mystery in 1937, her legacy continues to inspire people to pursue ambitious goals with resilience and determination.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "RL010",
    title: "Greek Mythology",
    audioFile: "audio-65128a8f-2cbb-466c-9ab9-c506173f90a6.mp3",
    audioTranscribedText:
      "Greek mythology continues to influence modern culture through art, literature, language, and psychology. Stories of gods, heroes, and monsters have inspired countless creative works, while figures like Hercules and Odysseus remain widely recognized. Many English expressions originate from these myths, and psychologists such as Freud and Jung used mythological concepts to explain aspects of human behavior. These ancient stories remain relevant because they continue to inspire, entertain, and deepen our understanding of humanity.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "RL011",
    title: "Alan Turing",
    audioFile: "audio-ff028fe9-5e2e-4533-a329-c74ecbc7bd05.mp3",
    audioTranscribedText:
      "Alan Turing is widely regarded as the father of modern computing and artificial intelligence. During World War II, he helped break the German Enigma code at Bletchley Park, providing a crucial advantage to the Allies. Later, he developed ideas for stored-program computers and introduced the concept of the Turing Machine, which became fundamental to computer science. His 1950 paper questioned whether machines could think, laying the groundwork for artificial intelligence. Despite facing persecution, his remarkable contributions continue to shape technology and inspire innovation.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "RL012",
    title: "Jane Goodall",
    audioFile: "audio-e4cabe44-61c6-4aeb-aa9f-77455e26bf80.mp3",
    audioTranscribedText:
      "Jane Goodall transformed our understanding of chimpanzees through her pioneering research in Gombe Stream National Park. Her patient observations revealed that chimpanzees use tools, challenging previous beliefs that this behavior was unique to humans. Beyond science, she became a leading advocate for conservation and animal rights, encouraging people worldwide to protect nature. Her career demonstrates how passion, persistence, and dedication can produce discoveries with global impact.",
    difficulty: "HARD" as const,
  },

  {
    questionId: "RL013",
    title: "Night Sky",
    audioFile: "audio-fff37aa9-7d03-405f-8ba8-9ed360937e29.mp3",
    audioTranscribedText:
      "As we gaze into the night sky, astronomy reveals the grandeur of the universe and our place within it. Our solar system is only a tiny part of a vast galaxy-filled cosmos where gravity governs the motion of celestial bodies. Galaxies participate in a dynamic cosmic dance as the universe continues expanding. Human curiosity drives ongoing exploration, encouraging future generations to uncover the mysteries of space and the stars.",
    imageFile: "image-9145c974e135681ce8572facf3dae8c6.jpeg",
    difficulty: "HARD" as const,
  },

  {
    questionId: "RL014",
    title: "Green Economics",
    audioFile: "audio-8aa2b83b-6761-4829-aa87-02f0ea02e48b.mp3",
    audioTranscribedText:
      "Green economics explores the idea that economic growth and environmental sustainability can progress together. It encourages investment in renewable energy to combat climate change while creating innovation and employment opportunities. The concept also values natural capital by recognizing the economic importance of healthy ecosystems such as clean air and water. By integrating environmental considerations into economic policy, societies can pursue sustainable development and long-term prosperity.",
    difficulty: "HARD" as const,
  },
];

const createRetellLectureQuestions = async () => {
  try {
    console.log("Starting to add Retell Lecture questions to the database...");

    for (const questionData of questions) {
      const existingQuestion =
        await prisma.speakingRetellLectureQuestion.findUnique({
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
        AUDIO_S3_SUBDIR,
      );
      console.log(`   → ${audioUrl}`);

      await prisma.speakingRetellLectureQuestion.create({
        data: {
          questionId: questionData.questionId,
          title: questionData.title,
          audioUrl,
          audioTranscribedText: questionData.audioTranscribedText,
          imageUrl: null,
          difficulty: questionData.difficulty,
        },
      });

      console.log(
        `✅ Created question: ${questionData.questionId} - ${questionData.title}`,
      );
    }

    console.log(
      "✅ All Retell Lecture questions have been processed successfully!",
    );

    const totalQuestions = await prisma.speakingRetellLectureQuestion.count();
    console.log(
      `📊 Total Retell Lecture questions in database: ${totalQuestions}`,
    );
  } catch (error) {
    console.error("❌ Error creating Retell Lecture questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createRetellLectureQuestions();
