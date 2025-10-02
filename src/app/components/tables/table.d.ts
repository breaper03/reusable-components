import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    type?: "text" | "number" | "date" | "select" | "custom";
    options?: string[];
  }
}
