"use server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { and, asc, eq, inArray, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Ensure required fields are provided when adding a task
interface NewTask {
  title: string; // Required
  description?: string; // Optional
  dueDate?: Date | null; // Optional, nullable Date
  status?: "todo" | "in-progress" | "completed"; // Optional, with enum values
  priority?: "low" | "medium" | "high"; // Optional, with enum values
  createdAt?: Date; // Optional, auto-generated in the database
  // updatedAt?: Date;                       // Optional, auto-updated in the database
}

// export const addTask = async (task: NewTask) => {
//   const user = await getCurrentUser();
//   if (!user) {
//     throw new Error("User not authenticated");
//   }

//   await db.insert(tasks).values({
//     ...task,
//     userId: user.id,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   });

//   revalidatePath("/");
// };

// Function to add a task for the authenticated user
export const addTask = async (task: NewTask) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const [newTask] = await db
    .insert(tasks)
    .values({
      ...task,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  if (!newTask) {
    throw new Error("Failed to create task");
  }

  revalidatePath("/");
  revalidatePath("/kanban");
  return newTask;
};

export const getTaskData = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const data = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, user.id))
    .orderBy(asc(tasks.id));
  return data;
};

interface EditTask extends Partial<NewTask> {
  id: number;
}

export const editTask = async (task: EditTask) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { id, ...updates } = task;

  await db
    .update(tasks)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, id));

  revalidatePath("/");
};

// // Function to delete one or more tasks for the authenticated user
export const deleteTask = async (taskIds: number | number[]) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Ensure taskIds is an array
  const ids = Array.isArray(taskIds) ? taskIds : [taskIds];

  await db
    .delete(tasks)
    .where(and(eq(tasks.userId, user.id), inArray(tasks.id, ids)));
  revalidatePath("/");
};

//kanban board
export const updateTaskStatus = async (taskId: number, newStatus: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  await db
    .update(tasks)
    .set({
      status: newStatus as "todo" | "in-progress" | "completed",
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, taskId));

  revalidatePath("/");
  revalidatePath("/kanban");
};
