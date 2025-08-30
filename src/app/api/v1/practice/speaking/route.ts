import { evalueteSummarizationWrittenText } from "@/lib/ai/google";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
) {
    const originalEssay = " Cows are one of the most important animals in Hinduism. They are worshipped as goddesses and participate in several hindu rituals and ceremonies.";
    const summarizedEssay = " Cows are one of the most important animals in Hinduism. They are worshipped as goddesses and participate in several hindu rituals and ceremonies.";

    const res = await evalueteSummarizationWrittenText(originalEssay, summarizedEssay);
    console.log(JSON.stringify(res));

    return new Response(JSON.stringify(res), { status: 200 });
}