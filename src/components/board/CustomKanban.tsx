"use client";

import React from "react";
import Board from "./Board";

interface CustomKanbanProps {
  initialTasks: any[];
}

const CustomKanban: React.FC<CustomKanbanProps> = ({ initialTasks }) => {
  return (
    <>
      <Board initialTasks={initialTasks} />
    </>
  );
};

export default CustomKanban;