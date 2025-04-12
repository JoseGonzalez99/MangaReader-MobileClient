// app/(app)/_layout.tsx
import { Redirect, Stack } from "expo-router";
import { useAppStore } from "@/store/Slices";

export default function ProtectedLayout() {
  const isAuthenticated = useAppStore((s)=>s.isAuthenticated)

  // ✅ Redirección segura
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
