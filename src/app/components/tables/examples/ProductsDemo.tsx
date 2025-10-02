"use client";

import { DynamicTable, ColumnSchema } from "../../tables";
import raw from "../data/products.json";

type Product = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  brand?: string;
  imageUrl: string;
  children?: Product[];
};

const schema: ColumnSchema[] = [
  { id: "name", header: "Producto", type: "text", filterType: "text" },
  {
    id: "category",
    header: "Categoría",
    type: "select",
    filterType: "select",
    options: ["Bebidas"],
  },
  {
    id: "subcategory",
    header: "Subcategoría",
    type: "text",
    filterType: "text",
  },
  { id: "price", header: "Precio", type: "number", filterType: "number" },
  { id: "brand", header: "Marca", type: "text", filterType: "text" },
  { id: "imageUrl", header: "Imagen", type: "custom", filterType: "text" },
];

export default function ProductsDemo() {
  const AVATAR = "https://github.com/evilrabbit.png";

  function normalize<T extends { children?: T[]; imageUrl?: string }>(
    items: T[],
  ): T[] {
    return items.map((item) => ({
      ...item,
      imageUrl: AVATAR,
      children: item.children ? normalize(item.children as T[]) : undefined,
    }));
  }

  const products = normalize(raw as unknown as Product[]);
  return (
    <div className="p-4 flex-1 min-h-0 flex flex-col gap-4">
      <DynamicTable<Product>
        className="flex-1 min-h-0"
        schema={schema}
        data={products as Product[]}
        enableSelection
        enableSorting
        enableExpanding
        enablePagination
        onAdd={() => alert("Add new product")}
        onEditRow={(row) => alert("Edit: " + row.name)}
        onDeleteRow={(row) => alert("Delete: " + row.name)}
      />
    </div>
  );
}
