import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

const {NameOfAlgo} = () => {
  return (
    <Container>
      <CardContainer>
        <Title>{NameOfAlgo}</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            {` `}
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default {NameOfAlgo};