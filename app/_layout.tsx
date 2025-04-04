import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  // Ensure to call inside a component, not globally

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} translucent={false} />
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="(tabs)" options={{headerShown:true}}/>
        <Stack.Screen name="login" options={{headerShown:true}}/>
        </Stack>
    </>
  );
}
