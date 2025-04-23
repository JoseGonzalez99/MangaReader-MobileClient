import { StateCreator } from "zustand";
import { AppUser, Preferences, ReadingEntry } from "@/dtos/mangareader.dto";
import { ApiException } from "@/apis/ReaderBackend/core/types";
import {
  ResetPasswordRequest,
  UpdateProfileRequest,
  userInfoApi,
  userLastReadApi,
  userPreferencesApi,
  userReadingHistoryApi,
  userResetPasswordApi,
  userUpdateApi,
  userUpdatePreferenceApi,
} from "@/apis/ReaderBackend/modules/User";

export interface UserSlice {
  appUser: AppUser | null;
  userPreferences: Preferences | null;
  userLoading: boolean;
  userError: ApiException | null;

  fetchUser: () => Promise<void>;
  fetchUserPreferences: () => Promise<void>;
  updateUserPreferences: (readingDirection:  "ltr"|"rtl") => Promise<void>;
  updateUser: (appUser:UpdateProfileRequest ) => Promise<void>;
  resetPassword:(passwordBody:ResetPasswordRequest)  => Promise<void>;
   
  fetchLastRead: () => Promise<ReadingEntry | null>;
  fetchReadingHistory: () => Promise<ReadingEntry[]>;
  isInProgress: (mangaId: string) => Promise<ReadingEntry | null>;

  clearUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  appUser: null,
  userPreferences: null,
  userLoading: false,
  userError: null,

  fetchUser: async () => {
    set({ userLoading: true, userError: null });
    try {
      const [user, preferences] = await Promise.all([
        userInfoApi(),
        userPreferencesApi(),
      ]);
      if (user) set({ appUser: user.data });
      if (preferences) set({ userPreferences: preferences.data });
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
    } finally {
      set({ userLoading: false });
    }
  },

  updateUser: async( updateUserBody:UpdateProfileRequest)=>{
    try {
      const updatedUser = await userUpdateApi(updateUserBody);
      if (updatedUser) {
        set({ appUser: updatedUser.data });
      }
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
    } 

  },
  resetPassword: async( resetPassword:ResetPasswordRequest)=>{
    try {
      const updatedUser = await userResetPasswordApi(resetPassword);
      if (updatedUser) {
        set({ appUser: updatedUser.data });
      }
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
    } 

  },
  fetchUserPreferences: async () => {
    set({ userLoading: true, userError: null });
    try {
      const res = await userPreferencesApi();
      if (res) set({ userPreferences: res.data });
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
    } finally {
      set({ userLoading: false });
    }
  },

  updateUserPreferences: async (readingDirection: "ltr"|"rtl") => {
    set({ userLoading: true, userError: null });

    try {
      const preferences = await userUpdatePreferenceApi({
        readingDirection: readingDirection,
        theme: "dark", // si son requeridos, incluilos
        defaultProvider: "JaityManga",
      });
      if (preferences) {
        set({ userPreferences: preferences.data });
      }
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
    } finally {
      set({ userLoading: false });
    }
  },

  fetchLastRead: async (): Promise<ReadingEntry | null> => {
    set({ userLoading: true, userError: null });
    try {
      const res = await userLastReadApi();
      return res?.data ?? null;
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
      return null;
    } finally {
      set({ userLoading: false });
    }
  },

  fetchReadingHistory: async (): Promise<ReadingEntry[]> => {
    set({ userLoading: true, userError: null });
    try {
      const res = await userReadingHistoryApi();
      return res?.data ?? [];
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
      return [];
    } finally {
      set({ userLoading: false });
    }
  },
  isInProgress: async (mangaId: string): Promise<ReadingEntry | null> => {
    set({ userLoading: true, userError: null });
    try {
      const res = await userReadingHistoryApi();
      if (res.data) {
        const found = res.data.find((item) => item.mangaId == mangaId);
        return found ?? null;
      } else {
        return null;
      }
    } catch (err) {
      if (err instanceof ApiException) set({ userError: err });
      else console.error("[userSlice] Unexpected error:", err);
      return null;
    } finally {
      set({ userLoading: false });
    }
  },

  clearUser: () => {
    set({
      appUser: null,
      userPreferences: null,
      userLoading: false,
      userError: null,
    });
  },
});
