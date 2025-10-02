"use client";

import { useEffect, useState } from "react";

type UseTableDataProps<T> = {
  fetcher: () => Promise<T[]>;
};

export function useTableData<T>({ fetcher }: UseTableDataProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const result = await fetcher();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err as Error);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [fetcher]); // ahora sí, pero estable gracias a useCallback en la page

  return { data, loading, error };
}

export async function mockFetcher<T>(mock: T[], delay = 1000): Promise<T[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mock), delay));
}
