import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "accent" | "muted" | "success";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        variant === "default" && "border-white/10 bg-white/5 text-slate-200",
        variant === "accent" && "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
        variant === "muted" && "border-slate-700 bg-slate-900 text-slate-400",
        variant === "success" && "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
      )}
    >
      {children}
    </span>
  );
}
