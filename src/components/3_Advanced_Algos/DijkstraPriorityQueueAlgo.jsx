import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const DijkstraPriorityQueueAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Dijkstra Priority Queue Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default DijkstraPriorityQueueAlgo;