import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";

const SelectionSortAlgo = () => {
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

  return (
    <Container>
      <CardContainer>
        <Title>Selection Sort Algo</Title>

        <Para>
          Selection sort repeatedly selects the smallest element from the unsorted section and moves
          it to the front. It always performs O(n²) comparisons, but uses few swaps.
        </Para>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={runSelectionSort} disabled={isSorting}>
            Start Sort
          </button>
          <button type="button" onClick={randomizeArray} disabled={isSorting}>
            Randomize
          </button>
          <button type="button" onClick={resetDemo} disabled={isSorting}>
            Reset
          </button>
        </div>

        <Para>{status}</Para>

        <AlgoVisualizer>
          <svg width="620" height="150" viewBox="0 0 620 150">
            {array.map((value, index) => {
              const x = index * 95 + 60;
              const isSorted = index <= sortedBoundary;
              let fill = "#6B7280";

              if (isSorted) fill = "#2E8B57";
              if (index === currentI) fill = "#4169E1";
              if (index === currentJ) fill = "#FF8C42";
              if (index === minIndex) fill = "#DC2626";

              return (
                <motion.g key={`${value}-${index}`} animate={{ y: index === currentJ ? -8 : 0 }}>
                  <rect x={x - 30} y={45} width={60} height={60} rx={12} fill={fill} />
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
