import BinarySearchAlgo from "../components/1_Beginner_Algos/BinarySearchAlgo";
import BubbleSortAlgo from "../components/1_Beginner_Algos/BubbleSortAlgo";
import CountingSortAlgo from "../components/1_Beginner_Algos/CountingSortAlgo";
import EuclideanAlgorithmAlgo from "../components/1_Beginner_Algos/EuclideanAlgorithmAlgo";
import FibonacciSequenceIterativeAlgo from "../components/1_Beginner_Algos/FibonacciSequenceIterativeAlgo";

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
    }}>
      <BinarySearchAlgo />
      <BubbleSortAlgo />
      <CountingSortAlgo />
      <EuclideanAlgorithmAlgo />
      <FibonacciSequenceIterativeAlgo endOnValue={200} />
    </div>
  );
} 

export default Home;
