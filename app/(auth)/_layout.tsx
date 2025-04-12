// app/(auth)_layout.tsx
import { Stack, Redirect } from "expo-router";
import { useAppStore } from "@/store/Slices";

export default function AuthLayout() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect href="/(app)/(main)/home" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
