'use client'

import Paragraph from "@/components/Dictionary/MeaningfulParagraph";
import Timer from "@/components/Practice/Timer";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      acepte
      random static content and advertisement will come here
      <br />
      <br />
      <br />
      {/* <Timer countDownTime={120} callbackFn={() => alert('Time is up!')} /> */}
      <br />
      <br />
      <br />
      <Link href="/dashboard">Get Started</Link>
      <Paragraph paragraph="The quick brown fox jumps over the lazy dog. This is a sample paragraph to test the dictionary feature." />
    </div>
  );
}
