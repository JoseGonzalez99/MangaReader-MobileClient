// app/(app)/_layout.tsx
import { Redirect, Stack } from "expo-router";
import { useAppStore } from "@/store/Slices";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ProtectedLayout() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  // ✅ Redirección segura
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" backgroundColor="#171717" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}
