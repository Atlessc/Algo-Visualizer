import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const ModularExponentiationAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Modular Exponentiation Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { ` ` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ModularExponentiationAlgo;