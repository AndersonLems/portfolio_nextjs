import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "accent" | "muted" | "success";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em]",
        variant === "default" &&
          "border-border/80 bg-muted/30 text-muted-foreground",
        variant === "accent" &&
          "border-primary/35 bg-primary/12 text-primary",
        variant === "muted" &&
          "border-border/70 bg-background/60 text-muted-foreground",
        variant === "success" &&
          "border-secondary/35 bg-secondary/12 text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
