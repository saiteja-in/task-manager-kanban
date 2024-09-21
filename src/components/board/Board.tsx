import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Task } from "@/db/schema";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getTaskData, deleteTask } from "@/actions/taskActions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Column from "./Column";

interface BoardProps {
  initialTasks: Task[];
}

const Board: React.FC<BoardProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<string[]>([
    "todo",
    "in-progress",
    "completed",
    "delete",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraggingOverDelete, setIsDraggingOverDelete] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await getTaskData();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast.error("Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDragEnd = async (e: React.DragEvent, column: string) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    setIsDraggingOverDelete(false);

    if (column === "delete") {
      try {
        // Add shrink animation before deleting
        const taskElement = document.getElementById(`task-${taskId}`);
        if (taskElement) {
          taskElement.style.transform = "scale(0)";
          taskElement.style.transition = "transform 0.2s ease";
        }

        setTimeout(async () => {
          await deleteTask(taskId);
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
          toast.success("Task deleted successfully");
        }, 200); // Delay deletion to allow animation
      } catch (error) {
        console.error("Failed to delete task:", error);
        toast.error("Failed to delete task");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, column: string) => {
    e.preventDefault();
    setIsDraggingOverDelete(column === "delete");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-x-auto bg-gray-100 dark:bg-gray-900 p-6">
      <AnimatePresence>
        {columns.map((column) => (
          <motion.div
            key={column}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-80 mx-2"
          >
            {column === "delete" ? (
              <motion.div
                onDragOver={(e) => handleDragOver(e, column)}
                onDrop={(e) => handleDragEnd(e, column)}
                className={`h-24 w-24 rounded-full flex flex-col items-center justify-center transition-colors ${
                  isDraggingOverDelete
                    ? "bg-red-500 dark:bg-red-700"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
                animate={{
                  scale: isDraggingOverDelete ? 1.1 : 1,
                  rotate: isDraggingOverDelete ? 10 : 0,
                  transition: { duration: 0.2 },
                }}
              >
                <Trash2
                  size={32}
                  className={`mb-2 ${
                    isDraggingOverDelete
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isDraggingOverDelete
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Delete
                </span>
              </motion.div>
            ) : (
              <Column
                title={column
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                column={column}
                tasks={tasks}
                setTasks={setTasks}
                onDragOver={(e) => handleDragOver(e, column)}
                onDrop={(e) => handleDragEnd(e, column)}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Board;
