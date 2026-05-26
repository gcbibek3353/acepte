import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { SummarizeSpokenTextAnswerScoreSchema, SummarizeWrittenTextAnswerScoreSchema, writeEssayAnswerScoreSchema } from './schema';


const google = createGoogleGenerativeAI({
    apiKey: 'AIzaSyBymN-tsLWxZBfCSqCfXed-0gqePFNT-ek',
});

const model = google('gemini-2.5-flash');


// TODO : we need similar AI calling functions with good prompt engineering for other tasks as well.

// Writing specific AI calls 
export const evaluateWriteEssay = async (essay: string, essay_description: string) => {
    const evaluationPrompt = `

    You are an expert essay evaluator. Evaluate the provided essay across the following dimensions using the scoring criteria below.

### Scoring Criteria

#### Content (0–6)

**6**

* The essay fully addresses the prompt in depth, demonstrating full command of the argument by reformulating the issue seamlessly in original words and expanding on important points with specificity.
* The argument is supported convincingly with subsidiary points and relevant examples throughout the response.

**5**

* The essay adequately addresses the prompt, presenting a persuasive argument with relevant ideas.
* Main points are highlighted, and relevant supporting details are provided effectively, with only minor exceptions.

**4**

* The essay adequately addresses the main point of the prompt.
* The argument is generally convincing but lacks depth or nuance.
* Supporting detail is inconsistent throughout the response.

**3**

* The essay is relevant to the prompt but does not adequately address the main points.
* Supporting details are often missing or inappropriate.

**2**

* The essay attempts to address the prompt superficially, with little relevant information and largely generic statements or overreliance on repeating language from the prompt.
* Few supporting details are included, and ideas lack relevance or clear connection to the topic.

**1**

* The essay attempts to address the prompt but demonstrates incomplete understanding.
* Communication is limited to generic, repetitive phrasing or repeated prompt language.
* Supporting details are disjointed or poorly connected to the topic.

**0**

* The essay does not properly address the prompt.

---

#### Form (0–2)

**2**

* Length is between 200 and 300 words.

**1**

* Length is between 120–199 words or 301–380 words.

**0**

* Length is fewer than 120 words or more than 380 words.
* Essay is written entirely in capital letters, contains no punctuation, or consists only of bullet points or very short sentences.

---

#### Development, Structure and Coherence (0–6)

**6**

* The essay has an effective logical structure, flows smoothly, and is easy to follow.
* The argument is clear, cohesive, and developed systematically.
* A well-developed introduction and conclusion are present.
* Ideas are organized cohesively into logically sequenced paragraphs.
* A variety of connective devices are used effectively and consistently.

**5**

* The essay has a conventional and appropriate structure that follows logically, though not always smoothly.
* The argument is clear, with some points developed in detail.
* Introduction, conclusion, and logical paragraphs are present.
* Connective devices generally support coherent discourse despite minor gaps or abrupt transitions.

**4**

* Conventional structure is mostly present, though some elements may be missing.
* The argument lacks development in some areas or may occasionally be difficult to follow.
* Paragraphing exists but is inconsistently effective.
* Connections between ideas may be weak or unclear.

**3**

* Traces of conventional structure are present, but the essay contains simple or disconnected ideas.
* A position or opinion exists but is insufficiently developed into a logical argument.
* Paragraphing may be ineffective or absent.
* The response mainly consists of loosely connected ideas requiring effort to follow.

**2**

* There is little recognizable structure.
* Ideas are disorganized and difficult to follow.
* A position may exist but lacks development or clarity.
* The essay mainly consists of disconnected elements with limited coherence.

**1**

* The response consists of disconnected ideas with no clear hierarchy or coherence.
* No clear position or opinion can be identified.
* Very basic connective devices are used minimally.

**0**

* There is no recognizable structure.

---

#### Grammar (0–2)

**2**

* Shows consistent grammatical control of complex language.
* Errors are rare and difficult to detect.

**1**

* Shows a relatively high degree of grammatical control.
* Errors do not lead to misunderstanding.

**0**

* Contains mainly simple structures and/or several basic grammatical mistakes.

---

#### General Linguistic Range (0–6)

**6**

* A wide variety of expressions and vocabulary are used appropriately with precision and ease.
* No noticeable limitations restrict communication.
* Errors are rare and meaning remains completely clear.

**5**

* A variety of expressions and vocabulary are used appropriately throughout the response.
* Ideas are expressed clearly with minimal restriction.
* Occasional language errors may occur but meaning remains clear.

**4**

* Vocabulary and expression are sufficient for basic idea development.
* Limitations appear when expressing complex or abstract ideas.
* Some repetition, circumlocution, or formulation difficulty is evident.

**3**

* Expression and vocabulary are narrow and repetitive.
* Communication is limited to simple ideas.
* Errors occasionally disrupt clarity.

**2**

* Limited vocabulary and simple expressions dominate.
* Communication is compromised and some ideas are unclear.
* Frequent language errors cause breakdowns in understanding.

**1**

* Vocabulary and linguistic expression are highly restricted.
* Communication is significantly limited and ideas are generally unclear.
* Errors are pervasive and impede meaning.

**0**

* Meaning is not accessible.

---

#### Vocabulary Range (0–2)

**2**

* Demonstrates a strong command of broad vocabulary, including idiomatic expressions and colloquialisms.

**1**

* Shows a good range of vocabulary for general academic topics.
* Lexical shortcomings occasionally lead to circumlocution or imprecision.

**0**

* Uses mainly basic vocabulary insufficient for the topic.

---

#### Spelling (0–2)

**2**

* Correct spelling throughout.

**1**

* Contains one spelling error.

**0**

* Contains more than one spelling error.

---

### Output Instructions

Return only a valid JSON object with the following floating-point fields:

* content
* form
* development_structure_coherence
* grammar
* general_linguistic_range
* vocabulary_range
* spelling
* total

Do not include explanations, markdown, commentary, or any text outside the JSON object.


Essay Title : 
<<<
${essay_description}
>>>

Essay to evaluate:
<<<
${essay}
>>>`;

    const { object: evaluation } = await generateObject({
        model,
        schema: writeEssayAnswerScoreSchema,
        prompt: evaluationPrompt,
    });
    return evaluation;
}

export const evalueteSummarizationWrittenText = async (summarizedText: string, originalText: string) => {
    const evaluationPrompt = `

    You are an expert text summarization evaluator. Evaluate a summarized text against the original text using the following scoring criteria for summary writing traits.

### Scoring Criteria

#### Content (0–4)

**4**

* The source text is summarised comprehensively, demonstrating full comprehension of the source text.
* Paraphrasing is used effectively to communicate a clear and accurate summary, and extraneous details are removed. All main ideas are correctly identified and synthesized in a concise and coherent manner.
* The summary flows smoothly and makes skilled use of appropriate and varied connective devices.

**3**

* The source text is summarised adequately, demonstrating good comprehension of the source text.
* Paraphrasing is used, but not consistently well, and extraneous details may interfere with the clarity of the summary. Main ideas are correctly identified, with some minor omissions. Ideas are connected, but not synthesized efficiently.
* The summary can be followed logically and makes effective use of simple or repetitive connective devices.

**2**

* The source text is summarised partially, demonstrating basic comprehension of the source text.
* There is no clear distinction between main points and peripheral details. Ideas are identified, but the response relies heavily on repeating excerpts from the source text without synthesizing ideas or reformulating them in original words.
* Repetitive or inappropriate connective devices are used, and the response can only be followed with effort.

**1**

* The response is relevant but not meaningfully summarised, demonstrating limited comprehension of the source text.
* The response consists of disconnected ideas or excerpts from the source text without context or synthesis. Main ideas are omitted or misrepresented.
* The response lacks coherence and is difficult to follow.

**0**

* The response is too limited to assign a higher score and demonstrates no comprehension of the source text.

---

#### Form (0–1)

**1**

* The summary is written as one single, complete sentence.

**0**

* The summary is not written as one single complete sentence, contains fewer than 5 words or more than 75 words, or is written entirely in capital letters.

---

#### Grammar (0–2)

**2**

* Has correct grammatical structure.

**1**

* Contains grammatical errors but without hindering communication.

**0**

* Has defective grammatical structure that could hinder communication.

---

#### Vocabulary (0–2)

**2**

* Uses appropriate word choice.

**1**

* Contains lexical errors but without hindering communication.

**0**

* Has defective word choice that could hinder communication.

---

### Output Instructions

Return only a valid JSON object with floating-point scores for:

* content
* form
* grammar
* vocabulary
* total

Do not include explanations, commentary, markdown, or any text outside the JSON object.


Original text:
<<<
${originalText}
>>>

Summarized text to evaluate:
<<<
${summarizedText}
>>>`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SummarizeWrittenTextAnswerScoreSchema,
        prompt: evaluationPrompt,
    });
    return evaluation;
}

// Listening specific AI calls

export const evaluateSummarizeSpokenTextAnswer = async (summarizedText: string, originalText: string) => {
    const evaluationPrompt = `You are an expert text summarization evaluator. Evaluate the following summarized text against the original text across multiple dimensions and provide only a JSON object as output with floating-point scores between 0.0 and 2.0 for each dimension. Do not include explanations, commentary, or text outside the JSON.

Scoring dimensions (each scored from 0.0 to 2.0):
- contentScore: Accuracy and completeness of information from the original text (0.0-2.0).
- formScore: Organization, coherence, structure, and logical flow (0.0-2.0).
- grammarScore: Correct use of grammar and syntax (0.0-2.0).
- vocabularyScore: Range, precision, and appropriateness of vocabulary (0.0-2.0).
- spellingScore: Correctness of spelling and typographical accuracy (0.0-2.0).
- totalScore: Overall quality of the summary (sum of all sub-scores, max 10.0).

Original text:
<<<
${originalText}
>>>

Summarized text to evaluate:
<<<
${summarizedText}
>>>`;

    const { object: evaluation } = await generateObject({
        model,
        schema: SummarizeSpokenTextAnswerScoreSchema,
        prompt: evaluationPrompt,
    });
    return evaluation;
}

