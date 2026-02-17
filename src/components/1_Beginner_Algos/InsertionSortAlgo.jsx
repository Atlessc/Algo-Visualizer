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

const INITIAL_ARRAY = [9, 5, 1, 4, 3, 8, 6];

const InsertionSortAlgo = ({ compact = false }) => {
  const [array, setArray] = useState(INITIAL_ARRAY);
  const [keyIndex, setKeyIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [sortedBoundary, setSortedBoundary] = useState(0);
  const [status, setStatus] = useState("Press Start Sort to run insertion sort.");
  const [isSorting, setIsSorting] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setStatus("Sorting...");

    const working = [...array];
    for (let i = 1; i < working.length; i++) {
      const key = working[i];
      let j = i - 1;
      setKeyIndex(i);
      setSortedBoundary(i - 1);
      await delay(420);

      while (j >= 0 && working[j] > key) {
        setCompareIndex(j);
        working[j + 1] = working[j];
        setArray([...working]);
        j -= 1;
        await delay(320);
      }

      working[j + 1] = key;
      setArray([...working]);
      setCompareIndex(null);
      setKeyIndex(j + 1);
      setSortedBoundary(i);
      await delay(380);
    }

    setCompareIndex(null);
    setKeyIndex(null);
    setSortedBoundary(working.length - 1);
    setStatus("Done. Array is sorted.");
    setIsSorting(false);
  };

  const randomize = () => {
    if (isSorting) return;
    const next = Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(next);
    setKeyIndex(null);
    setCompareIndex(null);
    setSortedBoundary(0);
    setStatus("Array randomized. Press Start Sort.");
  };

  const reset = () => {
    if (isSorting) return;
    setArray(INITIAL_ARRAY);
    setKeyIndex(null);
    setCompareIndex(null);
    setSortedBoundary(0);
    setStatus("Press Start Sort to run insertion sort.");
  };

  const barW = compact ? 50 : 62;
  const gap = compact ? 8 : 10;
  const chartW = array.length * (barW + gap) + gap;
  const chartH = compact ? 248 : 280;
  const floorY = compact ? 192 : 220;
  const maxValue = Math.max(...array, 1);

  return (
    <Container>
      <CardContainer>
        <Title>Insertion Sort</Title>
        <Para>
          Insertion Sort grows a sorted section one value at a time. Each new value shifts left
          until it reaches the right spot, similar to inserting a card into a sorted hand.
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
            className="mx-auto h-auto w-full max-w-230"
          >
            {array.map((value, index) => {
              const x = gap + index * (barW + gap);
              const h = 40 + (value / maxValue) * 130;
              const y = floorY - h;

              let fill = "#64748b";
              if (index <= sortedBoundary) fill = "#16a34a";
              if (index === keyIndex) fill = "#0ea5e9";
              if (index === compareIndex) fill = "#ef4444";

              return (
                <motion.g key={`${index}-${value}`} animate={{ y: index === keyIndex ? -8 : 0 }}>
                  <rect x={x} y={y} width={barW} height={h} rx={10} fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="13">
                    {value}
                  </text>
                </motion.g>
              );
            })}

            <text x="12" y="22" fontSize="13" fill="#16a34a" fontWeight="700">
              sorted prefix
            </text>
            <text x="108" y="22" fontSize="13" fill="#0ea5e9" fontWeight="700">
              key
            </text>
            <text x="138" y="22" fontSize="13" fill="#ef4444" fontWeight="700">
              compare
            </text>
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default InsertionSortAlgo;
