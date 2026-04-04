"use client";

import TaskItem from "./TaskItem";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

type TaskListProps = {
  tasks: Task[];
  onRefresh: () => void;
};

export default function TaskList({ tasks, onRefresh }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onRefresh={onRefresh} />
      ))}
    </div>
  );
}