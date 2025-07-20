import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthenticationError } from "@/use-cases/errors";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export async function assertAuthenticated() {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
}