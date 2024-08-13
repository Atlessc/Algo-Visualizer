import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const BinarySearchAlgo = () => {

  let exampleArray = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];

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
  };

  return (
    <Container>
      <CardContainer>
        <Title>Binary Search Algo</Title>
        <Para>Binary search is a search algorithm that works by repeatedly dividing the search interval in half.</Para>

        <AlgoVisualizer>
          
        </AlgoVisualizer>
        <Para>Here is an example of binary search in JavaScript:</Para>
          <CodeBlock>
            { `let exampleArray = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
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
  };` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BinarySearchAlgo;