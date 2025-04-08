import { Redirect } from "expo-router";
import { useAuthContext } from "@/contexts/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;
  if (isAuthenticated) return <Redirect href="/home" />;
  else <Redirect href="/register" />;
}
