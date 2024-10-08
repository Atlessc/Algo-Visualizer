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
  position: relative;
  width: clamp(300px, 100%, 90vw); /* Adjust width relative to viewport */
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  width: clamp(300px, 100%, 90vw); /* Adjust width relative to viewport */
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center; /* Center title */
`;

export const AlgoVisualizer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%; /* Ensure it takes full width */
  overflow-x: auto; /* Allow horizontal scrolling if needed */
`;

export const CodeBlock = styled.pre`
  background-color: #333;
  color: #fff;
  font-size: 14px;
  font-family: monospace;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%; /* Ensure it scales with the container */
  overflow-x: auto; /* Handle overflow for long code */
`;

export const Para = styled.p`
  font-size: 16px;
  line-height: 1.5; /* Adjust line height for readability */
  margin-bottom: 10px;
  color: #333;
  width: clamp(300px, 100%, 80vw); /* Adjust width relative to viewport */
  text-align: center; /* Center text for better appearance */
  margin: 0 auto;
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
