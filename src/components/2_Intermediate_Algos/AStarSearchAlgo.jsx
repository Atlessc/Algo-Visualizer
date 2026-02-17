import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const ROWS = 7;
const COLS = 7;
const START = [0, 0];
const GOAL = [6, 6];
const OBSTACLES = new Set(["1,1", "1,2", "2,2", "3,2", "4,2", "5,2", "5,4", "4,4", "3,4"]);

const keyOf = (r, c) => `${r},${c}`;
const parseKey = (key) => key.split(",").map(Number);

const heuristic = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const neighborsOf = (r, c) => {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return dirs
    .map(([dr, dc]) => [r + dr, c + dc])
    .filter(([nr, nc]) => nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS);
};

const reconstructPath = (cameFrom, endKey) => {
  const path = [endKey];
  let cur = endKey;
  while (cameFrom[cur]) {
    cur = cameFrom[cur];
    path.push(cur);
  }
  return path.reverse();
};

const buildAStarFrames = () => {
  const startKey = keyOf(...START);
  const goalKey = keyOf(...GOAL);
  const openSet = new Set([startKey]);
  const closedSet = new Set();
  const cameFrom = {};
  const gScore = { [startKey]: 0 };
  const fScore = { [startKey]: heuristic(START, GOAL) };
  const frames = [];

  frames.push({
    open: [...openSet],
    closed: [...closedSet],
    current: null,
    path: [],
    message: "Start at S. Add start node to open set.",
  });

  while (openSet.size > 0) {
    let current = null;
    let currentF = Infinity;
    openSet.forEach((candidate) => {
      const f = fScore[candidate] ?? Infinity;
      if (f < currentF) {
        current = candidate;
        currentF = f;
      }
    });

    if (!current) break;
    if (current === goalKey) {
      const path = reconstructPath(cameFrom, goalKey);
      frames.push({
        open: [...openSet],
        closed: [...closedSet],
        current,
        path,
        message: "Goal reached. Reconstruct shortest path.",
      });
      return frames;
    }

    openSet.delete(current);
    closedSet.add(current);

    const [cr, cc] = parseKey(current);
    frames.push({
      open: [...openSet],
      closed: [...closedSet],
      current,
      path: [],
      message: `Expand node (${cr}, ${cc}) with lowest f-score.`,
    });

    for (const [nr, nc] of neighborsOf(cr, cc)) {
      const nKey = keyOf(nr, nc);
      if (OBSTACLES.has(nKey) || closedSet.has(nKey)) continue;

      const tentativeG = (gScore[current] ?? Infinity) + 1;
      if (tentativeG < (gScore[nKey] ?? Infinity)) {
        cameFrom[nKey] = current;
        gScore[nKey] = tentativeG;
        fScore[nKey] = tentativeG + heuristic([nr, nc], GOAL);
        openSet.add(nKey);
      }
    }

    frames.push({
      open: [...openSet],
      closed: [...closedSet],
      current,
      path: [],
      message: "Relax neighbors and update open set.",
    });
  }

  frames.push({
    open: [],
    closed: [...closedSet],
    current: null,
    path: [],
    message: "No path found.",
  });
  return frames;
};

const AStarSearchAlgo = () => {
  const frames = useMemo(() => buildAStarFrames(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || stepIndex >= frames.length - 1) return undefined;
    const id = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, frames.length - 1));
    }, 850);
    return () => clearInterval(id);
  }, [frames.length, isPlaying, stepIndex]);

  const frame = frames[stepIndex];
  const open = new Set(frame.open);
  const closed = new Set(frame.closed);
  const path = new Set(frame.path);
  const cell = 46;
  const chartW = COLS * cell;
  const chartH = ROWS * cell;
  const startKey = keyOf(...START);
  const goalKey = keyOf(...GOAL);

  return (
    <Container>
      <CardContainer>
        <Title>A* Search</Title>
        <Para>
          A* is a shortest-path algorithm that uses both distance already traveled <strong>g(n)</strong>{" "}
          and an estimate to the goal <strong>h(n)</strong>. By prioritizing nodes with the lowest{" "}
          <strong>g+h</strong>, it usually reaches the target faster than Dijkstra when the
          heuristic is good.
        </Para>
        <Para>{frame.message}</Para>

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
            style={{ maxWidth: "520px", height: "auto" }}
          >
            {Array.from({ length: ROWS }).map((_, r) =>
              Array.from({ length: COLS }).map((__, c) => {
                const key = keyOf(r, c);
                let fill = "#e2e8f0";
                if (OBSTACLES.has(key)) fill = "#334155";
                if (closed.has(key)) fill = "#94a3b8";
                if (open.has(key)) fill = "#f59e0b";
                if (key === frame.current) fill = "#ef4444";
                if (path.has(key)) fill = "#16a34a";
                if (key === startKey) fill = "#0ea5e9";
                if (key === goalKey) fill = "#a855f7";

                return (
                  <g key={key}>
                    <rect x={c * cell} y={r * cell} width={cell - 2} height={cell - 2} rx="7" fill={fill} />
                    {(key === startKey || key === goalKey) && (
                      <text
                        x={c * cell + (cell - 2) / 2}
                        y={r * cell + cell / 2 + 4}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="14"
                        fontWeight="700"
                      >
                        {key === startKey ? "S" : "G"}
                      </text>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function aStar(start, goal) {
  const open = new Set([start]);
  const cameFrom = {};
  const g = { [start]: 0 };
  const f = { [start]: h(start, goal) };

  while (open.size) {
    const current = nodeWithLowestF(open, f);
    if (current === goal) return reconstructPath(cameFrom, current);
    open.delete(current);
    for (const n of neighbors(current)) {
      const tentative = g[current] + cost(current, n);
      if (tentative < (g[n] ?? Infinity)) {
        cameFrom[n] = current;
        g[n] = tentative;
        f[n] = tentative + h(n, goal);
        open.add(n);
      }
    }
  }
  return null;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default AStarSearchAlgo;
