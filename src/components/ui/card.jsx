import React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(function Card({ className, lean, ...props }, ref) {
  // `lean` prop can be used to apply a centering layout for content that doesn't need the full card styling (e.g. algo visualizer)
  return (
    <div
      ref={ref}
      className={cn(
        `${lean ? "flex items-center justify-center" : ""} rounded-2xl border border-(--surface-border) bg-(--card-bg) shadow-lg backdrop-blur-sm text-(--text) `,
        className
      )}
      {...props}
    />
  );
});

const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col gap-2 p-4 sm:p-5", className)} {...props} />;
});

const CardTitle = React.forwardRef(function CardTitle({ className, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn("text-xl font-semibold leading-tight text-(--text-strong)", className)}
      {...props}
    />
  );
});

const CardDescription = React.forwardRef(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm leading-relaxed text-(--text-soft)", className)} {...props} />;
});

const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-4 pt-0 sm:p-5 sm:pt-0", className)} {...props} />;
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
