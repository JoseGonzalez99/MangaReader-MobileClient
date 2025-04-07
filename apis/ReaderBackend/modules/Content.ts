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

//Para obtener los capitulos de un manga
export const getAllChapterOfManga = async ({mangaId,query}:GetAllChapterOfManga): Promise<ApiSuccessResponse<Chapter[]>> => {
  const response = await mainApiRequest<Chapter[]>({
    url: `/public/chapters/by-manga/${mangaId}`,
    method: 'GET',
    params:query
  });
  return response;
};

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


type GetMangasParams= {
  mangaId?:string;
}
export const getMangasbyId = async ({mangaId}:GetMangasParams): Promise<ApiSuccessResponse<Manga>> => {
  const response = await mainApiRequest<Manga>({
    url: `/mangas/${mangaId}`,
    method: 'GET',
  });
  return response;
};



type GetMangaVolumes= {
  mangaId?:string;
}
export const getMangaVolumes = async ({mangaId}:GetMangaVolumes): Promise<ApiSuccessResponse<Volume[]>> => {
  const response = await mainApiRequest<Volume[]>({
    url: `/mangas/${mangaId}/volumes`,
    method: 'GET',
  });
  return response;
};

