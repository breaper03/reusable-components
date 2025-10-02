---

## Ejemplo avanzado: Productos con subcategorías e imágenes

Este ejemplo muestra una tabla de productos con jerarquía de categorías y subcategorías, incluyendo URLs de imágenes. Además, se habilitan algunas funcionalidades del componente vía banderas.

```tsx
import Image from "next/image";
import { DynamicTable, ColumnSchema } from "@/app/components/tables";

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
    options: ["Bebidas", "Snacks", "Lácteos"],
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

const products: Product[] = [
  {
    id: "bebidas",
    name: "Bebidas",
    category: "Bebidas",
    price: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=600&auto=format&fit=crop",
    children: [
      {
        id: "bebidas-alcoholicas",
        name: "Alcohólicas",
        category: "Bebidas",
        subcategory: "Alcohólicas",
        price: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1514361892635-6b07e31e75d9?q=80&w=600&auto=format&fit=crop",
        children: [
          {
            id: "ron",
            name: "Ron",
            category: "Bebidas",
            subcategory: "Ron",
            price: 0,
            brand: "",
            imageUrl:
              "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=600&auto=format&fit=crop",
            children: [
              {
                id: "ron-santateresa-aniversario",
                name: "Santa Teresa Aniversario",
                category: "Bebidas",
                subcategory: "Ron",
                price: 25,
                brand: "Santa Teresa",
                imageUrl:
                  "https://images.unsplash.com/photo-1624360252989-3e97e2bca6b0?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "ron-santateresa-1796",
                name: "Santa Teresa 1796",
                category: "Bebidas",
                subcategory: "Ron",
                price: 45,
                brand: "Santa Teresa",
                imageUrl:
                  "https://images.unsplash.com/photo-1617806118233-bb1c6a0dfda5?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "ron-diplomatico-reserva",
                name: "Diplomático Reserva",
                category: "Bebidas",
                subcategory: "Ron",
                price: 30,
                brand: "Diplomático",
                imageUrl:
                  "https://images.unsplash.com/photo-1611284446314-60a58ac0c2b7?q=80&w=600&auto=format&fit=crop",
              },
            ],
          },
          {
            id: "cervezas",
            name: "Cervezas",
            category: "Bebidas",
            subcategory: "Cervezas",
            price: 0,
            imageUrl:
              "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600&auto=format&fit=crop",
            children: [
              {
                id: "cerveza-pale-ale",
                name: "Pale Ale Artesanal",
                category: "Bebidas",
                subcategory: "Cervezas",
                price: 4.5,
                brand: "CraftCo",
                imageUrl:
                  "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "cerveza-lager",
                name: "Lager Clásica",
                category: "Bebidas",
                subcategory: "Cervezas",
                price: 3.2,
                brand: "GoldBeer",
                imageUrl:
                  "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "cerveza-stout",
                name: "Stout Negra",
                category: "Bebidas",
                subcategory: "Cervezas",
                price: 4.9,
                brand: "NightBrew",
                imageUrl:
                  "https://images.unsplash.com/photo-1600275669283-4d21a7103e52?q=80&w=600&auto=format&fit=crop",
              },
            ],
          },
          {
            id: "whiskies",
            name: "Whiskies",
            category: "Bebidas",
            subcategory: "Whiskies",
            price: 0,
            imageUrl:
              "https://images.unsplash.com/photo-1544141015-4a0b5e46f3de?q=80&w=600&auto=format&fit=crop",
            children: [
              {
                id: "whisky-scotch",
                name: "Scotch 12 años",
                category: "Bebidas",
                subcategory: "Whiskies",
                price: 55,
                brand: "Glen Valley",
                imageUrl:
                  "https://images.unsplash.com/photo-1547452919-51ce6203a2c4?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "whisky-bourbon",
                name: "Bourbon Reserve",
                category: "Bebidas",
                subcategory: "Whiskies",
                price: 49,
                brand: "Old Creek",
                imageUrl:
                  "https://images.unsplash.com/photo-1604908177075-991b63590f9f?q=80&w=600&auto=format&fit=crop",
              },
              {
                id: "whisky-rye",
                name: "Rye Select",
                category: "Bebidas",
                subcategory: "Whiskies",
                price: 46,
                brand: "Maple Ridge",
                imageUrl:
                  "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop",
              },
            ],
          },
        ],
      },
      {
        id: "bebidas-refrescos",
        name: "Refrescos",
        category: "Bebidas",
        subcategory: "Refrescos",
        price: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop",
        children: [
          {
            id: "refresco-cola",
            name: "Cola",
            category: "Bebidas",
            subcategory: "Refrescos",
            price: 1.5,
            brand: "ColaCo",
            imageUrl:
              "https://images.unsplash.com/photo-1600275669283-4d21a7103e52?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "refresco-limon",
            name: "Limonada",
            category: "Bebidas",
            subcategory: "Refrescos",
            price: 1.2,
            brand: "Citrus+",
            imageUrl:
              "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "refresco-naranja",
            name: "Naranja",
            category: "Bebidas",
            subcategory: "Refrescos",
            price: 1.3,
            brand: "OrangeZ",
            imageUrl:
              "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
      {
        id: "bebidas-jugos",
        name: "Jugos",
        category: "Bebidas",
        subcategory: "Jugos",
        price: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
        children: [
          {
            id: "jugo-manzana",
            name: "Jugo de Manzana",
            category: "Bebidas",
            subcategory: "Jugos",
            price: 2.3,
            brand: "Apple Farm",
            imageUrl:
              "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "jugo-uva",
            name: "Jugo de Uva",
            category: "Bebidas",
            subcategory: "Jugos",
            price: 2.6,
            brand: "Purple Vine",
            imageUrl:
              "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "jugo-pina",
            name: "Jugo de Piña",
            category: "Bebidas",
            subcategory: "Jugos",
            price: 2.4,
            brand: "Tropic",
            imageUrl:
              "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
    ],
  },
];

export default function ProductsPage() {
  // Ejemplo de render de imagen en la columna imageUrl usando un custom cell
  // Puedes sobrescribir el cell renderer con TanStack si lo necesitas.
  return (
    <DynamicTable<Product>
      schema={schema}
      data={products}
      enableSelection
      enableSorting
      enableExpanding
      enableRowActions
      onAdd={() => alert("Add new product")}
      onEditRow={(row) => alert("Edit: " + row.name)}
      onDeleteRow={(row) => alert("Delete: " + row.name)}
    />
  );
}
```

## Banderas de funcionalidades de DynamicTable

Las siguientes props controlan funcionalidades (todas `false` por defecto):

- `enableSelection`: habilita selección de filas (checkbox en header y filas).
- `enableSorting`: habilita ordenamiento por clic en headers.
- `enableExpanding`: muestra la columna de expandir y permite jerarquías.
- `enablePagination`: integra el row model de paginación (requiere UI de paginación externa).
- `enableGrouping`: integra el row model de agrupado.
- `enableRowActions`: añade una columna con acciones por fila (editar/eliminar con íconos).
- Callbacks opcionales:
  - `onAdd`: botón en la barra de filtros para agregar nuevo (callback del consumidor).
  - `onEditRow(row)`, `onDeleteRow(row)`: acciones por fila (por defecto `alert`).

Notas:

- El filtrado recorre recursivamente los `children` de cada fila, de modo que búsquedas como "Santa T" también coinciden con "Santa Teresa" en niveles inferiores.
- Puedes personalizar celdas y headers usando TanStack Table `columnDef.cell` y `columnDef.header` si necesitas render avanzado (por ejemplo, imágenes con `next/image`).

# Tables

Componentes reutilizables para renderizar tablas dinámicas usando TanStack Table, con generación de columnas por esquema (Zod), filtros, soporte para filas anidadas (children) y utilidades de carga de datos.

## Contenido de la carpeta

- `dynamic-table.tsx`: Componente principal `DynamicTable` que renderiza la tabla, integra filtros y gestiona selección, ordenamiento, paginación y expansión de filas.
- `dynamic-cols.tsx`: Utilidades y tipos para definir el esquema de columnas (`ColumnSchema`) y generar las columnas de TanStack (`generateColumns`).
- `table.d.ts`: Extiende los metadatos (`ColumnMeta`) de TanStack Table para soportar `type` y `options` en columnas.
- `index.ts`: Archivo de barril para exportar los principales componentes/utilidades.
- `components/`
  - `TableFilters.tsx`: Barra de filtros por columna basada en `schema` (text/number/date/select).
  - `ColumnFilter.tsx`: Filtro individual por columna (si se requiere en celdas/cabecera).
  - `RowExpander.tsx`: Render recursivo de filas anidadas con animaciones.
  - `SkeletonTable.tsx`: Componente de esqueleto para estado de carga.
- `hooks/`
  - `useTableData.ts`: Hook para cargar datos asíncronos y manejar `loading`/`error`.

## Dependencias

Asegúrate de tener instaladas (o disponibles) las siguientes dependencias:

- `@tanstack/react-table`
- `zod`
- `framer-motion`
- `lucide-react` (iconos)
- Componentes UI (basados en shadcn/ui):
  - `@/components/ui/button`
  - `@/components/ui/input`
  - `@/components/ui/select`
  - `@/components/ui/badge`
  - `@/components/ui/skeleton`

Nota: Ajusta los imports de `@/components/ui/...` según tu estructura de proyecto.

## Exportaciones principales

Desde `src/app/components/tables/index.ts`:

```ts
export { DynamicTable } from "./dynamic-table";
export { TableFilters } from "./components/TableFilters";
export { SkeletonTable } from "./components/SkeletonTable";
export * from "./dynamic-cols"; // ColumnSchema, ColumnSchemaZ, generateColumns ...
export * from "./hooks/useTableData"; // useTableData, mockFetcher
```

Importación típica:

```ts
import {
  DynamicTable,
  ColumnSchema,
  useTableData,
  mockFetcher,
} from "@/app/components/tables";
```

## API

### ColumnSchema (Zod)

Definición en `dynamic-cols.tsx`:

```ts
const ColumnSchemaZ = z.object({
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
```

- `id`: Identificador único de la columna (coincide por defecto con `accessorKey`).
- `header`: Título mostrado en cabecera.
- `accessorKey` (opcional): Clave del objeto de datos a la que accede la columna.
- `filterType` (opcional): Tipo de filtro a usar en `TableFilters` (text | number | date | select).
- `type`: Tipo de dato principal de la columna (puede orientar render o filtro por defecto).
- `options` (opcional): Opciones válidas para `filterType = "select"`.

La función `generateColumns(schema)` produce un array de `ColumnDef` de TanStack y agrega automáticamente una columna `expander` (id: `expander`) para manejar filas con `children`.

### DynamicTable

Archivo: `dynamic-table.tsx`

Props:

```ts
type Props<T extends object> = {
  schema: ColumnSchema[];
  data: T[];
};
```

- `schema`: Arreglo de `ColumnSchema` que define las columnas.
- `data`: Datos a renderizar. Si un elemento tiene `children: T[]`, se soporta expansión jerárquica.

Características integradas con TanStack Table:

- Core row model, filtros, ordenamiento, paginación, agrupado, filas expandidas.
- Selección de filas (simple y múltiple) con checkbox.
- Soporte para subfilas vía `getSubRows: (row) => row.children ?? []`.
- Render de filtros globales por columna mediante `TableFilters`.

### TableFilters

Archivo: `components/TableFilters.tsx`

- Renderiza un panel para añadir filtros por columna basados en `schema` y `filterType`.
- Soporta inputs dinámicos: text, number, date y select.
- Muestra badges de filtros activos con opción de eliminarlos.

### ColumnFilter

Archivo: `components/ColumnFilter.tsx`

- Componente de filtro individual por columna usando `column.columnDef.meta` (`type` y `options`).
- Útil si deseas filtros embebidos por columna en cabecera o en celdas.

### RowExpander

Archivo: `components/RowExpander.tsx`

- Render recursivo de filas con animaciones usando `framer-motion`.
- Alternativa avanzada si quieres un control detallado del expand/collapse más allá de la columna `expander` predeterminada.

### SkeletonTable

Archivo: `components/SkeletonTable.tsx`

Props:

```ts
type Props = { rows?: number; cols?: number };
```

- Muestra un placeholder de tabla con `rows` y `cols` configurables.

### useTableData

Archivo: `hooks/useTableData.ts`

```ts
function useTableData<T>({ fetcher }: { fetcher: () => Promise<T[]> });
```

- Hook para cargar datos asíncronos.
- Retorna `{ data, loading, error }`.
- Incluye `mockFetcher<T>(mock: T[], delay?: number)` para demo/local.

## Ejemplos

### 1. Uso básico de DynamicTable

```tsx
import { DynamicTable, ColumnSchema } from "@/app/components/tables";

type User = {
  id: string;
  name: string;
  age: number;
  role: string;
  children?: User[]; // opcional para jerarquía
};

const schema: ColumnSchema[] = [
  { id: "name", header: "Name", type: "text", filterType: "text" },
  { id: "age", header: "Age", type: "number", filterType: "number" },
  {
    id: "role",
    header: "Role",
    type: "select",
    filterType: "select",
    options: ["admin", "user", "guest"],
  },
];

const data: User[] = [
  {
    id: "1",
    name: "Alice",
    age: 30,
    role: "admin",
    children: [{ id: "1-1", name: "Bob", age: 12, role: "guest" }],
  },
  { id: "2", name: "Carol", age: 25, role: "user" },
];

export default function Page() {
  return <DynamicTable<User> schema={schema} data={data} />;
}
```

### 2. Carga de datos con useTableData

```tsx
import {
  DynamicTable,
  ColumnSchema,
  useTableData,
  mockFetcher,
} from "@/app/components/tables";

const schema: ColumnSchema[] = [
  { id: "name", header: "Name" },
  { id: "age", header: "Age", type: "number", filterType: "number" },
];

type Row = { name: string; age: number };

export default function Page() {
  const { data, loading } = useTableData<Row>({
    fetcher: () =>
      mockFetcher<Row>(
        [
          { name: "Alice", age: 30 },
          { name: "Bob", age: 22 },
        ],
        800,
      ),
  });

  if (loading) return <div className="p-4">Loading...</div>;

  return <DynamicTable<Row> schema={schema} data={data} />;
}
```

### 3. Filtros por UI personalizada

- Usa `TableFilters` directamente si necesitas mostrar el panel de filtros en otro lugar o con otra disposición.
- Para filtros por columna embebidos, usa `ColumnFilter` y compón tu propia cabecera.

## Notas y personalización

- `generateColumns` agrega una columna `expander` al inicio. Si no deseas expansión, puedes clonar la función o filtrar esa columna según tus necesidades.
- `ColumnMeta` definido en `table.d.ts` permite enriquecer las columnas con `type` y `options`, útiles para la UI de filtros y render.
- Ajusta estilos a tu sistema de diseño (Tailwind/shadcn). El ejemplo utiliza clases como `bg-muted`, `border-border`, etc.

## Licencia

Uso interno. Ajusta según la licencia de tu proyecto.
