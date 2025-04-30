import { StateCreator } from "zustand";
import {
  Manga,
  Volume,
  Chapter,
  ChapterSourcePage,
  ChapterSource,
  ReadingEntry,
} from "@/dtos/mangareader.dto";
import { ApiException } from "@/apis/ReaderBackend/core/types";
import {
  getAllChapterByMangaId,
  getAvailablesSources,
  getChapterById,
  getChapterbyVolumenId,
  getMangaById,
  getMangas,
  getPagesByChapter,
  getVolumesByMangaId,
} from "@/apis/ReaderBackend/modules/Content";
import { sortChaptersAscending } from "@/utils/readerUtils";

export interface ContentSlice {
  loading: boolean;
  error: ApiException | null;

  mangas: Manga[];
  chapters: Chapter[];
  sources: ChapterSource[];
  pages: ChapterSourcePage[];
  selectedManga: Manga | null;
  selectedReadingEntry: ReadingEntry | null;
  selectedVolume: Volume | null;
  selectedChapter: Chapter | null;
  selectedChapterSource: ChapterSource | null;
  
  volumesOfSelectedManga: Volume[] | null;

  setSelectedManga: (manga: Manga | null) => void;
  setSelectedVolume: (volume: Volume | null) => void;
  setSelectedChapter: (chapter: Chapter | null) => void;
  setVolumesOfSelectedManga: (volumes: Volume[] | null) => void;
  setSelectedChapterSource: (source: ChapterSource | null) => void;

  fetchMangas: () => Promise<void>;
  fetchMangaById: (mangaId: string) => Promise<void>;
  fetchVolumesByMangaId: (mangaId: string) => Promise<void>;
  fetchChaptersByVolumeId: (volumeId: string) => Promise<void>;
  fetchPages: (chapterId: string, lang: string) => Promise<void>;
  fetchChaptersSources: (chapterId: string) => Promise<void>;
  fetchChapterById: (chapterId: string) => Promise<void>;

  startNewLecture:(mangaId: string) => Promise<void>;
  fetchAllChaptersOfManga: (mangaId: string) => Promise<void>;
  clearContent: () => void;
}

export const createContentSlice: StateCreator<ContentSlice> = (set,get) => ({
  mangas: [],
  chapters: [],
  pages: [],
  loading: false,
  error: null,
  sources: [],
  selectedReadingEntry: null,

  selectedManga: null,
  selectedVolume: null,
  selectedChapter: null,
  selectedChapterSource: null,
  volumesOfSelectedManga: [],



  setSelectedManga: (manga) => set({ selectedManga: manga }),
  setSelectedVolume: (volume) => set({ selectedVolume: volume }),
  setSelectedChapter: (chapter) => set({ selectedChapter: chapter }),
  setSelectedChapterSource: (source) => set({ selectedChapterSource: source }),
  setVolumesOfSelectedManga: (volumes) =>
    set({ volumesOfSelectedManga: volumes }),

  fetchMangas: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getMangas();
      set({ mangas: data.data });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando mangas:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchVolumesByMangaId: async (mangaId) => {
    set({ loading: true, error: null });
    try {
      const data = await getVolumesByMangaId(mangaId);
      set({ volumesOfSelectedManga: data.data });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando volúmenes:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchMangaById: async (mangaId) => {
    set({ loading: true, error: null });
    try {
      const data = await getMangaById(mangaId);
      set({ selectedManga: data.data });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando volúmenes:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchChaptersByVolumeId: async (volumeId) => {
    set({ loading: true, error: null });
    try {
      const data = await getChapterbyVolumenId(volumeId);
      set({ chapters: 
        sortChaptersAscending(data.data)
       });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando capítulos:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchPages: async (chapterId, lang) => {
    set({ loading: true, error: null });
    try {
      const data = await getPagesByChapter({
        chapterId: chapterId,
        query: {
          lang: lang,
        },
      });
      set({ pages: data.data });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando páginas:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchChaptersSources: async (chapterId) => {
    set({ loading: true, error: null });
    try {
      const data = await getAvailablesSources(chapterId);
      set({ sources: data.data });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando páginas:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchChapterById: async (chapterId) => {
    set({ loading: true, error: null });
    try {
      const data = await getChapterById(chapterId);
      set({ selectedChapter: data.data });
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando páginas:", err);
    } finally {
      set({ loading: false });
    }
  },
  fetchAllChaptersOfManga: async (mangaId) => {
    set({ loading: true, error: null });
    try {
      const data = await getAllChapterByMangaId(mangaId);
      set({ chapters: sortChaptersAscending(data.data)});
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando páginas:", err);
    } finally {
      set({ loading: false });
    }
  },
  startNewLecture: async (mangaId) => {
    set({ loading: true, error: null });
    try {
      const data = await getAllChapterByMangaId(mangaId);
      set({ chapters: data.data });
      set({ selectedChapter: data.data[0] });

      
    } catch (err) {
      if (err instanceof ApiException) set({ error: err });
      else console.error("[contentSlice] Error cargando páginas:", err);
    } finally {
      set({ loading: false });
    }
  },

  clearContent: () => {
    set({
      mangas: [],
      chapters: [],
      pages: [],
      loading: false,
      error: null,
      sources: [],
      selectedReadingEntry: null,

      selectedManga: null,
      selectedVolume: null,
      selectedChapter: null,
      selectedChapterSource: null,
      volumesOfSelectedManga: [],
    });
  },
});
