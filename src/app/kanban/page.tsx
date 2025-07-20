import React from 'react';
import { getTaskData } from '@/actions/taskActions';
import CustomKanban from "@/components/board/CustomKanban";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  
  const mainData = await getTaskData();

  return (
    <div className="max-w-[1440px] mx-auto min-h-sreen">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <CustomKanban initialTasks={mainData} />
    </div>
  );
};

export default Page;