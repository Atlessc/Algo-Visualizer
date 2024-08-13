import styled from "styled-components";

export const Container = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: clamp(300px, 100%, 800px);

`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  width: clamp(300px, 100%, 800px);
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: -20px;
  color: #333;
`;

export const AlgoVisualizer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const CodeBlock = styled.pre`
  background-color: #333;
  color: #fff;
  font-size: 14px;
  font-family: monospace;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const Para = styled.p`
  font-size: 16px;
  line-height: 1;
  margin-bottom: -10px;
  color: #333;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;