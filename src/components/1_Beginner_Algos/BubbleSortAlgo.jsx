import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para, // Assuming Para is defined in your styledComponents file
} from "../Styled Components/styledComponents";
import "../styles/Node.css";

const BubbleSortAlgo = () => {
  const [array, setArray] = useState([5, 3, 8, 4, 2, 7, 1, 6]); // Example array
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState([]);

  useEffect(() => {
    bubbleSort([...array]);
  }, []);

  const bubbleSort = async (arr) => {
    let n = arr.length;
    let tempArray = [...arr];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndex(j);
        setComparingIndex(j + 1);
        
        if (tempArray[j] > tempArray[j + 1]) {
          // Swap if the current element is greater than the next
          await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
          let temp = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = temp;
          setArray([...tempArray]);
        }
      }
      setSortedIndex((prev) => [...prev, n - i - 1]);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay to visualize sorted state
    }
    setSortedIndex((prev) => [...prev, 0]); // Manually set the last element as sorted
    setCurrentIndex(null);
    setComparingIndex(null);
  };

  return (
    <Container>
      <CardContainer>
        <Title>Bubble Sort Algo</Title>

        <Para>
          Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, 
          compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated 
          until the list is sorted. The algorithm gets its name because smaller elements "bubble" to the top of 
          the list. While it is easy to understand and implement, Bubble Sort is not efficient for large datasets 
          as it has a time complexity of O(n^2).
        </Para>

        <Para>
          <strong>When to use Bubble Sort:</strong> Bubble Sort is typically used in educational settings or when 
          simplicity is more important than performance. It can be useful when you need a straightforward, easy-to-understand 
          algorithm for small datasets or when the dataset is almost sorted and requires only a few passes.
        </Para>

        <AlgoVisualizer>
          <svg width="600" height="150">
            {array.map((value, index) => (
              <motion.g
                key={index}
                initial={false}
                animate={{ y: sortedIndex.includes(index) ? -20 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <circle
                  cx={index * 70 + 35}
                  cy={75}
                  r={25}
                  fill={
                    sortedIndex.includes(index)
                      ? "green"
                      : index === currentIndex
                      ? "red"
                      : index === comparingIndex
                      ? "orange"
                      : "gray"
                  }
                />
                <text
                  x={index * 70 + 35}
                  y={80}
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
          {`function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BubbleSortAlgo;
