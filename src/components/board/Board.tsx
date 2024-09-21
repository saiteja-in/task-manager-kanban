"use client";

import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
// import AddSectionModal from "@/components/modals/AddSectionModal";
import Column from "./Column";
import { Task } from "@/db/schema";
interface BoardProps {
  initialTasks: Task[];
}

const Board: React.FC<BoardProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<string[]>([
    "todo",
    "in-progress",
    "completed",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddColumn = (name: string) => {
    setColumns([...columns, name]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-full gap-[30px] py-[22px] px-[30px] overflow-x-scroll !pb-5">
      {columns.map((column) => (
        <Column
          key={column}
          title={column.charAt(0).toUpperCase() + column.slice(1)}
          column={column}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
      {/* <div className="">
        <Button
          variant="link"
          className="text-gray-400 h-auto py-1 px-2.5"
          onClick={() => setIsModalOpen(true)}
        >
          <IoAddOutline size={20} />
          <span className="ml-2 font-semibold text-[16px]">Add section</span>
        </Button>
      </div> */}

      {/* <AddSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddColumn}
      /> */}
    </div>
  );
};

export default Board;