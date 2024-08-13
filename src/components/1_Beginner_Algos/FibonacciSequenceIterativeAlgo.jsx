import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const FibonacciSequenceIterativeAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Fibonacci Sequence Iterative Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FibonacciSequenceIterativeAlgo;