import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const JobSequencingAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const totalProfit = step.slots.filter(Boolean).reduce((s, j) => s + j.profit, 0);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 1100);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Job Sequencing with Deadlines</Title>
        <Para>Greedy approach: schedule highest-profit jobs first in latest available slots.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <div style={{ width: "100%", display: "grid", gap: "12px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              {step.sorted.map((j) => {
                const active = step.active === j.id;
                return (
                  <div
                    key={j.id}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "10px",
                      background: active ? "#f59e0b" : "#64748b",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {j.id} (d{j.deadline}, p{j.profit})
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {step.slots.map((job, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "90px",
                    minHeight: "70px",
                    borderRadius: "12px",
                    background: job ? "#16a34a" : "#e2e8f0",
                    color: job ? "#fff" : "#475569",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  <div>Slot {idx + 1}</div>
                  <div style={{ fontSize: "12px" }}>{job ? `${job.id} (${job.profit})` : "empty"}</div>
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
