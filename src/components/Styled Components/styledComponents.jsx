import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
  padding: 14px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  position: relative;
  width: min(100%, 1060px);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 0;
  position: relative;
  width: min(100%, 1020px);
`;

export const Title = styled.h1`
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  color: #0f172a;
  text-align: center;
  margin: 0;
`;

export const AlgoVisualizer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 6px;
`;

export const CodeBlock = styled.pre`
  background-color: #0f172a;
  color: #e2e8f0;
  font-size: 14px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  line-height: 1.45;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  margin: 0 0 8px;
  width: 100%;
  overflow-x: auto;
`;

export const Para = styled.p`
  font-size: 16px;
  line-height: 1.55;
  margin-bottom: 8px;
  color: #334155;
  width: min(100%, 880px);
  text-align: center;
  margin: 0 auto;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 12px 0;
  font-size: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;
