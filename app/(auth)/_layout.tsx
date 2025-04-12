// app/(auth)_layout.tsx
import { Stack, Redirect } from "expo-router";
import { useAppStore } from "@/store/Slices";

export default function AuthLayout() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const loading = useAppStore((s) => s.loading);

  if (loading) return null;

  // ✅ Redirección segura
  if (isAuthenticated) return <Redirect href="/(main)/home" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
