"use client";

import React, { useState } from "react";
import { Task } from "@/db/schema";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";
import TaskCard from "./TaskCard";
import { updateTaskStatus } from "@/actions/taskActions";

interface ColumnProps {
  title: string;
  column: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  column,
  tasks,
  setTasks,
  onDragOver,
  onDrop,
}) => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData("taskId", task.id.toString());
  };

  const handleDragEnd = async (e: React.DragEvent) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== taskId.toString()) {
      setIsLoading(true);
      let copy = [...tasks];
      let taskToTransfer = copy.find((t) => t.id === taskId);
      if (!taskToTransfer) return;

      const newStatus = column as "todo" | "in-progress" | "completed";

      taskToTransfer = { ...taskToTransfer, status: newStatus };

      copy = copy.filter((t) => t.id !== taskId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(taskToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id.toString() === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, taskToTransfer);
      }

      setTasks(copy);

      try {
        await updateTaskStatus(taskId, newStatus);
      } catch (error) {
        console.error("Failed to update task status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicators = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  // Modified handleDragLeave to ensure we detect true drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    // Check if the drag left the column container
    const columnContainer = e.currentTarget as HTMLElement;
    const rect = columnContainer.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;

    // Only clear highlights if the drag has actually left the container
    if (isOutside) {
      clearHighlights();
      setActive(false);
    }
  };

  const filteredTasks = tasks.filter((task) => task.status === column);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[370px]">
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg text-black dark:text-white">{title}</h3>
          <span className="rounded-full flex items-center justify-center text-sm font-medium text-black dark:text-white bg-gray-200 dark:bg-gray-700 w-6 h-6">
            {filteredTasks.length}
          </span>
        </div>

        
      </div>

      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full min-h-[500px] w-full overflow-y-auto py-2 px-2.5 flex flex-col gap-2 rounded-lg transition-colors ${
          active ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
        }`}
      >
        {filteredTasks.map((t) => (
          <TaskCard key={t.id} task={t} handleDragStart={handleDragStart} setTasks={setTasks} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Column;
