import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ALGO_BY_SLUG } from "../data/algoCatalog";
import { SPEED_OPTIONS, THEME_OPTIONS } from "./navigationUxConstants";
import { NavigationUxValueContext } from "./navigationUxValueContext";

const STORAGE_KEY = "algo-visualizer-navigation-ux-v1";
const MAX_RECENTLY_VIEWED = 10;

function loadPersistedState() {
  if (typeof window === "undefined") {
    return {
      speedId: "normal",
      themeId: "light",
      recentlyViewedSlugs: [],
      lastVisitedSlug: "",
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        speedId: "normal",
        themeId: "light",
        recentlyViewedSlugs: [],
        lastVisitedSlug: "",
      };
    }

    const parsed = JSON.parse(raw);
    return {
      speedId: parsed?.speedId ?? "normal",
      themeId: parsed?.themeId ?? "light",
      recentlyViewedSlugs: Array.isArray(parsed?.recentlyViewedSlugs)
        ? parsed.recentlyViewedSlugs
        : [],
      lastVisitedSlug: parsed?.lastVisitedSlug ?? "",
    };
  } catch {
    return {
      speedId: "normal",
      themeId: "light",
      recentlyViewedSlugs: [],
      lastVisitedSlug: "",
    };
  }
}

function writePersistedState(payload) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage write errors so navigation UX remains non-blocking.
  }
}

function getNextThemeId(currentThemeId) {
  const index = THEME_OPTIONS.findIndex((theme) => theme.id === currentThemeId);
  const nextIndex = index === -1 ? 0 : (index + 1) % THEME_OPTIONS.length;
  return THEME_OPTIONS[nextIndex].id;
}

function isValidSlug(slug) {
  return Boolean(slug && ALGO_BY_SLUG[slug]);
}

function normalizeRecentList(slugs) {
  const deduped = [];
  slugs.forEach((slug) => {
    if (!isValidSlug(slug)) return;
    if (!deduped.includes(slug)) {
      deduped.push(slug);
    }
  });
  return deduped.slice(0, MAX_RECENTLY_VIEWED);
}

function NavigationUxProvider({ children }) {
  const persisted = useMemo(() => loadPersistedState(), []);
  const navigate = useNavigate();
  const location = useLocation();

  const [commandOpen, setCommandOpen] = useState(false);
  const [speedId, setSpeedId] = useState(persisted.speedId);
  const [themeId, setThemeId] = useState(persisted.themeId);
  const [isPlaybackPaused, setIsPlaybackPaused] = useState(false);
  const [resetToken, setResetToken] = useState(0);
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState(
    normalizeRecentList(persisted.recentlyViewedSlugs)
  );
  const [lastVisitedSlug, setLastVisitedSlug] = useState(
    isValidSlug(persisted.lastVisitedSlug) ? persisted.lastVisitedSlug : ""
  );

  const speedMultiplier = useMemo(() => {
    const found = SPEED_OPTIONS.find((option) => option.id === speedId);
    return found?.multiplier ?? 1;
  }, [speedId]);

  const recentlyViewedItems = useMemo(
    () => recentlyViewedSlugs.map((slug) => ALGO_BY_SLUG[slug]).filter(Boolean),
    [recentlyViewedSlugs]
  );

  const lastVisitedItem = useMemo(
    () => (isValidSlug(lastVisitedSlug) ? ALGO_BY_SLUG[lastVisitedSlug] : null),
    [lastVisitedSlug]
  );

  const continuePath = useMemo(
    () => (lastVisitedItem ? `/algorithms/${lastVisitedItem.slug}` : "/algorithms"),
    [lastVisitedItem]
  );

  const isAlgorithmExperienceRoute =
    location.pathname === "/algorithms" ||
    location.pathname.startsWith("/algorithms/") ||
    location.pathname === "/legacy-home";

  const isVisualizerRoute =
    location.pathname.startsWith("/algorithms/") || location.pathname === "/legacy-home";

  const openCommandPalette = useCallback(() => {
    setCommandOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setCommandOpen(false);
  }, []);

  const togglePlaybackPaused = useCallback(() => {
    setIsPlaybackPaused((prev) => !prev);
  }, []);

  const triggerReset = useCallback(() => {
    setResetToken((prev) => prev + 1);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeId((prev) => getNextThemeId(prev));
  }, []);

  const registerVisitedAlgorithm = useCallback((slug) => {
    if (!isValidSlug(slug)) return;

    setLastVisitedSlug(slug);
    setRecentlyViewedSlugs((prev) => normalizeRecentList([slug, ...prev]));
  }, []);

  const goToAlgorithm = useCallback(
    (slug, { replace = false } = {}) => {
      if (!isValidSlug(slug)) return;

      registerVisitedAlgorithm(slug);
      navigate(`/algorithms/${slug}`, { replace });
      setCommandOpen(false);
    },
    [navigate, registerVisitedAlgorithm]
  );

  const continueWhereLeftOff = useCallback(() => {
    navigate(continuePath);
  }, [continuePath, navigate]);

  useEffect(() => {
    writePersistedState({
      speedId,
      themeId,
      recentlyViewedSlugs,
      lastVisitedSlug,
    });
  }, [speedId, themeId, recentlyViewedSlugs, lastVisitedSlug]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.uiTheme = themeId;
  }, [themeId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.globalPlayback = isPlaybackPaused ? "paused" : "running";
  }, [isPlaybackPaused]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detail = {
      speedMultiplier,
      isPlaybackPaused,
      resetToken,
    };

    window.__ALGO_VISUALIZER_GLOBAL_CONTROLS__ = detail;
    window.dispatchEvent(new CustomEvent("algo-visualizer:global-controls", { detail }));
  }, [isPlaybackPaused, resetToken, speedMultiplier]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onKeyDown = (event) => {
      const isMetaShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isMetaShortcut) {
        event.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    setCommandOpen(false);
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      commandOpen,
      openCommandPalette,
      closeCommandPalette,
      speedId,
      speedMultiplier,
      setSpeedId,
      isPlaybackPaused,
      togglePlaybackPaused,
      resetToken,
      triggerReset,
      themeId,
      setThemeId,
      cycleTheme,
      recentlyViewedSlugs,
      recentlyViewedItems,
      lastVisitedSlug,
      lastVisitedItem,
      continuePath,
      continueWhereLeftOff,
      registerVisitedAlgorithm,
      goToAlgorithm,
      isAlgorithmExperienceRoute,
      isVisualizerRoute,
    }),
    [
      commandOpen,
      openCommandPalette,
      closeCommandPalette,
      speedId,
      speedMultiplier,
      isPlaybackPaused,
      togglePlaybackPaused,
      resetToken,
      triggerReset,
      themeId,
      cycleTheme,
      recentlyViewedSlugs,
      recentlyViewedItems,
      lastVisitedSlug,
      lastVisitedItem,
      continuePath,
      continueWhereLeftOff,
      registerVisitedAlgorithm,
      goToAlgorithm,
      isAlgorithmExperienceRoute,
      isVisualizerRoute,
    ]
  );

  return (
    <NavigationUxValueContext.Provider value={value}>
      {children}
    </NavigationUxValueContext.Provider>
  );
}

export { NavigationUxProvider };
