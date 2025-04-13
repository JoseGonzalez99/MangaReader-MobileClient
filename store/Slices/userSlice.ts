import { StateCreator } from 'zustand';
import { AppUser, Preferences } from '@/dtos/mangareader.dto';
import { ApiException } from '@/apis/ReaderBackend/core/types';
import { userInfoApi, userPreferencesApi, userUpdatePreferenceApi } from '@/apis/ReaderBackend/modules/User';

export interface UserSlice {
  appUser: AppUser | null;
  userPreferences:Preferences| null;
  userLoading: boolean;
  userError: ApiException | null;
  fetchUser: () => Promise<void>;
  fetchUserPreferences: () => Promise<void>;
  updateUserPreferences: (readingDirection:string) => Promise<void>;

  clearUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => {

  return {
    appUser: null,
    userPreferences:null,
    userLoading: false,
    userError: null,

    fetchUser: async () => {
      set({ userLoading: true, userError: null });

      try {
        const user = await userInfoApi();
        if (user) set({ appUser: user.data });
        const preferences = await userPreferencesApi();
        if (preferences) set({ userPreferences: preferences.data });
      } catch (err) {
        if (err instanceof ApiException) set({ userError: err });
        else console.error('[userSlice] Unexpected error:', err);
      } finally {
        set({ userLoading: false });
      }
    },
    
    fetchUserPreferences:async()=>{

      set({ userLoading: true, userError: null });

      try {
        const preferences = await userPreferencesApi();
        if (preferences) set({ userPreferences: preferences.data });
      } catch (err) {
        if (err instanceof ApiException) set({ userError: err });
        else console.error('[userSlice] Unexpected error:', err);
      } finally {
        set({ userLoading: false });
      }
    },

    updateUserPreferences:async(readingDirection:string)=>{

      set({ userLoading: true, userError: null });

      try {
        const preferences = await userUpdatePreferenceApi({
          theme: 'dark',//por defecto,no influye
          readingDirection: '',
          defaultProvider: ''//vacio por defecto, no influye
        });
        if (preferences) set({ userPreferences: preferences.data });
      } catch (err) {
        if (err instanceof ApiException) set({ userError: err });
        else console.error('[userSlice] Unexpected error:', err);
      } finally {
        set({ userLoading: false });
      }
    },

    clearUser: () => {
      set({ appUser: null, userError: null });
    },
  };
};
