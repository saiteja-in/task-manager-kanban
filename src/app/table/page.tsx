import path from 'path';
import React from 'react'
import fs from 'fs'
import { DataTable } from './data-table-components/data-table';
import { columns } from './data-table-components/columns';
import { getTaskData } from '@/actions/taskActions';
async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/table/data-table-components",
    "data.json"
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
const page = async() => {
  // const data = await getData();
  const mainData=await getTaskData();
  console.log("maindata",mainData)
  // console.log("data", data);
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground">
        Here&apos;s a list of your expenses for this month!
      </p>
    </div>
    <DataTable data={mainData} columns={columns} />
  </div>
  )
}

export default page
