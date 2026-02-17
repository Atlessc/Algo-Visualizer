import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const N = 5;
const MOVES = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1],
];

const inside = (r, c) => r >= 0 && c >= 0 && r < N && c < N;

const degree = (r, c, board) =>
  MOVES.reduce((acc, [dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;
    return acc + (inside(nr, nc) && board[nr][nc] === -1 ? 1 : 0);
  }, 0);

const generateTour = () => {
  const board = Array.from({ length: N }, () => Array(N).fill(-1));
  const path = [];
  let r = 0;
  let c = 0;
  board[r][c] = 0;
  path.push([r, c]);

  for (let step = 1; step < N * N; step++) {
    const candidates = [];
    for (const [dr, dc] of MOVES) {
      const nr = r + dr;
      const nc = c + dc;
      if (inside(nr, nc) && board[nr][nc] === -1) {
        candidates.push({ r: nr, c: nc, d: degree(nr, nc, board) });
      }
    }
    if (!candidates.length) break;
    candidates.sort((a, b) => a.d - b.d);
    const next = candidates[0];
    r = next.r;
    c = next.c;
    board[r][c] = step;
    path.push([r, c]);
  }
  return path;
};

const KnightsTourAlgo = ({ autoPlay = true, compact = false }) => {
  const path = useMemo(() => generateTour(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || stepIndex >= path.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, path.length - 1)), 450);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, path.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  const visited = new Map();
  for (let i = 0; i <= stepIndex; i++) {
    visited.set(`${path[i][0]},${path[i][1]}`, i + 1);
  }
  const [cr, cc] = path[stepIndex];
  const size = 56;

  return (
    <Container>
      <CardContainer>
        <Title>Knight&apos;s Tour</Title>
        <Para>
          In the Knight&apos;s Tour, the knight must visit every square exactly once using legal moves.
          Backtracking explores moves step-by-step and rewinds when a move blocks future progress.
        </Para>
        <Para>Step {stepIndex + 1} / {path.length}</Para>
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
            viewBox={`0 0 ${N * size} ${N * size}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[460px]"
          >
            {Array.from({ length: N }).map((_, r) =>
              Array.from({ length: N }).map((__, c) => {
                const key = `${r},${c}`;
                const val = visited.get(key);
                const dark = (r + c) % 2 === 1;
                let fill = dark ? "#94a3b8" : "#cbd5e1";
                if (val) fill = "#16a34a";
                if (r === cr && c === cc) fill = "#ef4444";
                return (
                  <g key={key}>
                    <rect x={c * size} y={r * size} width={size - 2} height={size - 2} fill={fill} rx="6" />
                    {val && (
                      <text x={c * size + size / 2 - 1} y={r * size + size / 2 + 5} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">
                        {val}
                      </text>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function knightsTour(n) {
  const board = Array.from({ length: n }, () => Array(n).fill(-1));
  // Pick legal next move with minimum onward degree (Warnsdorff heuristic)
  // Repeat until all squares are visited
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KnightsTourAlgo;
