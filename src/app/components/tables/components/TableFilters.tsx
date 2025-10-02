// src/table/components/TableFilters.tsx
"use client";

import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { ColumnSchema } from "../dynamic-cols";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X, Save } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props<T> = {
  table: Table<T>;
  schema: ColumnSchema[];
  onAdd?: () => void;
};

export default function TableFilters<T>({ table, schema, onAdd }: Props<T>) {
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const columnDef = schema.find((col) => col.id === selectedColumn);

  const addFilter = () => {
    if (!selectedColumn || !value) return;
    table.setColumnFilters([
      ...table.getState().columnFilters,
      { id: selectedColumn, value },
    ]);
    setValue("");
  };

  const removeFilter = (id: string) => {
    table.setColumnFilters(
      table.getState().columnFilters.filter((f) => f.id !== id),
    );
  };

  return (
    <div className="p-3 border-b border-border bg-accent shadow-md rounded-t-xl">
      {/* Select columna + input dinámico */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        {/* Left controls */}
        <div className="flex flex-wrap items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select
                  onValueChange={setSelectedColumn}
                  value={selectedColumn}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Column" />
                  </SelectTrigger>
                  <SelectContent>
                    {schema.map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent side="top">Choose a column</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Control de entrada: visible siempre; deshabilitado si no hay columna seleccionada */}
          {(() => {
            if (!selectedColumn) {
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Input
                          placeholder="Select a column first"
                          value={value}
                          disabled
                          className="w-56"
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Select a column to enable
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }
            if (columnDef?.filterType === "number") {
              return (
                <Input
                  type="number"
                  placeholder="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-40"
                />
              );
            }
            if (columnDef?.filterType === "date") {
              return (
                <Input
                  type="date"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-48"
                />
              );
            }
            if (columnDef?.filterType === "select" && columnDef.options) {
              return (
                <Select onValueChange={setValue} value={value}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {columnDef.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }
            // default text
            return (
              <Input
                placeholder="Enter text..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-56"
              />
            );
          })()}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    onClick={addFilter}
                    disabled={!selectedColumn || !value}
                  >
                    <Search />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">Apply filter</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Botón para agregar nuevo elemento y exportar */}
        <div className="ml-auto flex flex-row gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  onClick={() => (onAdd ? onAdd() : alert("Add new item"))}
                  className="inline-flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Export</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  onClick={() => (onAdd ? onAdd() : alert("Add new item"))}
                  className="inline-flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Add new</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Filtros activos */}
      <div className="flex flex-wrap gap-2">
        {table.getState().columnFilters.map((f) => {
          const col = schema.find((s) => s.id === f.id);
          return (
            <Badge
              key={f.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {col?.header}: {String(f.value)}
              <button onClick={() => removeFilter(f.id)} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
