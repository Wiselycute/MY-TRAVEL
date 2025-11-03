"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DataTable({
  title,
  columns = [],
  data = [],
  loading = false,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
  filters = {},
  onFilterChange = () => {},
}) {
  // Early return for loading state
  if (loading) {
    return (
      <Card className="w-full">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-4 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filters.hasOwnProperty('search') && (
            <input
              type="text"
              placeholder="Search..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
          )}
          
          {filters.hasOwnProperty('category') && (
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All Categories</option>
              <option value="economy">Economy</option>
              <option value="SUV">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          )}
          
          {filters.hasOwnProperty('availability') && (
            <select
              value={filters.availability || ''}
              onChange={(e) => onFilterChange({ ...filters, availability: e.target.value })}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All Availability</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          )}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/50">
            <tr>
              {columns.map((column, i) => (
                <th key={i} className="px-6 py-3 font-medium">
                  <div className="flex items-center gap-1">
                    {column.header}
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!data || data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column, j) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap">
                      {column.cell ? column.cell(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}