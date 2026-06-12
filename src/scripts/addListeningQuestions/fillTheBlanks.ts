import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import prisma from "@/lib/prisma";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUDIO_DIR = path.resolve(__dirname, "fillTheBlanks");
const SUBDIR = "listening-fill-blanks";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const bucketName = process.env.BUCKET_NAME!;
const region = process.env.AWS_REGION || "us-east-1";
const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, "");

const s3Client = new S3Client({
  region,
  endpoint: endpoint || undefined,
  credentials: { accessKeyId, secretAccessKey },
});

const buildObjectUrl = (key: string) => {
  if (endpoint) return `${endpoint}/${bucketName}/${key}`;
  if (region === "us-east-1")
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};

const CONTENT_TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".webm": "audio/webm",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
};

async function uploadAudioToS3(audioFile: string): Promise<string> {
  const filePath = path.join(AUDIO_DIR, audioFile);
  const ext = path.extname(audioFile).toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? "audio/mpeg";

  const buffer = fs.readFileSync(filePath);
  const key = `${SUBDIR}/${uuid()}${ext}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  return buildObjectUrl(key);
}

const questions = [
  {
    questionId: "FIB001",
    title: "Busy Summer at the Ice Cream Shop",
    audioTranscribedText:
      "During the summer, the ice cream shop has the same number of customers every day. People love its delicious flavors. It’s the favorite spot for many families in town because of its variety. The shop is always busy in the afternoons, especially on weekends. It stays open for long hours to serve everyone who comes by. On average, they earn about one dollar per hour per customer.",
    audioFile: "audio-e38fbaaa-f4cd-4f37-b0d3-c2e1a5f5b6d8.mp3",
    passage:
      "During the summer, the ice cream shop has the {1} number of customers every day. People love its delicious flavors. It’s the favorite spot for many {2} in town because of its variety. The shop is always busy in the afternoons, especially on weekends. It stays open for long {3} to serve everyone who comes by. On average, they {4} about one dollar per hour per customer.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "same" },
      { position: 2, correctWord: "families" },
      { position: 3, correctWord: "hours" },
      { position: 4, correctWord: "earn" },
    ],
  },
  {
    questionId: "FIB002",
    title: "The Biology of Personalities",
    audioTranscribedText:
      "Scientists have discovered that people’s personalities can be influenced by their genetic makeup. This connection between traits and DNA is fascinating. From a biology perspective, certain behaviors are linked to specific genes. These traits can often be visible in how individuals interact with others. For example, some people are naturally more outgoing than others. This research helps us understand human behavior better.",
    audioFile: "audio-765c2ec6-6405-4d91-81d7-c79873c1a1af.mp3",
    passage:
      "Scientists have discovered that people’s {1} can be influenced by their genetic makeup. This connection between traits and DNA is fascinating. From a {2} perspective, certain behaviors are linked to specific genes. These traits can often be {3} in how individuals interact with others. For example, some people are naturally more outgoing than others. This research helps us understand human behavior better.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "personalities" },
      { position: 2, correctWord: "biology" },
      { position: 3, correctWord: "visible" },
    ],
  },

  {
    questionId: "FIB003",
    title: "Traveling to Toronto by Bus",
    audioTranscribedText:
      "The city offers reliable transport options for travelers heading to different destinations. One popular route is the bus to Canada, which runs daily. It takes passengers directly to Toronto, a bustling city known for its culture and attractions. The journey is comfortable and affordable for most people.",
    audioFile: "audio-ab58e585-31a6-43e8-bbcc-88ded251eb1b.mp3",
    passage:
      "The city offers reliable {1} options for travelers heading to different destinations. One popular route is the bus to Canada, which runs {2}. It takes passengers directly to Toronto, a bustling city known for its culture and attractions. The journey is comfortable and {3} for most people.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "transport" },
      { position: 2, correctWord: "daily" },
      { position: 3, correctWord: "affordable" },
    ],
  },

  {
    questionId: "FIB004",
    title: "New Science Teacher at School",
    audioTranscribedText:
      "Mr. John is the new science teacher at our school this year. He has a passion for teaching students about the environment. His classes are always full of exciting experiments. Everyone enjoys learning from him.",
    audioFile: "audio-6debc5a2-f337-406c-ab15-b66a7d48a48c.mp3",
    passage:
      "Mr. John is the new {1} at our school this year. He has a {2} for teaching students about the environment. His classes are always full of {3} experiments. Everyone enjoys learning from him.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "science teacher" },
      { position: 2, correctWord: "passion" },
      { position: 3, correctWord: "exciting" },
    ],
  },

  {
    questionId: "FIB005",
    title: "Art Gallery Exhibition",
    audioTranscribedText:
      "At the art gallery, every painting on display captured the attention of visitors. The artist used bold techniques to create dramatic effects. One piece featured a huge portrait of a person’s face that filled the entire canvas. The lighting in the artwork created a striking shadow across the image. This made the painting look more realistic and emotional. Many people admired the creativity.",
    audioFile: "audio-392c3f3c-ff04-4c0f-8f8c-3216147f46ad.mp3",
    passage:
      "At the art gallery, {1} painting on display captured the attention of visitors. The artist used bold techniques to create dramatic effects. One piece featured a {2} portrait of a person’s {3} that filled the entire canvas. The lighting in the artwork created a striking {4} across the image. This made the painting look more realistic and emotional. Many people admired the creativity.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "every" },
      { position: 2, correctWord: "huge" },
      { position: 3, correctWord: "face" },
      { position: 4, correctWord: "shadow" },
    ],
  },

  {
    questionId: "FIB006",
    title: "Active Careers in Infrastructure",
    audioTranscribedText:
      "People who enjoy an active lifestyle often choose jobs that keep them on the move. They prefer roles that involve physical activity over sitting at a desk. These interesting jobs, like working as a tour guide, allow them to explore new places. Many of these roles also support the infrastructure of a city, such as transportation or tourism. Choosing such a career can be rewarding for those who love adventure. It keeps them engaged and motivated.",
    audioFile: "audio-a0a1fd34-6895-4433-ae6a-f793edc4f89d.mp3",
    passage:
      "People who enjoy an {1} lifestyle often choose jobs that keep them on the move. They prefer roles that involve physical activity over sitting at a desk. These {2} jobs, like working as a tour guide, allow them to explore new places. Many of these roles also support the {3} of a city, such as transportation or tourism. Choosing such a {4} can be rewarding for those who love adventure. It keeps them engaged and motivated.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "active" },
      { position: 2, correctWord: "interesting" },
      { position: 3, correctWord: "infrastructure" },
      { position: 4, correctWord: "career" },
    ],
  },

  {
    questionId: "FIB007",
    title: "Social Behavior in Children",
    audioTranscribedText:
      "Some children are naturally more sociable and enjoy interacting with others from a young age. They often make friends easily in social settings. However, a few of them might be diagnosed with social anxiety as they grow older. This condition can make it harder for them to connect with people. Early support can help them overcome these challenges. Parents and teachers play a big role in this process.",
    audioFile: "audio-1ccccedb-9594-45ba-bf0e-7f4f4dd19813.mp3",
    passage:
      "Some children are naturally more {1} and enjoy interacting with others from a young age. They often make friends easily in social settings. However, a few of them might be {2} with social anxiety as they grow older. This condition can make it harder for them to connect with people. Early support can help them {3} these challenges. Parents and teachers play a big role in this process.",
    difficulty: "EASY" as const,
    blanks: [
      { position: 1, correctWord: "sociable" },
      { position: 2, correctWord: "diagnosed" },
      { position: 3, correctWord: "overcome" },
    ],
  },
  {
    questionId: "FIB008",
    title: "Sugar and Health",
    audioTranscribedText:
      "In Sri Lanka, as elsewhere, excess sugar, salt and fat in food and beverages are the primary culprits for the rise in the number of people that are overweight or obese. By ensuring clear and accurate nutritional information is provided on food and drink packaging, and by giving each product a green, orange or red label according to its sugar content, Sri Lanka's government is helping consumers understand risks and make healthier choices.",
    audioFile: "audio-533abfc3-2dd3-4084-8a45-a6721eed60a0.mp3",
    passage:
      "In Sri Lanka, as elsewhere, excess {1}, salt and fat in food and beverages are the primary culprits for the rise in the number of people that are overweight or {2}. By ensuring clear and accurate nutritional information is provided on food and drink packaging, and by giving each product a green, orange or red label according to its sugar content, Sri Lanka's government is helping {3} understand risks and make healthier choices.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "sugar" },
      { position: 2, correctWord: "obese" },
      { position: 3, correctWord: "consumers" },
    ],
  },

  {
    questionId: "FIB009",
    title: "Building Responsibility",
    audioTranscribedText:
      "At school, the students understood that responsibilities can help build strong communities. The teacher reminded them that integrity means keeping promises even in small matters. One day, they made a discovery of ancient words in a library book, which inspired the whole class. They realized that honest actions together with shared responsibilities can shape a brighter future.",
    audioFile: "audio-bba821d6-f4e2-4003-845c-2ce3805e843d.mp3",
    passage:
      "At school, the students {1} that responsibilities can help build {2} communities. The teacher reminded them that integrity means keeping {3} even in small matters. One day, they made a discovery of ancient words in a library book, which {4} the whole class. They realized that honest actions together with shared {5} can shape a brighter future.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "understood" },
      { position: 2, correctWord: "strong" },
      { position: 3, correctWord: "promises" },
      { position: 4, correctWord: "inspired" },
      { position: 5, correctWord: "responsibilities" },
    ],
  },

  {
    questionId: "FIB010",
    title: "Javelin Competition",
    audioTranscribedText:
      "The biggest event at the sports festival was the javelin competition. Athletes from all over the country came to participate. Many people were excited to show their skills in throwing the javelin as far as possible. They were organized into different teams to compete against each other. The biggest team, which had the most experienced members, took the lead. They started the competition with an impressive throw.",
    audioFile: "audio-047dde46-9662-44e1-adf5-19dd301a8173.mp3",
    passage:
      "The {1} at the sports festival was the javelin competition. Athletes from all over the country came to participate. Many {2} were excited to show their skills in {3} the javelin as far as possible. They were organized into different {4} to compete against each other. The biggest team, which had the most experienced members, took the lead. They {5} the competition with an impressive throw.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "biggest event" },
      { position: 2, correctWord: "people" },
      { position: 3, correctWord: "throwing" },
      { position: 4, correctWord: "teams" },
      { position: 5, correctWord: "started" },
    ],
  },

  {
    questionId: "FIB011",
    title: "Local Farmers",
    audioTranscribedText:
      "Local farmers frequently experiment with new methods to grow their crops more efficiently. They want to improve their harvests each season. Different styles of farming, such as organic or vertical farming, are becoming popular. Many farms now offer subscription services to deliver their produce directly to customers. They pack fresh vegetables into a box for families to enjoy weekly. This ensures people have access to healthy food.",
    audioFile: "audio-babcb48b-ad68-4e7f-9291-364e413a61d9.mp3",
    passage:
      "Local farmers {1} experiment with new methods to grow their crops more efficiently. They want to improve their harvests each season. Different {2} of farming, such as organic or vertical farming, are becoming popular. Many {3} now offer subscription services to deliver their produce directly to customers. They pack {4} vegetables into a {5} for families to enjoy weekly.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "frequently" },
      { position: 2, correctWord: "styles" },
      { position: 3, correctWord: "farms" },
      { position: 4, correctWord: "fresh" },
      { position: 5, correctWord: "box" },
    ],
  },

  {
    questionId: "FIB012",
    title: "Food Marketing Ethics",
    audioTranscribedText:
      "Health experts often advise people to consume more fruits and vegetables for a balanced diet. These foods provide essential nutrients for the body. They also recommended limiting processed foods, which can be harmful if eaten in excess. A study diagnosed that excessive sugar intake can lead to health issues like obesity. Some advertisements promoting unhealthy snacks were even found to be offensive to certain audiences. This sparked a debate about food marketing ethics.",
    audioFile: "audio-8844ce9b-7a11-4856-aa30-c554efb21692.mp3",
    passage:
      "Health experts often advise people to {1} more fruits and vegetables for a balanced diet. These foods provide essential nutrients for the body. They also {2} limiting processed foods, which can be harmful if eaten in excess. A study {3} that excessive sugar intake can lead to {4} like obesity. Some advertisements promoting unhealthy snacks were even found to be {5} to certain audiences.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "consume" },
      { position: 2, correctWord: "recommended" },
      { position: 3, correctWord: "diagnosed" },
      { position: 4, correctWord: "health issues" },
      { position: 5, correctWord: "offensive" },
    ],
  },

  {
    questionId: "FIB013",
    title: "Robotic Surgery",
    audioTranscribedText:
      "This new type of surgery is performed with a camera, remotely, and with a robot. This robotic surgery method is capable of performing complex tasks. Surgeons must undergo new training to operate the robotic systems efficiently. With this method, the surgeons can operate the procedure with enhanced precision and control.",
    audioFile: "audio-1064fb4b-edf6-4110-acfa-c03eeda4b846.mp3",
    passage:
      "This robotic surgery method is capable of performing {1} tasks. Surgeons must undergo {2} training to {3} the robotic systems efficiently. With this method, the surgeons can operate the procedure with enhanced {4} and control.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "complex" },
      { position: 2, correctWord: "new" },
      { position: 3, correctWord: "operate" },
      { position: 4, correctWord: "precision" },
    ],
  },

  {
    questionId: "FIB014",
    title: "Park",
    audioTranscribedText:
      "The park is known for its unique forests and stunning mountains. Every year, it attracts thousands of visitors. A popular road runs through the center of the park, and the road stretches for several miles.",
    audioFile: "audio-1aa39f88-21cc-4c0e-a932-dcbb52365f53.mp3",
    passage:
      "The park is known for its {1} forests and stunning mountains. Every year, it attracts thousands of {2}. A popular road runs through the center of the park, and the road stretches for several {3}.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "unique" },
      { position: 2, correctWord: "visitors" },
      { position: 3, correctWord: "miles" },
    ],
  },

  {
    questionId: "FIB015",
    title: "Journalism Internship",
    audioTranscribedText:
      "The university offers a placement program for students interested in media careers. This opportunity allows them to work at a local news station. Each student becomes a journalist intern, learning how to report news professionally. They gain valuable experience in writing and interviewing during this time. On average, the program lasts about three months, giving students enough time to develop their skills. Many graduates find jobs in media after completing it.",
    audioFile: "audio-bfca2b31-6f13-414c-9ee5-be0a578541ea.mp3",
    passage:
      "The university offers a {1} for students interested in media careers. This opportunity allows them to work at a local news station. Each student becomes a {2} intern, learning how to report news professionally. They gain {3} in writing and interviewing during this time. On {4}, the program lasts about three months, giving students enough time to develop their skills.",
    difficulty: "MEDIUM" as const,
    blanks: [
      { position: 1, correctWord: "placement program" },
      { position: 2, correctWord: "journalist" },
      { position: 3, correctWord: "valuable experience" },
      { position: 4, correctWord: "average" },
    ],
  },

  {
    questionId: "FIB016",
    title: "Kashmiri Tourism",
    audioTranscribedText:
      "Two decades ago, Kashmiri houseboat-owners rubbed their hands every spring at the prospect of the annual influx of tourists. From May to October, the hyacinth-choked waters of Dal Lake saw flotillas of vividly painted Shikaras carrying Indian families, boho westerners, young travelers and wide-eyed Japanese. Carpet-sellers honed their skills, as did purveyors of anything remotely embroidered while the house boats initiated by the British Raj provided unusual accommodation. Any foreigners venturing there risked their lives, proved in 1995 when five young Europeans were kidnapped and murdered.",
    audioFile: "audio-6ddf711a-363c-4e71-a10d-d18ea5e9a560.mp3",
    passage:
      "Two decades ago, Kashmiri houseboat-owners rubbed their hands every spring at the prospect of the annual influx of {1}. From May to October, the hyacinth-choked waters of Dal Lake saw flotillas of vividly painted Shikaras carrying Indian families, boho westerners, young travelers and wide-eyed Japanese. Carpet-sellers {2} their skills, as did purveyors of anything remotely embroidered while the {3} by the British Raj provided unusual accommodation. Any foreigners venturing there risked their {4}, proved in 1995 when five young Europeans were {5} and murdered.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "tourists" },
      { position: 2, correctWord: "honed" },
      { position: 3, correctWord: "house boats initiated" },
      { position: 4, correctWord: "lives" },
      { position: 5, correctWord: "kidnapped" },
    ],
  },

  {
    questionId: "FIB017",
    title: "Sceptical Environmentalist",
    audioTranscribedText:
      "Some years ago, Bjorn Lomborg, a young Danish statistician, published a book called The Skeptical Environmentalist. It became a bestseller and generated a lot of heat. Lomborg was attacked, abused and accused of all manner of things; not because he denied the fact of global warming - in fact he affirmed it - but because, on his analysis, the devil and, he says, a lot of deviousness was contained in the details presented concerning the size of the problem and what were the most responsible steps to take in response to global warming.",
    audioFile: "audio-241c3c9c-42fa-4d75-a2fd-7989d078a820.mp3",
    passage:
      "Some years ago, Bjorn Lomborg, a young Danish statistician, published a book called The {1} Environmentalist. It became a bestseller and generated a lot of heat. Lomborg was attacked, {2} and accused of all manner of things; not because he denied the fact of global warming - in fact he {3} it - but because, on his analysis, the devil and, he says, a lot of {4} was contained in the details presented concerning the size of the problem and what were the most {5} steps to take in response to global warming.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "Skeptical" },
      { position: 2, correctWord: "abused" },
      { position: 3, correctWord: "affirmed" },
      { position: 4, correctWord: "deviousness" },
      { position: 5, correctWord: "responsible" },
    ],
  },

  {
    questionId: "FIB018",
    title: "Space Exploration",
    audioTranscribedText:
      "Space exploration has always been a source of endless fascination and scientific discovery. From the first human landing on the Moon in 1969 to the recent exploration of Mars, humans have been driven by their innate curiosity to understand the universe beyond our planet. The development of advanced propulsion technologies has allowed us to send robotic spacecraft to explore distant worlds in our solar system. These missions have provided valuable insights into the geology, climate, and potential habitability of other celestial bodies. Looking forward, the next frontier in space exploration is the search for exoplanets beyond our solar system, which could potentially harbor extraterrestrial life.",
    audioFile: "audio-c6b19c2b-0836-4019-b544-bdb16cae0646.mp3",
    passage:
      "Space exploration has always been a source of endless {1} and scientific discovery. From the first human landing on the Moon in 1969 to the recent exploration of Mars, humans have been driven by their innate {2} to understand the universe beyond our planet. The development of advanced {3} technologies has allowed us to send robotic spacecraft to explore distant worlds in our solar system. Looking forward, the next frontier in space {4} is the search for exoplanets beyond our solar system, which could potentially {5} extraterrestrial life.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "fascination" },
      { position: 2, correctWord: "curiosity" },
      { position: 3, correctWord: "propulsion" },
      { position: 4, correctWord: "exploration" },
      { position: 5, correctWord: "harbor" },
    ],
  },

  {
    questionId: "FIB019",
    title: "Dr. Google",
    audioTranscribedText:
      "Doctors have been concerned for a long time about people googling their symptoms. There's this term 'Dr. Google,' which is really frustrating to a lot of physicians, because people come in and think that they know what they have without having the actual expertise or context, just by having looked up, 'I have a headache. What does it mean?' GPT software is much better at actually being accurate in determining what patients have and asking sometimes follow-up questions that will help it further hone in on the correct diagnosis. Companies are starting to study this. And preliminary research suggests the AIs are surprisingly accurate. Studies have shown that they work better than online symptom checkers and are also better than some untrained humans.",
    audioFile: "audio-f302eb1d-0714-47ee-8975-3507a89c1ad2.mp3",
    passage:
      "Doctors have been concerned for a long time about people googling their symptoms. There's this term 'Dr. Google,' which is really frustrating to a lot of physicians, because people come in and think that they know what they have without having the actual {1}, just by having looked up symptoms online. GPT software is much better at actually being accurate in {2} what patients have. Companies are starting to study this. And {3} research suggests the AIs are surprisingly accurate. Studies have shown that they work better than online {4} checkers and are also better than some {5}.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "expertise or context" },
      { position: 2, correctWord: "determining" },
      { position: 3, correctWord: "preliminary" },
      { position: 4, correctWord: "symptom" },
      { position: 5, correctWord: "untrained humans" },
    ],
  },

  {
    questionId: "FIB020",
    title: "Burial Practices",
    audioTranscribedText:
      "So between 4,000 and 3,000 BC the Mesopotamian Samarian cultures do not practice any kind of burial. And then, about 3,000, in the early Dynastic Period, these burials start to reappear, and they reappear with a certain amount of conspicuous consumption, and this is the context for the royal burials at Ur. The royal cemetery consists of quite a number of pits. These are the excavation workers who are coming down into the pits. So you get some sense of how really deep and how really difficult it was to construct these chambers.",
    audioFile: "audio-71836a1c-dbb5-492c-98b7-39e1687b0f64.mp3",
    passage:
      "So between 4,000 and 3,000 BC the Mesopotamian Samarian cultures do not {1} any kind of burial. And then, about 3,000, in the early Dynastic Period, these burials start to reappear, and they reappear with a certain amount of {2} consumption. The royal cemetery consists of quite a number of pits. These are the {3} workers who are coming down into the pits. So you get some sense of how really deep and how really difficult it was to construct these {4}.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "practice" },
      { position: 2, correctWord: "conspicuous" },
      { position: 3, correctWord: "excavation" },
      { position: 4, correctWord: "chambers" },
    ],
  },

  {
    questionId: "FIB021",
    title: "Modern State",
    audioTranscribedText:
      "The growth of the modern state brought with it the development of mass political parties and the emergence of professional politicians. A man whose occupation is the struggle for political power may go about it in two ways. First, a person who relies on their political activities to supply their main source of income is said to live off politics, while a person who engages in full-time political activities, but who doesn't receive an income from it, is said to live for politics. Now, a political system in which recruitment to positions of power is filled by those who live for politics is necessarily drawn from a property-owning elite.",
    audioFile: "audio-53c4527c-0e33-4a52-8b0c-10d39874e969.mp3",
    passage:
      "The growth of the modern {1} brought with it the development of mass political parties and the emergence of professional politicians. A man whose occupation is the {2} power may go about it in two ways. A person who {3} in full-time political activities, but who doesn't receive an income from it, is said to live for politics. A political system in which {4} is filled by those who live for politics is necessarily drawn from a property-owning elite. However, this is not to imply that such politicians will necessarily pursue policies biased towards the interests of the class they {5} from.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "state" },
      { position: 2, correctWord: "struggle for political" },
      { position: 3, correctWord: "engages" },
      { position: 4, correctWord: "recruitment to positions" },
      { position: 5, correctWord: "originate" },
    ],
  },

  {
    questionId: "FIB022",
    title: "Johnson",
    audioTranscribedText:
      "At supper Johnson talked of good eating with uncommon satisfaction. Some people, said he, have a foolish way of not minding, or pretending not to mind, what they eat. For my part, I mind my belly very studiously and very carefully; for I look upon it, that he who does not mind his belly will hardly mind anything else. He was, for the moment, not only serious but vehement. Yet I have heard him, upon other occasions, talk with great contempt of people who were anxious to gratify their palates. I never knew any man who relished good eating more than he did.",
    audioFile: "audio-1dff8358-684d-4056-b555-d80572f3cd78.mp3",
    passage:
      "At supper Johnson talked of good eating with uncommon {1}. For my part, I mind my belly very {2} and very carefully; for I look upon it, that he who does not mind his belly will hardly mind anything else. He was, for the moment, not only serious but {3}. Yet I have heard him talk with great contempt of people who were anxious to gratify their palates. The 206th number of his Rambler is a masterly essay against {4}. I never knew any man who {5} good eating more than he did.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "satisfaction" },
      { position: 2, correctWord: "studiously" },
      { position: 3, correctWord: "vehement" },
      { position: 4, correctWord: "gulosity" },
      { position: 5, correctWord: "relished" },
    ],
  },

  {
    questionId: "FIB023",
    title: "Cookery",
    audioTranscribedText:
      "They who beheld with wonder how much he ate upon all occasions when his dinner was to his taste could not easily conceive what he must have meant by hunger. And not only was he remarkable for the extraordinary quantity which he ate, but he was, or affected to be, a man of very nice discernment in the science of cookery. He used to descant critically on the dishes which had been at table where he had dined or supped, and to recollect very minutely what he had liked. I remember when he was in Scotland, his praising Gordon's palates with a warmth of expression. As for Maclaurin's imitation of a made dish, it was a wretched attempt.",
    audioFile: "audio-25b3b356-75f1-4dfc-b50f-264b542c4f9b.mp3",
    passage:
      "They who {1} with wonder how much he ate upon all occasions when his dinner was to his taste could not easily conceive what he must have meant by hunger. He was remarkable for the extraordinary {2} which he ate, but he was also a man of very nice {3} in the science of cookery. He used to {4} critically on the dishes which had been at table where he had dined or supped. As for Maclaurin's imitation of a made dish, it was a {5} attempt.",
    difficulty: "HARD" as const,
    blanks: [
      { position: 1, correctWord: "beheld" },
      { position: 2, correctWord: "quantity" },
      { position: 3, correctWord: "discernment" },
      { position: 4, correctWord: "descant" },
      { position: 5, correctWord: "wretched" },
    ],
  },
];

const createQuestions = async () => {
  try {
    console.log(
      "Starting to add Fill in the Blanks questions to the database...",
    );

    for (const question of questions) {
      const existingQuestion =
        await prisma.listeningFillBlankPassage.findUnique({
          where: { questionId: question.questionId },
        });

      if (existingQuestion) {
        console.log(
          `Question ${question.questionId} already exists, skipping...`,
        );
        continue;
      }

      console.log(
        `⬆️  Uploading audio for ${question.questionId}: ${question.audioFile}`,
      );
      const audioUrl = await uploadAudioToS3(question.audioFile);
      console.log(`   → ${audioUrl}`);

      const { blanks } = question;
      const passageData = {
        questionId: question.questionId,
        title: question.title,
        audioTranscribedText: question.audioTranscribedText,
        passage: question.passage,
        difficulty: question.difficulty,
        audioUrl,
      };

      const createdPassage = await prisma.listeningFillBlankPassage.create({
        data: passageData,
      });

      for (const blank of blanks) {
        await prisma.listeningFillBlank.create({
          data: {
            passageId: createdPassage.id,
            position: blank.position,
            correctWord: blank.correctWord.trim().toLowerCase(),
          },
        });
      }

      console.log(
        `✅ Created question: ${createdPassage.questionId} - ${createdPassage.title} with ${blanks.length} blanks`,
      );
    }

    console.log(
      "✅ All Fill in the Blanks questions have been processed successfully!",
    );

    const totalQuestions = await prisma.listeningFillBlankPassage.count();
    const totalBlanks = await prisma.listeningFillBlank.count();
    console.log(
      `📊 Total Fill in the Blanks questions in database: ${totalQuestions}`,
    );
    console.log(`📊 Total blanks in database: ${totalBlanks}`);
  } catch (error) {
    console.error("❌ Error creating questions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createQuestions();