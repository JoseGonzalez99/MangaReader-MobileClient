import { ApiException } from "@/apis/ReaderBackend/core/types";
import { getLastRead, getPreferences, getReadingHistory } from "@/apis/ReaderBackend/modules/User";
import { useState } from "react";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiException | null>(null);

  const obtainUserPreferences = async () => {
    setLoading(true);
    setError(null);
    try {
      await getPreferences();
    } catch (err) {
      if (err instanceof ApiException) setError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const obtainUserReadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      await getReadingHistory();
    } catch (err) {
      if (err instanceof ApiException) setError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };
  const obtainUserLastRead = async () => {
    setLoading(true);
    setError(null);
    try {
      await getLastRead();
    } catch (err) {
      if (err instanceof ApiException) setError(err);
      else console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {obtainUserLastRead,obtainUserPreferences,obtainUserReadHistory};
};
