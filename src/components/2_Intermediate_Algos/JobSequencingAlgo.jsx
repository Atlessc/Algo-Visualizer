import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const JOBS = [
  { id: "J1", deadline: 2, profit: 100 },
  { id: "J2", deadline: 1, profit: 19 },
  { id: "J3", deadline: 2, profit: 27 },
  { id: "J4", deadline: 1, profit: 25 },
  { id: "J5", deadline: 3, profit: 15 },
];

const buildSteps = () => {
  const sorted = [...JOBS].sort((a, b) => b.profit - a.profit);
  const maxD = Math.max(...sorted.map((j) => j.deadline));
  const slots = Array(maxD).fill(null);
  const steps = [{ sorted, slots: [...slots], active: null, message: "Sort jobs by descending profit." }];

  sorted.forEach((job) => {
    let placed = false;
    for (let t = Math.min(maxD, job.deadline) - 1; t >= 0; t--) {
      if (!slots[t]) {
        slots[t] = job;
        placed = true;
        steps.push({ sorted, slots: [...slots], active: job.id, message: `Place ${job.id} in slot ${t + 1}.` });
        break;
      }
    }
    if (!placed) {
      steps.push({ sorted, slots: [...slots], active: job.id, message: `Skip ${job.id}; no free slot before deadline.` });
    }
  });

  const total = slots.filter(Boolean).reduce((s, j) => s + j.profit, 0);
  steps.push({ sorted, slots: [...slots], active: null, message: `Done. Total profit = ${total}.` });
  return steps;
};

const JobSequencingAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const totalProfit = step.slots.filter(Boolean).reduce((s, j) => s + j.profit, 0);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 1100);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Job Sequencing with Deadlines</Title>
        <Para>
          Job Sequencing with Deadlines maximizes profit when each job takes one slot and has a
          deadline. A greedy strategy sorts by profit and places each job in the latest available
          valid slot.
        </Para>
        <Para>{step.message}</Para>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} variant="secondary" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(autoPlay);
            }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className={cn("grid w-full", compact ? "gap-2.5" : "gap-3")}>
            <div className={cn("flex flex-wrap justify-center", compact ? "gap-1.5" : "gap-2")}>
              {step.sorted.map((j) => {
                const active = step.active === j.id;
                return (
                  <div
                    key={j.id}
                    className={cn(
                      "rounded-[10px] text-white",
                      compact ? "px-2 py-1.5 text-[11px]" : "px-2.5 py-2 text-xs"
                    )}
                    style={{
                      background: active ? "#f59e0b" : "#64748b",
                      fontWeight: 700
                    }}
                  >
                    {j.id} (d{j.deadline}, p{j.profit})
                  </div>
                );
              })}
            </div>
            <div className={cn("flex flex-wrap justify-center", compact ? "gap-2" : "gap-2.5")}>
              {step.slots.map((job, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-xl font-bold",
                    compact ? "w-[78px] min-h-[62px] text-sm" : "w-[90px] min-h-[70px]"
                  )}
                  style={{
                    background: job ? "#16a34a" : "#e2e8f0",
                    color: job ? "#fff" : "#475569"
                  }}
                >
                  <div>Slot {idx + 1}</div>
                  <div className={compact ? "text-[11px]" : "text-xs"}>
                    {job ? `${job.id} (${job.profit})` : "empty"}
                  </div>
                </div>
              ))}
            </div>
            <Para>Total profit so far: <strong>{totalProfit}</strong></Para>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function jobSequencing(jobs) {
  jobs.sort((a, b) => b.profit - a.profit);
  const maxDeadline = Math.max(...jobs.map((j) => j.deadline));
  const slots = Array(maxDeadline).fill(null);

  for (const job of jobs) {
    for (let t = job.deadline - 1; t >= 0; t--) {
      if (!slots[t]) {
        slots[t] = job;
        break;
      }
    }
  }
  return slots;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default JobSequencingAlgo;
