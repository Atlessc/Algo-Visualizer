import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __filename and __dirname to ESM equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the root directory for the components
const rootDir = path.join(__dirname, 'src', 'components');

// Function to convert algorithm names to Title format (e.g., "LinearSearchAlgo" to "Linear Search Algo")
const toTitleCase = (str) => {
  return str.replace(/([A-Z])/g, ' $1').trim();
};

// Define the structure based on the list
const structure = {
  "1_Beginner_Algos": [
    "LinearSearchAlgo",
    "BubbleSortAlgo",
    "BinarySearchAlgo",
    "SelectionSortAlgo",
    "InsertionSortAlgo",
    "FibonacciSequenceIterativeAlgo",
    "CountingSortAlgo",
    "EuclideanAlgorithmAlgo",
    "GcdLcmAlgo",
    "RodCuttingAlgo"
  ],
  "2_Intermediate_Algos": [
    "MergeSortAlgo",
    "QuickSortAlgo",
    "DfsAlgo",
    "BfsAlgo",
    "KruskalAlgorithmAlgo",
    "PrimAlgorithmAlgo",
    "DijkstraAlgorithmAlgo",
    "MatrixChainMultiplicationAlgo",
    "LongestCommonSubsequenceAlgo",
    "FloydWarshallAlgo",
    "KmpAlgorithmAlgo",
    "RabinKarpAlgorithmAlgo",
    "SuffixTreeConstructionAlgo",
    "TrieOperationsAlgo",
    "BinarySearchTreeAlgo",
    "NQueensAlgo",
    "SudokuSolverAlgo",
    "BellmanFordAlgo",
    "AStarSearchAlgo",
    "EditDistanceAlgo",
    "HeapSortAlgo",
    "ActivitySelectionAlgo",
    "JobSequencingAlgo",
    "CoinChangeAlgo",
    "KnapsackAlgo",
    "HamiltonianPathAlgo",
    "KnightsTourAlgo",
    "ZAlgorithmAlgo",
    "ModularExponentiationAlgo",
    "LevenshteinDistanceAlgo"
  ],
  "3_Advanced_Algos": [
    "SuffixArrayConstructionAlgo",
    "AvlTreeRotationsAlgo",
    "RedBlackTreeAlgo",
    "KruskalDisjointSetAlgo",
    "MinimumSpanningTreeAlgo",
    "KMeansClusteringAlgo",
    "PagerankAlgorithmAlgo",
    "DijkstraPriorityQueueAlgo",
    "ManachersAlgorithmAlgo",
    "ChineseRemainderTheoremAlgo",
    "MillerRabinAlgo",
    "FermatsTheoremAlgo",
    "SieveOfEratosthenesAlgo",
    "SegmentTreeAlgo",
    "FenwickTreeAlgo",
    "LowestCommonAncestorAlgo",
    "SplayTreeAlgo",
    "TarjanAlgorithmAlgo",
    "KosarajuAlgorithmAlgo",
    "JohnsonsAlgorithmAlgo",
    "LongestIncreasingSubsequenceAlgo",
    "FftAlgo",
    "KaratsubaAlgorithmAlgo",
    "SubsetSumAlgo",
    "IntervalSchedulingMaximizationAlgo",
    "CombinationSumAlgo",
    "PermutationGenerationAlgo"
  ],
  "4_10x_Dev_Algos": [
    "NeuralNetworkBackpropagationAlgo",
    "GeneticAlgorithmAlgo",
    "SvmAlgo",
    "RandomForestAlgo",
    "PcaAlgo",
    "DecisionTreeAlgo",
    "NaiveBayesAlgo",
    "PagerankAdvancedAlgo",
    "SpfaAlgorithmAlgo",
    "TarjanSccAlgo",
    "AhoCorasickAlgo",
    "UkkonenSuffixTreeAlgo",
    "BoyerMooreAlgo",
    "KmpAdvancedAlgo",
    "RabinKarpHashingAlgo",
    "ZAlgorithmAdvancedAlgo",
    "ManachersAdvancedAlgo",
    "HamiltonianPathBacktrackingAlgo",
    "NQueensBacktrackingAlgo",
    "SudokuSolverBacktrackingAlgo",
    "RatInAMazeAlgo",
    "WordBreakDpAlgo",
    "EggDroppingPuzzleAlgo",
    "MinimaxAlgo",
    "AlphaBetaPruningAlgo",
    "ConvexHullAlgo",
    "GrahamScanAlgo",
    "JarvisMarchAlgo",
    "VoronoiDiagramsAlgo",
    "FortuneAlgorithmAlgo",
    "LineIntersectionAlgo",
    "SimpsonsRuleAlgo",
    "RungeKuttaAlgo"
  ]
};

// Function to generate boilerplate code
const generateBoilerplate = (algoName) => {
  const algoTitleName = toTitleCase(algoName);
  return `import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock
} from "../../Styled Components/styledComponents";

import React from "react";
import useStore from "../../ZustandStore";

const ${algoName} = () => {
  return (
    <Container>
      <CardContainer>
        <Title>${algoTitleName}</Title>
        <AlgoVisualizer>
        </AlgoVisualizer>
          <CodeBlock>
            { \` \` }
          </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ${algoName};`;
};

// Create the folders and files with boilerplate content
Object.keys(structure).forEach(folder => {
  const folderPath = path.join(rootDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
  
  structure[folder].forEach(algoName => {
    const filePath = path.join(folderPath, `${algoName}.jsx`);
    if (!fs.existsSync(filePath)) {
      const boilerplate = generateBoilerplate(algoName);
      fs.writeFileSync(filePath, boilerplate);
      console.log(`Created file: ${filePath} with boilerplate content`);
    }
  });
});

console.log('Folders and files with boilerplate created successfully.');
