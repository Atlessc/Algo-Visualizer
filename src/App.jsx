import React, { useEffect } from 'react';
import useStore from './ZustandStore.js';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const windowWidth = useStore((state) => state.windowWidth);
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      margin: '0 auto',
      width: 'clamp(300px, 100%, 800px)',
    }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
