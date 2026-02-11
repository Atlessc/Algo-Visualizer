import styled from "styled-components";

export const Container = styled.div.attrs({ className: "algo-card" })`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
  padding: 14px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin: 8px auto 0;
  position: relative;
  width: min(100%, 1060px);
  min-width: 0;

  @media (max-width: 700px) {
    border-radius: 14px;
    padding: 11px;
  }

  @media (max-width: 520px) {
    padding: 10px;
  }
`;

export const CardContainer = styled.div.attrs({ className: "algo-card-content" })`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 0;
  position: relative;
  width: min(100%, 1020px);
  min-width: 0;

  @media (max-width: 700px) {
    gap: 12px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  color: #0f172a;
  text-align: center;
  margin: 0;
  line-height: 1.25;
`;

export const AlgoVisualizer = styled.div.attrs({ className: "algo-visualizer" })`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 4px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 6px;
  min-width: 0;

  > * {
    min-width: 0;
  }

  @media (max-width: 700px) {
    padding-bottom: 4px;
  }
`;

export const AlgoVisualizerScroll = styled.div.attrs({ className: "algo-scroll-x" })`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const AlgoVisualizerScrollCenter = styled.div.attrs({
  className: "algo-scroll-x algo-scroll-x-center",
})`
  width: 100%;
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

  @media (max-width: 700px) {
    font-size: 12px;
    border-radius: 10px;
    padding: 10px;
  }
`;

export const Para = styled.p`
  font-size: 16px;
  line-height: 1.55;
  color: #334155;
  width: min(100%, 880px);
  text-align: center;
  margin: 0 auto;

  @media (max-width: 700px) {
    font-size: 15px;
    line-height: 1.5;
  }

  @media (max-width: 520px) {
    font-size: 14px;
    text-align: left;
    margin: 0;
    width: 100%;
  }
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 12px 0;
  font-size: max(16px, 1rem);
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
`;
