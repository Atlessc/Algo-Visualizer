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

const FibonacciSequenceIterativeAlgo = ({ maxElements = 10, endOnValue }) => {
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    if (endOnValue) {
      generateFibonacciUntilValue(endOnValue);
    } else {
      generateFibonacci(maxElements);
    }
  }, [maxElements, endOnValue]);

  const generateFibonacci = (n) => {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    setSequence(fib);
  };

  const generateFibonacciUntilValue = (endValue) => {
    const fib = [0, 1];
    let i = 2;
    while (true) {
      const nextValue = fib[i - 1] + fib[i - 2];
      if (nextValue > endValue) break;
      fib.push(nextValue);
      i++;
    }
    setSequence(fib);
  };

  return (
    <Container>
      <CardContainer>
        <Title>Fibonacci Sequence (Iterative)</Title>

        <Para>
          The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, 
          usually starting with 0 and 1. The iterative approach to generating the Fibonacci sequence is efficient 
          and straightforward, making it ideal for cases where you need to compute many Fibonacci numbers.
        </Para>

        <AlgoVisualizer>
          <svg width="800" height="400">
            {/* Render Fibonacci circles */}
            {sequence.map((value, index) => (
              <motion.circle
                key={index}
                cx={index * (800 / sequence.length)} // Dynamic spacing based on length
                cy={200}
                r={Math.log(value + 1) * 15} // Logarithmic scale for circle size
                fill={`hsl(${index * (360 / sequence.length)}, 70%, 50%)`} // Hue changes with each circle
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <title>{`Fib(${index}) = ${value}`}</title>
              </motion.circle>
            ))}

            {/* Render Fibonacci numbers */}
            {sequence.map((value, index) => (
              <motion.text
                key={index}
                x={index * (800 / sequence.length)}
                y={205}
                fill="black"
                textAnchor="middle"
                fontSize="18px"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {value}
              </motion.text>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function generateFibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

function generateFibonacciUntilValue(endValue) {
  const fib = [0, 1];
  let i = 2;
  while (true) {
    const nextValue = fib[i - 1] + fib[i - 2];
    if (nextValue > endValue) break;
    fib.push(nextValue);
    i++;
  }
  return fib;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FibonacciSequenceIterativeAlgo;
