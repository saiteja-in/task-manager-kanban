import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/db/schema";
import { AddTaskModal } from "./AddTaskModal";

interface AddCardProps {
  column: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddCard: React.FC<AddCardProps> = ({ column, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="ghost"
        className="w-full text-gray-500"
      >
        + Add a card
      </Button>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        column={column}
        setTasks={setTasks}
      />
    </>
  );
};

export default AddCard;