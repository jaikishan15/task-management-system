"use client";

import { useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);

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

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);

      await api.patch(`/tasks/${task.id}`, {
        title,
        description,
      });

      toast.success("Task updated successfully");
      setIsEditing(false);
      onRefresh();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Task title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Task description"
            rows={3}
          />
        </>
      ) : (
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {task.description || "No description"}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="border rounded px-3 py-1 text-lg cursor-pointer"
              title="Edit task"
            >
              ✏️
            </button>
          </div>

          <p className="text-sm mt-3">
            Status: <span className="font-medium">{task.status}</span>
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="border rounded px-3 py-1 cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleCancel}
              className="border rounded px-3 py-1 cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleToggle}
              className="border rounded px-3 py-1"
            >
              Toggle
            </button>

            <button
              onClick={handleDelete}
              className="border rounded px-3 py-1"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}