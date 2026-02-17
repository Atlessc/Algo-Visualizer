import { useEffect, useState } from 'react';
import useStore from './ZustandStore.js';
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigationUx } from "./context/useNavigationUx";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import About from "./pages/About";
import AlgorithmsCatalog from "./pages/AlgorithmsCatalog";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import NavBar from "./components/NavBar";
import CommandPalette from "./components/CommandPalette";
import StickyTopControls from "./components/StickyTopControls";
import MobileQuickActions from "./components/MobileQuickActions";
import Footer from "./components/Footer";

function App() {
  const setWindowWidth = useStore((state) => state.setWindowWidth);
  const { openCommandPalette, isVisualizerRoute } = useNavigationUx();
  const location = useLocation();
  const [isAlgorithmsOpen, setIsAlgorithmsOpen] = useState(false);
  const isLegacyHomeRoute = location.pathname === "/legacy-home";
  const showAlgorithmsDrawerButton = isLegacyHomeRoute;
  const algorithmsPanelId = "mobile-toc-sidebar";

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
    <div className="relative mx-auto min-h-screen w-full max-w-7xl overflow-x-clip px-3 pb-20 pt-4 sm:px-6 sm:pb-10">
      <div className="pointer-events-none fixed -left-24 -top-14 -z-10 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none fixed -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-teal-500/25 blur-3xl sm:h-80 sm:w-80" />
      <NavBar
        showAlgorithmsButton={showAlgorithmsDrawerButton}
        isAlgorithmsOpen={isAlgorithmsOpen}
        onOpenAlgorithms={() => setIsAlgorithmsOpen(true)}
        onOpenCommand={openCommandPalette}
        algorithmsPanelId={algorithmsPanelId}
      />
      {isVisualizerRoute ? <StickyTopControls /> : null}
      <main className="mt-4 flex flex-col gap-4 sm:gap-5">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/algorithms"
            element={<AlgorithmsCatalog isTocOpen={isAlgorithmsOpen} setIsTocOpen={setIsAlgorithmsOpen} />}
          />
          <Route
            path="/algorithms/:slug"
            element={<AlgorithmDetail isTocOpen={isAlgorithmsOpen} setIsTocOpen={setIsAlgorithmsOpen} />}
          />
          <Route
            path="/legacy-home"
            element={<Home isTocOpen={isAlgorithmsOpen} setIsTocOpen={setIsAlgorithmsOpen} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <MobileQuickActions
        onOpenAlgorithms={() => setIsAlgorithmsOpen(true)}
        showScrollSidebarAction={isLegacyHomeRoute}
      />
      <CommandPalette />
    </div>
  );
}

export default App;
