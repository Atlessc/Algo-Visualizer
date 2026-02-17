import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const ACTIVITIES = [
  { id: "A", start: 1, end: 4 },
  { id: "B", start: 3, end: 5 },
  { id: "C", start: 0, end: 6 },
  { id: "D", start: 5, end: 7 },
  { id: "E", start: 8, end: 9 },
  { id: "F", start: 5, end: 9 },
];

const buildSteps = () => {
  const sorted = [...ACTIVITIES].sort((a, b) => a.end - b.end);
  const selected = [];
  const rejected = [];
  const steps = [
    {
      selected: [],
      rejected: [],
      active: null,
      sorted,
      message: "Sort activities by finishing time.",
    },
  ];

  let lastEnd = -Infinity;
  sorted.forEach((act) => {
    if (act.start >= lastEnd) {
      selected.push(act.id);
      lastEnd = act.end;
      steps.push({
        selected: [...selected],
        rejected: [...rejected],
        active: act.id,
        sorted,
        message: `Select ${act.id} (${act.start}-${act.end}).`,
      });
    } else {
      rejected.push(act.id);
      steps.push({
        selected: [...selected],
        rejected: [...rejected],
        active: act.id,
        sorted,
        message: `Reject ${act.id} due to overlap.`,
      });
    }
  });

  steps.push({
    selected: [...selected],
    rejected: [...rejected],
    active: null,
    sorted,
    message: `Done. Maximum compatible activities: ${selected.join(", ")}.`,
  });
  return steps;
};

const ActivitySelectionAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1100);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const step = steps[stepIndex];
  const endMax = Math.max(...ACTIVITIES.map((a) => a.end));
  const laneH = 44;
  const chartW = 760;
  const chartH = ACTIVITIES.length * laneH + 42;

  return (
    <Container>
      <CardContainer>
        <Title>Activity Selection</Title>
        <Para>
          Activity Selection chooses the maximum number of non-overlapping activities. The key
          greedy idea is to always pick the activity that finishes earliest, leaving as much room as
          possible for the rest.
        </Para>
        <Para>{step.message}</Para>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
          >
            Reset
          </button>
        </div>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "920px", height: "auto" }}
          >
            {step.sorted.map((act, idx) => {
              const y = 20 + idx * laneH;
              const x = 56 + (act.start / endMax) * (chartW - 130);
              const w = ((act.end - act.start) / endMax) * (chartW - 130);
              const isSelected = step.selected.includes(act.id);
              const isRejected = step.rejected.includes(act.id);
              const isActive = step.active === act.id;

              let fill = "#64748b";
              if (isSelected) fill = "#16a34a";
              if (isRejected) fill = "#ef4444";
              if (isActive) fill = "#f59e0b";

              return (
                <g key={act.id}>
                  <text x="12" y={y + 19} fontSize="13" fill="#0f172a" fontWeight="700">
                    {act.id}
                  </text>
                  <rect x={x} y={y} width={Math.max(w, 8)} height="26" rx="8" fill={fill} />
                  <text x={x + 8} y={y + 18} fontSize="12" fill="#fff" fontWeight="700">
                    {act.start}-{act.end}
                  </text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function activitySelection(activities) {
  const sorted = activities.sort((a, b) => a.end - b.end);
  const chosen = [];
  let lastEnd = -Infinity;

  for (const act of sorted) {
    if (act.start >= lastEnd) {
      chosen.push(act);
      lastEnd = act.end;
    }
  }
  return chosen;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ActivitySelectionAlgo;
