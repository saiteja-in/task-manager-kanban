"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TrendingUp, TrendingDown, FilePenLine, Trash } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, tasks } from "@/db/schema";
import { getPriorityIcon, getStatusIcon } from "@/app/_lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditTaskDialog1 } from "@/components/edit-task-dialog";
import { DeleteTaskDialog } from "@/components/delete-task-dialog";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("title")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const rawDescription = row.getValue("description");

      // Check if Description is coming from data
      const isDescriptionTrue =
        typeof rawDescription === "string" && rawDescription.trim();

      return (
        <div className="flex space-x-2">
          <span
            className={cn("max-w-[400px] truncate font-medium capitalize", {
              "font-normal text-muted-foreground": !isDescriptionTrue,
            })}
          >
            {/* {isDescriptionTrue ? rawDescription : "-"} */}
            {isDescriptionTrue ? rawDescription : "no description"}
          </span>
        </div>
      );
    },
    // enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = tasks.status.enumValues.find(
        (status) => status === row.original.status
      )

      if (!status) return null

      const Icon = getStatusIcon(status)

      return (
        <div className="flex w-[6.25rem] items-center">
          <Icon
            className="mr-2 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="capitalize">{status}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = tasks.priority.enumValues.find(
        (priority) => priority === row.original.priority
      )

      if (!priority) return null

      const Icon = getPriorityIcon(priority)

      return (
        <div className="flex items-center">
          <Icon
            className="mr-2 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="capitalize">{priority}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id))
    },
  },
  //
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ cell }) => {
      const timestamp = cell.getValue() as number;
      const dateValue = new Date(); // Convert to milliseconds
      return !isNaN(dateValue.getTime())
        ? formatDate(dateValue)
        : "Invalid Date";
    },
  },
  
  //
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as number;
      let formattedDate = "Not set";
      let isValidDate = false;
  
      if (dueDate) {
        const dateValue = new Date(row.getValue("dueDate")); // Convert to milliseconds
        isValidDate = !isNaN(dateValue.getTime());
        if (isValidDate) {
          formattedDate = dateValue.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        } else {
          formattedDate = "Not set";
        }
      }
  
      return (
        <div className="flex w-[100px] items-center">
          <span
            className={cn({
              "font-normal text-muted-foreground": !isValidDate,
            })}
          >
            {formattedDate}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date((row.getValue(id) as number) * 1000); // Convert to milliseconds
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [showEditTaskDialog,setShowEditTaskDialog]=useState(false)
      const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);
       return(
         <div className="flex justify-center gap-2">
          <EditTaskDialog1 task={row.original} open={showEditTaskDialog} onOpenChange={setShowEditTaskDialog} />
        <Button
        size={"sm"}
        variant="outline"
        onClick={()=>setShowEditTaskDialog(true)}
        >
          <FilePenLine className="mr-2 size-4" />Edit
        </Button>
        <DeleteTaskDialog
            open={showDeleteTaskDialog}
            onOpenChange={setShowDeleteTaskDialog}
            showTrigger={false}
            onSuccess={() => row.toggleSelected(false)}
            tasks={[row.original]}
          />
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => setShowDeleteTaskDialog(true)}
          >
            <Trash className="mr-2 size-4 text-red-700" />
            Delete
          </Button>
      </div>
      )
    }
     
     
    
    // <DataTableRowActions row={row} />,
  },
  
  
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
  //     const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);

  //     return (
  //       <div className="flex justify-center gap-2">
  //         <EditTaskDialog
  //           task={row.original}
  //           open={showEditTaskDialog}
  //           onOpenChange={setShowEditTaskDialog}
  //         />
  //         <Button
  //           size={"sm"}
  //           variant="outline"
  //           onClick={() => setShowEditTaskDialog(true)}
  //         >
  //           <FilePenLine className="mr-2 size-4" />
  //           Edit
  //         </Button>

  //         <DeleteTaskDialog
  //           open={showDeleteTaskDialog}
  //           onOpenChange={setShowDeleteTaskDialog}
  //           showTrigger={false}
  //           onSuccess={() => row.toggleSelected(false)}
  //           tasks={[row.original]}
  //         />
  //         <Button
  //           size={"sm"}
  //           variant="destructive"
  //           onClick={() => setShowDeleteTaskDialog(true)}
  //         >
  //           <Trash className="mr-2 size-4" />
  //           Delete
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];