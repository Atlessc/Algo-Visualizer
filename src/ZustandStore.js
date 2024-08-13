
import { create } from 'zustand';

const useStore = create((set) => ({
  // State
  stateName: '', // state values can set to "", [], {}, or null; also add a comma to add more

  // Actions
  setStateName: (stateName) => set({ stateName }) // look at the app.jsx to see how this is implemented

}));

export default useStore;
