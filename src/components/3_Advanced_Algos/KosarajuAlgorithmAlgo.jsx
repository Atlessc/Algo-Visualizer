import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const KosarajuAlgorithmAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Kosaraju Algorithm Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KosarajuAlgorithmAlgo;