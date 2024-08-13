import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const HamiltonianPathBacktrackingAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Hamiltonian Path Backtracking Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default HamiltonianPathBacktrackingAlgo;