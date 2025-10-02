// src/table/components/ColumnFilter.tsx
"use client";

import { Column } from "@tanstack/react-table";

type Props<T> = {
  column: Column<T, unknown>;
};

export default function ColumnFilter<T>({ column }: Props<T>) {
  const type = column.columnDef.meta?.type;
  const options = column.columnDef.meta?.options;
  const filterValue = column.getFilterValue() as string | number | undefined;

  if (!column.getCanFilter()) return null;

  switch (type) {
    case "number":
      return (
        <input
          type="number"
          value={filterValue ?? ""}
          onChange={(e) =>
            column.setFilterValue(
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
          placeholder="0"
          className="border rounded px-2 py-1 w-full text-sm"
        />
      );
    case "date":
      return (
        <input
          type="date"
          value={filterValue ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="border rounded px-2 py-1 w-full text-sm"
        />
      );
    case "select":
      return (
        <select
          value={filterValue ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value || undefined)}
          className="border rounded px-2 py-1 w-full text-sm"
        >
          <option value="">All</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type="text"
          value={filterValue ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder="Filter..."
          className="border rounded px-2 py-1 w-full text-sm"
        />
      );
  }
}
