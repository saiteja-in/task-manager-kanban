"use client";

import React from "react";
import Board from "./Board";
// import Header from "./Header";

interface CustomKanbanProps {
  initialTasks: any[];
}

const CustomKanban: React.FC<CustomKanbanProps> = ({ initialTasks }) => {
  return (
    <>
      {/* <Header /> */}
      <Board initialTasks={initialTasks} />
    </>
  );
};

export default CustomKanban;