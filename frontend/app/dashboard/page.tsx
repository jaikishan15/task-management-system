"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { clearAccessToken } from "@/lib/auth";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import SearchFilterBar from "@/components/SearchFilterBar";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks", {
        params: {
          page,
          limit: 5,
          search,
          status,
        },
      });

      setTasks(res.data.data.tasks || []);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    clearAccessToken();
    router.push("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Task Dashboard</h1>

        <button
          onClick={handleLogout}
          className="border rounded px-4 py-2"
        >
          Logout
        </button>
      </div>

      {/* Search + Filter */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onApply={() => {
          setPage(1);
          fetchTasks();
        }}
      />

      <TaskForm onTaskCreated={fetchTasks} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} onRefresh={fetchTasks} />
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="border px-3 py-1 rounded"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="border px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}