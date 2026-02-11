import { useEffect, useMemo, useState } from "react";
import BinarySearchAlgo from "../components/1_Beginner_Algos/BinarySearchAlgo";
import BubbleSortAlgo from "../components/1_Beginner_Algos/BubbleSortAlgo";
import CountingSortAlgo from "../components/1_Beginner_Algos/CountingSortAlgo";
import EuclideanAlgorithmAlgo from "../components/1_Beginner_Algos/EuclideanAlgorithmAlgo";
import FibonacciSequenceIterativeAlgo from "../components/1_Beginner_Algos/FibonacciSequenceIterativeAlgo";
import GcdLcmAlgo from "../components/1_Beginner_Algos/GcdLcmAlgo";
import InsertionSortAlgo from "../components/1_Beginner_Algos/InsertionSortAlgo";
import LinearSearchAlgo from "../components/1_Beginner_Algos/LinearSearchAlgo";
import RodCuttingAlgo from "../components/1_Beginner_Algos/RodCuttingAlgo";
import SelectionSortAlgo from "../components/1_Beginner_Algos/SelectionSortAlgo";
import BfsAlgo from "../components/2_Intermediate_Algos/BfsAlgo";
import DijkstraAlgorithmAlgo from "../components/2_Intermediate_Algos/DijkstraAlgorithmAlgo";
import EditDistanceAlgo from "../components/2_Intermediate_Algos/EditDistanceAlgo";
import FloydWarshallAlgo from "../components/2_Intermediate_Algos/FloydWarshallAlgo";
import HamiltonianPathAlgo from "../components/2_Intermediate_Algos/HamiltonianPathAlgo";
import HeapSortAlgo from "../components/2_Intermediate_Algos/HeapSortAlgo";
import JobSequencingAlgo from "../components/2_Intermediate_Algos/JobSequencingAlgo";
import KmpAlgorithmAlgo from "../components/2_Intermediate_Algos/KmpAlgorithmAlgo";
import KnightsTourAlgo from "../components/2_Intermediate_Algos/KnightsTourAlgo";
import KnapsackAlgo from "../components/2_Intermediate_Algos/KnapsackAlgo";
import LevenshteinDistanceAlgo from "../components/2_Intermediate_Algos/LevenshteinDistanceAlgo";
import LongestCommonSubsequenceAlgo from "../components/2_Intermediate_Algos/LongestCommonSubsequenceAlgo";
import MatrixChainMultiplicationAlgo from "../components/2_Intermediate_Algos/MatrixChainMultiplicationAlgo";
import ModularExponentiationAlgo from "../components/2_Intermediate_Algos/ModularExponentiationAlgo";
import NQueensAlgo from "../components/2_Intermediate_Algos/NQueensAlgo";
import RabinKarpAlgorithmAlgo from "../components/2_Intermediate_Algos/RabinKarpAlgorithmAlgo";
import SudokuSolverAlgo from "../components/2_Intermediate_Algos/SudokuSolverAlgo";
import SuffixTreeConstructionAlgo from "../components/2_Intermediate_Algos/SuffixTreeConstructionAlgo";
import TrieOperationsAlgo from "../components/2_Intermediate_Algos/TrieOperationsAlgo";
import ZAlgorithmAlgo from "../components/2_Intermediate_Algos/ZAlgorithmAlgo";
import AvlTreeRotationsAlgo from "../components/3_Advanced_Algos/AvlTreeRotationsAlgo";
import ChineseRemainderTheoremAlgo from "../components/3_Advanced_Algos/ChineseRemainderTheoremAlgo";
import CombinationSumAlgo from "../components/3_Advanced_Algos/CombinationSumAlgo";
import DijkstraPriorityQueueAlgo from "../components/3_Advanced_Algos/DijkstraPriorityQueueAlgo";
import FenwickTreeAlgo from "../components/3_Advanced_Algos/FenwickTreeAlgo";
import FermatsTheoremAlgo from "../components/3_Advanced_Algos/FermatsTheoremAlgo";
import JohnsonsAlgorithmAlgo from "../components/3_Advanced_Algos/JohnsonsAlgorithmAlgo";
import KMeansClusteringAlgo from "../components/3_Advanced_Algos/KMeansClusteringAlgo";
import KaratsubaAlgorithmAlgo from "../components/3_Advanced_Algos/KaratsubaAlgorithmAlgo";
import KruskalDisjointSetAlgo from "../components/3_Advanced_Algos/KruskalDisjointSetAlgo";
import LowestCommonAncestorAlgo from "../components/3_Advanced_Algos/LowestCommonAncestorAlgo";
import LongestIncreasingSubsequenceAlgo from "../components/3_Advanced_Algos/LongestIncreasingSubsequenceAlgo";
import ManachersAlgorithmAlgo from "../components/3_Advanced_Algos/ManachersAlgorithmAlgo";
import MillerRabinAlgo from "../components/3_Advanced_Algos/MillerRabinAlgo";
import MinimumSpanningTreeAlgo from "../components/3_Advanced_Algos/MinimumSpanningTreeAlgo";
import KosarajuAlgorithmAlgo from "../components/3_Advanced_Algos/KosarajuAlgorithmAlgo";
import PagerankAlgorithmAlgo from "../components/3_Advanced_Algos/PagerankAlgorithmAlgo";
import PermutationGenerationAlgo from "../components/3_Advanced_Algos/PermutationGenerationAlgo";
import RedBlackTreeAlgo from "../components/3_Advanced_Algos/RedBlackTreeAlgo";
import SegmentTreeAlgo from "../components/3_Advanced_Algos/SegmentTreeAlgo";
import SieveOfEratosthenesAlgo from "../components/3_Advanced_Algos/SieveOfEratosthenesAlgo";
import SplayTreeAlgo from "../components/3_Advanced_Algos/SplayTreeAlgo";
import SubsetSumAlgo from "../components/3_Advanced_Algos/SubsetSumAlgo";
import SuffixArrayConstructionAlgo from "../components/3_Advanced_Algos/SuffixArrayConstructionAlgo";
import TarjanAlgorithmAlgo from "../components/3_Advanced_Algos/TarjanAlgorithmAlgo";
import IntervalSchedulingMaximizationAlgo from "../components/3_Advanced_Algos/IntervalSchedulingMaximizationAlgo";
import FftAlgo from "../components/3_Advanced_Algos/FftAlgo";
import AhoCorasickAlgo from "../components/4_10x_Dev_Algos/AhoCorasickAlgo";
import AlphaBetaPruningAlgo from "../components/4_10x_Dev_Algos/AlphaBetaPruningAlgo";
import BoyerMooreAlgo from "../components/4_10x_Dev_Algos/BoyerMooreAlgo";
import ConvexHullAlgo from "../components/4_10x_Dev_Algos/ConvexHullAlgo";
import DecisionTreeAlgo from "../components/4_10x_Dev_Algos/DecisionTreeAlgo";
import EggDroppingPuzzleAlgo from "../components/4_10x_Dev_Algos/EggDroppingPuzzleAlgo";
import FortuneAlgorithmAlgo from "../components/4_10x_Dev_Algos/FortuneAlgorithmAlgo";
import GeneticAlgorithmAlgo from "../components/4_10x_Dev_Algos/GeneticAlgorithmAlgo";
import GrahamScanAlgo from "../components/4_10x_Dev_Algos/GrahamScanAlgo";
import HamiltonianPathBacktrackingAlgo from "../components/4_10x_Dev_Algos/HamiltonianPathBacktrackingAlgo";
import JarvisMarchAlgo from "../components/4_10x_Dev_Algos/JarvisMarchAlgo";
import KmpAdvancedAlgo from "../components/4_10x_Dev_Algos/KmpAdvancedAlgo";
import LineIntersectionAlgo from "../components/4_10x_Dev_Algos/LineIntersectionAlgo";
import ManachersAdvancedAlgo from "../components/4_10x_Dev_Algos/ManachersAdvancedAlgo";
import MinimaxAlgo from "../components/4_10x_Dev_Algos/MinimaxAlgo";
import NQueensBacktrackingAlgo from "../components/4_10x_Dev_Algos/NQueensBacktrackingAlgo";
import NaiveBayesAlgo from "../components/4_10x_Dev_Algos/NaiveBayesAlgo";
import NeuralNetworkBackpropagationAlgo from "../components/4_10x_Dev_Algos/NeuralNetworkBackpropagationAlgo";
import PagerankAdvancedAlgo from "../components/4_10x_Dev_Algos/PagerankAdvancedAlgo";
import PcaAlgo from "../components/4_10x_Dev_Algos/PcaAlgo";
import RabinKarpHashingAlgo from "../components/4_10x_Dev_Algos/RabinKarpHashingAlgo";
import RandomForestAlgo from "../components/4_10x_Dev_Algos/RandomForestAlgo";
import RatInAMazeAlgo from "../components/4_10x_Dev_Algos/RatInAMazeAlgo";
import RungeKuttaAlgo from "../components/4_10x_Dev_Algos/RungeKuttaAlgo";
import SimpsonsRuleAlgo from "../components/4_10x_Dev_Algos/SimpsonsRuleAlgo";
import SpfaAlgorithmAlgo from "../components/4_10x_Dev_Algos/SpfaAlgorithmAlgo";
import SudokuSolverBacktrackingAlgo from "../components/4_10x_Dev_Algos/SudokuSolverBacktrackingAlgo";
import SvmAlgo from "../components/4_10x_Dev_Algos/SvmAlgo";
import TarjanSccAlgo from "../components/4_10x_Dev_Algos/TarjanSccAlgo";
import UkkonenSuffixTreeAlgo from "../components/4_10x_Dev_Algos/UkkonenSuffixTreeAlgo";
import VoronoiDiagramsAlgo from "../components/4_10x_Dev_Algos/VoronoiDiagramsAlgo";
import WordBreakDpAlgo from "../components/4_10x_Dev_Algos/WordBreakDpAlgo";
import ZAlgorithmAdvancedAlgo from "../components/4_10x_Dev_Algos/ZAlgorithmAdvancedAlgo";

const Home = () => {
  const sections = useMemo(
    () => [
      {
        title: "Beginner Algorithms",
        folder: "1_Beginner_Algos",
        items: [
          { id: "binary-search", label: "Binary Search", component: BinarySearchAlgo },
          { id: "bubble-sort", label: "Bubble Sort", component: BubbleSortAlgo },
          { id: "counting-sort", label: "Counting Sort", component: CountingSortAlgo },
          { id: "euclidean-algorithm", label: "Euclidean Algorithm", component: EuclideanAlgorithmAlgo },
          {
            id: "fibonacci-sequence",
            label: "Fibonacci Sequence (Iterative)",
            component: FibonacciSequenceIterativeAlgo,
            props: { endOnValue: 200 },
          },
          { id: "gcd-lcm", label: "GCD and LCM", component: GcdLcmAlgo },
          { id: "insertion-sort", label: "Insertion Sort", component: InsertionSortAlgo },
          { id: "linear-search", label: "Linear Search", component: LinearSearchAlgo },
          { id: "rod-cutting", label: "Rod Cutting", component: RodCuttingAlgo },
          { id: "selection-sort", label: "Selection Sort", component: SelectionSortAlgo },
        ],
      },
      {
        title: "Intermediate Algorithms",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "bfs", label: "BFS", component: BfsAlgo },
          { id: "dijkstra", label: "Dijkstra's Algorithm", component: DijkstraAlgorithmAlgo },
          { id: "edit-distance", label: "Edit Distance", component: EditDistanceAlgo },
          { id: "floyd-warshall", label: "Floyd-Warshall Algorithm", component: FloydWarshallAlgo },
          { id: "hamiltonian-path", label: "Hamiltonian Path", component: HamiltonianPathAlgo },
          { id: "heap-sort", label: "Heap Sort", component: HeapSortAlgo },
          { id: "job-sequencing", label: "Job Sequencing", component: JobSequencingAlgo },
          { id: "kmp", label: "KMP Algorithm", component: KmpAlgorithmAlgo },
          { id: "knights-tour", label: "Knight's Tour", component: KnightsTourAlgo },
          { id: "knapsack", label: "Knapsack Problem", component: KnapsackAlgo },
          { id: "levenshtein-distance", label: "Levenshtein Distance", component: LevenshteinDistanceAlgo },
          { id: "lcs", label: "Longest Common Subsequence", component: LongestCommonSubsequenceAlgo },
          { id: "matrix-chain-multiplication", label: "Matrix Chain Multiplication", component: MatrixChainMultiplicationAlgo },
          { id: "modular-exponentiation", label: "Modular Exponentiation", component: ModularExponentiationAlgo },
          { id: "n-queens", label: "N-Queens Problem", component: NQueensAlgo },
          { id: "rabin-karp", label: "Rabin-Karp Algorithm", component: RabinKarpAlgorithmAlgo },
          { id: "sudoku-solver", label: "Sudoku Solver", component: SudokuSolverAlgo },
          { id: "suffix-tree-construction", label: "Suffix Tree Construction", component: SuffixTreeConstructionAlgo },
          { id: "trie-operations", label: "Trie Operations", component: TrieOperationsAlgo },
          { id: "z-algorithm", label: "Z Algorithm", component: ZAlgorithmAlgo },
        ],
      },
      {
        title: "Advanced Algorithms",
        folder: "3_Advanced_Algos",
        items: [
          { id: "suffix-array-construction", label: "Suffix Array Construction", component: SuffixArrayConstructionAlgo },
          { id: "avl-tree-rotations", label: "AVL Tree Rotations", component: AvlTreeRotationsAlgo },
          { id: "red-black-tree", label: "Red-Black Tree Operations", component: RedBlackTreeAlgo },
          { id: "kruskal-disjoint-set", label: "Kruskal (Disjoint Set)", component: KruskalDisjointSetAlgo },
          { id: "minimum-spanning-tree", label: "Minimum Spanning Tree", component: MinimumSpanningTreeAlgo },
          { id: "k-means-clustering", label: "K-Means Clustering", component: KMeansClusteringAlgo },
          { id: "pagerank", label: "PageRank Algorithm", component: PagerankAlgorithmAlgo },
          { id: "dijkstra-priority-queue", label: "Dijkstra (Priority Queue)", component: DijkstraPriorityQueueAlgo },
          { id: "fenwick-tree", label: "Fenwick Tree", component: FenwickTreeAlgo },
          { id: "segment-tree", label: "Segment Tree", component: SegmentTreeAlgo },
          { id: "crt", label: "Chinese Remainder Theorem", component: ChineseRemainderTheoremAlgo },
          { id: "miller-rabin", label: "Miller-Rabin Primality Test", component: MillerRabinAlgo },
          { id: "fermats-theorem", label: "Fermat's Little Theorem", component: FermatsTheoremAlgo },
          { id: "sieve-of-eratosthenes", label: "Sieve of Eratosthenes", component: SieveOfEratosthenesAlgo },
          { id: "lis", label: "Longest Increasing Subsequence", component: LongestIncreasingSubsequenceAlgo },
          { id: "manachers-algorithm", label: "Manacher's Algorithm", component: ManachersAlgorithmAlgo },
          { id: "kosaraju-algorithm", label: "Kosaraju's Algorithm", component: KosarajuAlgorithmAlgo },
          { id: "tarjan-algorithm", label: "Tarjan's Algorithm", component: TarjanAlgorithmAlgo },
          { id: "johnsons-algorithm", label: "Johnson's Algorithm", component: JohnsonsAlgorithmAlgo },
          { id: "combination-sum", label: "Combination Sum", component: CombinationSumAlgo },
          { id: "fft", label: "FFT (Fast Fourier Transform)", component: FftAlgo },
          { id: "interval-scheduling-max", label: "Interval Scheduling Maximization", component: IntervalSchedulingMaximizationAlgo },
          { id: "karatsuba", label: "Karatsuba Multiplication", component: KaratsubaAlgorithmAlgo },
          { id: "lowest-common-ancestor", label: "Lowest Common Ancestor", component: LowestCommonAncestorAlgo },
          { id: "permutation-generation", label: "Permutation Generation", component: PermutationGenerationAlgo },
          { id: "splay-tree", label: "Splay Tree Operations", component: SplayTreeAlgo },
          { id: "subset-sum-advanced", label: "Subset Sum", component: SubsetSumAlgo },
        ],
      },
      {
        title: "10x Dev Algorithms",
        folder: "4_10x_Dev_Algos",
        items: [
          { id: "aho-corasick", label: "Aho-Corasick", component: AhoCorasickAlgo },
          { id: "alpha-beta-pruning", label: "Alpha-Beta Pruning", component: AlphaBetaPruningAlgo },
          { id: "boyer-moore", label: "Boyer-Moore", component: BoyerMooreAlgo },
          { id: "convex-hull", label: "Convex Hull", component: ConvexHullAlgo },
          { id: "decision-tree", label: "Decision Tree", component: DecisionTreeAlgo },
          { id: "egg-dropping-puzzle", label: "Egg Dropping Puzzle", component: EggDroppingPuzzleAlgo },
          { id: "fortune-algorithm", label: "Fortune's Algorithm", component: FortuneAlgorithmAlgo },
          { id: "genetic-algorithm", label: "Genetic Algorithm", component: GeneticAlgorithmAlgo },
          { id: "graham-scan", label: "Graham Scan", component: GrahamScanAlgo },
          { id: "hamiltonian-path-backtracking", label: "Hamiltonian Path (Backtracking)", component: HamiltonianPathBacktrackingAlgo },
          { id: "jarvis-march", label: "Jarvis March", component: JarvisMarchAlgo },
          { id: "kmp-advanced", label: "KMP (Advanced)", component: KmpAdvancedAlgo },
          { id: "line-intersection", label: "Line Intersection", component: LineIntersectionAlgo },
          { id: "manachers-advanced", label: "Manacher's (Advanced)", component: ManachersAdvancedAlgo },
          { id: "minimax", label: "Minimax", component: MinimaxAlgo },
          { id: "n-queens-backtracking", label: "N-Queens (Backtracking)", component: NQueensBacktrackingAlgo },
          { id: "naive-bayes", label: "Naive Bayes", component: NaiveBayesAlgo },
          { id: "neural-network-backprop", label: "Neural Network Backpropagation", component: NeuralNetworkBackpropagationAlgo },
          { id: "pagerank-advanced", label: "PageRank (Advanced)", component: PagerankAdvancedAlgo },
          { id: "pca", label: "PCA", component: PcaAlgo },
          { id: "rabin-karp-hashing", label: "Rabin-Karp (Hashing)", component: RabinKarpHashingAlgo },
          { id: "random-forest", label: "Random Forest", component: RandomForestAlgo },
          { id: "rat-in-a-maze", label: "Rat in a Maze", component: RatInAMazeAlgo },
          { id: "runge-kutta", label: "Runge-Kutta", component: RungeKuttaAlgo },
          { id: "simpsons-rule", label: "Simpson's Rule", component: SimpsonsRuleAlgo },
          { id: "spfa", label: "SPFA Algorithm", component: SpfaAlgorithmAlgo },
          { id: "sudoku-solver-backtracking", label: "Sudoku Solver (Backtracking)", component: SudokuSolverBacktrackingAlgo },
          { id: "svm", label: "SVM", component: SvmAlgo },
          { id: "tarjan-scc", label: "Tarjan SCC", component: TarjanSccAlgo },
          { id: "ukkonen-suffix-tree", label: "Ukkonen Suffix Tree", component: UkkonenSuffixTreeAlgo },
          { id: "voronoi-diagrams", label: "Voronoi Diagrams", component: VoronoiDiagramsAlgo },
          { id: "word-break-dp", label: "Word Break (DP)", component: WordBreakDpAlgo },
          { id: "z-algorithm-advanced", label: "Z Algorithm (Advanced)", component: ZAlgorithmAdvancedAlgo },
        ],
      },
    ],
    []
  );

  const allItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const [activeId, setActiveId] = useState(allItems[0]?.id ?? "");
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const getOffsetFromTop = () => {
      const nav = document.querySelector(".top-nav");
      const navTop = nav ? Number.parseFloat(window.getComputedStyle(nav).top || "0") || 0 : 0;
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      return navHeight + navTop + 16;
    };

    const getCurrentInViewId = () => {
      const positions = allItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          return { id: item.id, top: element.getBoundingClientRect().top };
        })
        .filter(Boolean);

      if (positions.length === 0) return "";

      const offsetFromTop = getOffsetFromTop();
      const passed = positions.filter((position) => position.top <= offsetFromTop);
      if (passed.length > 0) {
        return passed[passed.length - 1].id;
      }
      return positions[0].id;
    };

    const updateActiveFromScroll = () => {
      const nextId = getCurrentInViewId();
      if (nextId) {
        setActiveId((prev) => (prev === nextId ? prev : nextId));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    const onHashChange = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId) {
        setActiveId(hashId);
        setIsTocOpen(false);
      }
      updateActiveFromScroll();
    };

    onHashChange();
    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [allItems]);

  useEffect(() => {
    document.body.classList.toggle("toc-open", isTocOpen);
    return () => {
      document.body.classList.remove("toc-open");
    };
  }, [isTocOpen]);

  useEffect(() => {
    if (!isTocOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsTocOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isTocOpen]);

  const renderTocGroups = (onItemSelect) =>
    sections.map((section) => (
      <div key={`toc-${section.folder}`} className="toc-group">
        <p className="toc-group-title">{section.title}</p>
        {section.items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? "active" : ""}
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={onItemSelect ? () => onItemSelect(item.id) : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    ));

  return (
    <div className={`home-with-toc ${isTocOpen ? "toc-drawer-open" : ""}`}>
      <aside className="toc-sidebar toc-sidebar-desktop">
        <h3>Algorithms By Folder</h3>
        <nav aria-label="Algorithm table of contents">
          {renderTocGroups((id) => setActiveId(id))}
        </nav>
      </aside>

      <div className="home-layout">
        <button
          type="button"
          className="toc-mobile-trigger"
          onClick={() => setIsTocOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isTocOpen}
          aria-controls="mobile-toc-sidebar"
        >
          Browse Algorithms
        </button>

        <section className="hero-panel">
          <p className="hero-eyebrow">Algorithm Playground</p>
          <h2>Visualize how classic algorithms work step-by-step.</h2>
          <p>
            Explore searching, sorting, graph traversal, and dynamic programming with interactive
            animations.
          </p>
        </section>

        {sections.map((section) => (
          <section className="algo-section" key={section.title}>
            <h3>{section.title}</h3>
            <p
              style={{
                margin: "0 0 0.35rem",
                color: "#64748b",
                fontSize: "0.84rem",
                fontWeight: 600,
              }}
            >
              Folder: {section.folder}
            </p>
            {section.items.map((item) => {
              const AlgoComponent = item.component;
              return (
                <article id={item.id} key={item.id} className="algo-anchor-target">
                  <AlgoComponent {...(item.props ?? {})} />
                </article>
              );
            })}
          </section>
        ))}
      </div>

      <div
        className={`toc-mobile-overlay ${isTocOpen ? "open" : ""}`}
        onClick={() => setIsTocOpen(false)}
        aria-hidden={isTocOpen ? "false" : "true"}
      />
      <aside
        id="mobile-toc-sidebar"
        className={`toc-sidebar toc-sidebar-mobile ${isTocOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Algorithm navigation"
      >
        <div className="toc-mobile-header">
          <h3>Algorithms</h3>
          <button type="button" className="toc-mobile-close" onClick={() => setIsTocOpen(false)}>
            Close
          </button>
        </div>
        <nav aria-label="Algorithm table of contents">
          {renderTocGroups((id) => {
            setActiveId(id);
            setIsTocOpen(false);
          })}
        </nav>
      </aside>
    </div>
  );
} 

export default Home;
