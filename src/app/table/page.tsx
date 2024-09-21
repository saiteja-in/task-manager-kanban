import path from 'path';
import React from 'react'
import fs from 'fs'
import { DataTable } from './data-table-components/data-table';
import { columns } from './data-table-components/columns';
import { getTaskData } from '@/actions/taskActions';

const page = async() => {
  // const data = await getData();
  const mainData=await getTaskData();
  // console.log("maindata",mainData)
  // console.log("data", mainData);
  return (
    <div className="h-full flex-1 flex-col   md:flex">
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground">
      </p>
    </div>
    <DataTable data={mainData} columns={columns} />
  </div>
  )
}

export default page
