import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";
import "../styles/Node.css";

const CountingSortAlgo = () => {
  const [array, setArray] = useState([4, 2, 2, 8, 3, 3, 1]); // Example array
  const [sortedArray, setSortedArray] = useState([]);
  const [counts, setCounts] = useState([]);
  const [maxValue, setMaxValue] = useState(Math.max(...array));

  useEffect(() => {
    countingSort(array, maxValue);
  }, [array]);

  const countingSort = async (arr, maxVal) => {
    const count = Array(maxVal + 1).fill(0);
    const output = Array(arr.length).fill(0);

    // Step 1: Count occurrences of each number
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;
    }
    setCounts([...count]);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visual delay

    // Step 2: Cumulative count
    for (let i = 1; i <= maxVal; i++) {
      count[i] += count[i - 1];
    }
    setCounts([...count]);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visual delay

    // Step 3: Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
      setSortedArray([...output]);
      setCounts([...count]);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Visual delay
    }

    setSortedArray([...output]);
  };

  return (
    <Container>
      <CardContainer>
        <Title>Counting Sort Algo</Title>

        <Para>
          Counting Sort is an efficient sorting algorithm for sorting integers when the range of possible values 
          is known. It works by counting the number of occurrences of each unique value in the array and using 
          these counts to determine the positions of each value in the sorted array. Counting Sort is not a 
          comparison sort, and it has a time complexity of O(n + k), where n is the number of elements in the input 
          array and k is the range of the input.
        </Para>

        <AlgoVisualizer>
          <svg width="700" height="150">
            {/* Render the original array */}
            {array.map((value, index) => (
              <motion.g key={index} initial={false}>
                <circle
                  cx={index * 70 + 35}
                  cy={50}
                  r={20}
                  fill="gray"
                />
                <text
                  x={index * 70 + 35}
                  y={55}
                  fill="white"
                  textAnchor="middle"
                  fontSize="18px"
                  fontWeight="bold"
                >
                  {value}
                </text>
              </motion.g>
            ))}

            {/* Render the sorted array */}
            {sortedArray.map((value, index) => (
              <motion.g key={index} initial={false}>
                <circle
                  cx={index * 70 + 35}
                  cy={120}
                  r={20}
                  fill="green"
                />
                <text
                  x={index * 70 + 35}
                  y={125}
                  fill="white"
                  textAnchor="middle"
                  fontSize="18px"
                  fontWeight="bold"
                >
                  {value}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* Render the counts array */}
          <svg width="700" height="50">
            {counts.map((value, index) => (
              <motion.g key={index} initial={false}>
                <rect
                  x={index * 70 + 10}
                  y={10}
                  width="50"
                  height="30"
                  fill="orange"
                />
                <text
                  x={index * 70 + 35}
                  y={30}
                  fill="white"
                  textAnchor="middle"
                  fontSize="18px"
                  fontWeight="bold"
                >
                  {value}
                </text>
              </motion.g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function countingSort(arr, maxVal) {
  const count = Array(maxVal + 1).fill(0);
  const output = Array(arr.length).fill(0);

  // Step 1: Count occurrences of each number
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }

  // Step 2: Cumulative count
  for (let i = 1; i <= maxVal; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }

  return output;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default CountingSortAlgo;
