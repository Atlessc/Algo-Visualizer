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

const LinearSearchAlgo = () => {
  const initialArray = [8, 3, 14, 2, 9, 5, 1];

  const [array, setArray] = useState(initialArray);
  const [target, setTarget] = useState(9);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState("Set a target and press Start Search.");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runLinearSearch = async () => {
    if (isSearching) return;

    setIsSearching(true);
    setCurrentIndex(null);
    setFoundIndex(null);
    setStatus(`Searching for ${target}...`);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await delay(500);

      if (array[i] === target) {
        setFoundIndex(i);
        setStatus(`Found ${target} at index ${i}.`);
        setIsSearching(false);
        return;
      }
    }

    setCurrentIndex(null);
    setStatus(`${target} was not found in the array.`);
    setIsSearching(false);
  };

  const resetDemo = () => {
    if (isSearching) return;
    setArray(initialArray);
    setTarget(9);
    setCurrentIndex(null);
    setFoundIndex(null);
    setStatus("Set a target and press Start Search.");
  };

  const randomizeArray = () => {
    if (isSearching) return;
    const nextArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(nextArray);
    setCurrentIndex(null);
    setFoundIndex(null);
    setStatus("Array randomized. Press Start Search.");
  };

  return (
    <Container>
      <CardContainer>
        <Title>Linear Search Algo</Title>

        <Para>
          Linear search checks each element one-by-one until it finds the target or reaches the end.
          It is simple and works on unsorted arrays, with worst-case time complexity O(n).
        </Para>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            disabled={isSearching}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "120px",
            }}
          />
          <button type="button" onClick={runLinearSearch} disabled={isSearching}>
            Start Search
          </button>
          <button type="button" onClick={randomizeArray} disabled={isSearching}>
            Randomize
          </button>
          <button type="button" onClick={resetDemo} disabled={isSearching}>
            Reset
          </button>
        </div>

        <Para>{status}</Para>

        <AlgoVisualizer>
          <svg width="600" height="140" viewBox="0 0 600 140">
            {array.map((value, index) => {
              const x = index * 80 + 40;
              const fill =
                index === foundIndex ? "#2E8B57" : index === currentIndex ? "#FF8C42" : "#6B7280";

              return (
                <motion.g key={`${value}-${index}`} animate={{ y: index === currentIndex ? -8 : 0 }}>
                  <rect x={x - 28} y={45} width={56} height={56} rx={12} fill={fill} />
                  <text
                    x={x}
                    y={78}
                    textAnchor="middle"
                    fill="#fff"
                    fontWeight="bold"
                    fontSize="18"
                  >
                    {value}
                  </text>
                  <text x={x} y={118} textAnchor="middle" fill="#333" fontSize="14">
                    i={index}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // found at index i
    }
  }
  return -1; // not found
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default LinearSearchAlgo;
