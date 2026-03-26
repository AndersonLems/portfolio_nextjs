import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  disabled,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
    variant === "primary" &&
      "bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:bg-cyan-400/50",
    variant === "secondary" &&
      "border border-white/10 bg-white/5 text-slate-100 hover:border-white/20 hover:bg-white/10",
    variant === "ghost" &&
      "text-slate-300 hover:bg-white/5 hover:text-white",
    disabled && "cursor-not-allowed opacity-70",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} disabled={disabled}>
      {children}
    </button>
  );
}
