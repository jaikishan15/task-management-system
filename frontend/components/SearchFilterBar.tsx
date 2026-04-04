"use client";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  onApply: () => void;
};

export default function SearchFilterBar({
  search,
  setSearch,
  status,
  setStatus,
  onApply,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 cursor-pointer"
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <button
        onClick={onApply}
        className="border rounded px-4 py-2 cursor-pointer"
      >
        Apply
      </button>
    </div>
  );
}