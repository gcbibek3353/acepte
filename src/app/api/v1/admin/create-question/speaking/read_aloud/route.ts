import { admin_auth_middleware } from "@/lib/auth-middleware";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// create a post endpoint which takes all the question data in the body and then saves it to the database
export async function POST(req: Request) {
   // get the question data from the body and store in db
}