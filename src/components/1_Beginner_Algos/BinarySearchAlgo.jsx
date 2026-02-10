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

const SOURCE_ARRAY = [7, 14, 21, 28, 35, 42, 49, 56, 63];

const BinarySearchAlgo = () => {
  const [array] = useState(SOURCE_ARRAY);
  const [target, setTarget] = useState(SOURCE_ARRAY[3]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(SOURCE_ARRAY.length - 1);
  const [mid, setMid] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("Pick a target and start search.");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const resetState = () => {
    setLow(0);
    setHigh(array.length - 1);
    setMid(null);
    setFoundIndex(null);
    setStatus("Pick a target and start search.");
  };

  const startSearch = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setFoundIndex(null);

    let left = 0;
    let right = array.length - 1;
    setLow(left);
    setHigh(right);

    while (left <= right) {
      const center = Math.floor((left + right) / 2);
      setMid(center);
      setStatus(`Checking index ${center} (value ${array[center]}).`);
      await delay(650);

      if (array[center] === target) {
        setFoundIndex(center);
        setLow(center);
        setHigh(center);
        setStatus(`Found ${target} at index ${center}.`);
        setIsRunning(false);
        return;
      }

      if (array[center] < target) {
        left = center + 1;
      } else {
        right = center - 1;
      }

      setLow(left);
      setHigh(right);
      await delay(350);
    }

    setStatus(`${target} is not in the array.`);
    setIsRunning(false);
  };

  const barW = 56;
  const gap = 12;
  const baseY = 190;
  const chartW = array.length * (barW + gap) + gap;
  const chartH = 260;
  const maxValue = Math.max(...array);

  return (
    <Container>
      <CardContainer>
        <Title>Binary Search</Title>
        <Para>
          Binary search narrows the search range by half each step in a sorted array. Watch how
          low/high boundaries shrink until the target is found.
        </Para>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <select
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            disabled={isRunning}
            style={{ padding: "8px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          >
            {array.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
          <button type="button" onClick={startSearch} disabled={isRunning}>
            Start Search
          </button>
          <button type="button" onClick={resetState} disabled={isRunning}>
            Reset
          </button>
        </div>

        <Para>{status}</Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "980px", height: "auto" }}
          >
            {array.map((value, index) => {
              const x = gap + index * (barW + gap);
              const h = 48 + (value / maxValue) * 100;
              const y = baseY - h;
              const outOfRange = index < low || index > high;

              let fill = "#64748b";
              if (outOfRange) fill = "#cbd5e1";
              if (index === mid) fill = "#f97316";
              if (index === low) fill = "#0ea5e9";
              if (index === high) fill = "#a855f7";
              if (index === foundIndex) fill = "#16a34a";

              return (
                <motion.g key={value} animate={{ y: index === mid ? -6 : 0 }}>
                  <rect x={x} y={y} width={barW} height={h} rx={10} fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="14">
                    {value}
                  </text>
                  <text x={x + barW / 2} y={baseY + 18} textAnchor="middle" fill="#334155" fontSize="12">
                    {index}
                  </text>
                </motion.g>
              );
            })}

            <text x={12} y={20} fill="#0ea5e9" fontSize="13" fontWeight="600">
              low
            </text>
            <text x={56} y={20} fill="#f97316" fontSize="13" fontWeight="600">
              mid
            </text>
            <text x={98} y={20} fill="#a855f7" fontSize="13" fontWeight="600">
              high
            </text>
            <text x={148} y={20} fill="#16a34a" fontSize="13" fontWeight="600">
              found
            </text>
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BinarySearchAlgo;
