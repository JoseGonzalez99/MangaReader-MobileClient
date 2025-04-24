// app/(auth)_layout.tsx
import { Stack, Redirect } from "expo-router";
import { useAppStore } from "@/store/Slices";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function AuthLayout() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect href="/(app)/(main)/home" />;
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
