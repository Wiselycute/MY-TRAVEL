"use client";
import { useState, useMemo } from "react";
import { Pencil, Trash2, Download, Search } from "lucide-react";

export default function DataTable({ columns, data, loading, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter logic
  const filteredData = useMemo(() => {
    let filtered = data || [];
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((v) => String(v).toLowerCase().includes(term))
      );
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((item) =>
        item.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    return filtered;
  }, [data, search, statusFilter]);

  // CSV export
  const handleExportCSV = () => {
    if (!filteredData.length) return alert("No data to export");
    const headers = columns.map((col) => col.header);
    const rows = filteredData.map((row) =>
      columns.map((col) => {
        const val = col.cell ? col.cell(row) : row[col.accessor];
        return typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val;
      })
    );
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-center py-6 text-slate-400">Loading...</div>;

  return (
    <div className="rounded-xl bg-slate-800/70 backdrop-blur-lg border border-white/10 shadow-lg p-4 space-y-4">
      {/* === TOP BAR === */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center bg-slate-700/50 rounded-lg px-3 w-full sm:w-1/3">
          <Search size={16} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 p-2 outline-none text-sm text-slate-100"
          />
        </div>

        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-700/50 text-slate-200 rounded-md p-2 text-sm border border-white/10"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm font-medium text-white"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* === TABLE === */}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full text-sm text-slate-200">
          <thead className="bg-slate-700/50 text-slate-300 uppercase text-xs">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="p-3 text-left">{col.header}</th>
              ))}
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-6 text-slate-400">
                  No results found
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr
                  key={row._id || i}
                  className="border-b border-white/5 hover:bg-slate-700/30 transition-all"
                >
                  {columns.map((col, j) => (
                    <td key={j} className="p-3">{col.cell ? col.cell(row) : row[col.accessor]}</td>
                  ))}
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(row)}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(row._id)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* === FOOTER === */}
      <div className="text-xs text-slate-500 text-center">
        Showing {filteredData.length} of {data?.length || 0} records
      </div>
    </div>
  );
}
