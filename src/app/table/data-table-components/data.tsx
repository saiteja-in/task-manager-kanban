import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ArrowBigRight } from "lucide-react";

export const status = [
  {
    value: "todo",
    label: "To-Do"
  },
  {
    value: "in-progress",
    label: "In Progress"
  },
  {
    value: "completed",
    label: "Completed"
  }
];

export const priority = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowUpIcon
  }
  ,
  {
    label: "High",
    value: "high",
    icon: ArrowBigRight
  }
];