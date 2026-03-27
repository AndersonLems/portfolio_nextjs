import Link from "next/link";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "border-primary/70 bg-primary text-primary-foreground shadow-[0_12px_34px_-18px_color-mix(in_srgb,var(--primary)_65%,transparent)] hover:border-primary hover:bg-primary/92",
        primary:
          "border-primary/70 bg-primary text-primary-foreground shadow-[0_12px_34px_-18px_color-mix(in_srgb,var(--primary)_65%,transparent)] hover:border-primary hover:bg-primary/92",
        destructive:
          "border-destructive/70 bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-input bg-background/60 text-foreground hover:border-ring/60 hover:bg-card",
        secondary:
          "border-border/80 bg-card/80 text-foreground hover:border-primary/40 hover:bg-card/95",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:border-border/70 hover:bg-card/60 hover:text-foreground",
        link: "border-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-11 px-5",
        icon: "h-10 w-10 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type SharedProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  className?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  children: React.ReactNode;
};

type NativeButtonProps = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  asChild = false,
  className,
  variant,
  size,
  href,
  target,
  rel,
  children,
  ...props
}: NativeButtonProps) {
  const styles = cn(buttonVariants({ variant, size, className }));

  if (asChild) {
    return (
      <Slot className={styles} {...props}>
        {children}
      </Slot>
    );
  }

  if (href) {
    return (
      <Link href={href} className={styles} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
