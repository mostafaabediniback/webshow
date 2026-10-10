import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,
  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),
}));

export default useLoadingStore;
