import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";

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

const FibonacciSequenceIterativeAlgo = ({ maxElements = 10, endOnValue }) => {
  const defaultCount = Math.max(5, maxElements);
  const [count, setCount] = useState(defaultCount);

  const sequence = useMemo(() => {
    return endOnValue ? buildUntilValue(endOnValue) : buildByCount(count);
  }, [count, endOnValue]);

  const maxValue = Math.max(...sequence, 1);
  const barW = 54;
  const gap = 10;
  const chartW = sequence.length * (barW + gap) + gap;
  const chartH = 300;
  const floorY = 210;

  return (
    <Container>
      <CardContainer>
        <Title>Fibonacci Sequence (Iterative)</Title>
        <Para>
          Each number is the sum of the previous two. This iterative method builds the sequence in
          linear time with constant extra space.
        </Para>

        {!endOnValue && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
            <label htmlFor="fib-count" style={{ color: "#334155", fontWeight: 600 }}>
              Elements:
            </label>
            <input
              id="fib-count"
              type="range"
              min="5"
              max="15"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <span style={{ minWidth: "min(100%, 24px)", fontWeight: 700, color: "#0f172a" }}>{count}</span>
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
            style={{ maxWidth: "980px", height: "auto" }}
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
