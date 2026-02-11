import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const N = 4;

const buildSteps = () => {
  const board = Array.from({ length: N }, () => Array(N).fill(0));
  const steps = [{ board: board.map((r) => [...r]), row: 0, col: -1, message: "Start with empty board." }];

  const safe = (r, c) => {
    for (let i = 0; i < c; i++) if (board[r][i]) return false;
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (let i = r, j = c; i < N && j >= 0; i++, j--) if (board[i][j]) return false;
    return true;
  };

  const solve = (col) => {
    if (col >= N) {
      steps.push({ board: board.map((r) => [...r]), row: -1, col, message: "All queens placed." });
      return true;
    }
    for (let row = 0; row < N; row++) {
      steps.push({ board: board.map((r) => [...r]), row, col, message: `Try row ${row + 1}, col ${col + 1}.` });
      if (safe(row, col)) {
        board[row][col] = 1;
        steps.push({ board: board.map((r) => [...r]), row, col, message: "Place queen." });
        if (solve(col + 1)) return true;
        board[row][col] = 0;
        steps.push({ board: board.map((r) => [...r]), row, col, message: "Backtrack." });
      }
    }
    return false;
  };

  solve(0);
  return steps;
};

const NQueensAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const cell = 60;

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 650);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>N-Queens Problem</Title>
        <Para>Place N queens so no two attack each other (rows, columns, diagonals).</Para>
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
            viewBox={`0 0 ${N * cell} ${N * cell}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[400px]"
          >
            {step.board.map((row, r) =>
              row.map((val, c) => {
                const dark = (r + c) % 2 === 1;
                const active = r === step.row && c === step.col;
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={c * cell} y={r * cell} width={cell - 2} height={cell - 2} rx="8" fill={active ? "#f59e0b" : dark ? "#94a3b8" : "#cbd5e1"} />
                    {val === 1 && (
                      <text x={c * cell + cell / 2} y={r * cell + cell / 2 + 8} textAnchor="middle" fontSize="28" fill="#ef4444">♛</text>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function solveNQueens(col) {
  if (col === N) return true;
  for (let row = 0; row < N; row++) {
    if (isSafe(row, col)) {
      board[row][col] = 1;
      if (solveNQueens(col + 1)) return true;
      board[row][col] = 0; // backtrack
    }
  }
  return false;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default NQueensAlgo;
