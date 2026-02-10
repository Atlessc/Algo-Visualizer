import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const WORDS = ["cat", "car", "cart", "dog", "dove"];

const makeNode = () => ({ children: {}, isWord: false });

const buildTrie = (words) => {
  const root = makeNode();
  words.forEach((word) => {
    let cur = root;
    for (const ch of word) {
      if (!cur.children[ch]) cur.children[ch] = makeNode();
      cur = cur.children[ch];
    }
    cur.isWord = true;
  });
  return root;
};

const traversePrefix = (trie, query) => {
  let cur = trie;
  const path = [];
  for (const ch of query) {
    if (!cur.children[ch]) return { foundPrefix: false, foundWord: false, path };
    cur = cur.children[ch];
    path.push(ch);
  }
  return { foundPrefix: true, foundWord: cur.isWord, path };
};

const collectBranches = (node, prefix = "", out = []) => {
  Object.entries(node.children).forEach(([ch, child]) => {
    const next = prefix + ch;
    out.push({ text: next, word: child.isWord });
    collectBranches(child, next, out);
  });
  return out;
};

const TrieOperationsAlgo = () => {
  const trie = useMemo(() => buildTrie(WORDS), []);
  const [query, setQuery] = useState("car");
  const result = traversePrefix(trie, query);
  const branches = collectBranches(trie);

  return (
    <Container>
      <CardContainer>
        <Title>Trie Operations</Title>
        <Para>Trie supports efficient insert/search/prefix checks by sharing common prefixes.</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} style={{ width: "180px" }} />
        </div>
        <Para>
          Prefix exists: <strong>{result.foundPrefix ? "Yes" : "No"}</strong> | Exact word:{" "}
          <strong>{result.foundWord ? "Yes" : "No"}</strong>
        </Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "820px", margin: "0 auto", display: "grid", gap: "10px" }}>
            <div style={{ background: "#eef2ff", borderRadius: "12px", padding: "10px", display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              {WORDS.map((w) => (
                <span key={w} style={{ background: "#334155", color: "#fff", padding: "6px 10px", borderRadius: "999px", fontSize: "12px" }}>
                  {w}
                </span>
              ))}
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "8px" }}>
              {branches.map((b, i) => {
                const active = query && b.text.startsWith(query) ? "#0ea5e9" : result.path.join("") === b.text ? "#f59e0b" : "#fff";
                return (
                  <div key={i} style={{ borderRadius: "8px", padding: "8px", background: active, color: active === "#fff" ? "#1e293b" : "#fff", fontFamily: "monospace", fontSize: "13px", fontWeight: 600 }}>
                    {b.text}{b.word ? " *" : ""}
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`class TrieNode {
  constructor() { this.children = {}; this.isWord = false; }
}

function insert(root, word) {
  let node = root;
  for (const ch of word) {
    node.children[ch] ??= new TrieNode();
    node = node.children[ch];
  }
  node.isWord = true;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default TrieOperationsAlgo;
