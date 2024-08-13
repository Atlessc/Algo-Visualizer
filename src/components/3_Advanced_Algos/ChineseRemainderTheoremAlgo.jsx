import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const ChineseRemainderTheoremAlgo = () => {
  return (
    <Container>
      <CardContainer>
        <Title>Chinese Remainder Theorem Algo</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            {` `}
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ChineseRemainderTheoremAlgo;