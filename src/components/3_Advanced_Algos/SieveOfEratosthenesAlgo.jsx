import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const SieveOfEratosthenesAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Sieve Of Eratosthenes Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SieveOfEratosthenesAlgo;