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

const SelectionSortAlgo = ({ compact = false }) => {
  const initialArray = [29, 10, 14, 37, 13, 8];

  const [array, setArray] = useState(initialArray);
  const [isSorting, setIsSorting] = useState(false);
  const [currentI, setCurrentI] = useState(null);
  const [currentJ, setCurrentJ] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedBoundary, setSortedBoundary] = useState(-1);
  const [status, setStatus] = useState("Press Start Sort to run selection sort.");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runSelectionSort = async () => {
    if (isSorting) return;

    const working = [...array];
    setIsSorting(true);
    setStatus("Sorting...");
    setSortedBoundary(-1);

    for (let i = 0; i < working.length - 1; i++) {
      let min = i;
      setCurrentI(i);
      setMinIndex(min);

      for (let j = i + 1; j < working.length; j++) {
        setCurrentJ(j);
        await delay(450);
        if (working[j] < working[min]) {
          min = j;
          setMinIndex(min);
        }
      }

      if (min !== i) {
        [working[i], working[min]] = [working[min], working[i]];
        setArray([...working]);
      }

      setSortedBoundary(i);
      setCurrentJ(null);
      await delay(350);
    }

    setSortedBoundary(working.length - 1);
    setCurrentI(null);
    setCurrentJ(null);
    setMinIndex(null);
    setStatus("Done. Array is sorted.");
    setIsSorting(false);
  };

  const randomizeArray = () => {
    if (isSorting) return;
    const nextArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 40) + 1);
    setArray(nextArray);
    setCurrentI(null);
    setCurrentJ(null);
    setMinIndex(null);
    setSortedBoundary(-1);
    setStatus("Array randomized. Press Start Sort.");
  };

  const resetDemo = () => {
    if (isSorting) return;
    setArray(initialArray);
    setCurrentI(null);
    setCurrentJ(null);
    setMinIndex(null);
    setSortedBoundary(-1);
    setStatus("Press Start Sort to run selection sort.");
  };

  const cellW = compact ? 84 : 95;
  const rectW = compact ? 54 : 60;
  const rectXOffset = rectW / 2;
  const chartW = (array.length - 1) * cellW + 120;
  const chartH = compact ? 138 : 150;

  return (
    <Container>
      <CardContainer>
        <Title>Selection Sort Algo</Title>

        <Para>
          Selection Sort scans the unsorted section to find the minimum, then places it at the next
          fixed position. It is simple and swap-efficient, though still quadratic in comparisons.
        </Para>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} onClick={runSelectionSort} disabled={isSorting}>
            Start Sort
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={randomizeArray}
            disabled={isSorting}
          >
            Randomize
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={resetDemo}
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
            className="mx-auto h-auto w-full max-w-[780px]"
          >
            {array.map((value, index) => {
              const x = index * cellW + 60;
              const isSorted = index <= sortedBoundary;
              let fill = "#6B7280";

              if (isSorted) fill = "#2E8B57";
              if (index === currentI) fill = "#4169E1";
              if (index === currentJ) fill = "#FF8C42";
              if (index === minIndex) fill = "#DC2626";

              return (
                <motion.g key={`${value}-${index}`} animate={{ y: index === currentJ ? -8 : 0 }}>
                  <rect x={x - rectXOffset} y={45} width={rectW} height={60} rx={12} fill={fill} />
                  <text
                    x={x}
                    y={80}
                    textAnchor="middle"
                    fill="#fff"
                    fontWeight="bold"
                    fontSize="18"
                  >
                    {value}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SelectionSortAlgo;
