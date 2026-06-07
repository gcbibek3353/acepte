import { NextRequest, NextResponse } from "next/server";
import { admin_auth_middleware } from "@/lib/auth-middleware";
import { getAllMockTests, createMockTest } from "./mocktest.admin.controller";
import { MockTestStatus } from "@/generated/prisma";

// GET /api/v1/admin/mocktest — list all mock tests
export async function GET(req: NextRequest) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const statusParam = searchParams.get("status") as MockTestStatus | null;

    const result = await getAllMockTests({ page, limit, status: statusParam ?? undefined });

    return NextResponse.json({ success: true, message: "Mock tests fetched successfully", data: result }, { status: 200 });
  } catch (error) {
    console.error("GET /admin/mocktest:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}

// POST /api/v1/admin/mocktest — create a new mock test
export async function POST(req: NextRequest) {
  try {
    const authResult = await admin_auth_middleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: "title is required", data: null }, { status: 400 });
    }

    const test = await createMockTest({ title, description });

    return NextResponse.json({ success: true, message: "Mock test created successfully", data: test }, { status: 201 });
  } catch (error) {
    console.error("POST /admin/mocktest:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
