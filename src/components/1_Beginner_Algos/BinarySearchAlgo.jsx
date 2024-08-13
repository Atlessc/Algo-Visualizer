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
import '../styles/Node.css';

// Function to build a balanced binary search tree from a sorted array
const buildTree = (array, start, end) => {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const node = { value: array[mid], left: null, right: null };
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
};

// Function to calculate node positions for rendering
const calculateNodePositions = (node, depth = 0, position = { x: 0, y: 0 }, positions = {}, parentPos = null) => {
  if (!node) return;

  const xOffset = Math.pow(2, 2 - depth) * 30; // Adjust the xOffset to make the tree narrower
  positions[node.value] = { x: position.x, y: position.y, parentPos };

  if (node.left) {
    calculateNodePositions(
      node.left,
      depth + 1,
      { x: position.x - xOffset, y: position.y + 80 }, // Increase y spacing between nodes
      positions,
      positions[node.value]
    );
  }

  if (node.right) {
    calculateNodePositions(
      node.right,
      depth + 1,
      { x: position.x + xOffset, y: position.y + 80 },
      positions,
      positions[node.value]
    );
  }
};

const BinarySearchAlgo = () => {
  const exampleArray = [7, 14, 21, 28, 35, 42, 49];
  const [currentNode, setCurrentNode] = useState(null);
  const [positions, setPositions] = useState({});
  const [searchValue, setSearchValue] = useState(exampleArray[0]); // Initialize with the first array element

  useEffect(() => {
    const rootNode = buildTree(exampleArray, 0, exampleArray.length - 1);
    const nodePositions = {};
    calculateNodePositions(rootNode, 0, { x: 300, y: 50 }, nodePositions); // Adjust starting x and y positions to center the tree
    setPositions(nodePositions);
  }, []);

  useEffect(() => {
    if (currentNode !== null) {
      console.log(`Current node: ${currentNode}`);
    }
  }, [currentNode]);

  const binarySearch = async (array, target) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      setCurrentNode(array[mid]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay to visualize the process

      if (array[mid] === target) {
        setCurrentNode(array[mid]); // Final set for target node
        return mid;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    setCurrentNode(null); // Reset if not found
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
        >
          {exampleArray.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <AlgoVisualizer>
          <svg width="600" height="500">
            {/* Render the lines first */}
            {Object.keys(positions).map((value) => {
              const pos = positions[value];
              if (pos.parentPos) {
                return (
                  <line
                    key={`line-${value}`}
                    x1={pos.parentPos.x}
                    y1={pos.parentPos.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#555"
                  />
                );
              }
              return null;
            })}

            {/* Render circles and text with inline color handling */}
            {Object.keys(positions).map((value) => {
  const pos = positions[value];
  const isCurrent = currentNode === Number(value); // Convert value to number
  return (
    <motion.g
      key={value}
      animate={{ scale: isCurrent ? 1.2 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <circle
        cx={pos.x}
        cy={pos.y}
        r={20}
        className={isCurrent ? "current-node" : "default-node"}
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

        <button onClick={handleSearch}>Start Search</button>

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
