import path from "path";
import React from "react";
import fs from "fs";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { getTaskData } from "@/actions/taskActions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const mainData = await getTaskData();
  return (
    <div className="h-full flex-1 flex-col md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground"></p>
      </div>
      <h1 className="mb-4 text-2xl font-bold">Task Table</h1>
      <DataTable data={mainData} columns={columns} />
    </div>
  );
};

export default page;
