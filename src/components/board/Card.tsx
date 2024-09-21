import React from "react";
import { Task } from "@/db/schema";

interface CardProps {
  task: Task;
  handleDragStart: (e: React.DragEvent, task: Task) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Card: React.FC<CardProps> = ({ task, handleDragStart, setTasks }) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      className="bg-white rounded-lg p-3 m-1 shadow-sm"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-500">
        Priority: {task.priority}
      </p>
      {task.dueDate && (
        <p className="text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default Card;