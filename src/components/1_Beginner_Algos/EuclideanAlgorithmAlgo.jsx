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

const EuclideanAlgorithmAlgo = () => {
  const [a, setA] = useState(252); // Example value for a
  const [b, setB] = useState(105); // Example value for b
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    euclideanAlgorithm(a, b);
  }, [a, b]);

  const euclideanAlgorithm = (a, b) => {
    const stepsArray = [];
    while (b !== 0) {
      let remainder = a % b;
      stepsArray.push({ a, b, remainder });
      a = b;
      b = remainder;
    }
    setSteps(stepsArray);
  };

  return (
    <Container>
      <CardContainer>
        <Title>Euclidean Algorithm</Title>

        <Para>
          The Euclidean Algorithm is a method for finding the greatest common divisor (GCD) of two numbers. 
          It works by repeatedly dividing the larger number by the smaller number and taking the remainder 
          until the remainder is 0. The last non-zero remainder is the GCD.
        </Para>

        <AlgoVisualizer>
          <svg width="700" height={steps.length * 100}>
            {steps.map((step, index) => (
              <motion.g
                key={index}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                
              >
                {/* Represent 'a' */}
                <rect
                  x={50}
                  y={index * 100 + 30}
                  width={step.a}
                  height={30}
                  fill="orange"
                />
                <text
                  x={step.a + 60}
                  y={index * 100 + 50}
                  fill="black"
                  textAnchor="start"
                  fontSize="18px"
                  fontWeight="bold"
                >
                  a = {step.a}
                </text>

                {/* Represent 'b' */}
                <rect
                  x={50}
                  y={index * 100 + 70}
                  width={step.b}
                  height={30}
                  fill="gray"
                />
                <text
                  x={step.b + 60}
                  y={index * 100 + 90}
                  fill="black"
                  textAnchor="start"
                  fontSize="18px"
                  fontWeight="bold"
                >
                  b = {step.b}
                </text>

                {/* Represent 'remainder' */}
                {step.remainder > 0 && (
                  <>
                    <rect
                      x={50}
                      y={index * 100 + 110}
                      width={step.remainder}
                      height={30}
                      fill="green"
                    />
                    <text
                      x={step.remainder + 60}
                      y={index * 100 + 130}
                      fill="black"
                      textAnchor="start"
                      fontSize="18px"
                      fontWeight="bold"
                    >
                      remainder = {step.remainder}
                    </text>
                  </>
                    
                  )}
              </motion.g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function euclideanAlgorithm(a, b) {
  while (b !== 0) {
    let remainder = a % b;
    a = b;
    b = remainder;
  }
  return a; // GCD is the last non-zero remainder
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default EuclideanAlgorithmAlgo;
