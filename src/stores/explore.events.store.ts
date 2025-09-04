import { create } from "zustand";

// Definisikan type state
type EventsStore = {
  itemsPerPage: number;
  currentPage: number;
  localFilters: any;
  keyword: string;

  // Action: fungsi untuk update state
  setItemsPerPage: (value: number) => void;
  setCurrentPage: (page: number) => void;
  setLocalFilters: (filters: any) => void;
  setKeyword: (value: string) => void;
};

const useEventsStore = create<EventsStore>()((set) => ({
  itemsPerPage: 8,
  currentPage: 1,
  localFilters: {},
  keyword: "",

  // Fungsi yang benar: terima number, bukan object
  setItemsPerPage: (value: number) => set({ itemsPerPage: value }),

  setCurrentPage: (page: number) => set({ currentPage: page }),

  setLocalFilters: (filters: any) => set({ localFilters: filters }),

  setKeyword: (value: string) => set({ keyword: value }),
}));

export default useEventsStore;
