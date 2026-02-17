import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "./card";

function Container({ className, ...props }) {
  return (
    <Card
      className={cn("algo-card relative mx-auto mt-2 w-full max-w-6xl p-3 sm:p-4", className)}
      lean={true}
      {...props}
    />
  );
}

function CardContainer({ className, ...props }) {
  return (
    <div
      className={cn("algo-card-content relative flex w-full max-w-5xl flex-col gap-3 sm:gap-4", className)}
      {...props}
    />
  );
}

function Title({ className, ...props }) {
  return (
    <h2
      className={cn(
        "m-0 text-center text-xl font-semibold leading-tight text-[(--text-strong)] sm:text-2xl",
        className
      )}
      {...props}
    />
  );
}

function AlgoVisualizer({ className, ...props }) {
  return (
    <div
      className={cn("algo-visualizer mt-1 flex w-full min-w-0 flex-col items-stretch p-3 sm:pb-1", className)}
      {...props}
    />
  );
}

function AlgoVisualizerScroll({ className, ...props }) {
  return <div className={cn("algo-scroll-x w-full overflow-x-auto", className)} {...props} />;
}

function AlgoVisualizerScrollCenter({ className, ...props }) {
  return (
    <div className={cn("algo-scroll-x algo-scroll-x-center flex w-full justify-center", className)} {...props} />
  );
}

function CodeBlock({ className, ...props }) {
  return (
    <pre
      className={cn(
        "mb-2 w-full overflow-x-auto rounded-xl border border-slate-300/70 bg-slate-900 p-3 font-mono text-sm leading-relaxed text-slate-200 sm:text-xs",
        className
      )}
      {...props}
    />
  );
}

function Para({ className, ...props }) {
  return (
    <p
      className={cn(
        "mx-auto w-full max-w-4xl text-center text-base leading-relaxed text-[(--text-soft)] sm:text-[15px] sm:leading-normal max-[520px]:mx-0 max-[520px]:text-left max-[520px]:text-sm",
        className
      )}
      {...props}
    />
  );
}

function StyledInput({ className, ...props }) {
  return (
    <input
      className={cn(
        "my-3 min-h-11 w-full rounded-lg border border-[(--surface-border)] bg-[(--surface-raised)] px-3 py-2 text-base text-[(--text-strong)] outline-none ring-[(--primary)] focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
}

export {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  AlgoVisualizerScroll,
  AlgoVisualizerScrollCenter,
  CodeBlock,
  Para,
  StyledInput
};
