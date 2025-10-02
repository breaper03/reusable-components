// src/table/dynamic-cols.ts
"use client";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=600&auto=format&fit=crop";

/** Zod schema para definir columnas */
export const ColumnSchemaZ = z.object({
  id: z.string().min(1),
  header: z.string().min(1),
  accessorKey: z.string().optional(),
  filterType: z
    .enum(["text", "number", "date", "select"])
    .default("text")
    .optional(),
  type: z.enum(["text", "number", "date", "select", "custom"]).default("text"),
  options: z.array(z.string()).optional(),
});

export type ColumnSchema = z.infer<typeof ColumnSchemaZ>;

export const ColumnSchemaArrayZ = z.array(ColumnSchemaZ);
export type ColumnSchemaArray = z.infer<typeof ColumnSchemaArrayZ>;

/**
 * Genera columnas de TanStack Table, agregando una columna `expander` para children
 */
export function generateColumns<T extends Record<string, any>>(
  schema: ColumnSchema[],
): ColumnDef<T, any>[] {
  function normalize(val: unknown) {
    if (val == null) return "";
    if (typeof val === "number") return String(val);
    if (val instanceof Date) return val.toISOString();
    return String(val);
  }

  function makePredicate(
    filterType: ColumnSchema["filterType"],
    filterValue: any,
    options?: string[],
  ) {
    switch (filterType) {
      case "number":
        return (v: unknown) => Number(v) === Number(filterValue);
      case "date":
        // comparación sencilla por prefijo YYYY-MM-DD
        return (v: unknown) => normalize(v).startsWith(String(filterValue));
      case "select":
        return (v: unknown) => String(v) === String(filterValue);
      case "text":
      default:
        return (v: unknown) =>
          normalize(v)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());
    }
  }

  function makeRecursiveFilterFn(col: ColumnSchema) {
    return (row: any, columnId: string, filterValue: any) => {
      const pred = makePredicate(
        col.filterType ?? "text",
        filterValue,
        col.options,
      );

      const matchesSelf = pred(row.getValue(columnId));
      if (matchesSelf) return true;

      // buscar en hijos recursivamente
      const children: any[] = (row.original?.children as any[]) || [];
      const accessorKey = (col.accessorKey ?? col.id) as string;
      const searchChildren = (items: any[]): boolean => {
        for (const child of items) {
          const value = child?.[accessorKey];
          if (pred(value)) return true;
          const grand = (child?.children as any[]) || [];
          if (grand.length && searchChildren(grand)) return true;
        }
        return false;
      };
      return searchChildren(children);
    };
  }

  const baseCols: ColumnDef<T, any>[] = schema.map((col) => ({
    id: col.id,
    accessorKey: (col.accessorKey ?? col.id) as keyof T & string,
    header: col.header,
    meta: {
      type: col.type,
      filterType: col.filterType,
      options: col.options,
    },
    cell: (info) => {
      if (
        col.type === "custom" &&
        (col.accessorKey ?? col.id) === ("imageUrl" as any)
      ) {
        const val = String(info.getValue() ?? "");
        const src = val && val.startsWith("http") ? val : FALLBACK_IMG;
        return (
          <div className="w-12 h-12 relative">
            <Image
              src={src}
              alt="product"
              fill
              sizes="48px"
              className="object-cover rounded"
            />
          </div>
        );
      }
      return info.getValue() as any;
    },
    enableColumnFilter: true,
    filterFn: makeRecursiveFilterFn(col),
  }));

  const expanderCol: ColumnDef<T, any> = {
    id: "expander",
    enableSorting: false,
    header: ({ table }) => {
      // Determine if all expandable rows on the current page are expanded
      const rows = table.getRowModel().rows as any[];
      const expandable = rows.filter((r) => r.getCanExpand());
      const expanded =
        (table.getState().expanded as Record<string, boolean>) ?? {};
      const allOpen =
        expandable.length > 0 && expandable.every((r) => expanded[r.id]);

      const handleToggleAll = () => {
        const next: Record<string, boolean> = { ...(expanded || {}) };
        if (allOpen) {
          // Collapse all expandable rows on page and their descendants
          for (const r of expandable) {
            delete next[r.id];
            for (const k of Object.keys(next)) {
              if (k.startsWith(r.id + ".")) delete next[k];
            }
          }
        } else {
          // Expand all rows (recursively) on the current page
          const addIds = (r: any) => {
            if (r.getCanExpand()) {
              next[r.id] = true;
              (r.subRows || []).forEach(addIds);
            }
          };
          rows.forEach(addIds);
        }
        table.setExpanded(next);
      };

      return (
        <motion.button
          type="button"
          onClick={handleToggleAll}
          initial={false}
          animate={{ rotate: allOpen ? 90 : 0 }}
          transition={{ type: "tween", duration: 0.18 }}
          className="inline-flex items-center justify-center h-6 w-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60"
          aria-label={allOpen ? "Collapse all" : "Expand all"}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      );
    },
    cell: ({ row, table }) => (
      <div className="flex items-center">
        {row.depth > 0 && (
          <span
            className="inline-block"
            style={{ width: row.depth * 12 }}
            aria-hidden="true"
          />
        )}
        {row.getCanExpand() ? (
          <motion.button
            type="button"
            onClick={() => {
              const current = table.getState().expanded as Record<
                string,
                boolean
              >;
              const id = row.id as string; // e.g., "0", "0.1", "0.1.2"
              const isExpanded = row.getIsExpanded();

              // clone current state so we don't mutate directly
              const next: Record<string, boolean> = { ...current };

              if (isExpanded) {
                // Collapse this row and all its descendant rows only
                delete next[id];
                for (const k of Object.keys(next)) {
                  if (k.startsWith(id + ".")) delete next[k];
                }
              } else {
                // Expand this row and keep other expanded branches intact
                next[id] = true;
              }

              table.setExpanded(next);
            }}
            initial={false}
            animate={{ rotate: row.getIsExpanded() ? 90 : 0 }}
            transition={{ type: "tween", duration: 0.18 }}
            className="inline-flex items-center justify-center h-6 w-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60"
            aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        ) : (
          // spacer to preserve indentation for non-expandable child rows
          <span className="inline-block h-6 w-6" aria-hidden="true" />
        )}
      </div>
    ),
  };

  return [expanderCol, ...baseCols];
}
