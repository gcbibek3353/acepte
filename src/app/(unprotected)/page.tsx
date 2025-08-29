'use client'

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
      <Timer countDownTime={120} callbackFn={() => alert('Time is up!')} />
      <br />
      <br />
      <br />
      <Link href="/dashboard">Get Started</Link>     
    </div>
  );
}
