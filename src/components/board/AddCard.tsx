import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/db/schema";
import { AddTaskModal } from "./AddTaskModal";
import { Plus } from "lucide-react";

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
        className="w-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
      >
        <Plus size={20} className="mr-2" />
        Add a card
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