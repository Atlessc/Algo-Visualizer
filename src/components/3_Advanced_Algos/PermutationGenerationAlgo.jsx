import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

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

const PermutationGenerationAlgo = ({ autoPlay = true, compact = false }) => {
  const { steps, result } = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

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
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className="mx-auto grid w-full max-w-190 gap-2.5">
            <div className="rounded-xl bg-indigo-100 p-3">
              <div className={cn("mb-1.5 font-mono", compact ? "text-xs" : "text-sm")}>Current path: [{step.path.join(", ")}]</div>
              <div className={cn("font-mono", compact ? "text-xs" : "text-sm")}>
                Used flags: [{step.used.map((x) => (x ? "1" : "0")).join(", ")}]
              </div>
            </div>
            <div className={cn("rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono", compact ? "text-xs" : "text-sm")}>
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
