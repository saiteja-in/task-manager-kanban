"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { addTask, editTask } from "@/actions/taskActions";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Task } from "@/db/schema";

// Schema for form validation using Zod, based on your task schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
});

// Status options
const statuses = [
  { label: "To-Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

// Priority options
const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
interface EditTaskDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog>{
  task:Task
}

export function EditTaskDialog1({task,...props}:EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [isTrans, setTrans] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title ?? "",
      description: task.description ?? "",
      status: task.status ?? "todo", // default as per schema
      priority: task.priority ?? "low",
       dueDate:task.dueDate ? task.dueDate.toISOString().split("T")[0]:undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setTrans(async () => {
      const formattedValues = {
        ...values,
        dueDate: values.dueDate ? new Date(values.dueDate) : null, // getTime() returns milliseconds
      };

      try {
        // Pass the formatted values to addTask function
        await editTask({
          id:task.id,
          title:formattedValues.title,
          description:formattedValues.description,
          priority:formattedValues.priority,
          status:formattedValues.status,
          // Ensure dueDate is passed as a Date object if available, otherwise null
          dueDate: formattedValues.dueDate
            ? new Date(formattedValues.dueDate)
            : null,
        });

        // setOpen(false); // Close the form dialog
        props.onOpenChange?.(false)
        toast.success("Task added successfully"); // Show success message
        form.reset();
      } catch (error) {
        toast.error("Task has not been created");
        console.error(error);
      }
    });

    // Convert dueDate to a timestamp in milliseconds
  }

  return (
    <Dialog {...props}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to edit the task
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Title field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Add Task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* <Input  /> */}
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status selector */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority selector */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due date field */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button type="submit">
              {isTrans && (
                <ReloadIcon
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}{" "}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
