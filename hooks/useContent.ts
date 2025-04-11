import { ApiException } from "@/apis/ReaderBackend/core/types";
import { getChapterbyMangaApi, getChapterbyVolumenApi, getMangasApi, getMangasbyIdApi, getMangaVolumesApi, getVolumeByIdApi } from "@/apis/ReaderBackend/modules/Content";
import { Chapter, Manga, Volume } from "@/dtos/mangareader.dto";
import { useState } from "react";

export const useContent = () => {
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState<ApiException | null>(null);

  const fetchAllmangas = async (): Promise<Manga[]> => {
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await getMangasApi();
      return res.data;
    } catch (err) {
      if (err instanceof ApiException) setContentError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setContentLoading(false);
      
    }
    return [];
  };
  const fetchManga = async (mangaId:string): Promise<Manga |null> => {
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await getMangasbyIdApi(mangaId);
      return res.data;
    } catch (err) {
      if (err instanceof ApiException) setContentError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setContentLoading(false);
      
    }
    return null;
  };


  const fetchVolume = async (volumeId:string): Promise<Volume |null> => {
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await getVolumeByIdApi(volumeId);
      return res.data;
    } catch (err) {
      if (err instanceof ApiException) setContentError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setContentLoading(false);
      
    }
    return null;
  };

  const fetchVolumes = async (mangaId:string): Promise<Volume[]> => {
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await getMangaVolumesApi(mangaId);
      return res.data;
    } catch (err) {
      if (err instanceof ApiException) setContentError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setContentLoading(false);
      
    }
    return [];
  };

  const fetchChapterByVolume = async (volumeId:string): Promise<Chapter[]> => {
    setContentLoading(true);
    setContentError(null);
    try {
      const res = await getChapterbyVolumenApi(volumeId);
      return res.data;
    } catch (err) {
      if (err instanceof ApiException) setContentError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setContentLoading(false);
      
    }
    return [];
  };

  return {fetchChapterByVolume,fetchVolume, fetchAllmangas,fetchVolumes,fetchManga, contentError, contentLoading };
};
