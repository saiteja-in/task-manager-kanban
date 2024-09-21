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
  const [columns, setColumns] = useState<string[]>(["todo", "in-progress", "completed"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraggingOverDelete, setIsDraggingOverDelete] = useState(false);

  // Fetch tasks on component mount
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
      if (window.confirm("Are you sure you want to delete this task?")) {
        try {
          const taskElement = document.getElementById(`task-${taskId}`);
          if (taskElement) {
            // Shrink task before deletion
            taskElement.style.transform = "scale(0)";
            taskElement.style.transition = "transform 0.2s ease";
          }

          setTimeout(async () => {
            await deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            toast.success("Task deleted successfully");
            setIsDraggingOverDelete(false);
          }, 200);  // Small delay for animation
        } catch (error) {
          console.error("Failed to delete task:", error);
          toast.error("Failed to delete task");
          setIsDraggingOverDelete(false);
        }
      } else {
        setIsDraggingOverDelete(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, column: string) => {
    e.preventDefault();
    if (column === "delete") setIsDraggingOverDelete(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOverDelete(false); // Reset dragging over delete
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Full-screen loading spinner */}
        <div className="absolute inset-0 bg-opacity-50 bg-gray-800 flex items-center justify-center z-10">
          <LoadingSpinner size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full overflow-x-auto p-6 gap-4">
      <AnimatePresence>
        {columns.map((column) => (
          <motion.div
            key={column}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 w-80 mx-4 lg:w-[350px]"  // Adjusted for better responsiveness
          >
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
              // onDragLeave={handleDragLeave}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Delete Area - Trash Bin */}
      <motion.div
        className="fixed bottom-10 right-10 h-16 w-16 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg"
        onDragOver={(e) => handleDragOver(e, "delete")}
        onDrop={(e) => handleDragEnd(e, "delete")}
        onDragLeave={handleDragLeave}
        animate={{
          backgroundColor: isDraggingOverDelete ? "rgb(239, 68, 68)" : "rgb(229, 231, 235)",
        }}
        transition={{ duration: 0.2 }}
        role="button"
        aria-label="Delete Task"
      >
        <Trash2 size={32} className={isDraggingOverDelete ? "text-white" : "text-gray-500"} />
      </motion.div>
    </div>
  );
};

export default Board;
