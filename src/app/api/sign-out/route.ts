import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  // NextAuth.js handles sign out through its own API
  redirect("/api/auth/signout");
}