import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../Styled Components/styledComponents";

const CHIP_COLORS = ["#e0f2fe", "#dcfce7", "#fef9c3", "#fee2e2", "#ede9fe", "#fce7f3"];

const getChipColor = (index) => CHIP_COLORS[index % CHIP_COLORS.length];

const TenXAlgoRenderer = ({
  title,
  description,
  intuition,
  complexity,
  useCase,
  steps,
  code,
  speedMs = 1300
}) => {
  const timeline = useMemo(() => steps ?? [], [steps]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentStep = timeline[stepIndex] ?? timeline[0];

  useEffect(() => {
    if (!isPlaying || timeline.length === 0 || stepIndex >= timeline.length - 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, timeline.length - 1));
    }, speedMs);

    return () => window.clearInterval(timerId);
  }, [isPlaying, stepIndex, timeline.length, speedMs]);

  return (
    <Container>
      <CardContainer>
        <Title>{title}</Title>
        <Para>{description}</Para>
        <Para>
          <strong>Core Intuition:</strong> {intuition}
        </Para>
        <Para>
          <strong>Time Complexity:</strong> {complexity} | <strong>Use Case:</strong> {useCase}
        </Para>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <button type="button" onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex((prev) => Math.min(prev + 1, timeline.length - 1));
              setIsPlaying(false);
            }}
            disabled={timeline.length === 0 || stepIndex >= timeline.length - 1}
          >
            Next Step
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
            disabled={timeline.length === 0}
          >
            Reset
          </button>
          <div style={{ fontSize: "0.9rem", color: "#334155", fontWeight: 600 }}>
            Step {timeline.length === 0 ? 0 : stepIndex + 1} / {timeline.length}
          </div>
        </div>

        <AlgoVisualizer>
          <div
            style={{
              width: "100%",
              maxWidth: "920px",
              margin: "0 auto",
              display: "grid",
              gap: "10px"
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "10px"
              }}
            >
              <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>
                {currentStep?.title ?? "No timeline steps configured"}
              </div>
              <div style={{ color: "#334155", fontSize: "0.95rem" }}>{currentStep?.detail ?? ""}</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "8px"
              }}
            >
              {timeline.map((step, index) => {
                const isActive = index === stepIndex;
                const isVisited = index <= stepIndex;

                return (
                  <div
                    key={`${step.title}-${index}`}
                    style={{
                      borderRadius: "12px",
                      border: isActive ? "2px solid #2563eb" : "1px solid #dbeafe",
                      background: isVisited ? getChipColor(index) : "#f8fafc",
                      color: "#0f172a",
                      padding: "8px",
                      minHeight: "74px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.84rem" }}>{step.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#334155" }}>{step.metric}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>{code}</CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default TenXAlgoRenderer;
