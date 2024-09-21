import React from "react";
import { Task } from "@/db/schema";
import { CalendarDays, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  handleDragStart: (e: React.DragEvent, task: Task) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleDragStart, setTasks }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 dark:text-red-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "low":
        return "text-green-500 dark:text-green-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className={`w-4 h-4 ${getPriorityColor(priority)}`} />;
      case "medium":
        return <Clock className={`w-4 h-4 ${getPriorityColor(priority)}`} />;
      case "low":
        return <CheckCircle2 className={`w-4 h-4 ${getPriorityColor(priority)}`} />;
      default:
        return null;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
    >
      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
      )}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {getPriorityIcon(task.priority)}
          <span className={`text-xs font-medium ${getPriorityColor(task.priority)} capitalize`}>
            {task.priority}
          </span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <CalendarDays className="w-4 h-4" />
            <span className="text-xs">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;