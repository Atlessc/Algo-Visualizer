import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const START = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
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

const buildSteps = () => {
  const grid = clone(START);
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

  solve();
  steps.push({ grid: clone(grid), cell: null, message: "Sudoku solved." });
  return steps;
};

const SudokuSolverAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const size = 44;

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 90);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Sudoku Solver (Backtracking)</Title>
        <Para>Try valid digits recursively; backtrack when a dead-end is reached.</Para>
        <Para>{step.message}</Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
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
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={c * size} y={r * size} width={size - 1} height={size - 1} fill={active ? "#0ea5e9" : blockShade ? "#e2e8f0" : "#f8fafc"} />
                    {v !== 0 && (
                      <text x={c * size + size / 2} y={r * size + size / 2 + 6} textAnchor="middle" fill={active ? "#fff" : "#0f172a"} fontSize="18" fontWeight="700">
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
