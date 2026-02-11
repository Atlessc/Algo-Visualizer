import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const STARTER_GRIDS = [
  // 1) 102 steps
  {
    id: "starter-easy-1",
    label: "Starter A (Easy)",
    steps: 102,
    grid: [
      [0, 0, 0, 0, 7, 8, 0, 0, 2],
      [6, 7, 0, 1, 9, 5, 3, 4, 0],
      [1, 0, 8, 3, 4, 2, 0, 6, 7],
      [0, 0, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 0, 5, 3, 7, 9, 1],
      [7, 0, 0, 9, 0, 0, 0, 5, 0],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 0, 7, 4, 0, 9, 6, 3, 5],
      [0, 0, 5, 2, 8, 6, 1, 7, 9],
    ],
  },

  // 2) 110 steps
  {
    id: "starter-easy-2",
    label: "Starter B (Easy+)",
    steps: 110,
    grid: [
      [0, 0, 1, 7, 9, 3, 0, 2, 5],
      [7, 9, 5, 2, 6, 4, 0, 1, 3],
      [0, 0, 0, 0, 0, 0, 0, 7, 9],
      [0, 0, 0, 0, 7, 0, 0, 5, 8],
      [1, 5, 7, 0, 0, 0, 9, 6, 2],
      [0, 2, 8, 6, 0, 0, 3, 4, 7],
      [0, 7, 0, 4, 8, 9, 5, 3, 1],
      [5, 3, 0, 1, 2, 6, 0, 8, 4],
      [0, 0, 4, 0, 0, 7, 2, 0, 6],
    ],
  },

  // 3) 134 steps
  {
    id: "starter-easy-3",
    label: "Starter C (Easy++)",
    steps: 134,
    grid: [
      [0, 0, 0, 0, 3, 0, 5, 0, 0],
      [0, 3, 0, 0, 5, 0, 0, 0, 4],
      [0, 5, 0, 1, 8, 0, 0, 7, 0],
      [0, 2, 5, 0, 7, 0, 8, 9, 0],
      [8, 0, 7, 4, 2, 0, 0, 5, 6],
      [3, 6, 0, 5, 9, 8, 4, 2, 7],
      [0, 7, 6, 2, 1, 3, 9, 0, 8],
      [0, 4, 3, 8, 0, 5, 7, 0, 2],
      [1, 0, 0, 0, 0, 7, 6, 3, 0],
    ],
  },

  // 4) 197 steps
  {
    id: "starter-medium-1",
    label: "Starter D (Medium)",
    steps: 197,
    grid: [
      [0, 0, 0, 0, 3, 0, 1, 0, 0],
      [0, 3, 0, 0, 1, 0, 0, 0, 2],
      [0, 1, 0, 7, 6, 0, 0, 4, 0],
      [2, 5, 1, 0, 4, 0, 6, 8, 0],
      [6, 8, 4, 2, 5, 0, 0, 1, 9],
      [3, 9, 7, 1, 8, 6, 2, 5, 4],
      [1, 4, 9, 5, 7, 3, 8, 0, 6],
      [0, 2, 3, 6, 0, 1, 4, 0, 5],
      [7, 0, 0, 0, 0, 4, 9, 3, 1],
    ],
  },

  // 5) 198 steps
  {
    id: "starter-medium-2",
    label: "Starter E (Medium+)",
    steps: 198,
    grid: [
      [0, 0, 5, 7, 8, 9, 0, 2, 3],
      [7, 8, 3, 2, 1, 6, 0, 5, 9],
      [0, 0, 0, 0, 0, 0, 0, 7, 8],
      [0, 0, 0, 0, 7, 0, 0, 3, 4],
      [5, 3, 7, 0, 0, 0, 8, 1, 2],
      [0, 2, 4, 1, 0, 0, 9, 6, 7],
      [0, 7, 0, 6, 4, 8, 3, 9, 5],
      [3, 9, 0, 5, 2, 1, 0, 4, 6],
      [0, 0, 6, 0, 0, 7, 2, 0, 1],
    ],
  },

  // 6) 416 steps
  {
    id: "starter-medium-3",
    label: "Starter F (Medium++)",
    steps: 416,
    grid: [
      [0, 8, 9, 0, 0, 3, 0, 5, 0],
      [6, 0, 7, 0, 0, 0, 0, 9, 3],
      [5, 0, 3, 0, 9, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 0, 7, 0],
      [9, 7, 0, 0, 1, 0, 2, 0, 0],
      [2, 5, 0, 4, 0, 9, 3, 0, 0],
      [0, 6, 5, 0, 0, 0, 7, 0, 9],
      [0, 3, 2, 9, 5, 0, 6, 8, 0],
      [8, 9, 0, 0, 3, 6, 5, 2, 4],
    ],
  },

  // 7) 586 steps
  {
    id: "starter-hard-1",
    label: "Starter G (Hard)",
    steps: 586,
    grid: [
      [0, 0, 0, 0, 5, 6, 0, 0, 1],
      [0, 5, 0, 7, 4, 8, 9, 2, 0],
      [0, 0, 6, 9, 2, 1, 0, 3, 5],
      [0, 0, 0, 5, 3, 7, 2, 1, 9],
      [0, 1, 3, 0, 8, 9, 5, 4, 7],
      [5, 0, 0, 4, 0, 0, 0, 8, 0],
      [0, 3, 7, 8, 9, 5, 1, 6, 2],
      [1, 0, 5, 2, 0, 4, 3, 9, 8],
      [0, 0, 8, 1, 6, 3, 7, 5, 4],
    ],
  },

  // 8) 901 steps
  {
    id: "starter-hard-2",
    label: "Starter H (Hard+)",
    steps: 901,
    grid: [
      [0, 0, 1, 0, 4, 3, 0, 8, 6],
      [2, 4, 6, 0, 7, 9, 0, 1, 3],
      [0, 0, 0, 0, 0, 0, 0, 2, 4],
      [0, 0, 0, 0, 2, 0, 0, 6, 5],
      [0, 6, 2, 0, 0, 0, 4, 7, 8],
      [0, 8, 5, 7, 0, 0, 3, 0, 2],
      [0, 2, 0, 9, 5, 4, 6, 3, 1],
      [6, 3, 0, 1, 0, 7, 0, 5, 9],
      [0, 0, 9, 0, 0, 2, 8, 0, 7],
    ],
  },

  // 9) 1231 steps
  {
    id: "starter-hard-3",
    label: "Starter I (Expert)",
    steps: 1231,
    grid: [
      [4, 2, 6, 0, 0, 7, 0, 3, 0],
      [5, 9, 1, 0, 0, 0, 0, 6, 7],
      [3, 0, 7, 0, 6, 0, 4, 0, 0],
      [7, 0, 0, 0, 0, 0, 0, 1, 0],
      [6, 1, 0, 0, 4, 0, 9, 8, 0],
      [9, 3, 0, 8, 0, 6, 7, 0, 0],
      [0, 5, 3, 0, 0, 0, 1, 0, 6],
      [0, 7, 9, 6, 3, 0, 5, 2, 4],
      [2, 6, 0, 0, 7, 5, 3, 9, 8],
    ],
  },

  // 10) 2151 steps
  {
    id: "starter-hard-4",
    label: "Starter J (Expert+)",
    steps: 2151,
    grid: [
      [8, 6, 0, 9, 1, 2, 0, 0, 0],
      [9, 0, 0, 4, 3, 0, 0, 0, 0],
      [4, 3, 2, 0, 0, 5, 8, 9, 0],
      [0, 0, 0, 0, 0, 4, 7, 0, 0],
      [7, 0, 9, 0, 8, 0, 0, 3, 0],
      [1, 0, 0, 3, 0, 7, 0, 8, 0],
      [3, 9, 4, 8, 6, 0, 0, 2, 0],
      [5, 2, 1, 7, 4, 0, 0, 0, 8],
      [0, 7, 0, 0, 0, 9, 4, 1, 0],
    ],
  },
];

const clone = (g) => g.map((r) => [...r]);

const valid = (grid, r, c, v) => {
  for (let i = 0; i < 9; i++) {
    if (grid[r][i] === v || grid[i][c] === v) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (grid[br + i][bc + j] === v) return false;
  return true;
};

const buildSteps = (startGrid) => {
  const grid = clone(startGrid);
  const steps = [{ grid: clone(grid), cell: null, message: "Start puzzle." }];

  const solve = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] !== 0) continue;
        for (let v = 1; v <= 9; v++) {
          if (valid(grid, r, c, v)) {
            grid[r][c] = v;
            steps.push({ grid: clone(grid), cell: [r, c], message: `Place ${v} at (${r + 1}, ${c + 1}).` });
            if (solve()) return true;
            grid[r][c] = 0;
            steps.push({ grid: clone(grid), cell: [r, c], message: `Backtrack at (${r + 1}, ${c + 1}).` });
          }
        }
        return false;
      }
    }
    return true;
  };

  const solved = solve();
  if (solved) {
    steps.push({ grid: clone(grid), cell: null, message: "Sudoku solved." });
  } else {
    steps.push({ grid: clone(grid), cell: null, message: "No solution found for this starter grid." });
  }
  return steps;
};

const SudokuSolverAlgo = ({ autoPlay = true, compact = false }) => {
  const [selectedStarterId, setSelectedStarterId] = useState(STARTER_GRIDS[0].id);
  const selectedStarter = useMemo(
    () => STARTER_GRIDS.find((preset) => preset.id === selectedStarterId) ?? STARTER_GRIDS[0],
    [selectedStarterId]
  );
  const steps = useMemo(() => buildSteps(selectedStarter.grid), [selectedStarter]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const currentStepIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[currentStepIndex];
  const isComplete = currentStepIndex >= steps.length - 1;
  const totalSteps = Math.max(1, steps.length - 1);
  const size = 44;

  // Fewer solving steps play slower; larger searches move faster, but overall cadence is intentionally slower.
  const speedMultiplier = compact ? 1.2 : 1.3;
  const baseTickMs = Math.max(
    compact ? 90 : 105,
    Math.round((compact ? 140 : 165) - totalSteps / 22)
  );
  const tickMs = Math.round(baseTickMs * speedMultiplier);
  const targetFrames = Math.max(100, Math.round(165 - totalSteps / 10));
  const stepAdvance = Math.max(1, Math.min(1, Math.ceil(totalSteps / targetFrames)));

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(autoPlay);
  }, [selectedStarterId, autoPlay]);

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) return undefined;
    const id = setInterval(
      () => setStepIndex((p) => Math.min(p + stepAdvance, steps.length - 1)),
      tickMs
    );
    return () => clearInterval(id);
  }, [isPlaying, currentStepIndex, steps.length, stepAdvance, tickMs]);

  useEffect(() => {
    if (isPlaying && isComplete) {
      setIsPlaying(false);
    }
  }, [isPlaying, isComplete]);

  return (
    <Container>
      <CardContainer>
        <Title>Sudoku Solver (Backtracking)</Title>
        <Para>Try valid digits recursively; backtrack when a dead-end is reached.</Para>
        <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
          <label htmlFor="sudoku-starter-grid" className="text-sm font-semibold text-slate-700">
            Starter Grid
          </label>
          <select
            id="sudoku-starter-grid"
            value={selectedStarterId}
            onChange={(event) => {
              setStepIndex(0);
              setIsPlaying(autoPlay);
              setSelectedStarterId(event.target.value);
            }}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {STARTER_GRIDS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </div>
        <Para>Step {currentStepIndex + 1} / {steps.length}</Para>
        <Para>{step.message}</Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            onClick={() => {
              if (isComplete) {
                setStepIndex(0);
                setIsPlaying(true);
                return;
              }
              setIsPlaying((p) => !p);
            }}
          >
            {isComplete && !isPlaying ? "Replay" : isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={() => { setStepIndex(steps.length - 1); setIsPlaying(false); }}
          >
            Jump To Solved
          </Button>
        </div>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${9 * size} ${9 * size}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[460px]"
          >
            {step.grid.map((row, r) =>
              row.map((v, c) => {
                const active = step.cell && step.cell[0] === r && step.cell[1] === c;
                const blockShade = (Math.floor(r / 3) + Math.floor(c / 3)) % 2 === 0;
                const isGiven = selectedStarter.grid[r][c] !== 0;
                const digitColor = isGiven ? "#000000" : "#dc2626";
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={c * size} y={r * size} width={size - 1} height={size - 1} fill={active ? "#0ea5e9" : blockShade ? "#e2e8f0" : "#f8fafc"} />
                    {v !== 0 && (
                      <text x={c * size + size / 2} y={r * size + size / 2 + 6} textAnchor="middle" fill={digitColor} fontSize="18" fontWeight="700">
                        {v}
                      </text>
                    )}
                  </g>
                );
              })
            )}
            {[0, 3, 6, 9].map((i) => (
              <line key={`h-${i}`} x1="0" y1={i * size} x2={9 * size} y2={i * size} stroke="#1e293b" strokeWidth="2.3" />
            ))}
            {[0, 3, 6, 9].map((i) => (
              <line key={`v-${i}`} x1={i * size} y1="0" x2={i * size} y2={9 * size} stroke="#1e293b" strokeWidth="2.3" />
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function solveSudoku(grid) {
  const empty = findEmptyCell(grid);
  if (!empty) return true;
  const [r, c] = empty;
  for (let v = 1; v <= 9; v++) {
    if (isValid(grid, r, c, v)) {
      grid[r][c] = v;
      if (solveSudoku(grid)) return true;
      grid[r][c] = 0;
    }
  }
  return false;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SudokuSolverAlgo;
