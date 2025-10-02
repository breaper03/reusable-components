"use client";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  rows?: number;
  cols?: number;
};

export default function SkeletonTable({ rows = 5, cols = 4 }: Props) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className={`grid grid-cols-${cols} bg-muted px-4 py-2`}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-20 rounded" />
        ))}
      </div>
      <div>
        {Array.from({ length: rows }).map((_, ri) => (
          <div
            key={ri}
            className={`grid grid-cols-${cols} gap-4 px-4 py-3 border-t border-border`}
          >
            {Array.from({ length: 2 }).map((_, ci) => (
              <Skeleton key={ci} className="h-4 w-full rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
