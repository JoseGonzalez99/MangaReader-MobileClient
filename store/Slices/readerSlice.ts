import { StateCreator } from "zustand";

export interface ReaderSlice {
  showChaptersDrawer: boolean;
  setShowChaptersDrawer: (state: boolean) => void;
  showParamsDrawer: boolean;
  setShowParamsDrawer: (state: boolean) => void;
  selectedReaderOrientation: "ltr" | "rtl";
  setSelectedReaderOrientation: (state: "ltr" | "rtl") => void;
  resetReader: () => void;
}

export const createReaderSlice: StateCreator<ReaderSlice> = (set) => ({
  showChaptersDrawer: false,
  showParamsDrawer: false,
  selectedReaderOrientation: "ltr",
  selectedChapter: null,
  chaptersList: [],

  setShowChaptersDrawer: (state) => set({ showChaptersDrawer: state }),
  setShowParamsDrawer: (state) => set({ showParamsDrawer: state }),
  setSelectedReaderOrientation: (state) => set({ selectedReaderOrientation: state }),

  resetReader: () =>
    set({
      showChaptersDrawer: false,
      showParamsDrawer: false,
      selectedReaderOrientation: "ltr",
  
    }),
});
