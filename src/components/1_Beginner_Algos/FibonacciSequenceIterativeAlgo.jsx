import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const buildByCount = (count) => {
  const n = Math.max(2, count);
  const fib = [0, 1];
  for (let i = 2; i < n; i += 1) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
};

const buildUntilValue = (maxValue) => {
  const fib = [0, 1];
  while (true) {
    const next = fib[fib.length - 1] + fib[fib.length - 2];
    if (next > maxValue) break;
    fib.push(next);
  }
  return fib;
};

const FibonacciSequenceIterativeAlgo = ({ maxElements = 10, endOnValue, compact = false }) => {
  const defaultCount = Math.max(5, maxElements);
  const [count, setCount] = useState(defaultCount);

  const sequence = useMemo(() => {
    return endOnValue ? buildUntilValue(endOnValue) : buildByCount(count);
  }, [count, endOnValue]);

  const maxValue = Math.max(...sequence, 1);
  const barW = compact ? 44 : 54;
  const gap = compact ? 8 : 10;
  const chartW = sequence.length * (barW + gap) + gap;
  const chartH = compact ? 266 : 300;
  const floorY = compact ? 188 : 210;

  return (
    <Container>
      <CardContainer>
        <Title>Fibonacci Sequence (Iterative)</Title>
        <Para>
          The Fibonacci sequence starts with base values, and each next term is the sum of the
          previous two. The iterative approach is efficient because it only keeps the latest values
          instead of recursion.
        </Para>

        {!endOnValue && (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <label htmlFor="fib-count" className="font-semibold text-slate-700">
              Elements:
            </label>
            <input
              id="fib-count"
              type="range"
              min="5"
              max="15"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="accent-sky-600"
            />
            <span className="min-w-6 text-center font-bold text-slate-900">{count}</span>
          </div>
        )}

        <Para>
          Sequence length: {sequence.length}
          {endOnValue ? ` (up to value ${endOnValue})` : ""}
        </Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-245"
          >
            {sequence.map((value, index) => {
              const x = gap + index * (barW + gap);
              const h = 28 + (value / maxValue) * 140;
              const y = floorY - h;
              const hue = 210 + Math.round((index / Math.max(1, sequence.length - 1)) * 90);
              const fill = `hsl(${hue}, 74%, 50%)`;

              return (
                <motion.g
                  key={`${index}-${value}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <rect x={x} y={y} width={barW} height={h} rx="10" fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="13" fill="#0f172a">
                    {value}
                  </text>
                  <text x={x + barW / 2} y={floorY + 18} textAnchor="middle" fontSize="11" fill="#475569">
                    F{index}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function generateFibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FibonacciSequenceIterativeAlgo;
