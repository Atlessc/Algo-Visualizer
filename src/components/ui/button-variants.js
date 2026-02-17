import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        default: "bg-(--primary) text-white hover:brightness-110",
        secondary:
          "border border-(--surface-border) bg-(--surface-muted) text-(--text-strong) hover:bg-(--surface-raised)",
        ghost: "text-(--text-soft) hover:bg-(--surface-muted)",
        outline:
          "border border-(--surface-border) bg-(--surface-raised) text-(--text-strong) hover:bg-(--surface-muted)",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { buttonVariants };
