import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const ITEMS = ["A", "B", "C"];

const buildSteps = () => {
  const used = Array(ITEMS.length).fill(false);
  const path = [];
  const result = [];
  const steps = [];

  const dfs = () => {
    steps.push({ path: [...path], used: [...used], msg: "Explore branch." });
    if (path.length === ITEMS.length) {
      result.push([...path]);
      steps.push({ path: [...path], used: [...used], msg: `Permutation found: ${path.join("")}` });
      return;
    }
    for (let i = 0; i < ITEMS.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(ITEMS[i]);
      dfs();
      path.pop();
      used[i] = false;
      steps.push({ path: [...path], used: [...used], msg: `Backtrack from ${ITEMS[i]}.` });
    }
  };
  dfs();
  steps.push({ path: [], used: [...used], result, msg: "All permutations generated." });
  return { steps, result };
};

const PermutationGenerationAlgo = () => {
  const { steps, result } = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 550);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Permutation Generation</Title>
        <Para>
          Permutation generation uses backtracking to enumerate all orderings of a set. At each
          level, pick an unused element, recurse, then backtrack. For n elements, there are n!
          permutations.
        </Para>
        <Para>Items: [{ITEMS.join(", ")}] | {step.msg}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto", display: "grid", gap: "10px" }}>
            <div style={{ background: "#eef2ff", borderRadius: "12px", padding: "12px" }}>
              <div style={{ fontFamily: "monospace", marginBottom: "6px" }}>Current path: [{step.path.join(", ")}]</div>
              <div style={{ fontFamily: "monospace" }}>
                Used flags: [{step.used.map((x) => (x ? "1" : "0")).join(", ")}]
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", fontFamily: "monospace" }}>
              Results: {result.map((r) => `[${r.join(", ")}]`).join(" ")}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function permute(arr) {
  const ans = [];
  const used = Array(arr.length).fill(false);
  const path = [];
  const dfs = () => {
    if (path.length === arr.length) return ans.push([...path]);
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(arr[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return ans;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default PermutationGenerationAlgo;
