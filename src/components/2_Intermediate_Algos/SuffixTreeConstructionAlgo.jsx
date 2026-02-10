import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const SuffixTreeConstructionAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const edgeList = listEdges(step.trie).slice(0, 28);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Suffix Tree Construction (Naive Suffix Trie View)</Title>
        <Para>Insert every suffix of a string. This visual shows the uncompressed suffix trie process.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <Para>Word: <strong>{WORD}</strong> | Current suffix: <strong>{step.suffix || "(none)"}</strong></Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", background: "#eef2ff", borderRadius: "12px", padding: "12px", maxWidth: "780px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
              {edgeList.map((edge, i) => (
                <div key={i} style={{ padding: "8px", borderRadius: "8px", background: "#fff", color: "#1e293b", fontFamily: "monospace", fontSize: "13px" }}>
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
