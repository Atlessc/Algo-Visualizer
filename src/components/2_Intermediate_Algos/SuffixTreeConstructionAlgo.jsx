import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const WORD = "banana$";

const newNode = () => ({ children: {}, terminal: false });

const buildSteps = () => {
  const root = newNode();
  const steps = [{ trie: JSON.parse(JSON.stringify(root)), suffix: "", message: "Start with empty root." }];

  for (let i = 0; i < WORD.length; i++) {
    const suffix = WORD.slice(i);
    let cur = root;
    for (const ch of suffix) {
      if (!cur.children[ch]) cur.children[ch] = newNode();
      cur = cur.children[ch];
    }
    cur.terminal = true;
    steps.push({
      trie: JSON.parse(JSON.stringify(root)),
      suffix,
      message: `Insert suffix "${suffix}" into suffix trie.`,
    });
  }
  return steps;
};

const listEdges = (node, prefix = "", out = []) => {
  Object.keys(node.children).forEach((ch) => {
    const nextPrefix = `${prefix}${ch}`;
    out.push(nextPrefix);
    listEdges(node.children[ch], nextPrefix, out);
  });
  return out;
};

const SuffixTreeConstructionAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const edgeList = listEdges(step.trie).slice(0, 28);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Suffix Tree Construction (Naive Suffix Trie View)</Title>
        <Para>
          This visual builds a suffix trie by inserting every suffix of the word. The idea shows how
          shared prefixes compact repeated structure and enable fast substring-style lookups.
        </Para>
        <Para>{step.message}</Para>
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
        <Para>Word: <strong>{WORD}</strong> | Current suffix: <strong>{step.suffix || "(none)"}</strong></Para>

        <AlgoVisualizer>
          <div className="mx-auto w-full max-w-[780px] rounded-xl bg-indigo-100 p-3">
            <div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-[repeat(auto-fit,minmax(130px,1fr))]")}>
              {edgeList.map((edge, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-lg bg-white px-2 py-2 font-mono text-slate-800",
                    compact ? "text-xs" : "text-[13px]"
                  )}
                >
                  {edge}
                </div>
              ))}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function buildSuffixTrie(s) {
  const root = {};
  for (let i = 0; i < s.length; i++) {
    let node = root;
    for (let j = i; j < s.length; j++) {
      const ch = s[j];
      node[ch] ??= {};
      node = node[ch];
    }
    node.$ = true;
  }
  return root;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SuffixTreeConstructionAlgo;
