"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

type TaskFormProps = {
  onTaskCreated: () => void;
};

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      toast.success("Task created successfully");
      onTaskCreated();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreateTask}
      className="border rounded-lg p-4 space-y-3 mb-6 cursor-pointer"
    >
      <h2 className="text-lg font-semibold">Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2 cursor-pointer"
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="border rounded px-4 py-2 cursor-pointer"
      >
        {loading ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
}