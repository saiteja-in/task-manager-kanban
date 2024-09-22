import path from 'path';
import React from 'react'
import fs from 'fs'
import { DataTable } from './data-table-components/data-table';
import { columns } from './data-table-components/columns';
import { getTaskData } from '@/actions/taskActions';

const page = async() => {
  const mainData=await getTaskData();
  return (
    <div className="h-full flex-1 flex-col   md:flex">
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground">
      </p>
    </div>
    <h1 className="text-2xl font-bold mb-4">Task Table</h1>
    <DataTable data={mainData} columns={columns} />
  </div>
  )
}

export default page
