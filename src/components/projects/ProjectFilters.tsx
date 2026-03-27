"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { ProjectCategory, ProjectStatus } from "@/types/project";

type ProjectFiltersProps = {
  categories: ProjectCategory[];
  statuses: ProjectStatus[];
  selectedCategory: ProjectCategory | "all";
  selectedStatus: ProjectStatus | "all";
};

type FilterValue = ProjectCategory | ProjectStatus | "all";

function FilterGroup({
  title,
  items,
  value,
  onChange,
}: {
  title: string;
  items: FilterValue[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = value === item;

          return (
            <button
              key={`${title}-${item}`}
              type="button"
              onClick={() => onChange(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                active
                  ? "border-primary/35 bg-primary/12 text-foreground"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-primary/25 hover:bg-card hover:text-foreground",
              )}
            >
              {item === "all" ? "Todos" : item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectFilters({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
}: ProjectFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: "category" | "status", value: FilterValue) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card/82 p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <FilterGroup
          title="Categoria"
          items={["all", ...categories]}
          value={selectedCategory}
          onChange={(value) => updateParam("category", value)}
        />
        <FilterGroup
          title="Status"
          items={["all", ...statuses]}
          value={selectedStatus}
          onChange={(value) => updateParam("status", value)}
        />
      </div>
    </div>
  );
}
