import { Chapter, ChapterSourcePage, Manga, Provider, Volume } from "@/dtos/mangareader.dto";
import { mainApiRequest } from "../core/helpers";
import { ApiSuccessResponse } from "../core/types";



type GetPagesByChapterParams= {
  chapterId:string;
  query?:{
    lang:string
    providerId?:string
  }
}
//Sirve para obtener la pagins de un capitulo
export const getPagesByChapter = async ({chapterId,query}:GetPagesByChapterParams): Promise<ApiSuccessResponse<ChapterSourcePage[]>> => {
  const response = await mainApiRequest<ChapterSourcePage[]>({
    url: `/public/pages/by-chapter/${chapterId}`,
    method: 'GET',
    params:query
  });
  return response;
};

type GetAllChapterOfManga= {
  mangaId:string;
  query?:{
    lang:string;
    providerId?:string;
  }
}


//Para obtener las fuentes de capitulos.
export const getAvailablesSources = async (mangaId:string): Promise<ApiSuccessResponse<Provider[]>> => {
  const response = await mainApiRequest<Provider[]>({
    url: `/public/sources/${mangaId}/available-sources`,
    method: 'GET'
  });
  return response;
};


//Para obtener los mangas
export const getMangas = async (): Promise<ApiSuccessResponse<Manga[]>> => {
  const response = await mainApiRequest<Manga[]>({
    url: `/mangas`,
    method: 'GET',
  });
  return response;
};


//Busca un manga por su id
export const getMangaById = async (mangaId:string): Promise<ApiSuccessResponse<Manga>> => {
  const response = await mainApiRequest<Manga>({
    url: `/mangas/${mangaId}`,
    method: 'GET',
  });
  return response;
};

//Busca un volumen por su id
export const getVolumeById = async (volumeId:string): Promise<ApiSuccessResponse<Volume>> => {
  const response = await mainApiRequest<Volume>({
    url: `/volumes/${volumeId}`,
    method: 'GET',
  });
  return response;
};


//Obtiene los volumenes de un manga
export const getVolumesByMangaId = async (mangaId:string): Promise<ApiSuccessResponse<Volume[]>> => {
  const response = await mainApiRequest<Volume[]>({
    url: `/mangas/${mangaId}/volumes`,
    method: 'GET',
  });
  return response;
};


//Obtiene los capitulos de un volumen
export const getChapterbyVolumenId = async (volumeId:string): Promise<ApiSuccessResponse<Chapter[]>> => {
  const response = await mainApiRequest<Chapter[]>({
    url: `/volumes/${volumeId}/chapters`,
    method: 'GET',
  });
  return response;
};


//Para obtener los capitulos de un manga 
export const getAllChapterByMangaId = async ({mangaId,query}:GetAllChapterOfManga): Promise<ApiSuccessResponse<Chapter[]>> => {
  const response = await mainApiRequest<Chapter[]>({
    url: `/public/chapters/by-manga/${mangaId}`,
    method: 'GET',
    params:query
  });
  return response;
};
