import { createContext } from "react";

const noop = () => {};

const NavigationUxValueContext = createContext({
  commandOpen: false,
  openCommandPalette: noop,
  closeCommandPalette: noop,
  speedId: "normal",
  speedMultiplier: 1,
  setSpeedId: noop,
  isPlaybackPaused: false,
  togglePlaybackPaused: noop,
  resetToken: 0,
  triggerReset: noop,
  themeId: "light",
  setThemeId: noop,
  cycleTheme: noop,
  recentlyViewedSlugs: [],
  recentlyViewedItems: [],
  lastVisitedSlug: "",
  lastVisitedItem: null,
  continuePath: "/algorithms",
  continueWhereLeftOff: noop,
  registerVisitedAlgorithm: noop,
  goToAlgorithm: noop,
  isAlgorithmExperienceRoute: false,
  isVisualizerRoute: false,
});

export { NavigationUxValueContext };
