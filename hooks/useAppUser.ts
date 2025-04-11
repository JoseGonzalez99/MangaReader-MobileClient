import { ApiException } from "@/apis/ReaderBackend/core/types";
import { userInfoApi, userLastReadApi, userPreferencesApi, userReadingHistoryApi } from "@/apis/ReaderBackend/modules/User";
import { AppUser } from "@/dtos/mangareader.dto";
import { useState } from "react";

export const useAppUser = () => {

  const getUserPreferences = async () => {
    try {
      const res= await userPreferencesApi();
      res.data;
    } catch (err) {
      throw err;
    } 
  };


  const getUserInfo = async (): Promise<AppUser | null> => {
    try {
      const res = await userInfoApi();
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const getUserReadHistory = async () => {
    try {
      const res= await userReadingHistoryApi();
      res.data;
    } catch (err) {
      throw err;
    } 
  };
  const getUserLastRead = async () => {

    try {
      const res= await userLastReadApi();
      res.data;
    } catch (err) {
      throw err;
    } 
  
  };

  return {getUserPreferences,getUserReadHistory,getUserLastRead,getUserInfo};
};
