import { AppUser, Preferences, ReadingEntry } from "@/dtos/mangareader.dto";
import { mainApiRequest } from "../core/helpers";
import { ApiSuccessResponse } from "../core/types";

import { Storage } from "@/utils/storage";

export const userInfoApi = async (): Promise<
  ApiSuccessResponse<AppUser>
> => {
  const token = await Storage.getItem("accessToken");
  console.log("📡 Token usado en userInfoApi:", token); // ← si null, no hay sesión válida

  const response = await mainApiRequest<AppUser>({
    url: `/me`,
    method: "GET",
  });
  return response;
};


export const userReadingHistoryApi = async (): Promise<
  ApiSuccessResponse<ReadingEntry[]>
> => {
  const response = await mainApiRequest<ReadingEntry[]>({
    url: `/me/context/history`,
    method: "GET",
  });
  return response;
};

export const userLastReadApi = async (): Promise<
  ApiSuccessResponse<ReadingEntry>
> => {
  const response = await mainApiRequest<ReadingEntry>({
    url: `/me/context/last-read`,
    method: "GET",
  });
  return response;
};

export const userPreferencesApi = async (): Promise<
  ApiSuccessResponse<Preferences>
> => {
  const response = await mainApiRequest<Preferences>({
    url: `/me/context/preferences`,
    method: "GET",
  });
  return response;
};

export const userUpdatePreferenceApi = async (
  body: Preferences
): Promise<ApiSuccessResponse<Preferences>> => {
  const response = await mainApiRequest<Preferences>({
    url: `/me/context/preferences`,
    method: "PUT",
    data: body,
  });
  return response;
};
