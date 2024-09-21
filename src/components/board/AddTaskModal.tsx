"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addTask } from "@/actions/taskActions";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Task } from "@/db/schema";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
});

const statuses = [
  { label: "To-Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function AddTaskModal({ isOpen, onClose, column, setTasks }: AddTaskModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        status: column as "todo" | "in-progress" | "completed",
        priority: "low",
      },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsSubmitting(true);
      const formattedValues = {
        ...values,
        dueDate: values.dueDate ? new Date(values.dueDate) : null,
      };
  
      try {
        const newTask = await addTask({
          ...formattedValues,
          dueDate: formattedValues.dueDate,
        });
  
        if (newTask && newTask.id) {
          setTasks((prevTasks) => [...prevTasks, newTask]);
          onClose();
          toast.success("Task added successfully");
          form.reset();
        } else {
          throw new Error("Failed to add task");
        }
      } catch (error) {
        toast.error("Failed to add task");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}