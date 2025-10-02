"use client";

import { useCallback } from "react";
import ProductsDemo from "@/app/components/tables/examples/ProductsDemo";
import {
  DynamicTable,
  ColumnSchemaArrayZ,
  useTableData,
  mockFetcher,
  SkeletonTable
} from "@/app/components/tables";

const schema = ColumnSchemaArrayZ.parse([
  { id: "categoria", header: "Categoría", filterType: "select", options: ["Bebida", "Comida"] },
  { id: "marca", header: "Marca", filterType: "select", options: ["CocaCola", "Pepsi", "Sprite"] },
  { id: "nombre", header: "Nombre", filterType: "text" },
  { id: "stock", header: "Stock", filterType: "number" },
]);

const dataMock = [
  {
    categoria: "Bebida",
    marca: "CocaCola",
    nombre: "Coca Cola Light 500ml",
    stock: 50,
    children: [
      { categoria: "Bebida", marca: "CocaCola", nombre: "Coca Cola Light 1L", stock: 20 },
      { categoria: "Bebida", marca: "CocaCola", nombre: "Coca Cola Light 2L", stock: 10 },
    ],
  },
  { categoria: "Bebida", marca: "Pepsi", nombre: "Pepsi Regular 500ml", stock: 40 },
  { categoria: "Comida", marca: "Sabritas", nombre: "Papas clásicas", stock: 100 },
];

export default function Page() {
  // ✅ useCallback asegura que el fetcher no cambie en cada render
  const fetcher = useCallback(() => mockFetcher(dataMock, 1200), []);

  const { data, loading, error } = useTableData({ fetcher });

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <SkeletonTable rows={6} cols={4} />
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Inventario (Tabla básica)</h1>
        <DynamicTable schema={schema} data={data} />
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Productos demo (JSON + features)</h2>
        <ProductsDemo />
      </div>
    </div>
  );
}
