import { create } from "zustand";

// filter state = all(전체), completed(완료), active(미완료)
export const useFilterStore = create((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
