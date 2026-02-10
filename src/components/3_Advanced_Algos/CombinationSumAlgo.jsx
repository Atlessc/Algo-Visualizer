import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";

const CANDIDATES = [2, 3, 6, 7];
const TARGET = 7;

const buildSteps = () => {
  const steps = [];
  const result = [];

  const dfs = (start, remain, path) => {
    steps.push({
      path: [...path],
      remain,
      action: `Explore with remaining sum ${remain}.`,
    });
    if (remain === 0) {
      result.push([...path]);
      steps.push({
        path: [...path],
        remain,
        action: `Found valid combination [${path.join(", ")}].`,
      });
      return;
    }
    if (remain < 0) {
      steps.push({
        path: [...path],
        remain,
        action: "Exceeded target, backtrack.",
      });
      return;
    }
    for (let i = start; i < CANDIDATES.length; i++) {
      path.push(CANDIDATES[i]);
      dfs(i, remain - CANDIDATES[i], path);
      path.pop();
    }
  };

  dfs(0, TARGET, []);
  steps.push({
    path: [],
    remain: TARGET,
    action: `Done. Solutions: ${result.map((x) => `[${x.join(", ")}]`).join(" ")}`,
  });
  return { steps, result };
};

const CombinationSumAlgo = () => {
  const { steps, result } = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(
      () => setStepIndex((p) => Math.min(p + 1, steps.length - 1)),
      700,
    );
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Combination Sum</Title>
        <Para>
          Combination Sum uses backtracking to find all unique combinations
          where numbers can be reused and the total equals a target. It explores
          a decision tree and prunes branches once the remaining sum becomes
          negative.
        </Para>
        <Para>
          Candidates: [{CANDIDATES.join(", ")}], Target: {TARGET}
        </Para>
        <Para>{step.action}</Para>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
          >
            Reset
          </button>
        </div>
        <AlgoVisualizer>
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              margin: "0 auto",
              background: "#eef2ff",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <div style={{ fontFamily: "monospace", marginBottom: "6px" }}>
              Path: [{step.path.join(", ")}]
            </div>
            <div style={{ fontFamily: "monospace", marginBottom: "6px" }}>
              Remaining: {step.remain}
            </div>
            <div style={{ fontFamily: "monospace" }}>
              Solutions: {result.map((x) => `[${x.join(", ")}]`).join(" ")}
            </div>
          </div>
        </AlgoVisualizer>
        <CodeBlock>
          {`function combinationSum(candidates, target) {
  const ans = [];
  const dfs = (start, remain, path) => {
    if (remain === 0) return ans.push([...path]);
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i], path); // reuse i
      path.pop();
    }
  };
  dfs(0, target, []);
  return ans;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default CombinationSumAlgo;
