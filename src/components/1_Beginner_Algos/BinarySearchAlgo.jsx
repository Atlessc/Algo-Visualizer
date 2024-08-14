import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useStore from "../../ZustandStore"; // Import the store if needed
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";
import '../styles/Node.css';

const buildTree = (array, start, end) => {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const node = { value: array[mid], left: null, right: null };
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
};

const calculateNodePositions = (node, depth = 0, position = { x: 0, y: 0 }, positions = {}, parentPos = null, scale = 1) => {
  if (!node) return;

  const xOffset = Math.pow(2, 2 - depth) * 30 * scale; // Adjust xOffset based on scale
  const yOffset = 80 * scale; // Adjust y spacing based on scale

  positions[node.value] = { x: position.x, y: position.y, parentPos };

  if (node.left) {
    calculateNodePositions(
      node.left,
      depth + 1,
      { x: position.x - xOffset, y: position.y + yOffset },
      positions,
      positions[node.value],
      scale
    );
  }

  if (node.right) {
    calculateNodePositions(
      node.right,
      depth + 1,
      { x: position.x + xOffset, y: position.y + yOffset },
      positions,
      positions[node.value],
      scale
    );
  }
};

const BinarySearchAlgo = () => {
  const exampleArray = [7, 14, 21, 28, 35, 42, 49];
  const [currentNode, setCurrentNode] = useState(null);
  const [positions, setPositions] = useState({});
  const [searchValue, setSearchValue] = useState(exampleArray[0]);

  const windowWidth = useStore((state) => state.windowWidth); // Assume windowWidth is managed in the store

  useEffect(() => {
    const scale = windowWidth / 800; // Scaling factor based on a base width of 800px
    const rootNode = buildTree(exampleArray, 0, exampleArray.length - 1);
    const nodePositions = {};
    calculateNodePositions(rootNode, 0, { x: windowWidth / 2, y: 50 * scale }, nodePositions, null, scale);
    setPositions(nodePositions);
  }, [windowWidth]);

  const binarySearch = async (array, target) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      setCurrentNode(array[mid]);

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (array[mid] === target) {
        setCurrentNode(array[mid]);
        return mid;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    setCurrentNode(null);
    return -1;
  };

  const handleSearch = () => {
    const targetValue = parseInt(searchValue, 10);
    if (!isNaN(targetValue)) {
      binarySearch(exampleArray, targetValue);
    }
  };

  return (
    <Container>
      <CardContainer>
        <Title>Binary Search Algo</Title>
        <Para>Binary search is a search algorithm that works by repeatedly dividing the search interval in half.</Para>

        <select
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            marginBottom: '20px',
            backgroundColor: '#333',
            border: '1px solid #ccc',
          }}
        >
          {exampleArray.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <AlgoVisualizer>
          <svg width={windowWidth * 0.9} height={400} style={{
            backgroundColor: '#333',
          }}>
            {Object.keys(positions).map((value) => {
              const pos = positions[value];
              const isCurrent = currentNode === Number(value);
              return (
                <motion.g
                  key={value}
                  animate={{ scale: isCurrent ? 1.2 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={20 * (windowWidth / 800)} // Scale radius based on window width
                    fill={isCurrent ? "orange" : "green"}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    fill="white"
                    textAnchor="middle"
                    fontSize="15px"
                  >
                    {value}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <button 
          onClick={handleSearch} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            backgroundColor: 'orange',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Start Search
        </button>

        <Para>Here is an example of binary search in JavaScript:</Para>
        <CodeBlock>
          {`let exampleArray = [7, 14, 21, 28, 35, 42, 49];
          const binarySearch = (array, target) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BinarySearchAlgo;
