import { NextRequest, NextResponse } from "next/server";
import { auth_middleware } from "@/lib/auth-middleware";
import { getPublishedMockTests } from "./mocktest.user.controller";

// GET /api/v1/mocktest — list all published mock tests
export async function GET(req: NextRequest) {
  try {
    const authCheck = await auth_middleware(req);
    if (!authCheck.authenticated || !authCheck.user) {
      return NextResponse.json({ success: false, message: "Unauthorized", data: null }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const result = await getPublishedMockTests(authCheck.user.id, { page, limit });

    return NextResponse.json({ success: true, message: "Mock tests fetched successfully", data: result }, { status: 200 });
  } catch (error) {
    console.error("GET /mocktest:", error);
    return NextResponse.json({ success: false, message: "Internal server error", data: null }, { status: 500 });
  }
}
