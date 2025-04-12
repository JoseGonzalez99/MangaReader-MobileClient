import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { ContentSlice, createContentSlice } from "./contentSlice";
import { UserSlice, createUserSlice } from "./userSlice";

type AppStore = AuthSlice & UserSlice & ContentSlice;

export const useAppStore = create<AppStore>((...args) => ({
  ...createAuthSlice(...args),
  ...createUserSlice(...args),
  ...createContentSlice(...args),
}));
