// src/table/components/RowExpander.tsx
"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

type Props<T> = {
  row: Row<T>;
};

export default function RowExpander<T extends object>({ row }: Props<T>) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren =
    Array.isArray((row.original as any)?.children) &&
    (row.original as any).children.length > 0;

  return (
    <>
      <tr className="border-b">
        {row.getVisibleCells().map((cell, i) => (
          <td key={cell.id} className="p-2">
            {i === 0 && hasChildren && (
              <button
                className="inline-flex items-center mr-2 text-gray-600 hover:text-gray-900"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            )}
            {cell.renderValue() as React.ReactNode}
          </td>
        ))}
      </tr>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <td colSpan={row.getVisibleCells().length} className="p-0">
              <motion.div className="pl-6">
                {(row.original as any).children.map((child: T, idx: number) => (
                  <RowExpander
                    key={row.id + "-child-" + idx}
                    row={
                      {
                        ...row,
                        id: row.id + "-child-" + idx,
                        original: child,
                        getVisibleCells: () =>
                          row.getVisibleCells().map((c) => ({
                            ...c,
                            row: { ...row, original: child },
                          })),
                      } as Row<T>
                    }
                  />
                ))}
              </motion.div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}
