export const LEARNING_DEPTHS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const LEARNING_SECTIONS = [
  { id: "whatItIs", title: "What it is" },
  { id: "whenToUse", title: "When to use" },
  { id: "stepByStep", title: "Step-by-step" },
  { id: "complexity", title: "Complexity" },
  { id: "commonMistakes", title: "Common mistakes" },
  { id: "realWorldUse", title: "Real-world use" },
];

const DEFAULT_TOPIC_GUIDANCE = {
  whenToUse:
    "Use this when you need a repeatable process with clear state transitions and predictable correctness.",
  commonMistakes:
    "Skipping edge cases, forgetting base conditions, and not validating intermediate state.",
  realWorldUse:
    "Common in production systems where data must be processed consistently under constraints.",
};

const TOPIC_GUIDANCE = {
  Backtracking: {
    whenToUse:
      "Use this when you must explore many candidate paths and prune invalid choices early.",
    commonMistakes:
      "Failing to undo state during backtracking, which leaks decisions into later branches.",
    realWorldUse:
      "Constraint-solving tasks such as puzzle engines, scheduling, and search-space exploration.",
  },
  "Data Structures": {
    whenToUse:
      "Use this when repeated updates and queries need to stay fast as input size grows.",
    commonMistakes:
      "Using the wrong structure for workload shape, leading to avoidable time and memory overhead.",
    realWorldUse:
      "Indexing, caching, ranking, and real-time analytics where query/update balance matters.",
  },
  "Divide and Conquer": {
    whenToUse:
      "Use this when a problem can be split into independent subproblems and recombined efficiently.",
    commonMistakes:
      "Uneven splits or expensive merge steps that erase the expected performance gain.",
    realWorldUse:
      "Large-scale transforms, multiplications, and recursive optimization pipelines.",
  },
  "Dynamic Programming": {
    whenToUse:
      "Use this when overlapping subproblems appear and storing partial answers avoids repeated work.",
    commonMistakes:
      "Wrong state definition or transition order, which breaks correctness or wastes memory.",
    realWorldUse:
      "Routing, sequence alignment, pricing optimizations, and resource planning.",
  },
  Graphs: {
    whenToUse:
      "Use this when entities and relationships are more important than simple linear order.",
    commonMistakes:
      "Choosing the wrong traversal strategy or ignoring graph assumptions like edge weights.",
    realWorldUse:
      "Maps, social networks, recommendation systems, dependency analysis, and traffic routing.",
  },
  Greedy: {
    whenToUse:
      "Use this when local best choices are proven to lead to a globally optimal solution.",
    commonMistakes:
      "Applying greedy logic where optimal-substructure proof does not hold.",
    realWorldUse:
      "Scheduling, interval packing, prioritization, and cost-minimization heuristics.",
  },
  "Machine Learning": {
    whenToUse:
      "Use this when patterns must be learned from data rather than encoded with fixed rules.",
    commonMistakes:
      "Overfitting to small samples and evaluating models without proper validation.",
    realWorldUse:
      "Prediction, classification, anomaly detection, and personalization engines.",
  },
  "Number Theory": {
    whenToUse:
      "Use this for arithmetic-heavy tasks where modular properties or integer behavior are central.",
    commonMistakes:
      "Mishandling overflow, modular arithmetic rules, or edge values like zero and one.",
    realWorldUse:
      "Cryptography, checksums, primality testing, and deterministic key operations.",
  },
  Searching: {
    whenToUse:
      "Use this when the primary goal is locating a value or condition quickly in existing data.",
    commonMistakes:
      "Ignoring input prerequisites such as sorting assumptions and boundary checks.",
    realWorldUse:
      "Database lookups, autocomplete, diagnostics, and retrieval APIs.",
  },
  Sorting: {
    whenToUse:
      "Use this when downstream operations become simpler or faster once data is ordered.",
    commonMistakes:
      "Selecting a sort that performs poorly for current data shape or memory constraints.",
    realWorldUse:
      "Ranking, report generation, timeline rendering, and pre-processing for search.",
  },
  Strings: {
    whenToUse:
      "Use this when matching, indexing, or comparing text patterns at scale is the core task.",
    commonMistakes:
      "Off-by-one index errors and failing to distinguish preprocessing from matching work.",
    realWorldUse:
      "Log scanning, search engines, DNA sequence analysis, and content moderation.",
  },
  Trees: {
    whenToUse:
      "Use this when data is hierarchical or when balanced branching improves query/update speed.",
    commonMistakes:
      "Breaking structural invariants during insert/delete operations.",
    realWorldUse:
      "File systems, database indexes, compiler syntax trees, and policy evaluation trees.",
  },
};

const ALGO_LEARNING_OVERRIDES = {
  dijkstra: {
    beginner: {
      commonMistakes:
        "Using Dijkstra on graphs with negative edge weights. Dijkstra assumes non-negative weights to stay correct.",
    },
    advanced: {
      complexity:
        "With a binary heap, runtime is typically O((V + E) log V). Pairing/Fibonacci heaps can improve theoretical bounds but may not improve practical constants.",
    },
  },
  "quick-sort": {
    beginner: {
      commonMistakes:
        "Choosing a bad pivot repeatedly, which can degrade performance toward O(n^2).",
    },
  },
  "sudoku-solver": {
    beginner: {
      stepByStep:
        "Pick an empty cell, try candidates that satisfy row/column/box rules, move forward if valid, and backtrack immediately when a contradiction appears.",
      realWorldUse:
        "Constraint-solving problems where choices must satisfy multiple simultaneous rules.",
    },
    advanced: {
      complexity:
        "Backtracking is exponential in the worst case, but constraint propagation and smart candidate ordering dramatically reduce practical search depth.",
    },
  },
  "alpha-beta-pruning": {
    beginner: {
      whatItIs:
        "Alpha-beta pruning is an optimization of minimax that avoids exploring branches that cannot change the final decision.",
    },
    advanced: {
      stepByStep:
        "Track alpha (best guaranteed score for maximizer) and beta (best guaranteed score for minimizer). Cut a branch as soon as alpha >= beta because it cannot improve the parent decision.",
    },
  },
};

function getTopicGuidance(topic) {
  return TOPIC_GUIDANCE[topic] ?? DEFAULT_TOPIC_GUIDANCE;
}

function normalizeComplexityNarrative(timeComplexity) {
  if (!timeComplexity || timeComplexity === "Varies") {
    return "Practical performance depends on implementation details and input shape.";
  }

  if (/^O\(/.test(timeComplexity)) {
    return "As input grows, runtime follows this asymptotic bound under standard assumptions.";
  }

  if (/exponential/i.test(timeComplexity)) {
    return "Runtime can grow rapidly with input size, so pruning and heuristics are critical.";
  }

  if (/iterative/i.test(timeComplexity)) {
    return "Cost depends on convergence speed and stopping criteria, not a single fixed pass.";
  }

  if (/probabilistic/i.test(timeComplexity)) {
    return "The guarantee is statistical, trading deterministic certainty for speed.";
  }

  if (/pseudo/i.test(timeComplexity)) {
    return "Runtime depends on numeric magnitude in addition to item count.";
  }

  return "Use this as a practical complexity descriptor when comparing algorithm options.";
}

function buildBeginnerContent(algo, topicGuidance) {
  return {
    whatItIs: `${algo.label} is a ${algo.topic.toLowerCase()} algorithm that works over ${algo.dataStructure.toLowerCase()} input.`
      + " The visualizer shows each state change so you can see how the final result is built.",
    whenToUse: topicGuidance.whenToUse,
    stepByStep:
      "Prepare the input, apply the algorithm rule one step at a time, update state after each step, and stop when the goal condition is met.",
    complexity:
      `Typical runtime is ${algo.timeComplexity}. ${normalizeComplexityNarrative(algo.timeComplexity)}`,
    commonMistakes: topicGuidance.commonMistakes,
    realWorldUse: topicGuidance.realWorldUse,
  };
}

function buildIntermediateContent(algo, topicGuidance) {
  return {
    whatItIs:
      `${algo.label} uses structured state transitions to preserve correctness while improving efficiency for ${algo.topic.toLowerCase()} problems.`
      + ` It is usually paired with ${algo.dataStructure.toLowerCase()} operations that control cost per step.`,
    whenToUse:
      `${topicGuidance.whenToUse} Choose it when you can justify its assumptions and data-shape fit better than simpler alternatives.`,
    stepByStep:
      "Define invariant state, execute the core transition repeatedly, validate that each transition preserves the invariant, and terminate on a proven completion condition.",
    complexity:
      `Time complexity is ${algo.timeComplexity}; evaluate this together with memory behavior and constant factors from the underlying data structure.`,
    commonMistakes:
      `${topicGuidance.commonMistakes} Another common issue is mixing visualization order with logical update order, which hides bugs until larger inputs.`,
    realWorldUse:
      `${topicGuidance.realWorldUse} Teams often pair it with instrumentation to verify correctness and latency under production traffic.`,
  };
}

function buildAdvancedContent(algo, topicGuidance) {
  return {
    whatItIs:
      `${algo.label} is best understood through invariants, transition proofs, and boundary-condition handling.`
      + ` Its behavior is tightly coupled to ${algo.dataStructure.toLowerCase()} semantics and operation costs.`,
    whenToUse:
      `Use this when workload constraints demand predictable asymptotic behavior and you can formally validate assumptions behind the approach. ${topicGuidance.whenToUse}`,
    stepByStep:
      "Model state formally, prove transition safety, quantify branching or relaxation impact per iteration, and validate termination/correctness against adversarial inputs.",
    complexity:
      `Baseline complexity: ${algo.timeComplexity}. In practice, evaluate cache behavior, branch patterns, and data distribution because they can dominate observed runtime at scale.`,
    commonMistakes:
      `${topicGuidance.commonMistakes} Also watch for silent invariant violations caused by in-place mutations or stale auxiliary structures.`,
    realWorldUse:
      `${topicGuidance.realWorldUse} In high-scale systems, this is usually embedded inside larger pipelines where observability and guardrails are as important as raw complexity.`,
  };
}

function mergeSectionContent(base, override) {
  return LEARNING_SECTIONS.reduce((acc, section) => {
    acc[section.id] = override?.[section.id] ?? base[section.id] ?? "";
    return acc;
  }, {});
}

export function getLearningFlowForAlgorithm(algo) {
  if (!algo) {
    return LEARNING_DEPTHS.reduce((acc, depth) => {
      acc[depth.id] = LEARNING_SECTIONS.reduce((sectionAcc, section) => {
        sectionAcc[section.id] = "";
        return sectionAcc;
      }, {});
      return acc;
    }, {});
  }

  const topicGuidance = getTopicGuidance(algo.topic);
  const defaultByDepth = {
    beginner: buildBeginnerContent(algo, topicGuidance),
    intermediate: buildIntermediateContent(algo, topicGuidance),
    advanced: buildAdvancedContent(algo, topicGuidance),
  };

  const overrides = ALGO_LEARNING_OVERRIDES[algo.id] ?? {};

  return LEARNING_DEPTHS.reduce((acc, depth) => {
    acc[depth.id] = mergeSectionContent(defaultByDepth[depth.id], overrides[depth.id]);
    return acc;
  }, {});
}
