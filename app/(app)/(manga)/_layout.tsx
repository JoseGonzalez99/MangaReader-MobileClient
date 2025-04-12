import { Stack } from "expo-router";
import {  Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useScrollY } from "@/hooks/useScrollY";


export default function MangaLayout() {
  const router = useRouter();
  const scrollY = useScrollY();
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [0, 1]);
    return {
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    };
  });

  return (
    <Stack
      screenOptions={{
        header: () => (
          <Animated.View
            style={[
              {
                padding:16,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
              },
              animatedHeaderStyle,
            ]}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={34} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Compartir")}>
              <Entypo name="share" size={30} color="white" />
            </TouchableOpacity>
          </Animated.View>
        ),
        headerTransparent: true, // 👈 Asegura que el header sea "flotante"
      }}
    />
  );
}
