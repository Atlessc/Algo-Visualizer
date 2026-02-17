import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";
import { Button } from "../ui/button";

const INITIAL_ARRAY = [32, 12, 25, 9, 41, 18, 5, 29];

const BubbleSortAlgo = ({ compact = false }) => {
  const [array, setArray] = useState(INITIAL_ARRAY);
  const [current, setCurrent] = useState(null);
  const [comparing, setComparing] = useState(null);
  const [sortedStart, setSortedStart] = useState(array.length);
  const [isSorting, setIsSorting] = useState(false);
  const [status, setStatus] = useState("Press Start Sort to animate bubble sort.");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const randomize = () => {
    if (isSorting) return;
    const next = Array.from({ length: 8 }, () => Math.floor(Math.random() * 45) + 4);
    setArray(next);
    setCurrent(null);
    setComparing(null);
    setSortedStart(next.length);
    setStatus("Array randomized. Press Start Sort.");
  };

  const reset = () => {
    if (isSorting) return;
    setArray(INITIAL_ARRAY);
    setCurrent(null);
    setComparing(null);
    setSortedStart(INITIAL_ARRAY.length);
    setStatus("Press Start Sort to animate bubble sort.");
  };

  const runSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setStatus("Sorting...");

    const working = [...array];
    const n = working.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrent(j);
        setComparing(j + 1);
        await delay(350);

        if (working[j] > working[j + 1]) {
          [working[j], working[j + 1]] = [working[j + 1], working[j]];
          setArray([...working]);
          await delay(260);
        }
      }
      setSortedStart(n - i - 1);
    }

    setCurrent(null);
    setComparing(null);
    setSortedStart(0);
    setStatus("Done. Array is sorted.");
    setIsSorting(false);
  };

  const barW = compact ? 48 : 60;
  const gap = compact ? 8 : 12;
  const chartW = array.length * (barW + gap) + gap;
  const chartH = compact ? 246 : 280;
  const floorY = compact ? 192 : 220;
  const maxValue = Math.max(...array);

  return (
    <Container>
      <CardContainer>
        <Title>Bubble Sort</Title>
        <Para>
          Bubble Sort repeatedly compares neighboring elements and swaps out-of-order pairs. After
          each full pass, the largest remaining value settles into its final position at the end.
        </Para>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} onClick={runSort} disabled={isSorting}>
            Start Sort
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={randomize}
            disabled={isSorting}
          >
            Randomize
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={reset}
            disabled={isSorting}
          >
            Reset
          </Button>
        </div>

        <Para>{status}</Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[980px]"
          >
            {array.map((value, index) => {
              const x = gap + index * (barW + gap);
              const h = 40 + (value / maxValue) * 130;
              const y = floorY - h;

              let fill = "#64748b";
              if (index >= sortedStart) fill = "#16a34a";
              if (index === current) fill = "#ef4444";
              if (index === comparing) fill = "#f97316";

              return (
                <motion.g key={`${index}-${value}`} animate={{ y: index === current || index === comparing ? -8 : 0 }}>
                  <rect x={x} y={y} width={barW} height={h} rx={10} fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="14" fill="#0f172a">
                    {value}
                  </text>
                </motion.g>
              );
            })}

            <text x={12} y={20} fill="#ef4444" fontSize="13" fontWeight="600">
              current
            </text>
            <text x={72} y={20} fill="#f97316" fontSize="13" fontWeight="600">
              compare
            </text>
            <text x={136} y={20} fill="#16a34a" fontSize="13" fontWeight="600">
              sorted
            </text>
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BubbleSortAlgo;
