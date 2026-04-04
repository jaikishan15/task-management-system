"use client";

import api from "@/lib/axios";
import { toast } from "sonner";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

type TaskItemProps = {
  task: Task;
  onRefresh: () => void;
};

export default function TaskItem({ task, onRefresh }: TaskItemProps) {
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      toast.success("Task deleted successfully");
      onRefresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete task");
    }
  };

  const handleToggle = async () => {
    try {
      await api.patch(`/tasks/${task.id}/toggle`);
      toast.success("Task status updated");
      onRefresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle task");
    }
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-sm mt-2">Status: {task.status}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className="border rounded px-3 py-1 cursor-pointer"
        >
          Toggle
        </button>

        <button
          onClick={handleDelete}
          className="border rounded px-3 py-1 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}