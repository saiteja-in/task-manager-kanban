import { db } from "@/db";
import { Profile, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createProfile(userId: string, displayName: string) {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId,
      displayName,
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function updateProfile(
  userId: string,
  updateProfile: Partial<Profile>,
) {
  await db
    .update(profiles)
    .set(updateProfile)
    .where(eq(profiles.userId, userId));
}

export async function getProfile(userId: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}
