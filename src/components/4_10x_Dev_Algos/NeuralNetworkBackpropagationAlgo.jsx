import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const NeuralNetworkBackpropagationAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Neural Network Backpropagation Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default NeuralNetworkBackpropagationAlgo;