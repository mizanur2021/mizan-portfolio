"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 will-change-transform",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-glow hover:bg-secondary",
        outline:
          "border border-line bg-white/[0.02] text-white hover:border-primary/50 hover:text-primary",
        ghost: "text-muted hover:text-white",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5",
        lg: "h-14 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = false, ...props }, _ref) => {
    const { ref, onMove, onLeave } = useMagnetic(0.35);
    return (
      <button
        ref={magnetic ? ref : undefined}
        onMouseMove={magnetic ? onMove : undefined}
        onMouseLeave={magnetic ? onLeave : undefined}
        className={cn(
          buttonVariants({ variant, size }),
          magnetic && "transition-transform",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
