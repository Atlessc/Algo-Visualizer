
import React from 'react';
import useStore from './ZustandStore.js';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BinarySearchAlgo from "./components/1_Beginner_Algos/BinarySearchAlgo";

function App() {
  const stateName = useStore((state) => state.stateName);
  const setStateName = useStore((state) => state.setStateName);

  return (
    <div>
      <NavBar />
      <Routes>
        {/* Define your routes here */}
        {/* Example Route: <Route path="/" element={<Home />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<BinarySearchAlgo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
