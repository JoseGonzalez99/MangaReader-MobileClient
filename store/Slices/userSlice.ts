import { StateCreator } from 'zustand';
import { AppUser } from '@/dtos/mangareader.dto';
import { ApiException } from '@/apis/ReaderBackend/core/types';
import { userInfoApi } from '@/apis/ReaderBackend/modules/User';

export interface UserSlice {
  appUser: AppUser | null;
  userLoading: boolean;
  userError: ApiException | null;

  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => {

  return {
    appUser: null,
    userLoading: false,
    userError: null,

    fetchUser: async () => {
      set({ userLoading: true, userError: null });

      try {
        const user = await userInfoApi();
        if (user) set({ appUser: user.data });
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
