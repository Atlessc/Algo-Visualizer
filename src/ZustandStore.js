import { create } from 'zustand';

const useStore = create((set) => ({
  // State
  windowWidth: window.innerWidth,

  // Actions
  setWindowWidth: (width) => set({ windowWidth: width }),

  // Add more states and actions as needed
}));

export default useStore;
