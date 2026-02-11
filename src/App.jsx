import { useEffect, useState } from 'react';
import useStore from './ZustandStore.js';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const setWindowWidth = useStore((state) => state.setWindowWidth);
  const location = useLocation();
  const [isAlgorithmsOpen, setIsAlgorithmsOpen] = useState(false);
  const isHomeRoute = location.pathname === "/";

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

  useEffect(() => {
    setIsAlgorithmsOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-screen-xl overflow-x-clip px-3 pb-8 pt-4 sm:px-6 sm:pb-10">
      <div className="pointer-events-none fixed -left-24 -top-14 -z-10 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none fixed -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-teal-500/25 blur-3xl sm:h-80 sm:w-80" />
      <NavBar
        showAlgorithmsButton={isHomeRoute}
        onOpenAlgorithms={() => setIsAlgorithmsOpen(true)}
      />
      <main className="flex flex-col gap-4 sm:gap-5">
        <Routes>
          <Route
            path="/"
            element={<Home isTocOpen={isAlgorithmsOpen} setIsTocOpen={setIsAlgorithmsOpen} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
