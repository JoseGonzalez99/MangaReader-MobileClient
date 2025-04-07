import { Preferences, ReadingEntry } from "@/dtos/mangareader.dto";
import { mainApiRequest } from "../core/helpers";
import { ApiSuccessResponse } from "../core/types";

export const getReadingHistory = async (): Promise<
  ApiSuccessResponse<ReadingEntry[]>
> => {
  const response = await mainApiRequest<ReadingEntry[]>({
    url: `/me/context/history`,
    method: "GET",
  });
  return response;
};

export const getLastRead = async (): Promise<
  ApiSuccessResponse<ReadingEntry>
> => {
  const response = await mainApiRequest<ReadingEntry>({
    url: `/me/context/last-read`,
    method: "GET",
  });
  return response;
};

export const getPreferences = async (): Promise<
  ApiSuccessResponse<Preferences>
> => {
  const response = await mainApiRequest<Preferences>({
    url: `/me/context/preferences`,
    method: "GET",
  });
  return response;
};

export const updatePreferences = async (
  body: Preferences
): Promise<ApiSuccessResponse<Preferences>> => {
  const response = await mainApiRequest<Preferences>({
    url: `/me/context/preferences`,
    method: "PUT",
    data: body,
  });
  return response;
};
