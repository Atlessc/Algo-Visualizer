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

export const PROJECT_FOLDERS = [
  "1_Beginner_Algos",
  "2_Intermediate_Algos",
  "3_Advanced_Algos",
  "4_10x_Dev_Algos",
];

export const PROJECT_FOLDER_LABELS = {
  "1_Beginner_Algos": "Beginner Algorithms",
  "2_Intermediate_Algos": "Intermediate Algorithms",
  "3_Advanced_Algos": "Advanced Algorithms",
  "4_10x_Dev_Algos": "10x Dev Algorithms",
};

export const ALGO_SECTIONS = [
  {
    folder: "1_Beginner_Algos",
    title: PROJECT_FOLDER_LABELS["1_Beginner_Algos"],
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
    folder: "2_Intermediate_Algos",
    title: PROJECT_FOLDER_LABELS["2_Intermediate_Algos"],
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
      { id: "sudoku-solver", label: "Sudoku Solver", component: SudokuSolverAlgo, props: { autoPlayOnMobile: true } },
      { id: "suffix-tree-construction", label: "Suffix Tree Construction", component: SuffixTreeConstructionAlgo },
      { id: "trie-operations", label: "Trie Operations", component: TrieOperationsAlgo },
      { id: "z-algorithm", label: "Z Algorithm", component: ZAlgorithmAlgo },
    ],
  },
  {
    folder: "3_Advanced_Algos",
    title: PROJECT_FOLDER_LABELS["3_Advanced_Algos"],
    items: [
      { id: "minimum-spanning-tree", label: "Minimum Spanning Tree", component: MinimumSpanningTreeAlgo },
      { id: "interval-scheduling-max", label: "Interval Scheduling Maximization", component: IntervalSchedulingMaximizationAlgo },
      { id: "lis", label: "Longest Increasing Subsequence", component: LongestIncreasingSubsequenceAlgo },
      { id: "manachers-algorithm", label: "Manacher's Algorithm", component: ManachersAlgorithmAlgo },
      { id: "pagerank", label: "PageRank Algorithm", component: PagerankAlgorithmAlgo },
      { id: "fenwick-tree", label: "Fenwick Tree", component: FenwickTreeAlgo },
      { id: "segment-tree", label: "Segment Tree", component: SegmentTreeAlgo },
      { id: "subset-sum-advanced", label: "Subset Sum", component: SubsetSumAlgo },
      { id: "suffix-array-construction", label: "Suffix Array Construction", component: SuffixArrayConstructionAlgo },
      { id: "combination-sum", label: "Combination Sum", component: CombinationSumAlgo },
      { id: "dijkstra-priority-queue", label: "Dijkstra (Priority Queue)", component: DijkstraPriorityQueueAlgo },
      { id: "karatsuba", label: "Karatsuba Multiplication", component: KaratsubaAlgorithmAlgo },
      { id: "fermats-theorem", label: "Fermat's Little Theorem", component: FermatsTheoremAlgo },
      { id: "kruskal-disjoint-set", label: "Kruskal (Disjoint Set)", component: KruskalDisjointSetAlgo },
      { id: "kosaraju-algorithm", label: "Kosaraju's Algorithm", component: KosarajuAlgorithmAlgo },
      { id: "permutation-generation", label: "Permutation Generation", component: PermutationGenerationAlgo },
      { id: "tarjan-algorithm", label: "Tarjan's Algorithm", component: TarjanAlgorithmAlgo },
      { id: "crt", label: "Chinese Remainder Theorem", component: ChineseRemainderTheoremAlgo },
      { id: "lowest-common-ancestor", label: "Lowest Common Ancestor", component: LowestCommonAncestorAlgo },
      { id: "miller-rabin", label: "Miller-Rabin Primality Test", component: MillerRabinAlgo },
      { id: "sieve-of-eratosthenes", label: "Sieve of Eratosthenes", component: SieveOfEratosthenesAlgo },
      { id: "avl-tree-rotations", label: "AVL Tree Rotations", component: AvlTreeRotationsAlgo },
      { id: "k-means-clustering", label: "K-Means Clustering", component: KMeansClusteringAlgo },
      { id: "red-black-tree", label: "Red-Black Tree Operations", component: RedBlackTreeAlgo },
      { id: "splay-tree", label: "Splay Tree Operations", component: SplayTreeAlgo },
      { id: "johnsons-algorithm", label: "Johnson's Algorithm", component: JohnsonsAlgorithmAlgo },
      { id: "fft", label: "FFT (Fast Fourier Transform)", component: FftAlgo },
    ],
  },
  {
    folder: "4_10x_Dev_Algos",
    title: PROJECT_FOLDER_LABELS["4_10x_Dev_Algos"],
    items: [{ id: "aho-corasick", label: "Aho-Corasick", component: AhoCorasickAlgo }],
  },
];

export const ALGO_ITEMS = ALGO_SECTIONS.flatMap((section) => section.items);
