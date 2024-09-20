import { tasks, type Task } from "@/db/schema"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  PinRightIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { CalendarCheck, Check, CircleCheckBig, ListTodo, TicketCheck, Timer, TouchpadOff } from "lucide-react"

export function getStatusIcon(status: Task["status"]) {
    const statusIcons = {
      "completed": CircleCheckBig,
      "in-progress": Timer,
      "todo": CalendarCheck,
    }
  
    // return statusIcons[status] || CircleIcon
    return statusIcons[status as keyof typeof statusIcons] || CircleIcon

  }
 
  export function getPriorityIcon(priority: Task["priority"]) {
    const priorityIcons = {
      high: ArrowUpIcon,
      low: ArrowDownIcon,
      medium: ArrowRightIcon,
    }
  
    return priorityIcons[priority] || CircleIcon
  }