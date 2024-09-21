"use client";

import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Task } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";
import Card from "./Card";
import { updateTaskStatus } from "@/actions/taskActions";

interface ColumnProps {
  title: string;
  column: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Column: React.FC<ColumnProps> = ({ title, column, tasks, setTasks }) => {
  const [active, setActive] = useState(false);

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
      let copy = [...tasks];
      let taskToTransfer = copy.find((t) => t.id === taskId);
      if (!taskToTransfer) return;

      const newStatus = column as "todo" | "in-progress" | "completed";
      
      // Update the task status in the local state
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

      // Update the task status in the backend
      try {
        await updateTaskStatus(taskId, newStatus);
      } catch (error) {
        console.error("Failed to update task status:", error);
        // You might want to show an error message to the user here
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
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredTasks = tasks.filter((task) => task.status === column);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[18px] text-black">{title}</h3>
          <span className="rounded-full flex items-center justify-center text-[13px] font-medium text-black bg-gray-300 w-[22px] h-[22px]">
            {filteredTasks.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-gray-500 h-[20px] p-0 hover:bg-transparent"
          >
            <IoAddOutline size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-500 hover:text-black">
              <BsThreeDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-medium transition text-black text-[14px] cursor-pointer hover:!bg-[#F9F9F9]">
                Remove section
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-[280px] overflow-y-auto max-h-[500px] py-2 px-2.5 flex flex-col gap-1.5 rounded-[12px] transition-colors ${
          active ? "bg-stone-200/40" : "bg-[#F9F9F9]"
        }`}
      >
        {filteredTasks.map((t) => (
          <Card
            key={t.id}
            task={t}
            handleDragStart={handleDragStart}
            setTasks={setTasks}
          />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Column;