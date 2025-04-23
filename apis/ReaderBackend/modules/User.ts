import { AppUser, Preferences, ReadingEntry } from "@/dtos/mangareader.dto";
import { mainApiRequest } from "../core/helpers";
import { ApiSuccessResponse } from "../core/types";

export interface UpdateProfileRequest{
  email:string;
  fullName:string;
  photoUrl:string
}
export interface ResetPasswordRequest{
  currentPassword:string;
  newPassword:string;
}

export const userInfoApi = async (): Promise<
  ApiSuccessResponse<AppUser>
> => {
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

export const userUpdateApi = async (
  body: UpdateProfileRequest
): Promise<ApiSuccessResponse<AppUser>> => {
  const response = await mainApiRequest<AppUser>({
    url: `/me`,
    method: "PUT",
    data: body,
  });
  return response;
};

export const userResetPasswordApi = async (
  body: ResetPasswordRequest
): Promise<ApiSuccessResponse<null>> => {
  const response = await mainApiRequest<null>({
    url: `/me`,
    method: "PUT",
    data: body,
  });
  return response;
};
