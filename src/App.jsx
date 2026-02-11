import { useEffect } from 'react';
import useStore from './ZustandStore.js';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const setWindowWidth = useStore((state) => state.setWindowWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Initial call to set the width
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWindowWidth]);

  return (
    <div className="app-shell">
      <div className="app-glow app-glow-left" />
      <div className="app-glow app-glow-right" />
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
