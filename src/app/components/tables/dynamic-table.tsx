// src/table/DynamicTable.tsx
"use client";

import React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { generateColumns, ColumnSchema } from "./dynamic-cols";
import TableFilters from "./components/TableFilters";
import {
  Table as UITable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type FeatureFlags<T> = {
  enableSelection?: boolean;
  enableSorting?: boolean;
  enableExpanding?: boolean;
  enablePagination?: boolean;
  enableGrouping?: boolean;
  onAdd?: () => void;
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
};

type Props<T extends object> = {
  schema: ColumnSchema[];
  data: T[];
  className?: string;
} & FeatureFlags<T>;

// Checkbox con estado "indeterminate" para selecciones parciales
function IndeterminateCheckbox({
  checked,
  indeterminate,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ariaLabel?: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = Boolean(indeterminate) && !checked;
    }
  }, [indeterminate, checked]);
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label={ariaLabel}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary align-middle"
    />
  );
}

export default function DynamicTable<T extends { children?: T[] }>(
  props: Props<T>,
) {
  const {
    schema,
    data,
    className = "",
    enableSelection = false,
    enableSorting = false,
    enableExpanding = false,
    enablePagination = false,
    enableGrouping = false,
    onAdd,
    onEditRow,
    onDeleteRow,
  } = props;

  // columnas base generadas desde schema
  const generated = React.useMemo(() => generateColumns<T>(schema), [schema]);
  const columns = React.useMemo(() => {
    if (enableExpanding) return generated;
    // ocultar columna expander cuando no se desea expandir
    return generated.filter((c) => c.id !== "expander");
  }, [generated, enableExpanding]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    // Only paginate top-level rows; keep expanded children with their parent on the same page
    paginateExpandedRows: false,
    enableRowSelection: enableSelection,
    enableMultiRowSelection: enableSelection,
    getSubRows: (row) => row.children ?? [],
  });

  return (
    <div
      className={[
        "bg-card text-foreground rounded-xl shadow-md border border-border/60 overflow-hidden h-full flex flex-col",
        className,
      ].join(" ")}
    >
      <TableFilters table={table} schema={schema} onAdd={onAdd} />

      <div className="relative overflow-auto flex-1 min-h-0">
        <UITable className="w-full text-sm border-separate border-spacing-0">
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {/* Columna de selección (header) */}
                {enableSelection && (
                  <TableHead className="w-12 px-0 py-3 border-b border-border/60 sticky left-0 top-0 bg-secondary z-20">
                    <div className="flex items-center justify-center">
                      <IndeterminateCheckbox
                        ariaLabel="Select all rows"
                        checked={table.getIsAllRowsSelected?.() ?? false}
                        indeterminate={table.getIsSomeRowsSelected?.() ?? false}
                        onChange={
                          table.getToggleAllRowsSelectedHandler?.() ??
                          (() => {})
                        }
                      />
                    </div>
                  </TableHead>
                )}
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={[
                      "px-4 py-3 text-left font-medium border-b border-border/60 select-none sticky top-0 bg-secondary z-10 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]",
                      header.column.id === "expander" && enableSelection
                        ? "left-[48px] z-20"
                        : "",
                    ].join(" ")}
                  >
                    {header.isPlaceholder ? null : enableSorting &&
                      header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1 hover:text-foreground/90 text-foreground/80"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-60" />
                        )}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}

                {/* Header de acciones (siempre visible) */}
                <TableHead className="w-20 px-3 py-3 text-right font-medium border-b border-border/60 sticky right-0 top-0 bg-secondary z-20">
                  {/* acciones */}
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={[
                  "transition-colors hover:bg-muted group/row",
                  // full-width bottom separator overlays sticky cells
                  "relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border after:z-20 after:pointer-events-none",
                  "bg-card",
                  row.getIsSelected() ? "bg-primary/10" : "",
                ].join(" ")}
              >
                {/* Columna de selección (body) */}
                {enableSelection && (
                  <TableCell
                    className={[
                      "w-12 px-0 py-3 sticky left-0 z-10 group-hover/row:bg-muted",
                      "bg-card",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${row.id}`}
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className="h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </TableCell>
                )}
                {row.getVisibleCells().map((cell, i) => {
                  const isExpander = cell.column.id === "expander";
                  // Determine if this is the first non-expander data cell
                  const isFirstDataCell =
                    !isExpander &&
                    // if expander exists, it's at index 0
                    (row.getVisibleCells()[0]?.column.id === "expander"
                      ? i === 1
                      : i === 0);
                  const rowBg = "bg-card";
                  return (
                    <TableCell
                      key={cell.id}
                      className={[
                        "px-4 py-3",
                        isExpander && enableSelection
                          ? `sticky left-[48px] ${rowBg} z-10 group-hover/row:bg-muted`
                          : "",
                      ].join(" ")}
                      style={
                        isFirstDataCell
                          ? { paddingLeft: 16 + row.depth * 20 }
                          : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}

                {/* Acciones por fila (siempre visibles) */}
                <TableCell
                  className={[
                    "w-20 px-3 py-3 text-right sticky right-0 z-10 group-hover/row:bg-muted",
                    "bg-card",
                  ].join(" ")}
                >
                  <TooltipProvider>
                    <div className="inline-flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileTap={{ scale: 0.96 }}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"
                            aria-label="Edit row"
                            onClick={() =>
                              onEditRow
                                ? onEditRow(row.original)
                                : alert("Edit row")
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileTap={{ scale: 0.96 }}
                            className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted text-destructive"
                            aria-label="Delete row"
                            onClick={() =>
                              onDeleteRow
                                ? onDeleteRow(row.original)
                                : alert("Delete row")
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </UITable>
      </div>

      {/* Controles de paginación */}
      {enablePagination && (
        <div className="flex items-center justify-between p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
