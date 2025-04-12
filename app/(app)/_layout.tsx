// app/(app)/_layout.tsx
import { Redirect, Stack } from "expo-router";
import { useAppStore } from "@/store/Slices";

export default function ProtectedLayout() {
  const isAuthenticated = useAppStore((s)=>s.isAuthenticated)
  const loading = useAppStore((s)=>s.loading)

  if (loading) return null;

  // ✅ Redirección segura
  if (isAuthenticated == false) return <Redirect href="/(auth)/login" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
