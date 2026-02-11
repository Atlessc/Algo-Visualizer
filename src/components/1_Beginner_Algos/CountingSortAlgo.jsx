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

const INITIAL_ARRAY = [4, 2, 2, 8, 3, 3, 1];
const INITIAL_COUNTS = Array(Math.max(...INITIAL_ARRAY) + 1).fill(0);
const INITIAL_OUTPUT = Array(INITIAL_ARRAY.length).fill(null);

const CountingSortAlgo = ({ compact = false }) => {
  const [array, setArray] = useState(INITIAL_ARRAY);
  const [counts, setCounts] = useState(INITIAL_COUNTS);
  const [output, setOutput] = useState(INITIAL_OUTPUT);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [activeCountIndex, setActiveCountIndex] = useState(null);
  const [activeOutputIndex, setActiveOutputIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState("Ready");
  const [status, setStatus] = useState("Press Start Sort to run counting sort.");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const resetState = (nextArray = INITIAL_ARRAY) => {
    setArray(nextArray);
    setCounts(Array(Math.max(...nextArray) + 1).fill(0));
    setOutput(Array(nextArray.length).fill(null));
    setActiveInputIndex(null);
    setActiveCountIndex(null);
    setActiveOutputIndex(null);
    setStage("Ready");
    setStatus("Press Start Sort to run counting sort.");
  };

  const randomize = () => {
    if (isRunning) return;
    const next = Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1);
    resetState(next);
  };

  const runCountingSort = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const maxValue = Math.max(...array);
    const count = Array(maxValue + 1).fill(0);
    const result = Array(array.length).fill(null);
    setCounts([...count]);
    setOutput([...result]);

    setStage("Count Values");
    setStatus("Counting occurrences of each value.");
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      setActiveInputIndex(i);
      setActiveCountIndex(value);
      count[value] += 1;
      setCounts([...count]);
      await delay(420);
    }

    setStage("Prefix Sums");
    setStatus("Converting counts to cumulative positions.");
    for (let i = 1; i < count.length; i++) {
      setActiveCountIndex(i);
      count[i] += count[i - 1];
      setCounts([...count]);
      await delay(420);
    }

    setStage("Build Output");
    setStatus("Placing values into their final sorted positions.");
    for (let i = array.length - 1; i >= 0; i--) {
      const value = array[i];
      const position = count[value] - 1;
      setActiveInputIndex(i);
      setActiveCountIndex(value);
      setActiveOutputIndex(position);
      result[position] = value;
      count[value] -= 1;
      setCounts([...count]);
      setOutput([...result]);
      await delay(500);
    }

    setActiveInputIndex(null);
    setActiveCountIndex(null);
    setActiveOutputIndex(null);
    setStage("Done");
    setStatus("Done. Array is sorted.");
    setIsRunning(false);
  };

  const cellW = compact ? 52 : 64;
  const gap = compact ? 8 : 12;
  const rowPadding = 12;
  const rowHeight = compact ? 68 : 74;
  const longestRow = Math.max(array.length, counts.length, output.length, 1);
  const chartW = longestRow * (cellW + gap) + rowPadding * 2;
  const chartH = compact ? 272 : 290;

  const drawRow = (values, y, activeIndex, palette) =>
    values.map((value, index) => {
      const x = rowPadding + index * (cellW + gap);
      const fill = index === activeIndex ? palette.active : palette.default;

      return (
        <motion.g key={`${y}-${index}`} animate={{ y: index === activeIndex ? -6 : 0 }}>
          <rect x={x} y={y} width={cellW} height={50} rx={10} fill={fill} />
          <text
            x={x + cellW / 2}
            y={y + 31}
            textAnchor="middle"
            fill="#fff"
            fontSize="18"
            fontWeight="700"
          >
            {value === null ? "·" : value}
          </text>
          <text x={x + cellW / 2} y={y + 66} textAnchor="middle" fill="#334155" fontSize="11">
            {index}
          </text>
        </motion.g>
      );
    });

  return (
    <Container>
      <CardContainer>
        <Title>Counting Sort</Title>
        <Para>
          Counting sort uses a frequency array to place each value directly into its sorted position.
          It runs in O(n + k), where k is the value range.
        </Para>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} onClick={runCountingSort} disabled={isRunning}>
            Start Sort
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={randomize}
            disabled={isRunning}
          >
            Randomize
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={() => resetState()}
            disabled={isRunning}
          >
            Reset
          </Button>
        </div>

        <Para>
          Stage: <strong>{stage}</strong> | {status}
        </Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[980px]"
          >
            <text x={12} y={22} fontSize="14" fill="#0f172a" fontWeight="600">
              Input Array
            </text>
            {drawRow(array, 30, activeInputIndex, { default: "#64748b", active: "#0ea5e9" })}

            <text x={12} y={112} fontSize="14" fill="#0f172a" fontWeight="600">
              Count Array
            </text>
            {drawRow(counts, 120, activeCountIndex, { default: "#f59e0b", active: "#ea580c" })}

            <text x={12} y={202} fontSize="14" fill="#0f172a" fontWeight="600">
              Output Array
            </text>
            {drawRow(output, 210, activeOutputIndex, { default: "#16a34a", active: "#15803d" })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function countingSort(arr) {
  const maxValue = Math.max(...arr);
  const count = Array(maxValue + 1).fill(0);
  const output = Array(arr.length).fill(0);

  for (const value of arr) count[value]++;
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];

  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i];
    output[count[value] - 1] = value;
    count[value]--;
  }
  return output;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default CountingSortAlgo;
